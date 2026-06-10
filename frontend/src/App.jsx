import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, UploadCloud, Target, LineChart as LucideLineChart, BookOpen, 
  TrendingUp, CheckCircle2, AlertCircle, Award, User, Settings, 
  ShieldAlert, FileText, Brain, Clock, ArrowRight, ChevronRight, 
  Menu, X, Play, RotateCcw, AlertTriangle, Briefcase, 
  GraduationCap, ChevronLeft, Download, Send, RefreshCw, BarChart2 
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, Cell, LineChart as ReLineChart, Line, Legend 
} from 'recharts';

// --- MOCK CONSTANTS PER LEVEL ---
const LEVEL_DATA = {
  Intern: {
    skills: ["JavaScript", "React.js", "HTML5 & CSS3", "Git/GitHub", "Node.js Basics", "REST APIs"],
    missing: ["Redis Caching", "Docker Containerization", "SQL Query Optimization", "System Design Patterns"],
    matchPercentage: 82,
    radarData: [
      { subject: 'Coding Standards', A: 90, fullMark: 100 },
      { subject: 'Problem Solving', A: 75, fullMark: 100 },
      { subject: 'System Architecture', A: 40, fullMark: 100 },
      { subject: 'Database Design', A: 65, fullMark: 100 },
      { subject: 'APIs & Security', A: 70, fullMark: 100 },
      { subject: 'DevOps & Tooling', A: 80, fullMark: 100 },
    ],
    questions: [
      {
        id: 1,
        question: "Can you explain the difference between state and props in React, and when you would use each?",
        focus: "React Hooks, component rendering, data flow",
        idealKeywords: ["mutable", "immutable", "useState", "pass data", "props change trigger re-render"],
      },
      {
        id: 2,
        question: "How does a REST API work, and what HTTP methods do you use for creating, reading, and updating resources?",
        focus: "REST conventions, HTTP headers, endpoints",
        idealKeywords: ["GET", "POST", "PUT", "DELETE", "stateless", "JSON", "status codes"],
      },
      {
        id: 3,
        question: "What database did you use in your project, and how did you structure the relationship between users and posts?",
        focus: "Database normalization, relational/document modeling",
        idealKeywords: ["SQL", "MongoDB", "foreign key", "one-to-many", "schema", "reference"],
      },
      {
        id: 4,
        question: "How do you handle error states on the frontend when an API call fails or times out?",
        focus: "Try/catch, status tracking, UX error boundaries",
        idealKeywords: ["try catch", "state error", "loading indicator", "axios", "fetch", "fallback UI"],
      },
      {
        id: 5,
        question: "Explain how you would share state between two deeply nested sibling components in a React application.",
        focus: "State management, Context API, Redux/Zustand",
        idealKeywords: ["Context API", "Lifting state up", "Zustand", "Redux", "Provider", "prop drilling"],
      }
    ]
  },
  "Junior Developer": {
    skills: ["Python", "Node.js", "SQL", "Express.js", "Git", "Docker Basics", "MongoDB", "RESTful APIs", "JWT Authentication"],
    missing: ["Kubernetes", "CI/CD Pipelines (GitHub Actions)", "Redis Caching", "Microservices Architecture", "Advanced Query Optimization"],
    matchPercentage: 74,
    radarData: [
      { subject: 'Coding Standards', A: 85, fullMark: 100 },
      { subject: 'Problem Solving', A: 80, fullMark: 100 },
      { subject: 'System Architecture', A: 60, fullMark: 100 },
      { subject: 'Database Design', A: 75, fullMark: 100 },
      { subject: 'APIs & Security', A: 78, fullMark: 100 },
      { subject: 'DevOps & Tooling', A: 65, fullMark: 100 },
    ],
    questions: [
      {
        id: 1,
        question: "How do you secure a REST API? What specific mechanisms would you use for authentication and authorization?",
        focus: "JWT, OAuth2, middleware validation, CORS config",
        idealKeywords: ["JWT", "headers", "bearer token", "RBAC", "middleware", "CORS", "bcrypt", "hash"],
      },
      {
        id: 2,
        question: "If you have a slow database query in SQL, what systematic steps do you take to identify and optimize the bottleneck?",
        focus: "Explain plan, indices, indexes, connection pooling",
        idealKeywords: ["EXPLAIN", "indexes", "indexing", "joins", "indexes optimization", "subqueries", "select star"],
      },
      {
        id: 3,
        question: "Explain the purpose of indexes in a database. What are the trade-offs of adding too many indexes?",
        focus: "Read vs write tradeoffs, B-Trees, storage costs",
        idealKeywords: ["B-Tree", "faster reads", "slower writes", "storage overhead", "insert update delete speed"],
      },
      {
        id: 4,
        question: "How do you structure your error handling middleware in a Node.js Express backend?",
        focus: "Global error handlers, status codes, promise catches",
        idealKeywords: ["next(err)", "middleware", "status code", "try catch", "winston", "logging", "async error handler"],
      },
      {
        id: 5,
        question: "What is your approach to writing unit and integration tests for a controller that calls external microservices?",
        focus: "Mocking dependencies, Jest, coverage metrics",
        idealKeywords: ["Mocking", "Jest", "Supertest", "integration tests", "axios mock", "unit tests", "stub"],
      }
    ]
  },
  "Senior Developer": {
    skills: ["Go (Golang)", "Python", "AWS Cloud Services", "Docker & Kubernetes", "PostgreSQL", "Redis", "System Design", "Microservices"],
    missing: ["Event-Driven Architecture (Kafka)", "Multi-Region Replication", "FinOps & Cloud Cost Optimization", "GraphQL Federations"],
    matchPercentage: 62,
    radarData: [
      { subject: 'Coding Standards', A: 92, fullMark: 100 },
      { subject: 'Problem Solving', A: 90, fullMark: 100 },
      { subject: 'System Architecture', A: 88, fullMark: 100 },
      { subject: 'Database Design', A: 85, fullMark: 100 },
      { subject: 'APIs & Security', A: 90, fullMark: 100 },
      { subject: 'DevOps & Tooling', A: 80, fullMark: 100 },
    ],
    questions: [
      {
        id: 1,
        question: "We need to design a system that handles 100,000 writes per second. How would you design the ingestion layer and database architecture?",
        focus: "Rate limiting, load balancing, message queues, sharding",
        idealKeywords: ["Kafka", "RabbitMQ", "sharding", "write buffers", "load balancer", "NoSQL", "cassandra", "redis cache"],
      },
      {
        id: 2,
        question: "Explain the CAP theorem and how it influences your choice between SQL and NoSQL for a distributed catalog service.",
        focus: "Consistency, Availability, Partition tolerance, replication",
        idealKeywords: ["CAP theorem", "Consistency", "Availability", "Partition tolerance", "eventual consistency", "PACELC", "acid"],
      },
      {
        id: 3,
        question: "How do you handle distributed transactions across microservices? Describe the Saga pattern and its trade-offs.",
        focus: "Orchestrator vs Choreography, compensation transaction, outbox pattern",
        idealKeywords: ["Saga pattern", "choreography", "orchestration", "compensating transaction", "outbox pattern", "idempotency"],
      },
      {
        id: 4,
        question: "Describe your strategy for cache invalidation when using Redis in front of a relational database. How do you handle cache stampede?",
        focus: "Cache-aside, write-through, TTL, locking mechanisms",
        idealKeywords: ["Cache-aside", "TTL", "cache stampede", "mutex lock", "write-through", "invalidations", "hot keys"],
      },
      {
        id: 5,
        question: "How do you profile a memory leak or an unexplainable latency spike in a high-traffic containerized production system?",
        focus: "APM tracing, heap profiling, flame graphs, metrics analysis",
        idealKeywords: ["flame graph", "heap dump", "APM", "Prometheus", "OpenTelemetry", "pprof", "memory leak", "GC pauses"],
      }
    ]
  }
};

// --- SIMULATED AI EVALUATOR FUNCTION ---
const simulateAIEvaluation = (question, answer, level) => {
  // Simple heuristic based on length and match keywords
  const trimmed = answer.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  
  // Calculate matched keywords
  const data = LEVEL_DATA[level];
  const qData = data.questions.find(q => q.question === question) || { idealKeywords: [] };
  const matches = qData.idealKeywords.filter(keyword => 
    answer.toLowerCase().includes(keyword.toLowerCase())
  );
  const keywordRatio = qData.idealKeywords.length > 0 ? (matches.length / qData.idealKeywords.length) : 0.5;

  let accuracy = 5 + Math.round(keywordRatio * 4) + (wordCount > 30 ? 1 : 0);
  let clarity = 4 + Math.round(Math.min(wordCount / 10, 5));
  let depth = 3 + Math.round(keywordRatio * 5) + (wordCount > 50 ? 2 : 0);
  let communication = 5 + Math.round(Math.min(wordCount / 12, 4)) + (matches.length > 0 ? 1 : 0);

  // Bounds
  accuracy = Math.min(10, Math.max(1, accuracy));
  clarity = Math.min(10, Math.max(1, clarity));
  depth = Math.min(10, Math.max(1, depth));
  communication = Math.min(10, Math.max(1, communication));

  const overall_score = parseFloat(((accuracy + clarity + depth + communication) / 4).toFixed(1));

  // Custom feedback lines
  let feedback = "";
  if (overall_score >= 8.5) {
    feedback = `Outstanding response! You demonstrated a complete command of ${qData.focus || 'the topic'}. You accurately cited standard engineering terminology like ${matches.slice(0, 3).join(', ') || 'best practices'}. Your explanation is clear and highly relevant to ${level} expectations.`;
  } else if (overall_score >= 7.0) {
    feedback = `Good answer with strong logical foundations. You hit core concepts like ${matches.slice(0, 2).join(', ') || 'essential elements'}. To elevate this to a senior grade, expand more on edge-case scenarios and trade-offs.`;
  } else if (overall_score >= 5.0) {
    feedback = `Reasonable attempt, but lacking technical depth. You mentioned ${matches[0] || 'some key ideas'}, but missed critical details on ${qData.focus || 'the core mechanism'}. Try to support your claims with real-world examples.`;
  } else {
    feedback = `The answer is too brief or misses the core technical point. A complete answer should cover ${qData.focus}. Familiarize yourself with key terms like ${qData.idealKeywords.slice(0, 3).join(', ')}.`;
  }

  // Generate improvement roadmap items
  const improvements = [
    `Elaborate on the internal performance mechanics of ${qData.focus || 'these systems'}.`,
    matches.length < qData.idealKeywords.length ? `Incorporate standard vocabulary such as: ${qData.idealKeywords.filter(k => !matches.includes(k)).slice(0, 2).join(', ')}.` : `Provide a concrete coding architecture or schema outline.`,
    `Discuss the specific engineering tradeoffs (e.g., latency, storage complexity, or runtime cost).`
  ];

  return {
    accuracy,
    clarity,
    depth,
    communication,
    overall_score,
    feedback,
    improvements
  };
};

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'upload' | 'gap' | 'interview' | 'report' | 'settings'
  const [candidateLevel, setCandidateLevel] = useState('Junior Developer');
  
  // File Upload State
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [jdType, setJdType] = useState('upload'); // 'upload' | 'text'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  // Interview Room State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEvaluations, setInterviewEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);
  
  // Dashboard Metrics state (computed dynamically)
  const activeLevelData = LEVEL_DATA[candidateLevel];

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notifications simulation
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI Agent generated a new evaluation report", read: false },
    { id: 2, text: "System calibrated for Senior Developer profile", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Trigger simulated file parsing analysis
  const handleAnalyze = () => {
    if (!resumeFile) {
      alert("Please upload a resume first!");
      return;
    }
    if (jdType === 'upload' && !jdFile) {
      alert("Please upload a Job Description PDF first!");
      return;
    }
    if (jdType === 'text' && !jdText.trim()) {
      alert("Please paste the Job Description text!");
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setDashboardTab('gap'); // Go straight to Gap Analysis page
    }, 2200);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) {
      alert("Please write an answer before submitting.");
      return;
    }
    setIsSubmittingAnswer(true);
    
    setTimeout(() => {
      const currentQuestion = activeLevelData.questions[currentQuestionIdx].question;
      const evaluation = simulateAIEvaluation(currentQuestion, currentAnswer, candidateLevel);
      
      const updatedEvals = [...interviewEvaluations, {
        question: currentQuestion,
        answer: currentAnswer,
        ...evaluation
      }];
      
      setInterviewEvaluations(updatedEvals);
      setCurrentEvaluation(evaluation);
      setIsSubmittingAnswer(false);
      setHasSubmittedAnswer(true);
    }, 1500);
  };

  // Next Question
  const handleNextQuestion = () => {
    setCurrentAnswer('');
    setHasSubmittedAnswer(false);
    setCurrentEvaluation(null);

    if (currentQuestionIdx + 1 < activeLevelData.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setInterviewComplete(true);
      setDashboardTab('report'); // Go to Final Report Page
    }
  };

  // Reset interview
  const handleResetInterview = () => {
    setCurrentQuestionIdx(0);
    setCurrentAnswer('');
    setHasSubmittedAnswer(false);
    setInterviewEvaluations([]);
    setCurrentEvaluation(null);
    setInterviewStarted(false);
    setInterviewComplete(false);
  };

  // Calculate Average score
  const getAverageScore = () => {
    if (interviewEvaluations.length === 0) return 0;
    const sum = interviewEvaluations.reduce((acc, ev) => acc + ev.overall_score, 0);
    return parseFloat((sum / interviewEvaluations.length).toFixed(1));
  };

  // Final Verdict
  const getHiringVerdict = () => {
    const avg = getAverageScore();
    if (avg >= 8.5) return { text: "Strong Hire", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    if (avg >= 6.8) return { text: "Hire", color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10" };
    if (avg >= 5.0) return { text: "Borderline", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
    return { text: "No Hire", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" };
  };

  // Simulate PDF download
  const handleDownloadReport = () => {
    alert("Downloading report as PDF... (Simulated)");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 futuristic-grid pointer-events-none opacity-40 z-0"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] glow-mesh-1 animate-pulse-slow pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] glow-mesh-2 animate-pulse-slow pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] glow-mesh-3 pointer-events-none z-0"></div>

      {/* LANDING PAGE VIEW */}
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen z-10"
          >
            {/* Header / Navbar */}
            <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-200">
                      INTERVIEW.PRO
                    </span>
                    <span className="text-[10px] block text-cyan-400 font-mono tracking-widest uppercase">
                      AI RECRUITER
                    </span>
                  </div>
                </div>
                
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                  <a href="#features" className="hover:text-slate-100 transition-colors">Features</a>
                  <a href="#stats" className="hover:text-slate-100 transition-colors">Metrics</a>
                  <a href="#testimonials" className="hover:text-slate-100 transition-colors">Testimonials</a>
                </nav>

                <div>
                  <button 
                    onClick={() => {
                      setCurrentView('dashboard');
                      setDashboardTab('upload');
                    }}
                    className="relative group px-6 py-2 rounded-xl text-sm font-medium text-white transition-all bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative flex items-center gap-2">
                      Start Interview <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="relative flex-grow flex items-center py-20 px-6 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 text-left"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium tracking-wide">
                    <Brain className="w-3.5 h-3.5" /> Next-Generation Recruitment Intelligence
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                    <span className="text-gradient">Prepare Smarter.</span> <br />
                    <span className="text-gradient">Interview Better.</span> <br />
                    <span className="text-gradient-purple">Get Hired.</span>
                  </h1>
                  <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                    Evaluate your resume against target JDs, uncover technical knowledge gaps, and train with an adaptive AI interviewer that scores your performance in real time.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button 
                      onClick={() => {
                        setCurrentView('dashboard');
                        setDashboardTab('upload');
                      }}
                      className="px-8 py-4 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group transition-all"
                    >
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a 
                      href="#features"
                      className="px-8 py-4 rounded-xl text-base font-semibold text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/50 backdrop-blur-md flex items-center justify-center gap-2 transition-all"
                    >
                      Explore Features
                    </a>
                  </div>
                </motion.div>

                {/* Animated Graphic Mockup */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative flex justify-center"
                >
                  <div className="w-full max-w-[450px] aspect-square rounded-3xl glass-card border-slate-800/80 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/20 to-transparent blur-xl"></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-mono text-emerald-400">AI AGENT ACTIVE</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full">
                        <Award className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[11px] font-medium text-slate-300">Level: Senior</span>
                      </div>
                    </div>

                    <div className="my-6 space-y-4">
                      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-900 relative">
                        <span className="text-[10px] font-mono text-indigo-400 uppercase block mb-1">INTERVIEWER</span>
                        <p className="text-sm font-medium text-slate-200">"Why did you choose Redis for the distributed session storage?"</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 pl-8 relative">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">CANDIDATE ANSWER</span>
                        <p className="text-xs font-medium text-slate-400 italic">"I selected Redis due to its single-threaded event loop which avoids race conditions..."</p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-400">Analysis Accuracy</span>
                        <span className="text-indigo-400">9.4/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full w-[94%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 border-t border-slate-900/50 bg-slate-950/30">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Full-Cycle Agentic AI Interview Suite</h2>
                  <p className="text-slate-400">Everything you need to master your technical profile. Built on LLM reasoning and precise matching indices.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="glass-card glass-card-hover p-8 rounded-2xl text-left space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Resume Analysis</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Deep structural parsing of skills, projects, and work history. Converts unstructured PDF text into cleanly indexed capability profiles.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="glass-card glass-card-hover p-8 rounded-2xl text-left space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">JD Analysis</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Extracts core vs. preferred technologies, underlying responsibilities, and expected experience constraints from targeted job posts.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="glass-card glass-card-hover p-8 rounded-2xl text-left space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Brain className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Skill Gap Detection</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Performs case-insensitive, semantic alignment between resume and JD to calculate match percentages and identify critical missing skills.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="glass-card glass-card-hover p-8 rounded-2xl text-left space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Adaptive Interviewing</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Questions auto-adjust. If you succeed, the AI agent asks deeper architectural follow-ups. If you struggle, it tests foundational knowledge.
                    </p>
                  </div>

                  {/* Card 5 */}
                  <div className="glass-card glass-card-hover p-8 rounded-2xl text-left space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Real-Time Evaluation</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Scores answers on accuracy, clarity, depth, and communication skills directly following submission, providing quick course correction.
                    </p>
                  </div>

                  {/* Card 6 */}
                  <div className="glass-card glass-card-hover p-8 rounded-2xl text-left space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">AI Hiring Report</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Generates recruiter-grade final summaries, hiring verdicts, technical metrics radar charts, and structured roadmap suggestions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Statistics Section */}
            <section id="stats" className="py-24 px-6 border-t border-slate-900/50 bg-slate-950/60">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-4xl md:text-5xl font-black text-indigo-400 tracking-tight">142,000+</h4>
                    <p className="text-slate-400 text-sm font-medium">Interviews Conducted</p>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-4xl md:text-5xl font-black text-purple-400 tracking-tight">84.2%</h4>
                    <p className="text-slate-400 text-sm font-medium">Average Match Score</p>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight">2.5M</h4>
                    <p className="text-slate-400 text-sm font-medium">Skills Parsed & Analyzed</p>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-4xl md:text-5xl font-black text-emerald-400 tracking-tight">92.4%</h4>
                    <p className="text-slate-400 text-sm font-medium">Hiring Alignment Rate</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 px-6 border-t border-slate-900/50 max-w-7xl mx-auto w-full">
              <div className="space-y-16">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Trusted by Candidates and Engineering Teams</h2>
                  <p className="text-slate-400">Read feedback from our high-achieving platform members.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Testimonial 1 */}
                  <div className="glass-card p-8 rounded-2xl relative text-left">
                    <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
                      "The level-specific grading of the AI Interview Preparation Assistant is insanely precise. I trained on the Senior Developer profile, and it forced me to defend my architectural scaling choices just like a real Lead Engineer would. Landed my staff offer last month!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
                        AM
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-100">Alex Mercer</h5>
                        <p className="text-[11px] text-slate-500">Staff Software Engineer at Vercel</p>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="glass-card p-8 rounded-2xl relative text-left">
                    <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
                      "As a technical recruiter, I use this platform to benchmark incoming candidate skills before the face-to-face round. The parsed Gap Analysis and Technical Radar charts save our engineering managers hours of vetting."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
                        SK
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-100">Sarah Koenig</h5>
                        <p className="text-[11px] text-slate-500">Lead Tech Recruiter at Stripe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-900 bg-slate-950/80 py-12 px-6 mt-auto">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-bold text-slate-300 tracking-tight text-xs uppercase">INTERVIEW.PRO</span>
                </div>
                <div>
                  &copy; 2026 Interview.Pro Inc. All rights reserved. Built with Agentic LLM reasoning.
                </div>
                <div className="flex items-center gap-6">
                  <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
                  <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {/* DASHBOARD & WORKING INTERFACE VIEW */}
        {currentView === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen z-10 w-full"
          >
            {/* LEFT SIDEBAR - Desktop */}
            <aside className="hidden md:flex flex-col w-64 border-r border-slate-900/60 bg-slate-950/65 backdrop-blur-md p-6 shrink-0 relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-bold text-sm tracking-tight text-slate-100 uppercase">INTERVIEW.PRO</span>
                  <span className="text-[9px] block text-cyan-400 font-mono tracking-widest uppercase">DASHBOARD</span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1.5 flex-grow">
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: BarChart2 },
                  { id: 'upload', label: 'Document Upload', icon: UploadCloud },
                  { id: 'gap', label: 'Gap Analysis', icon: Target },
                  { id: 'interview', label: 'Interview Room', icon: Brain },
                  { id: 'report', label: 'Final Report', icon: Award },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = dashboardTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setDashboardTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Level Status Card */}
              <div className="mt-auto pt-6 border-t border-slate-900">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">ACTIVE PROFILE</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-xs font-bold text-slate-200">{candidateLevel}</p>
                  <button 
                    onClick={() => setDashboardTab('upload')} 
                    className="w-full text-center text-[10px] py-1 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-indigo-400 font-semibold rounded-lg transition-colors"
                  >
                    Adjust Settings
                  </button>
                </div>
              </div>
            </aside>

            {/* MAIN DASHBOARD PANEL */}
            <main className="flex-grow flex flex-col min-w-0 bg-slate-950/40">
              
              {/* TOP NAVBAR */}
              <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-4">
                  {/* Hamburger menu for Mobile */}
                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800"
                  >
                    <Menu className="w-5 h-5" />
                  </button>

                  <h2 className="text-sm font-semibold tracking-tight uppercase text-slate-200 hidden md:block">
                    {dashboardTab === 'overview' && 'System Overview'}
                    {dashboardTab === 'upload' && 'Document Intake Portal'}
                    {dashboardTab === 'gap' && 'Skill Alignment Insights'}
                    {dashboardTab === 'interview' && 'Interactive Assessment Sandbox'}
                    {dashboardTab === 'report' && 'Hiring Performance Scorecard'}
                  </h2>
                </div>

                <div className="flex items-center gap-6">
                  {/* API Connectivity status */}
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/40">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">GROQ-LLM CONNECTED</span>
                  </div>

                  {/* Notifications Icon with Mock Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-850/60 transition-colors"
                    >
                      <Clock className="w-4 h-4 text-slate-300" />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
                      )}
                    </button>
                    
                    {/* Mock Dropdown */}
                    <AnimatePresence>
                      {showNotifications && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-3 w-72 rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-xl z-50 space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <h4 className="text-xs font-bold text-slate-300">Live AI Feed</h4>
                            <span className="text-[10px] text-indigo-400 font-bold cursor-pointer" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>Mark read</span>
                          </div>
                          <div className="space-y-2">
                            {notifications.map(n => (
                              <div key={n.id} className={`p-2.5 rounded-lg text-xs leading-normal ${n.read ? 'text-slate-400' : 'bg-indigo-500/5 border border-indigo-500/10 text-slate-200'}`}>
                                {n.text}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile Info */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                      <span className="text-xs font-bold block text-slate-200">Aditya Madan</span>
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">CANDIDATE</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
                      AM
                    </div>
                  </div>
                </div>
              </header>

              {/* MOBILE MENU BACKDROP */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 md:hidden flex justify-start"
                  >
                    <motion.div 
                      initial={{ x: -250 }}
                      animate={{ x: 0 }}
                      exit={{ x: -250 }}
                      className="w-64 bg-slate-900 p-6 flex flex-col h-full border-r border-slate-800"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-indigo-400" />
                          <span className="font-bold text-sm tracking-wider">INTERVIEW.PRO</span>
                        </div>
                        <button onClick={() => setMobileMenuOpen(false)}>
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <nav className="space-y-2">
                        {[
                          { id: 'overview', label: 'Dashboard Overview', icon: BarChart2 },
                          { id: 'upload', label: 'Document Upload', icon: UploadCloud },
                          { id: 'gap', label: 'Gap Analysis', icon: Target },
                          { id: 'interview', label: 'Interview Room', icon: Brain },
                          { id: 'report', label: 'Final Report', icon: Award },
                        ].map((item) => {
                          const Icon = item.icon;
                          const isActive = dashboardTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setDashboardTab(item.id);
                                setMobileMenuOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                isActive 
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15' 
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {item.label}
                            </button>
                          );
                        })}
                      </nav>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* DASHBOARD SCREENS CONTAINER */}
              <div className="flex-grow p-6 overflow-y-auto max-w-7xl w-full mx-auto">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: OVERVIEW */}
                  {dashboardTab === 'overview' && (
                    <motion.div 
                      key="overview"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-8 text-left"
                    >
                      {/* Welcome Block */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight text-slate-100">Welcome Back, Aditya</h3>
                        <p className="text-slate-400 text-xs sm:text-sm">Here is a snapshot of your system performance indices and assessment statuses.</p>
                      </div>

                      {/* Summary Grid Cards */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* KPI 1 */}
                        <div className="glass-card p-6 rounded-2xl space-y-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/5 rounded-bl-full"></div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resume Match Index</span>
                            <Target className="w-4 h-4 text-indigo-400" />
                          </div>
                          <h4 className="text-3xl font-extrabold text-indigo-400">{analysisComplete ? `${activeLevelData.matchPercentage}%` : '--'}</h4>
                          <p className="text-[11px] text-slate-500">Alignment against selected Job Spec</p>
                        </div>

                        {/* KPI 2 */}
                        <div className="glass-card p-6 rounded-2xl space-y-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/5 rounded-bl-full"></div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Gaps</span>
                            <ShieldAlert className="w-4 h-4 text-purple-400" />
                          </div>
                          <h4 className="text-3xl font-extrabold text-purple-400">{analysisComplete ? activeLevelData.missing.length : '--'}</h4>
                          <p className="text-[11px] text-slate-500">Critical missing skills required</p>
                        </div>

                        {/* KPI 3 */}
                        <div className="glass-card p-6 rounded-2xl space-y-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/5 rounded-bl-full"></div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interview Status</span>
                            <Brain className="w-4 h-4 text-cyan-400" />
                          </div>
                          <h4 className="text-2xl font-extrabold text-cyan-400">
                            {interviewComplete ? 'Completed' : (interviewStarted ? `${interviewEvaluations.length} / 5 Qs` : 'Ready')}
                          </h4>
                          <p className="text-[11px] text-slate-500">Active interactive phase count</p>
                        </div>

                        {/* KPI 4 */}
                        <div className="glass-card p-6 rounded-2xl space-y-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-full"></div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Est. Hiring Score</span>
                            <Award className="w-4 h-4 text-emerald-400" />
                          </div>
                          <h4 className="text-3xl font-extrabold text-emerald-400">
                            {interviewEvaluations.length > 0 ? `${getAverageScore()} / 10` : '--'}
                          </h4>
                          <p className="text-[11px] text-slate-500">Consolidated grader average</p>
                        </div>
                      </div>

                      {/* Main Analytics Panels */}
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Radar Chart (Recharts) */}
                        <div className="glass-card p-6 rounded-2xl lg:col-span-2 space-y-4 flex flex-col">
                          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                            <h4 className="text-sm font-bold text-slate-200">Current Competency Dimensions</h4>
                            <span className="text-[11px] text-slate-400 font-semibold">{candidateLevel} Blueprint</span>
                          </div>
                          <div className="flex-grow min-h-[300px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={300}>
                              <RadarChart cx="50%" cy="50%" radius="80%" data={activeLevelData.radarData}>
                                <PolarGrid stroke="#1E293B" />
                                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                                <Radar name="Dimension Rating" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.25} />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Setup Guidance Info Card */}
                        <div className="glass-card p-6 rounded-2xl space-y-5 text-left flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold tracking-wider uppercase">
                              Sandbox Workflow
                            </div>
                            <h4 className="text-base font-extrabold text-slate-200">Preparation Instructions</h4>
                            
                            <ul className="space-y-4 text-xs text-slate-400">
                              <li className="flex gap-3">
                                <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-bold">1</span>
                                <span>Upload your resume PDF and targeted Job Description in the **Document Upload** view.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-bold">2</span>
                                <span>Analyze the match percentages and review any identified skill deficits.</span>
                              </li>
                              <li className="flex gap-3">
                                <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-bold">3</span>
                                <span>Enter the **Interview Room** to answer 5 dynamic questions assessed by our cognitive evaluator.</span>
                              </li>
                            </ul>
                          </div>

                          <button 
                            onClick={() => setDashboardTab(analysisComplete ? 'interview' : 'upload')}
                            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 mt-4"
                          >
                            {analysisComplete ? 'Begin Technical Interview' : 'Start Document Analysis'}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: UPLOAD */}
                  {dashboardTab === 'upload' && (
                    <motion.div 
                      key="upload"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-8 text-left"
                    >
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight text-slate-100">Document Intake Portal</h3>
                        <p className="text-slate-400 text-xs sm:text-sm">Provide your resume and targeted job details to calibrate the AI Interviewer.</p>
                      </div>

                      {/* Setup Level Selection Grid */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Interview Grade</h4>
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Intern Card */}
                          <div 
                            onClick={() => setCandidateLevel('Intern')}
                            className={`glass-card p-5 rounded-2xl cursor-pointer relative border transition-all ${
                              candidateLevel === 'Intern' 
                                ? 'border-emerald-500/40 bg-emerald-500/5 shadow-md shadow-emerald-500/5' 
                                : 'border-slate-850 hover:border-slate-800 hover:bg-slate-900/20'
                            }`}
                          >
                            {candidateLevel === 'Intern' && (
                              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400"></span>
                            )}
                            <div className="flex items-center gap-3 mb-2.5">
                              <GraduationCap className={`w-5 h-5 ${candidateLevel === 'Intern' ? 'text-emerald-400' : 'text-slate-400'}`} />
                              <h5 className="font-bold text-sm">Intern / Fresher</h5>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal">
                              Focuses on projects, foundational languages (JS/Python), frameworks (React), and challenge recovery.
                            </p>
                          </div>

                          {/* Junior Card */}
                          <div 
                            onClick={() => setCandidateLevel('Junior Developer')}
                            className={`glass-card p-5 rounded-2xl cursor-pointer relative border transition-all ${
                              candidateLevel === 'Junior Developer' 
                                ? 'border-indigo-500/40 bg-indigo-500/5 shadow-md shadow-indigo-500/5' 
                                : 'border-slate-850 hover:border-slate-800 hover:bg-slate-900/20'
                            }`}
                          >
                            {candidateLevel === 'Junior Developer' && (
                              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400"></span>
                            )}
                            <div className="flex items-center gap-3 mb-2.5">
                              <Briefcase className={`w-5 h-5 ${candidateLevel === 'Junior Developer' ? 'text-indigo-400' : 'text-slate-400'}`} />
                              <h5 className="font-bold text-sm">Junior Developer</h5>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal">
                              Focuses on code quality, API architectures, databases optimization, security, and basic containerization.
                            </p>
                          </div>

                          {/* Senior Card */}
                          <div 
                            onClick={() => setCandidateLevel('Senior Developer')}
                            className={`glass-card p-5 rounded-2xl cursor-pointer relative border transition-all ${
                              candidateLevel === 'Senior Developer' 
                                ? 'border-purple-500/40 bg-purple-500/5 shadow-md shadow-purple-500/5' 
                                : 'border-slate-850 hover:border-slate-800 hover:bg-slate-900/20'
                            }`}
                          >
                            {candidateLevel === 'Senior Developer' && (
                              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400"></span>
                            )}
                            <div className="flex items-center gap-3 mb-2.5">
                              <Award className={`w-5 h-5 ${candidateLevel === 'Senior Developer' ? 'text-purple-400' : 'text-slate-400'}`} />
                              <h5 className="font-bold text-sm">Senior Developer</h5>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal">
                              Focuses on microservices, system design limits, database sharding, container orchestration, and telemetry.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* File Upload Grid */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Resume Card */}
                        <div className="glass-card p-6 rounded-2xl space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Resume</h4>
                          <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 bg-slate-900/20 hover:bg-slate-900/30 transition-colors relative">
                            <UploadCloud className="w-10 h-10 text-slate-500" />
                            {resumeFile ? (
                              <div className="space-y-1">
                                <p className="text-xs font-semibold text-indigo-400">{resumeFile.name}</p>
                                <p className="text-[10px] text-slate-500">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                                <button onClick={() => setResumeFile(null)} className="text-[10px] font-bold text-rose-400 hover:underline pt-2">Remove File</button>
                              </div>
                            ) : (
                              <div>
                                <label className="cursor-pointer text-xs font-bold text-indigo-400 hover:underline">
                                  Upload Resume PDF
                                  <input 
                                    type="file" 
                                    accept=".pdf"
                                    className="hidden" 
                                    onChange={(e) => setResumeFile(e.target.files[0])} 
                                  />
                                </label>
                                <p className="text-[10px] text-slate-500 mt-1">Accepts raw text or parsed PDF formats</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Job Description Card */}
                        <div className="glass-card p-6 rounded-2xl space-y-4 flex flex-col">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Job Description</h4>
                            <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[10px] font-bold">
                              <button 
                                onClick={() => setJdType('upload')}
                                className={`px-2.5 py-1 rounded-md transition-colors ${jdType === 'upload' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'}`}
                              >
                                Upload PDF
                              </button>
                              <button 
                                onClick={() => setJdType('text')}
                                className={`px-2.5 py-1 rounded-md transition-colors ${jdType === 'text' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'}`}
                              >
                                Paste Text
                              </button>
                            </div>
                          </div>

                          {jdType === 'upload' ? (
                            <div className="border border-dashed border-slate-800 rounded-xl p-8 flex-grow text-center flex flex-col items-center justify-center gap-3 bg-slate-900/20 hover:bg-slate-900/30 transition-colors">
                              <UploadCloud className="w-10 h-10 text-slate-500" />
                              {jdFile ? (
                                <div className="space-y-1">
                                  <p className="text-xs font-semibold text-indigo-400">{jdFile.name}</p>
                                  <p className="text-[10px] text-slate-500">{(jdFile.size / 1024).toFixed(1)} KB</p>
                                  <button onClick={() => setJdFile(null)} className="text-[10px] font-bold text-rose-400 hover:underline pt-2">Remove File</button>
                                </div>
                              ) : (
                                <div>
                                  <label className="cursor-pointer text-xs font-bold text-indigo-400 hover:underline">
                                    Upload Job Spec PDF
                                    <input 
                                      type="file" 
                                      accept=".pdf"
                                      className="hidden" 
                                      onChange={(e) => setJdFile(e.target.files[0])} 
                                    />
                                  </label>
                                  <p className="text-[10px] text-slate-500 mt-1">Accepts standard JD formats</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <textarea 
                              className="w-full flex-grow p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500/50 resize-none font-medium placeholder-slate-600"
                              placeholder="Paste the target job description requirements, technical scope, and responsibilities here..."
                              rows={5}
                              value={jdText}
                              onChange={(e) => setJdText(e.target.value)}
                            />
                          )}
                        </div>
                      </div>

                      {/* Analyze Button Panel */}
                      <div className="flex items-center justify-center pt-4">
                        <button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-sm font-bold text-white shadow-xl shadow-indigo-600/15 flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
                        >
                          {isAnalyzing ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              Parsing profiles and establishing technical context index...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-cyan-400" />
                              Run AI Compatibility Analysis
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: GAP ANALYSIS */}
                  {dashboardTab === 'gap' && (
                    <motion.div 
                      key="gap"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-8 text-left"
                    >
                      {!analysisComplete ? (
                        <div className="glass-card p-12 rounded-2xl text-center space-y-4">
                          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
                          <h4 className="font-bold text-base">Intake Vetting Required</h4>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto">Please upload your resume and targeted job spec inside the **Document Upload** tab before opening alignment analytics.</p>
                          <button onClick={() => setDashboardTab('upload')} className="px-6 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white">Go to Uploader</button>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-bold tracking-tight text-slate-100">Technical Gap Analysis</h3>
                            <p className="text-slate-400 text-xs sm:text-sm">Strategic overlap indices comparing candidate resume indices against targeted job demands.</p>
                          </div>

                          <div className="grid md:grid-cols-3 gap-8">
                            
                            {/* Match percentage visualizer (Large Circle) */}
                            <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Match Percentage</h4>
                              
                              <div className="relative w-36 h-36 flex items-center justify-center">
                                {/* SVG Circular Progress */}
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="72" cy="72" r="62" stroke="#1E293B" strokeWidth="8" fill="transparent" />
                                  <circle 
                                    cx="72" 
                                    cy="72" 
                                    r="62" 
                                    stroke="#6366F1" 
                                    strokeWidth="8" 
                                    fill="transparent" 
                                    strokeDasharray={2 * Math.PI * 62}
                                    strokeDashoffset={2 * Math.PI * 62 * (1 - activeLevelData.matchPercentage / 100)}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <span className="absolute text-3xl font-black text-slate-100">{activeLevelData.matchPercentage}%</span>
                              </div>

                              <p className="text-[11px] text-slate-400 leading-normal max-w-[200px]">
                                Your skills catalog matches **{activeLevelData.matchPercentage}%** of target job requirements.
                              </p>
                            </div>

                            {/* Skills breakdown grids */}
                            <div className="glass-card p-6 rounded-2xl md:col-span-2 space-y-6">
                              <div className="space-y-3">
                                <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4" /> Matched Technologies ({activeLevelData.skills.length})
                                </h5>
                                <div className="flex flex-wrap gap-2.5">
                                  {activeLevelData.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="border-t border-slate-900 pt-5 space-y-3">
                                <h5 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4" /> Identified Deficits ({activeLevelData.missing.length})
                                </h5>
                                <div className="flex flex-wrap gap-2.5">
                                  {activeLevelData.missing.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Secondary Charts / Insights panel */}
                          <div className="grid lg:grid-cols-3 gap-8">
                            <div className="glass-card p-6 rounded-2xl lg:col-span-2 space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Evaluated Domain Blueprint</h4>
                              <div className="min-h-[250px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={260}>
                                  <RadarChart cx="50%" cy="50%" radius="75%" data={activeLevelData.radarData}>
                                    <PolarGrid stroke="#1E293B" />
                                    <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={11} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                                    <Radar name="Candidate Spectrum" dataKey="A" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} />
                                  </RadarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* LLM Insight text block */}
                            <div className="glass-card p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                              <div className="space-y-3">
                                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <Sparkles className="w-4 h-4 text-cyan-400" /> AI Diagnostic Summary
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                  "You show strong capabilities in **{activeLevelData.skills.slice(0, 2).join(', ')}** matching the targeted job level. However, a significant gap exists in microservice structures and telemetry tools like **{activeLevelData.missing.slice(0, 2).join(', ')}**."
                                </p>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  Your adaptive interview will prioritize testing these gap regions to evaluate structural understanding and compensatory knowledge.
                                </p>
                              </div>

                              <button 
                                onClick={() => setDashboardTab('interview')}
                                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
                              >
                                Launch Adaptive Interview
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 4: INTERVIEW ROOM */}
                  {dashboardTab === 'interview' && (
                    <motion.div 
                      key="interview"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-8 text-left"
                    >
                      {!analysisComplete ? (
                        <div className="glass-card p-12 rounded-2xl text-center space-y-4">
                          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
                          <h4 className="font-bold text-base">Intake Vetting Required</h4>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto">Please upload your resume and targeted job spec inside the **Document Upload** tab before launching the interview sandboxed room.</p>
                          <button onClick={() => setDashboardTab('upload')} className="px-6 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white">Go to Uploader</button>
                        </div>
                      ) : !interviewStarted ? (
                        /* Startup Lobby */
                        <div className="max-w-2xl mx-auto glass-card p-8 rounded-2xl space-y-6 text-center">
                          <Brain className="w-12 h-12 text-indigo-400 mx-auto" />
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold">Lobby: AI Technical Assessment</h3>
                            <p className="text-xs text-slate-400 leading-normal">
                              You are entering a structured interview matching **{candidateLevel}** criteria.
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-left space-y-3 text-xs text-slate-300 leading-normal">
                            <div className="flex items-center gap-2 text-indigo-400 font-bold">
                              <Clock className="w-4 h-4" /> Sandbox Guidelines
                            </div>
                            <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                              <li>The interview comprises 5 adaptive questions.</li>
                              <li>Submit detailed answers. Aim for technical vocabulary.</li>
                              <li>Answers are evaluated instantly on Accuracy, Depth, and Clarity.</li>
                              <li>Next questions adjust difficulty based on performance metrics.</li>
                            </ul>
                          </div>

                          <button 
                            onClick={() => setInterviewStarted(true)}
                            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 mx-auto"
                          >
                            <Play className="w-4 h-4 fill-white" /> Start Sandbox Round
                          </button>
                        </div>
                      ) : (
                        /* Active Interview Sandbox Room */
                        <div className="grid lg:grid-cols-3 gap-8">
                          
                          {/* Left Panel: Avatar & Dialogue Card */}
                          <div className="lg:col-span-2 space-y-6">
                            
                            {/* Header Status Bar */}
                            <div className="glass-card px-5 py-3.5 rounded-xl flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></span>
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">QUESTION {currentQuestionIdx + 1} OF 5</span>
                              </div>
                              <div className="text-xs font-semibold text-slate-400">
                                Difficulty Level: <span className="text-cyan-400">{candidateLevel}</span>
                              </div>
                            </div>

                            {/* Dialogue Card */}
                            <div className="glass-card p-6 rounded-2xl space-y-6 relative overflow-hidden">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
                                  AI
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-200">Lead Technical Interviewer</h4>
                                  <span className="text-[9px] text-slate-500 font-mono block">AGENT MODEL: LLAMA-3.3-70B</span>
                                </div>
                              </div>

                              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-900 relative">
                                <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                                  {activeLevelData.questions[currentQuestionIdx].question}
                                </p>
                              </div>

                              {/* Answer textarea */}
                              <div className="space-y-3.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Candidate Response</label>
                                <textarea 
                                  className="w-full p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500/50 resize-none font-medium placeholder-slate-600 leading-relaxed"
                                  placeholder="Type your structured explanation here. Cite frameworks, algorithms, or DB schemas to back your logic..."
                                  rows={6}
                                  value={currentAnswer}
                                  onChange={(e) => setCurrentAnswer(e.target.value)}
                                  disabled={hasSubmittedAnswer || isSubmittingAnswer}
                                />
                              </div>

                              {/* Buttons panel */}
                              <div className="flex items-center justify-between border-t border-slate-900 pt-4">
                                <button 
                                  onClick={handleResetInterview}
                                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" /> Reset Sandbox
                                </button>

                                <div className="flex items-center gap-3">
                                  {!hasSubmittedAnswer ? (
                                    <button 
                                      onClick={handleSubmitAnswer}
                                      disabled={isSubmittingAnswer}
                                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-bold text-white shadow-md flex items-center gap-2"
                                    >
                                      {isSubmittingAnswer ? (
                                        <>
                                          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Evaluating...
                                        </>
                                      ) : (
                                        <>
                                          <Send className="w-3.5 h-3.5" /> Submit Response
                                        </>
                                      )}
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={handleNextQuestion}
                                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md flex items-center gap-2"
                                    >
                                      Next Question <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Real-time Feedback Reveal (Inline if submitted) */}
                            <AnimatePresence>
                              {hasSubmittedAnswer && currentEvaluation && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  className="glass-card p-6 rounded-2xl space-y-6"
                                >
                                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
                                      <Award className="w-4.5 h-4.5 text-cyan-400" /> Evaluation Report
                                    </h4>
                                    <span className="text-sm font-black text-indigo-400">Score: {currentEvaluation.overall_score}/10</span>
                                  </div>

                                  {/* Score sliders */}
                                  <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                      { label: 'Technical Accuracy', val: currentEvaluation.accuracy },
                                      { label: 'Clarity of Logic', val: currentEvaluation.clarity },
                                      { label: 'Technical Depth', val: currentEvaluation.depth },
                                      { label: 'Communication Grade', val: currentEvaluation.communication },
                                    ].map((score, idx) => (
                                      <div key={idx} className="space-y-1.5">
                                        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                                          <span>{score.label}</span>
                                          <span className="text-slate-200">{score.val}/10</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                                            style={{ width: `${score.val * 10}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Written Feedback block */}
                                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900 text-xs leading-relaxed text-slate-300">
                                    <p className="font-bold text-slate-200 mb-1">Assessor Feedback:</p>
                                    <p>{currentEvaluation.feedback}</p>
                                  </div>

                                  {/* Improvements list */}
                                  <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Improvement Nodes</span>
                                    <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                                      {currentEvaluation.improvements.map((item, index) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Right Sidebar: Metrics and Progress charts */}
                          <div className="space-y-6">
                            
                            {/* Question Progress Tracker */}
                            <div className="glass-card p-6 rounded-2xl space-y-4 text-left">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sandbox Progress</h4>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-300 font-semibold">
                                  <span>Questions Completed</span>
                                  <span>{interviewEvaluations.length} / 5</span>
                                </div>
                                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                                    style={{ width: `${(interviewEvaluations.length / 5) * 100}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="space-y-2 pt-2 text-xs">
                                {activeLevelData.questions.map((q, idx) => {
                                  const evaluated = interviewEvaluations[idx];
                                  const isActive = idx === currentQuestionIdx;
                                  return (
                                    <div key={idx} className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-slate-900/20 border border-transparent">
                                      <span className={`${isActive ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>Q{idx + 1} Status</span>
                                      {evaluated ? (
                                        <span className="text-emerald-400 font-bold font-mono">{evaluated.overall_score} / 10</span>
                                      ) : (
                                        <span className="text-[10px] text-slate-650 font-medium">Pending</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Performance Trend chart (Recharts) */}
                            <div className="glass-card p-6 rounded-2xl space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Accuracy Trend</h4>
                              <div className="min-h-[140px] flex items-center justify-center">
                                {interviewEvaluations.length > 0 ? (
                                  <ResponsiveContainer width="100%" height={140}>
                                    <AreaChart data={interviewEvaluations.map((ev, i) => ({ name: `Q${i+1}`, score: ev.overall_score }))}>
                                      <defs>
                                        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                                        </linearGradient>
                                      </defs>
                                      <XAxis dataKey="name" stroke="#475569" fontSize={9} />
                                      <YAxis domain={[0, 10]} stroke="#475569" fontSize={9} />
                                      <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid #1E293B', fontSize: 10 }} />
                                      <Area type="monotone" dataKey="score" stroke="#6366F1" fillOpacity={1} fill="url(#scoreGrad)" strokeWidth={1.5} />
                                    </AreaChart>
                                  </ResponsiveContainer>
                                ) : (
                                  <span className="text-xs text-slate-500">Awaiting data nodes...</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 5: REPORT */}
                  {dashboardTab === 'report' && (
                    <motion.div 
                      key="report"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-8 text-left"
                    >
                      {interviewEvaluations.length === 0 ? (
                        <div className="glass-card p-12 rounded-2xl text-center space-y-4">
                          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
                          <h4 className="font-bold text-base">Assessment Pending</h4>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto">Please complete the adaptive interview inside the **Interview Room** tab before running compilation analytics.</p>
                          <button onClick={() => setDashboardTab('interview')} className="px-6 py-2.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white">Go to Sandbox</button>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <h3 className="text-2xl font-bold tracking-tight text-slate-100">Hiring Performance Summary</h3>
                              <p className="text-slate-400 text-xs">Official evaluation report benchmarked against recruiter criteria.</p>
                            </div>
                            
                            <button 
                              onClick={handleDownloadReport}
                              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-indigo-400 hover:text-white flex items-center justify-center gap-2 transition-colors self-start sm:self-auto"
                            >
                              <Download className="w-4 h-4" /> Download Executive PDF
                            </button>
                          </div>

                          {/* Top Metric Row */}
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="glass-card p-5 rounded-xl space-y-1.5 text-left">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Profile Target</span>
                              <h4 className="text-lg font-bold text-slate-200">{candidateLevel}</h4>
                            </div>

                            <div className="glass-card p-5 rounded-xl space-y-1.5 text-left">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Average Score</span>
                              <h4 className="text-xl font-bold text-indigo-400">{getAverageScore()} / 10</h4>
                            </div>

                            <div className="glass-card p-5 rounded-xl space-y-1.5 text-left">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Intake Match Index</span>
                              <h4 className="text-xl font-bold text-cyan-400">{activeLevelData.matchPercentage}%</h4>
                            </div>

                            <div className="glass-card p-5 rounded-xl space-y-1.5 text-left border relative">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Hiring Verdict</span>
                              <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${getHiringVerdict().color}`}>
                                  {getHiringVerdict().text}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Graphical Breakdown Row */}
                          <div className="grid lg:grid-cols-3 gap-8">
                            {/* Performance Bar Chart (Recharts) */}
                            <div className="glass-card p-6 rounded-2xl lg:col-span-2 space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question-by-Question Analytics</h4>
                              <div className="min-h-[220px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={220}>
                                  <BarChart data={interviewEvaluations.map((ev, i) => ({ name: `Q${i+1}`, Accuracy: ev.accuracy, Clarity: ev.clarity, Depth: ev.depth }))}>
                                    <XAxis dataKey="name" stroke="#475569" fontSize={9} />
                                    <YAxis domain={[0, 10]} stroke="#475569" fontSize={9} />
                                    <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid #1E293B', fontSize: 10 }} />
                                    <Legend wrapperStyle={{ fontSize: 9 }} />
                                    <Bar dataKey="Accuracy" fill="#6366F1" radius={[2, 2, 0, 0]} />
                                    <Bar dataKey="Clarity" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                                    <Bar dataKey="Depth" fill="#06B6D4" radius={[2, 2, 0, 0]} />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Radial Dimension Spectrum */}
                            <div className="glass-card p-6 rounded-2xl space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assessment Dimension Radar</h4>
                              <div className="min-h-[200px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={200}>
                                  <RadarChart cx="50%" cy="50%" radius="70%" data={activeLevelData.radarData}>
                                    <PolarGrid stroke="#1E293B" />
                                    <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={9} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} />
                                    <Radar name="Scored Grade" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.25} />
                                  </RadarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </div>

                          {/* Strengths & Weaknesses row */}
                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="glass-card p-6 rounded-2xl space-y-4">
                              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" /> Demonstrated Strengths
                              </h4>
                              <ul className="space-y-3 text-xs text-slate-300">
                                <li>**Technical Communication**: Cites standard frameworks and interfaces logic arguments clearly.</li>
                                <li>**Core Fundamentals**: Shows strong vocabulary in **{activeLevelData.skills.slice(0, 2).join(', ')}** indices.</li>
                                <li>**Coherent Explanations**: Demonstrates concise syntax thinking during code descriptions.</li>
                              </ul>
                            </div>

                            <div className="glass-card p-6 rounded-2xl space-y-4">
                              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Focus Deficits (Target Areas)
                              </h4>
                              <ul className="space-y-3 text-xs text-slate-300">
                                <li>**System Limits**: Missed optimal choices regarding **{activeLevelData.missing.slice(0, 2).join(', ')}**.</li>
                                <li>**Edge Cases**: Explanations lacked validation depth for high concurrency limits.</li>
                                <li>**Operational Vetting**: Need deeper familiarity with CI/CD deployment setups.</li>
                              </ul>
                            </div>
                          </div>

                          {/* Recommendations Timeline */}
                          <div className="glass-card p-6 rounded-2xl space-y-4">
                            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Recommended Career Roadmap</h4>
                            <div className="space-y-4 pt-2">
                              {[
                                { title: "Fortify System Scaling Indices", time: "Next 1-2 Weeks", text: `Review architectures regarding caching (Redis) and message systems (Kafka) matching targeted ${candidateLevel} specifications.` },
                                { title: "Incorporate Real-world Performance Demos", time: "Next 3 Weeks", text: "Structure portfolio projects to implement robust database indexing schemas, connection pools, and containerized profiles." },
                                { title: "Re-test Cognitive Sandboxes", time: "Continuous", text: "Repeat adaptive simulations to build fluency describing low-level operational bottlenecks under time constraints." }
                              ].map((rec, i) => (
                                <div key={i} className="flex gap-4 items-start text-xs border-l-2 border-indigo-650 pl-4 py-1">
                                  <div className="flex-grow space-y-1">
                                    <div className="flex justify-between items-center">
                                      <h5 className="font-bold text-slate-200">{rec.title}</h5>
                                      <span className="text-[10px] text-indigo-400 font-bold">{rec.time}</span>
                                    </div>
                                    <p className="text-slate-400 leading-normal">{rec.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
