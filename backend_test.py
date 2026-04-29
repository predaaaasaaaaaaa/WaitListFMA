#!/usr/bin/env python3
"""
Backend API Testing for PREDA Landing Page
Tests all API endpoints: health, stats, feedback, waitlist
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class PREDAAPITester:
    def __init__(self, base_url="https://game-intel-18.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "response_data": response_data
        })

    def test_health_endpoint(self):
        """Test GET /api/health"""
        try:
            response = requests.get(f"{self.api_url}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "ok":
                    self.log_test("Health endpoint", True, f"Status: {data.get('status')}", data)
                    return True
                else:
                    self.log_test("Health endpoint", False, f"Invalid status: {data.get('status')}", data)
            else:
                self.log_test("Health endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Health endpoint", False, f"Exception: {str(e)}")
        return False

    def test_stats_endpoint(self):
        """Test GET /api/stats"""
        try:
            response = requests.get(f"{self.api_url}/stats", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "feedback_count" in data and "waitlist_count" in data:
                    if isinstance(data["feedback_count"], int) and isinstance(data["waitlist_count"], int):
                        self.log_test("Stats endpoint", True, 
                                    f"feedback_count: {data['feedback_count']}, waitlist_count: {data['waitlist_count']}", 
                                    data)
                        return data
                    else:
                        self.log_test("Stats endpoint", False, "Non-numeric counts", data)
                else:
                    self.log_test("Stats endpoint", False, "Missing required fields", data)
            else:
                self.log_test("Stats endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Stats endpoint", False, f"Exception: {str(e)}")
        return None

    def test_feedback_submission(self):
        """Test POST /api/feedback with valid data"""
        test_feedback = {
            "role": "Performance analyst at a Ligue 2 club",
            "workflow": "Manual video analysis and report creation",
            "time_sink": "Tagging events manually takes most time",
            "pain_point": "Lack of affordable automated tools",
            "favorite_feature": "Auto reports and plain-English Q&A",
            "workflow_change": "Would automate most manual analysis tasks",
            "email": "test@club.com",
            "source": "landing"
        }
        
        try:
            response = requests.post(f"{self.api_url}/feedback", 
                                   json=test_feedback, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "created_at" in data and data.get("source") == "landing":
                    self.log_test("Feedback submission (valid)", True, 
                                f"Created feedback with ID: {data.get('id')}", data)
                    return data
                else:
                    self.log_test("Feedback submission (valid)", False, "Missing required response fields", data)
            else:
                self.log_test("Feedback submission (valid)", False, 
                            f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Feedback submission (valid)", False, f"Exception: {str(e)}")
        return None

    def test_feedback_empty_submission(self):
        """Test POST /api/feedback with empty data (should return 400)"""
        empty_feedback = {}
        
        try:
            response = requests.post(f"{self.api_url}/feedback", 
                                   json=empty_feedback, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 400:
                self.log_test("Feedback submission (empty)", True, "Correctly rejected empty submission")
                return True
            else:
                self.log_test("Feedback submission (empty)", False, 
                            f"Expected 400, got {response.status_code}")
        except Exception as e:
            self.log_test("Feedback submission (empty)", False, f"Exception: {str(e)}")
        return False

    def test_feedback_partial_submission(self):
        """Test POST /api/feedback with partial data (should succeed)"""
        partial_feedback = {
            "role": "Scout",
            "email": "scout@test.com"
        }
        
        try:
            response = requests.post(f"{self.api_url}/feedback", 
                                   json=partial_feedback, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data.get("role") == "Scout":
                    self.log_test("Feedback submission (partial)", True, 
                                f"Accepted partial submission with ID: {data.get('id')}", data)
                    return data
                else:
                    self.log_test("Feedback submission (partial)", False, "Invalid response data", data)
            else:
                self.log_test("Feedback submission (partial)", False, 
                            f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Feedback submission (partial)", False, f"Exception: {str(e)}")
        return None

    def test_feedback_list(self):
        """Test GET /api/feedback"""
        try:
            response = requests.get(f"{self.api_url}/feedback", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Feedback list", True, f"Retrieved {len(data)} feedback entries", 
                                {"count": len(data), "sample": data[:1] if data else []})
                    return data
                else:
                    self.log_test("Feedback list", False, "Response is not a list", data)
            else:
                self.log_test("Feedback list", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Feedback list", False, f"Exception: {str(e)}")
        return None

    def test_waitlist_signup(self):
        """Test POST /api/waitlist with valid email"""
        test_email = f"test+{datetime.now().strftime('%Y%m%d%H%M%S')}@club.com"
        waitlist_data = {
            "email": test_email,
            "role": "Performance Analyst",
            "source": "landing"
        }
        
        try:
            response = requests.post(f"{self.api_url}/waitlist", 
                                   json=waitlist_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data.get("email") == test_email:
                    self.log_test("Waitlist signup (valid)", True, 
                                f"Created waitlist entry with ID: {data.get('id')}", data)
                    return data
                else:
                    self.log_test("Waitlist signup (valid)", False, "Invalid response data", data)
            else:
                self.log_test("Waitlist signup (valid)", False, 
                            f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Waitlist signup (valid)", False, f"Exception: {str(e)}")
        return None

    def test_waitlist_duplicate_email(self):
        """Test POST /api/waitlist with duplicate email (should be idempotent)"""
        duplicate_email = "duplicate@test.com"
        waitlist_data = {
            "email": duplicate_email,
            "source": "landing"
        }
        
        try:
            # First submission
            response1 = requests.post(f"{self.api_url}/waitlist", 
                                    json=waitlist_data, 
                                    headers={"Content-Type": "application/json"},
                                    timeout=10)
            
            # Second submission (duplicate)
            response2 = requests.post(f"{self.api_url}/waitlist", 
                                    json=waitlist_data, 
                                    headers={"Content-Type": "application/json"},
                                    timeout=10)
            
            if response1.status_code == 200 and response2.status_code == 200:
                data1 = response1.json()
                data2 = response2.json()
                
                if data1.get("id") == data2.get("id"):
                    self.log_test("Waitlist duplicate email", True, 
                                "Correctly returned existing record for duplicate email")
                    return True
                else:
                    self.log_test("Waitlist duplicate email", False, 
                                "Different IDs returned for duplicate email")
            else:
                self.log_test("Waitlist duplicate email", False, 
                            f"Status codes: {response1.status_code}, {response2.status_code}")
        except Exception as e:
            self.log_test("Waitlist duplicate email", False, f"Exception: {str(e)}")
        return False

    def test_waitlist_invalid_email(self):
        """Test POST /api/waitlist with invalid email (should return 422)"""
        invalid_data = {
            "email": "invalid-email",
            "source": "landing"
        }
        
        try:
            response = requests.post(f"{self.api_url}/waitlist", 
                                   json=invalid_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 422:
                self.log_test("Waitlist invalid email", True, "Correctly rejected invalid email")
                return True
            else:
                self.log_test("Waitlist invalid email", False, 
                            f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_test("Waitlist invalid email", False, f"Exception: {str(e)}")
        return False

    def test_waitlist_list(self):
        """Test GET /api/waitlist"""
        try:
            response = requests.get(f"{self.api_url}/waitlist", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Waitlist list", True, f"Retrieved {len(data)} waitlist entries",
                                {"count": len(data), "sample": data[:1] if data else []})
                    return data
                else:
                    self.log_test("Waitlist list", False, "Response is not a list", data)
            else:
                self.log_test("Waitlist list", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Waitlist list", False, f"Exception: {str(e)}")
        return None

    def run_all_tests(self):
        """Run all backend API tests"""
        print(f"🚀 Starting PREDA Backend API Tests")
        print(f"📍 Testing against: {self.api_url}")
        print("=" * 60)
        
        # Test health endpoint
        self.test_health_endpoint()
        
        # Test stats endpoint
        initial_stats = self.test_stats_endpoint()
        
        # Test feedback endpoints
        self.test_feedback_submission()
        self.test_feedback_empty_submission()
        self.test_feedback_partial_submission()
        self.test_feedback_list()
        
        # Test waitlist endpoints
        self.test_waitlist_signup()
        self.test_waitlist_duplicate_email()
        self.test_waitlist_invalid_email()
        self.test_waitlist_list()
        
        # Test stats again to verify counts updated
        final_stats = self.test_stats_endpoint()
        
        # Summary
        print("=" * 60)
        print(f"📊 Test Summary:")
        print(f"   Tests run: {self.tests_run}")
        print(f"   Tests passed: {self.tests_passed}")
        print(f"   Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if initial_stats and final_stats:
            print(f"📈 Stats Changes:")
            print(f"   Feedback count: {initial_stats['feedback_count']} → {final_stats['feedback_count']}")
            print(f"   Waitlist count: {initial_stats['waitlist_count']} → {final_stats['waitlist_count']}")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test runner"""
    tester = PREDAAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open("/tmp/backend_test_results.json", "w") as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "tests_run": tester.tests_run,
            "tests_passed": tester.tests_passed,
            "success_rate": tester.tests_passed/tester.tests_run if tester.tests_run > 0 else 0,
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())