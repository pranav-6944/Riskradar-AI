# 🚀 RiskRadar AI — Live Cloud Deployment Guide

This guide covers complete, production-grade deployment options for the **RiskRadar AI** multi-tier architecture (React 19 + Java 21 Spring Boot + Python 3.11 FastAPI).

---

## 📋 Architecture Overview for Cloud

| Service | Technology | Port | Cloud Role |
| :--- | :--- | :--- | :--- |
| **`frontend`** | React 19 + Vite + Nginx | `80` / `5173` | Public Web UI with built-in reverse proxy |
| **`api-service`** | Spring Boot 3.2.5 (Java 21) | `8080` | JWT Auth, SSE Real-Time Event Hub, H2 Database |
| **`ai-service`** | FastAPI (Python 3.11) | `8000` | 120+ Regex NLP Scoring, Live Finnhub Stock API |

---

## 🌟 Method 1: 1-Click Render Deployment (Recommended & Free)

The repository includes a root [`render.yaml`](./render.yaml) Blueprint that configures all three microservices and sets up private networking automatically.

### Steps:
1. Go to **[Render.com](https://render.com/)** and sign in with GitHub.
2. Click **New +** in the top navigation and select **Blueprint**.
3. Connect your repository: `https://github.com/pranav-6944/Riskradar-AI`.
4. Render will detect `render.yaml` and configure the 3 services:
   - `riskradar-ai` (Python NLP Service)
   - `riskradar-api` (Spring Boot Gateway)
   - `riskradar-frontend` (React Nginx Container)
5. Click **Apply**.
6. Render will build and deploy all 3 containers. Within ~3 minutes, your live public URL (e.g., `https://riskradar-frontend.onrender.com`) will be active 24/7!

---

## 🚂 Method 2: Railway Deployment

1. Go to **[Railway.app](https://railway.app/)** and create a **New Project**.
2. Select **Deploy from GitHub repo** and choose `Riskradar-AI`.
3. Add 3 services by selecting each folder:
   - Service 1: Root directory `/ai-service` (Uses `ai-service/Dockerfile`)
   - Service 2: Root directory `/api-service` (Uses `api-service/Dockerfile`)
   - Service 3: Root directory `/frontend` (Uses `frontend/Dockerfile`)
4. Set Environment Variables:
   - In `ai-service`:
     - `PORT=8000`
     - `FINNHUB_API_KEY=db5map9r01qv1n8viqtgdb5map9r01qv1n8viqu0`
     - `GATEWAY_INTERNAL_URL=http://api-service.railway.internal:8080/internal/event`
   - In `api-service`:
     - `PORT=8080`
     - `RISKRADAR_AI_SERVICE_URL=http://ai-service.railway.internal:8000`
5. Generate a public domain on the `frontend` service.

---

## ▲ Method 3: Vercel (Frontend) + Render (Backends)

If you prefer Vercel's global edge CDN for the React application:
1. Deploy `api-service` and `ai-service` on Render or Railway.
2. In [`frontend/vercel.json`](./frontend/vercel.json), update the rewrite destinations to your deployed backend URLs:
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "https://<YOUR-API-SERVICE>.onrender.com/api/$1" },
       { "source": "/ai-api/(.*)", "destination": "https://<YOUR-AI-SERVICE>.onrender.com/$1" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
3. Import the `frontend` folder into **[Vercel](https://vercel.com/)** and click **Deploy**.

---

## 🐳 Method 4: Docker Compose (Any Cloud VPS / AWS / DigitalOcean)

To deploy on any Ubuntu/Debian cloud server (AWS EC2, DigitalOcean Droplet, GCP Compute):

```bash
# 1. Clone repository on the server
git clone https://github.com/pranav-6944/Riskradar-AI.git
cd Riskradar-AI

# 2. Build and launch all 3 microservices in detached mode
docker compose up --build -d

# 3. Verify container health
docker compose ps
```

All 3 services will be running with automatic restart policies:
- Frontend: `http://<SERVER_IP>`
- API Gateway: `http://<SERVER_IP>:8080`
- AI Microservice: `http://<SERVER_IP>:8000`

---

## ⚡ Method 5: Instant Live Public URL for Judges (Right Now!)

If you are presenting to judges right now and want an instant, public HTTPS link directly to your currently running machine without waiting for cloud builds:

Run in PowerShell:
```powershell
npx localtunnel --port 5173
```
*or using Cloudflare Tunnel:*
```powershell
winget install --id Cloudflare.cloudflared
cloudflared tunnel --url http://localhost:5173
```

This immediately provides a public HTTPS URL (e.g., `https://riskradar.loca.lt`) that connects directly to the live running application with real-time Finnhub news streaming!
