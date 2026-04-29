{
  "project": {
    "name": "PREDA",
    "type": "landing_page",
    "brand_attributes": [
      "cinematic",
      "tactical",
      "premium",
      "trustworthy",
      "data-rich",
      "fast",
      "early-access (but polished)"
    ],
    "one_sentence_pitch": "PREDA turns match video into clear, affordable performance insights—without the Opta/StatsBomb price tag.",
    "tone_of_voice": {
      "do": [
        "plain English",
        "football-native phrasing (pressing, sprints, xThreat-style language without math)",
        "benefit-first (time saved, cost saved, clarity)",
        "confident but honest about early access"
      ],
      "avoid": [
        "model names",
        "computer vision jargon",
        "overpromising real-time if not shipped"
      ]
    }
  },

  "visual_personality": {
    "style_fusion": [
      "Stadium-night cinematic lighting",
      "Tactical chalkboard grid overlays",
      "Broadcast HUD analytics panels",
      "Subtle glassmorphism for cards (frosted, not glossy)",
      "3D holographic pitch hero (R3F)"
    ],
    "composition_principles": {
      "layout": "Bento + editorial sections (left-aligned copy, right-aligned visuals). Avoid centered paragraphs.",
      "density": "High whitespace, but data modules feel compact like a broadcast overlay.",
      "contrast": "Dark base with crisp light text; neon accents used sparingly for focus states and key metrics."
    },
    "texture": {
      "grain": "Add subtle noise overlay (2–4% opacity) on hero + section dividers only.",
      "grid": "Use faint tactical grid lines (1px) in backgrounds of hero/preview only."
    }
  },

  "design_tokens": {
    "fonts": {
      "display": {
        "name": "Space Grotesk",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "H1/H2, section titles, hero headline"
      },
      "body": {
        "name": "Inter",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "paragraphs, UI labels"
      },
      "mono": {
        "name": "IBM Plex Mono",
        "fallback": "ui-monospace, SFMono-Regular",
        "usage": "stats, counters, timeline timestamps"
      },
      "google_fonts_import": "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');"
    },

    "typography_scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
      "h2": "text-base md:text-lg font-medium text-muted-foreground",
      "section_title": "text-2xl sm:text-3xl font-semibold tracking-tight",
      "kicker": "text-xs uppercase tracking-[0.18em] text-muted-foreground",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs text-muted-foreground",
      "stat_number": "font-mono text-2xl sm:text-3xl font-semibold tabular-nums",
      "stat_label": "text-xs uppercase tracking-[0.14em] text-muted-foreground"
    },

    "color_system": {
      "notes": [
        "No purple for AI/football UI accents.",
        "Neon accents must be used like a highlighter: 5–10% of UI.",
        "Cards remain readable: solid dark surfaces, not gradients."
      ],
      "palette_hex": {
        "bg": "#070A0E",
        "bg_2": "#0B1220",
        "surface": "#0E172A",
        "surface_2": "#0B1324",
        "border": "rgba(255,255,255,0.10)",
        "text": "#EAF0FF",
        "text_muted": "rgba(234,240,255,0.72)",
        "text_dim": "rgba(234,240,255,0.55)",

        "primary": "#7CFF6B",
        "primary_2": "#2EE59D",
        "accent": "#4CC9FF",
        "warning": "#FFB020",
        "danger": "#FF4D4D",

        "pitch_line": "rgba(124,255,107,0.22)",
        "hud_glow": "rgba(76,201,255,0.22)"
      },
      "shadcn_hsl_tokens": {
        "background": "222 55% 4%",
        "foreground": "220 60% 96%",
        "card": "222 45% 10%",
        "card-foreground": "220 60% 96%",
        "popover": "222 45% 10%",
        "popover-foreground": "220 60% 96%",
        "primary": "118 100% 71%",
        "primary-foreground": "222 55% 6%",
        "secondary": "222 35% 16%",
        "secondary-foreground": "220 60% 96%",
        "muted": "222 30% 14%",
        "muted-foreground": "220 20% 70%",
        "accent": "198 100% 65%",
        "accent-foreground": "222 55% 6%",
        "destructive": "0 100% 65%",
        "destructive-foreground": "222 55% 6%",
        "border": "220 25% 18%",
        "input": "220 25% 18%",
        "ring": "118 100% 71%",
        "radius": "0.9rem"
      },
      "allowed_gradients": {
        "rule": "Gradients only as section backgrounds / decorative overlays; never on text-heavy cards; never exceed 20% viewport.",
        "hero_bg": "radial-gradient(900px circle at 20% 10%, rgba(124,255,107,0.14), transparent 55%), radial-gradient(900px circle at 80% 20%, rgba(76,201,255,0.12), transparent 55%)",
        "cta_band": "linear-gradient(90deg, rgba(124,255,107,0.14), rgba(76,201,255,0.10))"
      }
    },

    "spacing": {
      "section_padding": "py-16 sm:py-20 lg:py-28",
      "container": "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
      "stack": {
        "tight": "space-y-2",
        "normal": "space-y-4",
        "loose": "space-y-8"
      }
    },

    "radius_shadow": {
      "radius": {
        "card": "rounded-2xl",
        "button": "rounded-xl",
        "pill": "rounded-full"
      },
      "shadow": {
        "card": "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
        "glow_green": "shadow-[0_0_0_1px_rgba(124,255,107,0.18),0_18px_60px_rgba(124,255,107,0.10)]",
        "glow_blue": "shadow-[0_0_0_1px_rgba(76,201,255,0.18),0_18px_60px_rgba(76,201,255,0.10)]"
      },
      "borders": {
        "hairline": "border border-white/10",
        "hud": "border border-white/10 ring-1 ring-white/5"
      }
    }
  },

  "global_css_instructions": {
    "files_to_edit": [
      "/app/frontend/src/index.css",
      "/app/frontend/src/App.css"
    ],
    "index_css_patch": {
      "intent": "Replace default light tokens with PREDA dark stadium tokens; set fonts; add noise + selection; add utility classes for HUD.",
      "additions": [
        "Import Google Fonts at top.",
        "Update :root and .dark tokens to match shadcn_hsl_tokens above (use .dark as default by adding class on html/body in React).",
        "Add ::selection background rgba(124,255,107,0.25).",
        "Add .noise-overlay class using repeating-radial-gradient or base64 noise (opacity 0.035).",
        "Add .tactical-grid class: background-image with linear-gradients (white/6%)."
      ]
    },
    "app_css_patch": {
      "intent": "Remove CRA demo styles; keep App.css minimal or delete usage.",
      "notes": [
        "Do NOT add .App { text-align:center }.",
        "Prefer Tailwind for layout; App.css only for keyframes/noise helpers if needed."
      ]
    }
  },

  "component_library": {
    "primary": "shadcn/ui (already in /src/components/ui)",
    "component_path": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "accordion": "/app/frontend/src/components/ui/accordion.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "table": "/app/frontend/src/components/ui/table.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "textarea": "/app/frontend/src/components/ui/textarea.jsx",
      "form": "/app/frontend/src/components/ui/form.jsx",
      "progress": "/app/frontend/src/components/ui/progress.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "navigation_menu": "/app/frontend/src/components/ui/navigation-menu.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx"
    },
    "recommended_extras": {
      "framer_motion": "Use for section entrance, counters, hover micro-interactions.",
      "react_three_fiber": "Hero 3D pitch/ball scene.",
      "drei": "Use Float, Sparkles, Text, OrbitControls (disabled on mobile), Environment.",
      "recharts": "Optional for comparison chart + mini preview charts (area/line)."
    }
  },

  "interaction_and_motion": {
    "principles": [
      "Everything interactive gets a state change (hover/focus/pressed).",
      "Motion should feel like broadcast graphics: quick, precise, not bouncy.",
      "Respect prefers-reduced-motion: disable parallax, reduce 3D animation speed, remove auto-ticking timeline."
    ],
    "durations": {
      "fast": 0.12,
      "normal": 0.2,
      "slow": 0.35
    },
    "easings": {
      "standard": "[0.22, 1, 0.36, 1]",
      "snappy": "[0.2, 0.9, 0.2, 1]"
    },
    "micro_interactions": {
      "buttons": "hover: brightness-110 + subtle glow ring; active: scale-95; focus-visible: ring-2 ring-[hsl(var(--ring))]",
      "cards": "hover: translate-y-[-2px] + border-white/20; show faint HUD corner ticks",
      "nav_links": "hover underline becomes a 2px neon segment; active section shows a small dot indicator",
      "accordion": "chevron rotates 180; content fades+slides 6px"
    },
    "scroll": {
      "section_reveal": "Use framer-motion whileInView with y: 14 -> 0 and opacity 0 -> 1; once: true; viewport amount 0.25",
      "parallax": "Hero background grid shifts 8–14px on scroll (disabled on reduced motion)"
    }
  },

  "3d_direction": {
    "goal": "Awwwards-tier hero: holographic pitch in the dark with tracked player dots + ball trail; feels like live tracking.",
    "scene_concept": {
      "option_a": "Holographic pitch plane with glowing lines + 22 player dots moving in formations + ball trail spline.",
      "option_b": "Floating soccer ball with orbiting data nodes + subtle pitch grid beneath (fallback for mobile)."
    },
    "performance_budget": {
      "target_fps": "50–60 desktop, 30+ mobile",
      "polycount": "Keep geometry simple; rely on emissive materials + postprocessing-lite (avoid heavy bloom).",
      "fallback": "On small screens: replace Canvas with static hero image + animated HUD overlay (CSS)."
    },
    "r3f_scaffold_js": {
      "files": [
        "src/components/HeroScene.jsx",
        "src/components/Pitch.jsx",
        "src/components/PlayerDots.jsx",
        "src/components/BallTrail.jsx"
      ],
      "notes": [
        "Use <Canvas dpr={[1, 1.5]}> and frameloop='always' desktop; consider 'demand' for reduced motion.",
        "Use drei <Float> for subtle drift; <Sparkles> for data particles (count 40–80).",
        "Disable OrbitControls on mobile; keep camera fixed with slight animated sway.",
        "Use additive blending for dots/trails; clamp opacity for readability."
      ]
    }
  },

  "section_blueprint": {
    "navbar": {
      "layout": "Sticky top, translucent HUD bar with blur; left PREDA wordmark, center anchors, right CTA.",
      "components": ["navigation-menu", "button", "sheet"],
      "classes": {
        "wrapper": "sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/20",
        "inner": "mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6",
        "brand": "font-[Space_Grotesk] text-sm tracking-wide",
        "cta": "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-110"
      },
      "data_testids": {
        "nav": "navbar",
        "waitlist_button": "navbar-waitlist-button",
        "mobile_menu_button": "navbar-mobile-menu-button"
      }
    },

    "hero": {
      "layout": "Two-column on lg: left copy + CTAs; right 3D Canvas in a framed HUD card. On mobile: copy then Canvas.",
      "copy": {
        "kicker": "Early access · AI match analyzer",
        "headline": "Turn match video into clear performance insights.",
        "subhead": "Player tracking, events, and reports—built for clubs and analysts who need speed and affordability.",
        "cta_primary": "Join the waitlist",
        "cta_secondary": "See interactive preview"
      },
      "components": ["button", "badge", "card", "separator"],
      "visuals": {
        "background": "Use allowed_gradients.hero_bg + tactical-grid + noise overlay.",
        "hud_frame": "Rounded-2xl card with corner ticks and subtle inner border.",
        "trust_row": "3 small items: 'Affordable', 'Fast setup', 'Built for analysts'"
      },
      "data_testids": {
        "primary_cta": "hero-primary-cta-button",
        "secondary_cta": "hero-secondary-cta-button"
      }
    },

    "problem": {
      "layout": "Editorial: left narrative, right 3 stat chips (time, cost, effort).",
      "copy": {
        "title": "Manual analysis is slow. Premium data is expensive.",
        "bullets": [
          "Hours spent tagging events by hand",
          "Hard to compare players across matches",
          "Top-tier data tools priced out of reach"
        ]
      },
      "components": ["card", "badge"],
      "data_testids": {
        "section": "problem-section"
      }
    },

    "how_it_works": {
      "layout": "5-step pipeline as a horizontal timeline on desktop; stacked steps on mobile.",
      "steps": [
        "Video",
        "Vision",
        "Events",
        "Analytics",
        "Report"
      ],
      "components": ["card", "separator", "badge"],
      "interaction": "Hover a step: highlight connector line + show 2-line description.",
      "data_testids": {
        "section": "how-it-works-section"
      }
    },

    "interactive_preview": {
      "goal": "Simulated dashboard that feels live: counters animate, timeline ticks, heatmap pulses.",
      "layout": "Full-width HUD panel with tabs: Overview / Events / Players.",
      "components": ["tabs", "card", "progress", "table", "badge", "tooltip"],
      "modules": {
        "score_strip": "Team A vs Team B with possession bar",
        "stat_counters": ["Distance", "Sprints", "Top speed"],
        "event_ticker": "Auto-advancing list (goal, shot, duel, turnover) with timestamps",
        "mini_heatmap": "CSS grid heatmap (no heavy canvas) with animated opacity",
        "comparison": "Two-column player comparison cards"
      },
      "motion": "Counters count up on in-view; ticker advances every 2.5s (pause on hover).",
      "data_testids": {
        "section": "interactive-preview-section",
        "tabs": "interactive-preview-tabs",
        "ticker": "interactive-preview-event-ticker"
      }
    },

    "agents_showcase": {
      "layout": "6 premium cards in 3x2 grid desktop, 2x3 tablet, 1x6 mobile.",
      "agents": [
        {
          "name": "Vision Agent",
          "desc": "Finds players and the ball in every frame."
        },
        {
          "name": "Ball Interpolation Agent",
          "desc": "Fills in missing ball moments so the story stays complete."
        },
        {
          "name": "Team Classifier",
          "desc": "Separates teams reliably—even with similar kits."
        },
        {
          "name": "Events Agent",
          "desc": "Detects key moments like shots, passes, duels, and turnovers."
        },
        {
          "name": "Analytics Agent",
          "desc": "Turns events into insights you can act on."
        },
        {
          "name": "Reporting Agent",
          "desc": "Builds a clean report you can share with staff."
        }
      ],
      "card_style": "Glass HUD: bg-white/5, border-white/10, inner highlight, hover glow.",
      "data_testids": {
        "section": "agents-section"
      }
    },

    "features_grid": {
      "layout": "Bento grid: 2 large feature cards + 4 small cards.",
      "features": [
        "Automated match reports",
        "Natural-language Q&A (coming soon)",
        "Telegram bot interface",
        "Physical stats",
        "Event detection",
        "Affordable pricing"
      ],
      "components": ["card", "badge", "button"],
      "data_testids": {
        "section": "features-section"
      }
    },

    "comparison": {
      "layout": "Story-first chart + bullets. Left: chart; right: narrative.",
      "chart": "Use Recharts BarChart: Cost, Setup time, Accessibility (normalized).",
      "components": ["card", "badge"],
      "data_testids": {
        "section": "comparison-section"
      }
    },

    "roadmap": {
      "layout": "Timeline cards with 'Now' and 'V2' columns.",
      "items": [
        "Real-time mode",
        "Meters conversion",
        "Local LLM option",
        "More events",
        "Full web dashboard"
      ],
      "components": ["card", "badge", "separator"],
      "data_testids": {
        "section": "roadmap-section"
      }
    },

    "faq": {
      "layout": "Accordion with 8+ items; left intro, right accordion.",
      "components": ["accordion"],
      "faq_items": [
        {
          "q": "Is PREDA live today?",
          "a": "Not yet—PREDA is in early access. Join the waitlist to get updates and a first look at demos."
        },
        {
          "q": "What do I need to use it?",
          "a": "Just match video. We’re designing PREDA to work with common camera angles and typical club footage."
        },
        {
          "q": "Does it replace Opta/StatsBomb?",
          "a": "PREDA is built for teams and analysts who need strong insights without enterprise pricing."
        },
        {
          "q": "How accurate is tracking?",
          "a": "We’re improving it continuously. You’ll see sample outputs and what’s coming next in the preview."
        },
        {
          "q": "Can I export reports?",
          "a": "Yes—reports are a core feature. Exports will include shareable summaries and key clips (planned)."
        },
        {
          "q": "Will it work for academies and youth matches?",
          "a": "That’s a priority. We’re optimizing for real-world footage quality, not perfect broadcast feeds."
        },
        {
          "q": "Can staff collaborate?",
          "a": "Collaboration is on the roadmap: shared dashboards, comments, and easy sharing."
        },
        {
          "q": "How do I give feedback?",
          "a": "Use the feedback survey below—tell us your workflow and pain points so we build the right features."
        }
      ],
      "data_testids": {
        "section": "faq-section",
        "accordion": "faq-accordion"
      }
    },

    "feedback_survey": {
      "positioning": "Treat as 'Analyst feedback' module, not a chatbot bubble. Looks like a premium multi-step interview.",
      "layout": "Card with stepper (1/6) + optional skip; on mobile: stacked.",
      "components": ["card", "form", "input", "textarea", "button", "progress"],
      "questions": [
        "What is your current role in soccer analytics?",
        "Describe your current workflow?",
        "What takes you time the most in your work?",
        "How would you describe your principal pain point?",
        "What feature got your interest the most in PREDA?",
        "How would PREDA change your current workflow?"
      ],
      "interaction": {
        "stepper": "Progress bar + small mono counter (02/06).",
        "buttons": "Back, Next, Skip (ghost), Submit",
        "validation": "Soft validation: only email required for submit if you want; otherwise allow anonymous feedback."
      },
      "data_testids": {
        "section": "feedback-survey-section",
        "next": "feedback-survey-next-button",
        "back": "feedback-survey-back-button",
        "skip": "feedback-survey-skip-button",
        "submit": "feedback-survey-submit-button"
      }
    },

    "waitlist_cta": {
      "layout": "CTA band with mild gradient + noise; left copy, right email form.",
      "components": ["card", "input", "button"],
      "copy": {
        "title": "Get early access updates",
        "sub": "Be first to try demos and shape what PREDA ships next."
      },
      "data_testids": {
        "section": "waitlist-section",
        "email": "waitlist-email-input",
        "submit": "waitlist-submit-button"
      }
    },

    "footer": {
      "layout": "3-column: brand, links, contact; bottom legal line.",
      "components": ["separator"],
      "data_testids": {
        "footer": "footer"
      }
    }
  },

  "ui_patterns": {
    "buttons": {
      "variants": {
        "primary": "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
        "secondary": "bg-white/8 text-white hover:bg-white/12 border border-white/10",
        "ghost": "bg-transparent text-white/80 hover:text-white hover:bg-white/5"
      },
      "sizes": {
        "md": "h-11 px-5 text-sm",
        "lg": "h-12 px-6 text-sm"
      },
      "motion": "transition-[background-color,box-shadow,filter,opacity] duration-200"
    },
    "inputs": {
      "style": "bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
      "helper": "Use mono for small helper labels when showing example formats."
    },
    "badges": {
      "style": "bg-white/6 text-white/80 border border-white/10"
    }
  },

  "image_urls": {
    "hero_fallback": [
      {
        "url": "https://images.pexels.com/photos/35898730/pexels-photo-35898730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Fallback hero background on mobile when 3D is disabled; crop to wide; add dark overlay + tactical grid.",
        "category": "hero"
      }
    ],
    "section_backgrounds": [
      {
        "url": "https://images.unsplash.com/photo-1614188973043-4ed7d383de37?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "description": "Abstract data particles background for comparison/roadmap section (use as subtle blurred overlay at 6–10% opacity).",
        "category": "decorative"
      }
    ],
    "optional_stadium": [
      {
        "url": "https://images.pexels.com/photos/3991976/pexels-photo-3991976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Optional background for problem section divider or footer top strip; keep very dark with overlay.",
        "category": "decorative"
      }
    ]
  },

  "accessibility_and_perf": {
    "a11y": [
      "All text must meet WCAG AA contrast on dark surfaces (avoid neon text for paragraphs).",
      "Use focus-visible rings on all interactive elements.",
      "Accordion triggers must be keyboard accessible (shadcn already).",
      "Provide aria-labels for icon-only buttons.",
      "Respect prefers-reduced-motion: disable auto-ticker, reduce 3D animation, remove parallax."
    ],
    "perf": [
      "Lazy-load 3D Canvas with React.lazy + Suspense; show skeleton HUD placeholder.",
      "Use image loading='lazy' for non-hero images.",
      "Avoid heavy postprocessing; prefer emissive materials + subtle CSS glows.",
      "Throttle scroll listeners; prefer framer-motion useScroll where possible."
    ]
  },

  "instructions_to_main_agent": [
    "Set dark mode as default by applying className='dark' on <html> or top-level wrapper.",
    "Replace /src/index.css tokens with the provided shadcn_hsl_tokens and set font-family to Space Grotesk/Inter/IBM Plex Mono.",
    "Build single-page anchored sections in this order: Navbar, Hero, Problem, How It Works, Interactive Preview, Agents, Features, Comparison, Roadmap, FAQ, Feedback Survey, Waitlist CTA, Footer.",
    "Implement 3D hero with R3F + drei; add mobile fallback image when prefers-reduced-motion or small screens.",
    "Interactive Preview is simulated frontend-only: animated counters, ticking timeline, CSS heatmap.",
    "Feedback Survey is NOT a chatbot widget; implement as multi-step form with progress and optional skip.",
    "Every interactive element and key info must include data-testid in kebab-case.",
    "Use shadcn components from /src/components/ui; do not use raw HTML dropdowns/toasts/etc.",
    "Do not use transition: all; only transition specific properties."
  ],

  "general_ui_ux_design_guidelines_appendix": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
