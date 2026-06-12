[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/s7J27iqd)

# 🎯 AI Interview Preparation Assistant — Final Capstone

A full-stack agentic AI-powered interview preparation platform. Upload your resume and job description, get a skill gap analysis, then go through a structured 10-question adaptive technical interview evaluated in real-time by an LLM. A final hiring-grade report with verdict and recommendations is generated at the end.

---

## Architecture Overview

This project has two deployable interfaces sharing the same agent pipeline:

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                       │
│  React + Vite (frontend/)      Streamlit (app.py)       │
│       Port 5173                    Port 8501            │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP (REST)
┌─────────────────▼───────────────────────────────────────┐
│               FastAPI Backend (api.py)                  │
│                      Port 8000                          │
│  POST /analyze   POST /generate-question                │
│  POST /evaluate  POST /report                           │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                    AGENT PIPELINE                       │
│                                                         │
│  ResumeAgent → JDAgent → GapAgent                       │
│       ↓                                                 │
│  PlannerAgent (3-tool: prioritize → allocate → plan)    │
│       ↓                                                 │
│  QuestionGeneratorAgent (4-tool: context → qa → slot    │
│                                           → generate)   │
│       ↓  (× 10 questions)                              │
│  EvaluationAgent → ReportAgent                          │
└─────────────────────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│              Groq API — llama-3.3-70b-versatile         │
└─────────────────────────────────────────────────────────┘
```

---

## Agent Pipeline — How It Works

| Agent | Type | Description |
|---|---|---|
| `ResumeAgent` | Function | Extracts skills, projects, experience, and education from resume PDF |
| `JDAgent` | Function | Extracts required/preferred skills, responsibilities from job description |
| `GapAgent` | Function | Computes matched/missing skills and a match percentage |
| `PlannerAgent` | Class (3 tools) | Builds a structured 10-slot interview plan based on gaps and projects |
| `QuestionGeneratorAgent` | Class (4 tools) | Generates each question using plan slot, filtered resume context, and recent Q&A history |
| `EvaluationAgent` | Function | Scores each answer on Accuracy, Clarity, Depth, Communication (0–10) |
| `ReportAgent` | Function | Generates a professional hiring report with verdict and recommendations |

### PlannerAgent Tools (runs once at session start)
1. `prioritize_gaps` — cross-references missing skills against JD required skills
2. `allocate_topic_slots` — distributes 10 question slots across projects / matched skills / gaps / behavioral
3. `plan_questions` — LLM generates a flexible per-slot topic guide

### QuestionGeneratorAgent Tools (runs per question)
1. `fetch_resume_context` — filters relevant resume data for the current slot type
2. `fetch_previous_qa` — retrieves last 3 Q&A pairs for short-term context
3. `fetch_plan_slot` — gets the current slot's topic, focus, and type from the plan
4. `generate` — calls the interview agent with enriched, slot-specific context

---

## Tech Stack

| Layer | Technology |
|---|---|
| React Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion, Recharts, Lucide React |
| Python Backend | FastAPI, Uvicorn |
| Streamlit UI | Streamlit ≥ 1.35 (alternative interface) |
| LLM | Groq API (`llama-3.3-70b-versatile`) |
| PDF Parsing | pypdf |
| Env Config | python-dotenv |

---

## Project Structure

```
final-capstone-project-agentic-ai-interview-preparation-assistant/
├── agents/
│   ├── resume_agent.py               # Extracts structured data from resume text
│   ├── jd_agent.py                   # Extracts structured data from job description
│   ├── gap_agent.py                  # Skill gap analysis and match percentage
│   ├── planner_agent.py              # PlannerAgent class — 3-tool interview planner
│   ├── question_generator_agent.py   # QuestionGeneratorAgent class — 4-tool question generator
│   ├── evaluation_agent.py           # Scores candidate answers (0–10, 4 dimensions)
│   └── report_agent.py               # Generates final hiring report
├── utils/
│   ├── llm.py                        # Groq LLM client wrapper (generate_response)
│   └── parser.py                     # PDF text extraction via pypdf
├── frontend/                         # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx                   # Full SPA — landing, dashboard, interview, report
│   │   ├── App.css                   # Global styles and glass-card utilities
│   │   └── main.jsx                  # React entry point
│   ├── package.json
│   └── vite.config.js
├── app.py                            # Streamlit interface (alternative to React frontend)
├── api.py                            # FastAPI server — 4 REST endpoints
├── requirements.txt                  # Python dependencies
└── .env                              # API keys (not committed)
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/analyze` | Upload resume + JD → runs all analysis agents, builds plan, returns Q1 |
| `POST` | `/generate-question` | Generate next question given session state |
| `POST` | `/evaluate` | Evaluate a candidate answer, returns scores + feedback |
| `POST` | `/report` | Generate final interview performance report |

---

## Setup & Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- A [Groq API key](https://console.groq.com)

---

### 1. Clone the repository

```bash
git clone <repo-url>
cd final-capstone-project-agentic-ai-interview-preparation-assistant
```

### 2. Python environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Environment variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

---

## Running the Application

### Option A — React Frontend + FastAPI Backend (recommended)

**Terminal 1 — Start the API server:**
```bash
uvicorn api:app --reload --port 8000
```

**Terminal 2 — Start the React frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

### Option B — Streamlit (standalone, no backend needed)

```bash
streamlit run app.py
```

Open [http://localhost:8501](http://localhost:8501)

---

## Usage

1. **Select your interview level** — Intern, Junior Developer, or Senior Developer
2. **Upload your Resume** as PDF
3. **Provide the Job Description** — upload PDF or paste text
4. Click **Run AI Compatibility Analysis** — the system analyzes documents, builds the 10-slot interview plan, and generates Question 1
5. Review the **Gap Analysis** — see matched skills, missing skills, and match %
6. Enter the **Interview Room** and answer 10 adaptive questions
7. Each answer is evaluated immediately with scores and feedback
8. After 10 questions, click **Generate AI Report**
9. Download the final report as a `.txt` file

---

## Interview Levels

| Level | Target | Focus Areas |
|---|---|---|
| 🟢 Intern | Students / Freshers | Projects, tech choices, APIs, frameworks, implementation details |
| 🔵 Junior Developer | 0–2 years | Architecture, API security, DB optimization, error handling, deployment |
| 🔴 Senior Developer | 3+ years | System design, scalability, microservices, cloud, performance engineering |

---

## Evaluation Criteria

Each answer is scored out of 10 on:

- **Accuracy** — Technical correctness
- **Clarity** — How well the answer is communicated
- **Depth** — Level of detail and understanding demonstrated
- **Communication** — Overall structure and quality

The **Overall Score** is the average of the four criteria.

---

## Report Sections

The final report generated by the LLM includes:

1. Interview Level context
2. Resume Match Summary
3. Technical Performance
4. Communication Performance
5. Technical Depth Evaluated
6. Strong Areas
7. Areas for Improvement
8. Hiring Readiness verdict — `Strong Hire / Hire / Borderline / No Hire`
9. Recommendations (3–5 actionable items)

---

## Requirements

```
streamlit>=1.35.0
pypdf>=4.0.0
groq>=0.9.0
python-dotenv>=1.0.0
fastapi>=0.111.0
uvicorn>=0.29.0
python-multipart>=0.0.9
```

Frontend dependencies are managed via `frontend/package.json` (React 19, Vite, Tailwind CSS v4, Framer Motion, Recharts).
