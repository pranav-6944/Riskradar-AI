# 🛡️ RiskRadar AI — Automated Corporate Risk Radar
### Autonomous RegTech Surveillance & Rolling Corporate Risk Intelligence

> **DY Patil College Hackathon — Fintech / RegTech Track**  
> **Live GitHub Repository:** [https://github.com/pranav-6944/Riskradar-AI](https://github.com/pranav-6944/Riskradar-AI)  
> **Lead Architect & Developer:** [Pranav Lamkhade](https://github.com/pranav-6944) (B.Tech Computer Engineering & Data Science, MITAOE SPPU)

---

## ⚡ Interactive Tech Stack Badges

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,tailwind,java,spring,python,fastapi,git,github" alt="RiskRadar Tech Stack" />
  </a>
</p>

<p align="center">
  <!-- Frontend Badges -->
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" /></a>
  <a href="https://vite.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://recharts.org/" target="_blank"><img src="https://img.shields.io/badge/Recharts-22C55E?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Recharts" /></a>
  <!-- Backend Badges -->
  <a href="https://www.oracle.com/java/" target="_blank"><img src="https://img.shields.io/badge/Java_21_LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21" /></a>
  <a href="https://spring.io/projects/spring-boot" target="_blank"><img src="https://img.shields.io/badge/Spring_Boot_3.2-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Boot" /></a>
  <a href="https://jwt.io/" target="_blank"><img src="https://img.shields.io/badge/Spring_Security_6_&_JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" /></a>
  <a href="https://www.h2database.com/" target="_blank"><img src="https://img.shields.io/badge/H2_Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="H2 DB" /></a>
  <!-- AI & Python Badges -->
  <a href="https://www.python.org/" target="_blank"><img src="https://img.shields.io/badge/Python_3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" /></a>
  <a href="https://fastapi.tiangolo.com/" target="_blank"><img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" /></a>
  <a href="https://finnhub.io/" target="_blank"><img src="https://img.shields.io/badge/Finnhub_Stock_API-Live_Feed-00D09C?style=for-the-badge&logo=statuspage&logoColor=white" alt="Finnhub" /></a>
  <a href="https://lmstudio.ai/" target="_blank"><img src="https://img.shields.io/badge/LM_Studio_Local_LLM-4F46E5?style=for-the-badge&logo=openai&logoColor=white" alt="LM Studio" /></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" target="_blank"><img src="https://img.shields.io/badge/SSE_Realtime_Stream-0ea5e9?style=for-the-badge&logo=transmission&logoColor=white" alt="SSE" /></a>
</p>

---

## 📌 Executive Summary & Problem Statement

Financial analysts spend **4 to 6 hours daily** manually reading hundreds of public regulatory complaints, CFPB enforcement actions, civil litigation filings, earnings call transcripts, and corporate news items to spot institutions heading into trouble. 

Most of this stream is unstructured and noisy (routine earnings, dividend declarations, charity galas), and the few items signaling serious operational or compliance threats are easy to miss. By the time a pattern is detected, regulatory fines and reputation damage have already escalated.

**RiskRadar AI** solves this with an end-to-end autonomous surveillance platform that:
1. **Continuously ingests** unstructured news, complaints, and regulatory filings for multiple institutions.
2. **Flags critical legal, compliance, and operational threats** while separating out general PR noise using 120+ regex patterns and negation dampening.
3. **Computes a rolling Corporate Risk Index (CRI)** using physical mean-reversion decay.
4. **Streams explainable on-premise Bionic LLM reasoning** via local LM Studio (`http://localhost:1234/v1`) with zero data leakage.

---

## 🛠️ Complete Tech Stack Architecture Matrix

| Layer | Technology | Version | Purpose & Integration | Official Docs |
|:---|:---|:---|:---|:---:|
| **Frontend UI** | [React](https://react.dev/) | `19.2.8` | Component model, state orchestration, tactile Claymorphic UI | [![Docs](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/) |
| **Build Engine** | [Vite](https://vite.dev/) | `8.3.4` | Ultra-fast HMR and ESM bundling | [![Docs](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `3.4.17` | Utility layout engine, Dark/Light mode theme system | [![Docs](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) |
| **Data Viz** | [Recharts](https://recharts.org/) | `3.10.1` | Real-time polar radar charts, CRI trajectory area graphs | [![Docs](https://img.shields.io/badge/Recharts-22C55E?style=flat&logo=chartdotjs&logoColor=white)](https://recharts.org/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | `14.1.0` | Fluid micro-animations and page transitions | [![Docs](https://img.shields.io/badge/Framer-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) | `1.55.0` | Minimalist financial and telemetry SVG icons | [![Docs](https://img.shields.io/badge/Lucide-F56565?style=flat&logo=feather&logoColor=white)](https://lucide.dev/) |
| **Backend Gateway**| [Spring Boot](https://spring.io/projects/spring-boot) | `3.2.5` | High-throughput enterprise gateway, SSE broker, auth | [![Docs](https://img.shields.io/badge/Spring-6DB33F?style=flat&logo=spring&logoColor=white)](https://spring.io/) |
| **Language** | [Java JDK](https://www.oracle.com/java/) | `21 LTS` | Modern virtual threads, records, pattern matching | [![Docs](https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white)](https://docs.oracle.com/en/java/) |
| **Security** | [Spring Security](https://spring.io/projects/spring-security) | `6.2.4` | Stateless JWT authentication, role authorization, BCrypt | [![Docs](https://img.shields.io/badge/Security-000000?style=flat&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security) |
| **Token Auth** | [JJWT](https://github.com/jwtk/jjwt) | `0.12.5` | Cryptographically signed HMAC-SHA256 bearer tokens | [![Docs](https://img.shields.io/badge/JJWT-D63AFF?style=flat&logo=jsonwebtokens&logoColor=white)](https://github.com/jwtk/jjwt) |
| **Persistence** | [H2 Database](https://www.h2database.com/) | `2.2.224` | Embedded disk database (`./data/riskradar.mv.db`) + console | [![Docs](https://img.shields.io/badge/H2-003B57?style=flat&logo=sqlite&logoColor=white)](https://www.h2database.com/) |
| **AI Microservice**| [FastAPI](https://fastapi.tiangolo.com/) | `0.110+` | Asynchronous NLP pattern scoring & simulator service | [![Docs](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/) |
| **ASGI Server** | [Uvicorn](https://www.uvicorn.org/) | `0.29+` | Ultra-fast lightning ASGI production loop | [![Docs](https://img.shields.io/badge/Uvicorn-2C3E50?style=flat&logo=gunicorn&logoColor=white)](https://www.uvicorn.org/) |
| **Local LLM** | [LM Studio](https://lmstudio.ai/) | `v1 API` | Local on-premise Bionic LLM inference (`:1234/v1`) | [![Docs](https://img.shields.io/badge/LM_Studio-4F46E5?style=flat&logo=openai&logoColor=white)](https://lmstudio.ai/) |
| **Streaming** | [SSE](https://html.spec.whatwg.org/multipage/server-sent-events.html) | `W3C Spec` | Real-time continuous server push to dashboard clients | [![Docs](https://img.shields.io/badge/SSE-0ea5e9?style=flat&logo=rss&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) |
| **Live Market Wire**| [Finnhub Stock News](https://finnhub.io/) | `v1 REST API` | Live Wall Street news stream per ticker (`JPM`, `GS`, `WFC`, `C`, `BAC`) | [![Docs](https://img.shields.io/badge/Finnhub-00D09C?style=flat&logo=statuspage&logoColor=white)](https://finnhub.io/docs/api) |

---

## 🏛️ Microservices Architecture

```mermaid
graph TD
    A[Public Filings / Simulated Stream] -->|Continuous Stream| B(Python FastAPI :8000)
    B -->|120+ Regex NLP Classification| C{High-Risk vs Noise}
    C -->|Negation & Severity Dampening| D[NLP Risk Delta]
    D -->|HTTP Webhook POST /internal/event| E[Java Spring Boot 3.2 Gateway :8080]
    
    subgraph Java Spring Boot Backend
        E --> F[Concurrent RiskStore Service]
        F --> G[Rolling Mean-Reversion CRI Engine]
        G --> H[SseService Multi-Client Broker]
        I[Spring Security 6 + JWT Provider] --> J[AuthController /api/v1/auth]
        F --> K[(H2 Embedded Persistent Database)]
    end

    subgraph AI Synthesis Layer
        B -->|Async Client| L[Local Bionic LLM in LM Studio :1234]
        L -->|Token Streaming| B
    end

    H -->|Server-Sent Events SSE| M[React 19 Frontend :5173]
    J -->|Bearer JWT Storage| M

    subgraph React Analyst Cockpit
        M --> N[Multi-Layer Parallax Landing Page]
        M --> O[Live 5-Bank Surveillance Scoreboard]
        M --> P[Company Deep-Dive: Radar & Trajectory]
        M --> Q[What-If Scenario Stress Lab]
        M --> R[Regulatory News Hub & Noise Filter]
        M --> S[Printable Executive Audit Reports]
    end
```

---

## 📊 Quantitative Physics: Rolling Corporate Risk Index (CRI)

Corporate risk behaves as an oscillating physical system rather than a static metric. In RiskRadar AI, the CRI is updated per incoming signal using an exponential mean-reverting differential formulation:

$$\text{CRI}(t) = \text{CRI}(t-1) \cdot (1 - \lambda) + B \cdot \lambda + \Delta \text{Risk}$$

- $\lambda = 0.05$: Velocity of mean-reversion (5% decay toward baseline per period).
- $B = 25.0$: Historical corporate risk baseline.
- $\Delta \text{Risk}$: Raw weighted NLP impact score multiplied by urgency multipliers ($1.4\times$ to $2.0\times$) or dampened by negation/noise factors ($0.15\times$ to $0.40\times$).

### The 5 Weighted Risk Vectors
| Vector | Weight | Key Regex Triggers |
|:---|:---:|:---|
| **Legal Exposure** | `10` | Lawsuit, class-action, indictment, securities fraud, DOJ, SEC subpoena, perjury |
| **Compliance Breach** | `8` | AML, KYC failure, FinCEN, CFPB complaint, OCC consent order, sanctions, GDPR |
| **Financial Distress** | `9` | Default, bankruptcy, credit downgrade, liquidity crisis, restatement, margin call |
| **Operational & Cyber**| `7` | System outage, ransomware, core banking disruption, CEO resign, union strike |
| **Reputational Damage**| `6` | Predatory lending, boycott, public outrage, whistleblower, ethics scandal |

---

## 🎨 Design Philosophy: 15+ Year UI/UX Master Class

The user interface was redesigned from the ground up for high-frequency financial surveillance:
- **Clean Segmented Navigation Dock:** Floating unified pill controller eliminating visual noise and balancing horizontal real estate.
- **Dark & Light Mode Engine:** Native instantaneous theme switching persisted in `localStorage`, featuring **Deep Obsidian Terminal** (`#050811`) and **Crisp Swiss Alabaster** (`#f8fafc`).
- **Tactile Claymorphism:** Multi-layered outer drop shadows and soft inset highlights delivering 3D physical surfaces with depth and prestige.
- **Dynamic Radar Telemetry:** CSS keyframe radar sweep arms, pulsing risk nodes, and live SSE streaming tickers.
- **High-Density Data Grid:** Real-time sparklines, Recharts polar charts, and severity badges tuned for Wall Street risk desks.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java 17+ / 21 LTS**
- **Node.js 20+**
- **Python 3.10+**
- *(Optional)* **LM Studio** running locally at `http://localhost:1234/v1` with model `bionic`

---

### Step 1: Start the Java Spring Boot Gateway (:8080)
```powershell
cd api-service
.\mvnw.cmd spring-boot:run
```
> Gateway runs at **`http://localhost:8080`**.  
> Exposes JWT authentication, SSE broadcast at `/api/v1/stream`, H2 Console at `/h2-console`, and internal webhooks at `/internal/event`.

---

### Step 2: Start the Python FastAPI AI & NLP Service (:8000)
```powershell
cd ai-service
python -m pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
> NLP service runs at **`http://localhost:8000`**.  
> Interactive OpenAPI documentation available at **`http://localhost:8000/docs`**.

---

### Step 3: Start the React 19 Frontend (:5173)
```powershell
cd frontend
npm install
npm run dev
```
> Open your browser at **`http://localhost:5173`**.

---

## 🔑 Demo Judge Credentials

For hackathon evaluations, pre-seeded analyst accounts with single-click login are provided:

| Role | Email | Password | Access Level |
|:---|:---|:---|:---|
| **Lead Risk Analyst** | `analyst@riskradar.io` | `password123` | Full Cockpit & Simulator |
| **Compliance Officer (Admin)** | `admin@riskradar.io` | `admin123` | Master Audit Dossiers & Controls |

---

## 🧪 Key Pages & Features to Explore

1. **Parallax Landing Page (`/`)**: Multi-layer depth scroll, live mini-radar preview widget, and problem-vs-solution comparison.
2. **Surveillance Cockpit (`/dashboard`)**: Live SSE scoreboard tracking JPMorgan Chase, Goldman Sachs, Wells Fargo, Citigroup, and Bank of America with sparkline charts.
3. **Company Deep-Dive (`/company/GS`)**: Rolling historical CRI trajectory, 5-vector polar radar chart, and local Bionic LLM reasoning stream.
4. **Regulatory Stream & Noise Filter (`/news-hub`)**: Real-time event ticker with rapid injection buttons (`+ DOJ Threat`, `+ AML Sanctions`, `+ PR Noise`).
5. **What-If Scenario Stress Lab (`/simulator`)**: Interactive sandbox to test regulatory shocks and witness live cluster updates.
6. **Executive Audit Dossier (`/reports`)**: Formatted printable/exportable regulatory compliance report.

---

## 👨‍💻 Author & Acknowledgements

- **Developer & Architect:** [Pranav Lamkhade](https://github.com/pranav-6944)
- **Degree:** B.Tech in Computer Engineering & Data Science
- **Institution:** MIT Academy of Engineering (MITAOE), affiliated with Savitribai Phule Pune University (SPPU)
- **Portfolio:** [https://pranav-6944.github.io/My_Portfolio/](https://pranav-6944.github.io/My_Portfolio/)
- **LinkedIn:** [https://www.linkedin.com/in/pranav-lamkhade-6b48bb372](https://www.linkedin.com/in/pranav-lamkhade-6b48bb372)
- **GitHub:** [https://github.com/pranav-6944](https://github.com/pranav-6944)

*Developed for DY Patil College Hackathon 2026.*
