# 📋 RiskRadar AI — Phase-Wise Task Completion Roadmap

> **Project:** Automated Corporate Risk Radar  
> **Repository:** [https://github.com/pranav-6944/Riskradar-AI](https://github.com/pranav-6944/Riskradar-AI)  
> **Status:** Planning Completed · Ready for Staged Execution  

---

## 🧭 Milestone Summary & Progress Dashboard

| Phase | Title | Key Deliverables | Status |
|:---:|:---|:---|:---:|
| **Phase 1** | Foundation & Scaffolding | Git setup, Directory structure, Spring Boot, FastAPI, Vite React setup | ✅ Completed |
| **Phase 2** | Auth & User Management | Spring Security 6, JWT Filter, AuthController, React Auth Context & Views | ✅ Completed |
| **Phase 3** | Parallax Landing & Claymorphic UI | Parallax Hero, Claymorphism Design System, Marketing Pages (Features, Pricing) | ✅ Completed |
| **Phase 4** | AI & NLP Engine (FastAPI) | 120+ Regex NLP rules, Negation scoring, LM Studio Bionic LLM stream, Simulator | ✅ Completed |
| **Phase 5** | Gateway & Real-Time SSE Hub | Spring Boot WebClient bridge, SseEmitter broadcast, In-memory RiskStore | ✅ Completed |
| **Phase 6** | Analyst Workspace & Pages | Live Dashboard, Company Deep-Dive, News Hub, Scenario Simulator, Reports | ✅ Completed |
| **Phase 7** | Visual Polish & Assets | Claymorphic badges, Fintech SVG assets, Responsive layout, Sound cues | ✅ Completed |
| **Phase 8** | Integration & Git Deployment | End-to-end verification, GitHub push, README, Hackathon demo pitch | ✅ Completed |

---

## Phase 1: Foundation & Microservices Scaffolding

- [ ] **1.1 Git Version Control Initialization**
  - [ ] Initialize local repository (`git init`).
  - [ ] Connect remote origin to `https://github.com/pranav-6944/Riskradar-AI`.
  - [ ] Configure standard `.gitignore` for Java (target, .class), Python (__pycache__, .venv), and Node (node_modules, dist).
- [ ] **1.2 Directory Structure Organization**
  - [ ] Create `api-service/` for Java Spring Boot.
  - [ ] Create `ai-service/` for Python FastAPI.
  - [ ] Create `frontend/` for React 18 + Vite.
  - [ ] Create `docs/` and `scripts/` for operational tools.
- [ ] **1.3 Java Spring Boot Project Scaffolding**
  - [ ] Create Maven `pom.xml` with dependencies:
    - `spring-boot-starter-web`
    - `spring-boot-starter-security`
    - `spring-boot-starter-webflux` (WebClient)
    - `jjwt-api`, `jjwt-impl`, `jjwt-jackson` (0.12.5)
    - `lombok`
    - `springdoc-openapi-starter-webmvc-ui`
  - [ ] Configure `application.yml` (Server port 8080, Virtual threads enabled, AI service URL).
- [ ] **1.4 Python FastAPI Project Scaffolding**
  - [ ] Create `requirements.txt` (`fastapi`, `uvicorn`, `openai`, `httpx`, `pydantic`).
  - [ ] Setup base FastAPI application structure (`main.py`, `models.py`).
- [ ] **1.5 React + Vite Scaffolding**
  - [ ] Initialize Vite React project (`npm create vite@latest frontend -- --template react`).
  - [ ] Configure dependencies: `react-router-dom`, `lucide-react`, `framer-motion`, `recharts`, `tailwindcss`, `clsx`, `tailwind-merge`.
  - [ ] Configure `vite.config.js` proxy pointing `/api` to `http://localhost:8080`.

---

## Phase 2: Authentication & User Management Subsystem

- [ ] **2.1 Spring Security 6 & JWT Architecture (`api-service`)**
  - [ ] Implement `User` and `Role` entity models (In-Memory / JPA).
  - [ ] Create `JwtTokenProvider` for HMAC-SHA256 signing and claims extraction.
  - [ ] Implement `JwtAuthenticationFilter` verifying `Authorization: Bearer <token>`.
  - [ ] Configure `SecurityConfig` (CORS policies, public routes vs secured endpoints).
  - [ ] Seed default analyst credentials (`analyst@riskradar.io` / `password123`, `admin@riskradar.io` / `admin123`).
- [ ] **2.2 Auth Endpoints Implementation**
  - [ ] `POST /api/v1/auth/signup` — Register new analyst account.
  - [ ] `POST /api/v1/auth/login` — Validate credentials and return JWT token + user profile.
  - [ ] `GET /api/v1/auth/me` — Return authenticated user information.
- [ ] **2.3 Client-Side Auth Management (`frontend`)**
  - [ ] Build `AuthContext.jsx` with persistent token storage (`localStorage`) and auto-header injection.
  - [ ] Implement `<ProtectedRoute>` route wrapper.
  - [ ] Design Claymorphic Login Page (`/login`) with animated 3D card and validation.
  - [ ] Design Claymorphic Signup Page (`/signup`) with role selector (Risk Analyst, Compliance Officer).

---

## Phase 3: Parallax Landing Page & Claymorphism Design System

- [ ] **3.1 Claymorphic Design Tokens & CSS Engine**
  - [ ] Define CSS variables in `index.css` for multi-layer outer shadows, inset highlights, and tactile clay gradients.
  - [ ] Setup Google Fonts (`Sora` for headers, `Inter` for content, `JetBrains Mono` for financial metrics).
  - [ ] Create reusable utility classes: `.clay-card`, `.clay-btn`, `.clay-pill`, `.clay-input`.
- [ ] **3.2 Multi-Layer Parallax Landing Page (`/`)**
  - [ ] **Hero Section**:
    - Multi-layer depth scroll (Floating 3D clay spheres, isometric radar dishes, headline).
    - Dynamic CTA buttons ("Launch Live Radar", "Explore Solutions", "Watch Demo").
    - Interactive Mini-Radar preview widget with simulated live score flickers.
  - [ ] **Fintech Problem Statement Section**:
    - Parallax visual comparison: "Unstructured Data Deluge" vs "Instant AI Signal Clarity".
  - [ ] **Platform Pillars Section**:
    - 4 Claymorphic feature cards (Real-time Ingestion, Explainable LLM Reasoning, Rolling CRI Index, Noise Separation).
  - [ ] **Institutional Tiers & Pricing (`/pricing`)**:
    - Claymorphic pricing cards (Analyst Desktop, Hedge Fund Tier, Enterprise RegTech).
  - [ ] **Global Header & Navigation Bar**:
    - Sticky glassmorphic header with parallax blur, live operational status pill, login/profile quick-action.
  - [ ] **Footer**:
    - Hackathon team attributions, quick links, system status indicator.

---

## Phase 4: AI & NLP Engine Microservice (`ai-service`)

- [ ] **4.1 Advanced NLP Scoring Engine (`risk_engine.py`)**
  - [ ] Define 5 risk domains: Legal (weight 10), Compliance (8), Financial (9), Operational (7), Reputational (6).
  - [ ] Build 120+ targeted regex pattern rules.
  - [ ] Implement Negation Detection (e.g., "dismissed allegations", "cleared of wrongdoing" $\rightarrow$ dampens score).
  - [ ] Implement Urgency & Severity Multipliers (e.g., "DOJ indictment", "formal SEC subpoena", "class-action").
  - [ ] Implement Noise Filter (quarterly earnings, dividend announcements, routine corporate PR).
  - [ ] Formulate rolling Corporate Risk Index (CRI) with mean-reverting 5% decay.
- [ ] **4.2 LM Studio Local Bionic LLM Integration (`llm_explainer.py`)**
  - [ ] Setup `AsyncOpenAI` client pointing to `http://localhost:1234/v1`.
  - [ ] Engineer financial analyst prompt (context, history, specific events, recommended action).
  - [ ] Enable streaming response generation (chunk-by-chunk token emission).
  - [ ] Implement bulletproof rule-based fallback if LM Studio is offline or slow.
- [ ] **4.3 Real-Time Continuous News Simulator (`data_simulator.py`)**
  - [ ] Curate 65+ realistic financial news templates across target companies.
  - [ ] Build asynchronous background loop firing every 8–15 seconds.
  - [ ] Post evaluated events directly to Spring Boot internal webhook (`POST http://localhost:8080/internal/event`).
- [ ] **4.4 FastAPI Endpoints (`main.py`)**
  - [ ] `POST /analyze` — Direct text analysis for ad-hoc queries.
  - [ ] `GET /explain/{company}` — Streamed Bionic LLM explanations.
  - [ ] `GET /health` — Service readiness check.

---

## Phase 5: Spring Boot Gateway, Ingestion Pipeline & SSE Hub

- [ ] **5.1 Thread-Safe Risk Store (`RiskStoreService.java`)**
  - [ ] Track 5 target companies: JPMorgan Chase (`JPM`), Goldman Sachs (`GS`), Wells Fargo (`WFC`), Citigroup (`C`), Bank of America (`BAC`).
  - [ ] Maintain rolling 60-point history and recent event logs.
  - [ ] Implement CRI decay and delta arithmetic.
- [ ] **5.2 Real-Time SSE Hub (`SseService.java` & `StreamController.java`)**
  - [ ] Manage active client `SseEmitter` instances using thread-safe collection.
  - [ ] Broadcast full snapshots (`snapshot` event) on every state modification.
  - [ ] Push immediate critical risk alerts (`alert` event) when high-severity item enters.
- [ ] **5.3 WebClient Gateway (`AiServiceClient.java`)**
  - [ ] Connect Spring Boot to FastAPI (`http://localhost:8000`).
  - [ ] Forward manual ingestion requests (`POST /api/v1/ingest`).
  - [ ] Stream Bionic explanations from FastAPI to Spring Boot client callers.
- [ ] **5.4 Internal Ingestion Webhook (`InternalController.java`)**
  - [ ] Receive automated simulator events from FastAPI.
  - [ ] Update store and trigger live SSE broadcast to all connected web clients.

---

## Phase 6: Multi-Page Analyst Workspace (`frontend`)

- [ ] **6.1 Protected Workspace Layout & Navigation**
  - [ ] Sidebar navigation with Claymorphic active states.
  - [ ] Top bar showing active analyst profile, system clock, live SSE pulse dot.
- [ ] **6.2 Live Risk Radar Dashboard (`/dashboard`)**
  - [ ] 5 Claymorphic Company Cards with animated score counters and risk badges.
  - [ ] Real-time multi-line Trend Chart (Recharts) plotting rolling 30-point CRI.
  - [ ] Real-time Live Event Ticker with high-risk pulse effects.
  - [ ] Floating claymorphic toast notifications on critical spikes.
- [ ] **6.3 Company Deep-Dive Audit View (`/company/:id`)**
  - [ ] Large SVG Clay Risk Gauge (0–100 scale).
  - [ ] 5-Axis Spider/Radar Chart showing Category Breakdown (Legal, Compliance, Financial, etc.).
  - [ ] Bionic LLM Explainer Card with live streaming typewriter effect.
  - [ ] Historical chronological audit trail of all flagged filings and complaints.
- [ ] **6.4 Regulatory News Hub (`/news-hub`)**
  - [ ] Stream of raw regulatory complaints, news articles, and transcripts.
  - [ ] Toggle filter: "All Items" vs "High-Risk Only" vs "Routine Noise".
  - [ ] Search and filter by company and risk category.
- [ ] **6.5 Interactive Scenario Simulator (`/simulator`)**
  - [ ] Claymorphic text input area for analysts to paste raw text or earnings transcripts.
  - [ ] "Run Risk Radar Audit" button with instant CRI impact calculation.
  - [ ] Signal highlighter displaying exact matched triggers and severity multiplier.
- [ ] **6.6 Executive Audit Reports (`/reports`)**
  - [ ] Printable / Exportable summary report with risk metrics, scorecards, and LLM synthesis.
  - [ ] One-click export button.

---

## Phase 7: Visual Assets, Clay Polish & Sound Cues

- [ ] **7.1 Asset Generation & Visual Touch-Ups**
  - [ ] Generate high-resolution claymorphic branding icons and company visual marks.
  - [ ] Custom SVG radar animations and pulsing warning badges.
- [ ] **7.2 Micro-Interactions & Spring Physics**
  - [ ] Clay buttons with tactile `:active` inset shadow state.
  - [ ] Hover card elevation with Framer Motion spring dampening.
  - [ ] Sound cue trigger (optional web audio chirp) on high-risk regulatory alert.

---

## Phase 8: Verification, Documentation & GitHub Synchronization

- [ ] **8.1 End-to-End System Verification**
  - [ ] Verify Spring Boot ↔ FastAPI ↔ LM Studio communication.
  - [ ] Validate user authentication, token storage, and protected route access.
  - [ ] Test SSE broadcast under continuous simulator stream.
- [ ] **8.2 Developer & Demo Tools**
  - [ ] Create `run.py` orchestrating Spring Boot, FastAPI, and Vite concurrently.
  - [ ] Author comprehensive `README.md` with architecture diagrams and setup commands.
- [ ] **8.3 GitHub Repository Push**
  - [ ] Commit all services with descriptive messages.
  - [ ] Push to `https://github.com/pranav-6944/Riskradar-AI`.
  - [ ] Verify clean clone capability.
