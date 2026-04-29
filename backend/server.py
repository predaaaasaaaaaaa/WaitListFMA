from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Any, Dict
import uuid
from datetime import datetime, timezone


ROOT_DIR: Path = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ---- MongoDB connection ----
mongo_url: str = os.environ['MONGO_URL']
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app: FastAPI = FastAPI(title="PREDA Landing API", version="1.0.0")
api_router: APIRouter = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger: logging.Logger = logging.getLogger(__name__)


# ----------------------------
# Helpers
# ----------------------------
def _now_iso() -> str:
    """Return the current time as an ISO-8601 UTC string."""
    return datetime.now(timezone.utc).isoformat()


def _serialize_doc(doc: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    """Strip Mongo internals and ensure datetime fields are ISO strings.

    Safe to call with a falsy value; returns it unchanged in that case.
    """
    if not doc:
        return doc
    doc.pop("_id", None)
    for k, v in list(doc.items()):
        if isinstance(v, datetime):
            doc[k] = v.isoformat()
    return doc


# ----------------------------
# Models
# ----------------------------
class FeedbackSubmission(BaseModel):
    """Optional 6-question survey for early feedback.

    All fields are optional so users can submit partial answers.
    """

    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: Optional[str] = Field(
        default=None,
        description="What is your current role in soccer analytics?",
    )
    workflow: Optional[str] = Field(
        default=None,
        description="Describe your current workflow?",
    )
    time_sink: Optional[str] = Field(
        default=None,
        description="What takes you time the most in your work?",
    )
    pain_point: Optional[str] = Field(
        default=None,
        description="How would you describe your principal pain point?",
    )
    favorite_feature: Optional[str] = Field(
        default=None,
        description="What feature got your interest the most in PREDA?",
    )
    workflow_change: Optional[str] = Field(
        default=None,
        description="How would PREDA change your current workflow?",
    )
    email: Optional[str] = Field(
        default=None,
        description="Optional email for follow-up.",
    )
    source: Optional[str] = Field(default="landing")
    created_at: str = Field(default_factory=_now_iso)


class FeedbackCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    role: Optional[str] = None
    workflow: Optional[str] = None
    time_sink: Optional[str] = None
    pain_point: Optional[str] = None
    favorite_feature: Optional[str] = None
    workflow_change: Optional[str] = None
    email: Optional[str] = None
    source: Optional[str] = "landing"


class WaitlistSignup(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    role: Optional[str] = None
    source: Optional[str] = "landing"
    created_at: str = Field(default_factory=_now_iso)


class WaitlistCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    email: EmailStr
    role: Optional[str] = None
    source: Optional[str] = "landing"


class Stats(BaseModel):
    feedback_count: int
    waitlist_count: int


# ----------------------------
# Routes
# ----------------------------
@api_router.get("/")
async def root() -> Dict[str, str]:
    return {"name": "PREDA Landing API", "status": "online"}


@api_router.get("/health")
async def health() -> Dict[str, str]:
    return {"status": "ok", "time": _now_iso()}


@api_router.post("/feedback", response_model=FeedbackSubmission)
async def submit_feedback(payload: FeedbackCreate) -> FeedbackSubmission:
    """Persist a feedback submission. Requires at least one non-empty field."""
    has_any: bool = any(
        [
            (payload.role or "").strip(),
            (payload.workflow or "").strip(),
            (payload.time_sink or "").strip(),
            (payload.pain_point or "").strip(),
            (payload.favorite_feature or "").strip(),
            (payload.workflow_change or "").strip(),
            (payload.email or "").strip(),
        ]
    )
    if not has_any:
        raise HTTPException(
            status_code=400,
            detail="Please share at least one answer or your email.",
        )

    record: FeedbackSubmission = FeedbackSubmission(**payload.model_dump())
    doc: Dict[str, Any] = record.model_dump()
    await db.feedback_submissions.insert_one(doc)
    logger.info("feedback received id=%s", record.id)
    return record


@api_router.get("/feedback", response_model=List[FeedbackSubmission])
async def list_feedback(
    limit: int = Query(default=100, ge=1, le=1000),
) -> List[FeedbackSubmission]:
    cursor = (
        db.feedback_submissions.find({}, {"_id": 0})
        .sort("created_at", -1)
        .limit(limit)
    )
    items: List[Dict[str, Any]] = await cursor.to_list(length=limit)
    return [FeedbackSubmission(**_serialize_doc(d)) for d in items]


@api_router.post("/waitlist", response_model=WaitlistSignup)
async def join_waitlist(payload: WaitlistCreate) -> WaitlistSignup:
    """Join the waitlist. Idempotent: duplicate emails return the existing record."""
    email: str = payload.email.strip().lower()
    existing: Optional[Dict[str, Any]] = await db.waitlist_signups.find_one(
        {"email": email}
    )
    if existing:
        existing = _serialize_doc(existing)
        return WaitlistSignup(**existing)

    record: WaitlistSignup = WaitlistSignup(
        email=email, role=payload.role, source=payload.source
    )
    await db.waitlist_signups.insert_one(record.model_dump())
    logger.info("waitlist signup id=%s email=%s", record.id, email)
    return record


@api_router.get("/waitlist", response_model=List[WaitlistSignup])
async def list_waitlist(
    limit: int = Query(default=100, ge=1, le=1000),
) -> List[WaitlistSignup]:
    cursor = (
        db.waitlist_signups.find({}, {"_id": 0})
        .sort("created_at", -1)
        .limit(limit)
    )
    items: List[Dict[str, Any]] = await cursor.to_list(length=limit)
    return [WaitlistSignup(**_serialize_doc(d)) for d in items]


@api_router.get("/stats", response_model=Stats)
async def stats() -> Stats:
    feedback_count: int = await db.feedback_submissions.count_documents({})
    waitlist_count: int = await db.waitlist_signups.count_documents({})
    return Stats(feedback_count=feedback_count, waitlist_count=waitlist_count)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
