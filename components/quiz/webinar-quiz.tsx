"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Brain,
  ArrowRight,
  RotateCcw,
  Download,
  Lock,
  ArrowLeft,
  ChevronDown,
  Trash2,
  RefreshCw,
  BarChart2,
  Users,
  BookOpen,
  PenLine,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Constants ──────────────────────────────────────────────────────────────
const ADMIN_PASS = "webinar2026";
const STORAGE_KEY = "wbquiz_responses_v1";

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen = "land" | "quiz" | "done" | "admin";
type Answers = Record<number, number | string | null | undefined>;
interface Submission {
  name: string;
  email: string;
  ts: string;
  answers: Answers;
  mcq: number;
}
interface Question {
  id: number;
  type: "mcq" | "long";
  marks: number;
  time: number;
  topic: string;
  q: string;
  opts?: string[];
  ans?: number;
}

// ─── Questions ───────────────────────────────────────────────────────────────
const Qs: Question[] = [
  {
    id: 1, type: "mcq", marks: 1, time: 90, topic: "AI & Water",
    q: "Approximately how much water is consumed by a data center to cool servers and process around 20–50 AI text prompts?",
    opts: ["About 10 ml (a few drops)", "About 500 ml (a standard water bottle)", "About 5 liters (a large bucket)", "Less than 0.01 ml (negligible)"],
    ans: 1,
  },
  {
    id: 2, type: "mcq", marks: 1, time: 90, topic: "Data Centres",
    q: "Why do most large-scale AI data centers prefer locations in cold climates or near cheap electricity sources?",
    opts: ["To attract globally specialized AI engineers", "For redundant high-speed internet connectivity", "To cut cooling costs and minimize energy bills", "Due to international data sovereignty regulations only"],
    ans: 2,
  },
  {
    id: 3, type: "mcq", marks: 1, time: 90, topic: "AI Hardware",
    q: "NVIDIA's Project DIGITS — a personal AI supercomputer intended for homes — consumes power roughly equivalent to which common household appliance?",
    opts: ["A smartphone charger (~5 W)", "A laptop in heavy use (~60 W)", "A household air conditioner (~1500 W)", "A microwave oven (~1000 W)"],
    ans: 2,
  },
  {
    id: 4, type: "mcq", marks: 1, time: 90, topic: "Carbon Footprint",
    q: "Training a single large-scale AI model like GPT-3 is estimated to produce CO₂ emissions roughly equivalent to:",
    opts: ["Charging a smartphone 1,000 times", "A transatlantic round-trip flight for one passenger", "Running a single LED bulb continuously for one year", "Printing 500 pages of documents"],
    ans: 1,
  },
  {
    id: 5, type: "mcq", marks: 1, time: 90, topic: "AI & Climate",
    q: "The 'rebound effect' in AI and energy efficiency means:",
    opts: ["AI systems auto-restart periodically to reduce idle power draw", "Renewable energy grids recover faster when managed by AI", "Efficiency gains from AI lead to higher overall consumption because usage scales up", "AI consistently reduces net energy consumption across all sectors"],
    ans: 2,
  },
  {
    id: 6, type: "mcq", marks: 1, time: 90, topic: "Future Skills",
    q: "Which engineering competency is projected to be MOST in-demand in the next five years due to AI-driven transformation?",
    opts: ["Manual technical drafting and blueprint reading", "AI system integration, workflow automation, and prompt engineering", "Analogue hardware repair and diagnostics", "Traditional project scheduling using Gantt chart software"],
    ans: 1,
  },
  {
    id: 7, type: "mcq", marks: 1, time: 90, topic: "Ethics",
    q: "An AI climate prediction model is trained almost entirely on data from wealthy nations. What is the PRIMARY ethical concern with deploying it globally?",
    opts: ["The model will process queries more slowly in other regions", "It may generate inaccurate and inequitable outcomes for developing nations", "It will automatically increase infrastructure costs worldwide", "Engineers in wealthy nations will gain an unfair career advantage"],
    ans: 1,
  },
  {
    id: 8, type: "mcq", marks: 1, time: 90, topic: "Ethics (UPSC-style)",
    q: "A government uses an AI model to allocate drought-relief funds, but it consistently under-funds rural tribal districts. As an engineer on the team who notices this, what should be your FIRST action?",
    opts: ["Deploy the system — it passed all standard accuracy benchmarks", "Ignore it — resource allocation is a policy matter, not a technical one", "Formally flag the bias, audit training data, and recommend halting deployment until corrected", "Reduce tribal-district relief budgets to align with the model's output"],
    ans: 2,
  },
  {
    id: 9, type: "long", marks: 6, time: 300, topic: "Critical Thinking",
    q: '"AI is a double-edged sword in the fight against climate change."\n\nCritically analyze this statement with real-world examples. Address both:\n(a) The potential of AI to help combat climate change (smart grids, emissions modelling, agriculture, etc.)\n(b) The direct environmental costs of AI systems — energy, water, hardware manufacturing\n\nWhat should engineers and policymakers prioritize to ensure AI becomes a net positive for the planet?',
  },
  {
    id: 10, type: "long", marks: 6, time: 300, topic: "Engineering Ethics",
    q: "You are a junior engineer at a fast-growing tech firm. Your manager asks you to optimize an AI recommendation engine that will increase server energy consumption by 35% but boost company revenue by 40%. Your company has publicly committed to carbon neutrality by 2030.\n\nWhat would you do? Justify your decision considering:\n(a) Ethical responsibility as a professional engineer\n(b) Technical alternatives you might propose instead\n(c) Business, reputational, and regulatory consequences\n\nWould you comply, refuse, or find a middle path — and why?",
  },
];

// ─── Storage utils ────────────────────────────────────────────────────────────
function loadData(): Submission[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") || []; }
  catch { return []; }
}
function saveData(arr: Submission[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch {}
}
function fmtTime(secs: number) {
  const m = Math.floor(secs / 60), s = secs % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

// ─── Main component ───────────────────────────────────────────────────────────
export function WebinarQuiz() {
  // Screen
  const [screen, setScreen] = useState<Screen>("land");

  // Landing
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [landErr, setLandErr] = useState("");

  // Quiz
  const [cq, setCq] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [sel, setSel] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [adv, setAdv] = useState(false);
  const [longText, setLongTextState] = useState("");
  const [longDone, setLongDone] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);

  // Timer
  const [tl, setTl] = useState(0);
  const [tMax, setTMax] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Refs (stable values inside timer/effect callbacks)
  const lockedRef = useRef(false);
  const advRef = useRef(false);
  const selRef = useRef<number | null>(null);
  const cqRef = useRef(0);
  const longTextRef = useRef("");
  const answersRef = useRef<Answers>({});
  const userRef = useRef({ name: "", email: "" });

  // Done
  const [finMCQ, setFinMCQ] = useState(0);

  // Admin
  const [adminPassVal, setAdminPassVal] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [subs, setSubs] = useState<Submission[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  // Keep refs in sync with state
  useEffect(() => { lockedRef.current = locked; }, [locked]);
  useEffect(() => { advRef.current = adv; }, [adv]);
  useEffect(() => { selRef.current = sel; }, [sel]);
  useEffect(() => { cqRef.current = cq; }, [cq]);
  useEffect(() => { answersRef.current = answers; }, [answers]);

  const setLongText = useCallback((val: string) => {
    setLongTextState(val);
    longTextRef.current = val;
  }, []);

  // ── Timer ──────────────────────────────────────────────────────────────────
  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback((secs: number) => {
    stopTimer();
    setTl(secs);
    setTMax(secs);
    setTimerExpired(false);
    timerRef.current = setInterval(() => {
      setTl(prev => {
        if (prev <= 1) {
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  // ── Reset & start question when cq changes ─────────────────────────────────
  useEffect(() => {
    if (screen !== "quiz") return;
    setSel(null); selRef.current = null;
    setLocked(false); lockedRef.current = false;
    setAdv(false); advRef.current = false;
    setShowNextBtn(false);
    setLongDone(false);
    setTimerExpired(false);
    const q = Qs[cq];
    if (q.type === "long") {
      const prev = answersRef.current[cq];
      setLongText(typeof prev === "string" ? prev : "");
    } else {
      setLongText("");
    }
    startTimer(q.time);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cq, screen]);

  // ── Handle timer expiry ────────────────────────────────────────────────────
  useEffect(() => {
    if (!timerExpired) return;
    setTimerExpired(false);
    const q = Qs[cqRef.current];
    if (q.type === "mcq") {
      if (!lockedRef.current) {
        lockedRef.current = true;
        setLocked(true);
        const s = selRef.current;
        setAnswers(prev => {
          const u = { ...prev, [cqRef.current]: s ?? null };
          answersRef.current = u;
          return u;
        });
        setTimeout(() => {
          if (!advRef.current) {
            advRef.current = true;
            setAdv(true);
            proceedToNext();
          }
        }, 900);
      }
    } else {
      if (!advRef.current) {
        advRef.current = true;
        setAdv(true);
        const t = longTextRef.current;
        setAnswers(prev => {
          const u = { ...prev, [cqRef.current]: t };
          answersRef.current = u;
          return u;
        });
        setTimeout(() => proceedToNext(), 600);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerExpired]);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  function proceedToNext() {
    const next = cqRef.current + 1;
    if (next < Qs.length) {
      cqRef.current = next;
      setCq(next);
    } else {
      doFinish();
    }
  }

  function doFinish() {
    stopTimer();
    let mcq = 0;
    Qs.forEach((q, i) => { if (q.type === "mcq" && answersRef.current[i] === q.ans) mcq++; });
    const sub: Submission = {
      name: userRef.current.name,
      email: userRef.current.email,
      ts: new Date().toISOString(),
      answers: { ...answersRef.current },
      mcq,
    };
    const all = loadData();
    all.push(sub);
    saveData(all);
    setFinMCQ(mcq);
    setScreen("done");
  }

  // ── Landing ────────────────────────────────────────────────────────────────
  function startQuiz() {
    const n = nameVal.trim(), e = emailVal.trim();
    if (!n) { setLandErr("Please enter your full name."); return; }
    if (!e || !e.includes("@") || !e.includes(".")) { setLandErr("Please enter a valid email address."); return; }
    setLandErr("");
    userRef.current = { name: n, email: e };
    answersRef.current = {};
    setAnswers({});
    cqRef.current = 0;
    setCq(0);
    setScreen("quiz");
  }

  function restartForNew() {
    setNameVal("");
    setEmailVal("");
    setScreen("land");
  }

  // ── MCQ ────────────────────────────────────────────────────────────────────
  function pick(i: number) {
    if (lockedRef.current) return;
    setSel(i);
    selRef.current = i;
    setTimeout(() => lockMCQ(true), 350);
  }

  function lockMCQ(showBtn: boolean) {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setLocked(true);
    stopTimer();
    const s = selRef.current;
    setAnswers(prev => {
      const u = { ...prev, [cqRef.current]: s ?? null };
      answersRef.current = u;
      return u;
    });
    if (showBtn) setShowNextBtn(true);
  }

  function advance() {
    if (advRef.current) return;
    advRef.current = true;
    setAdv(true);
    stopTimer();
    proceedToNext();
  }

  // ── Long answer ────────────────────────────────────────────────────────────
  function saveLong() {
    if (advRef.current) return;
    advRef.current = true;
    setAdv(true);
    stopTimer();
    setLongDone(true);
    const t = longTextRef.current;
    setAnswers(prev => {
      const u = { ...prev, [cqRef.current]: t };
      answersRef.current = u;
      return u;
    });
    setTimeout(() => proceedToNext(), 600);
  }

  // ── Admin ──────────────────────────────────────────────────────────────────
  function goAdmin() {
    setAdminPassVal(""); setAdminErr(""); setAdminUnlocked(false);
    setScreen("admin");
  }

  function chkAdmin() {
    if (adminPassVal === ADMIN_PASS) {
      setAdminUnlocked(true);
      setSubs(loadData());
      setExpanded(null);
    } else {
      setAdminErr("Incorrect password. Try again.");
    }
  }

  function clearData() {
    if (confirm("This will permanently delete ALL participant responses. Are you sure?")) {
      localStorage.removeItem(STORAGE_KEY);
      setSubs([]);
    }
  }

  function exportCSV() {
    const data = loadData();
    if (!data.length) { alert("No submissions to export yet."); return; }
    let csv = "#,Name,Email,MCQ Score (/8),Submitted At";
    Qs.forEach((q, i) => { csv += `,"Q${i + 1} (${q.topic} — ${q.type})`; });
    csv += "\n";
    data.forEach((d, i) => {
      const row: (string | number)[] = [i + 1, d.name, d.email, d.mcq, d.ts];
      Qs.forEach((q, qi) => {
        if (q.type === "mcq") row.push(d.answers[qi] != null ? q.opts![d.answers[qi] as number] : "Not answered");
        else row.push((d.answers[qi] as string) || "");
      });
      csv += row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quiz_responses_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const timerPct = tMax > 0 ? (tl / tMax) * 100 : 100;
  const isLow = timerPct < 20;
  const q = Qs[cq];

  // ═══════════════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="max-w-2xl mx-auto w-full">
      <AnimatePresence mode="wait">

        {/* ─── LANDING ─── */}
        {screen === "land" && (
          <motion.div key="land"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">AI, Climate &amp; Future Skills Quiz</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">Webinar Pre-Assessment · 10 Questions · 20 Marks</p>
                </div>
              </div>

              {/* Info grid */}
              <div className="bg-muted/50 rounded-xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 shrink-0 text-primary" />
                  <span>8 MCQ — 1 mark · 1 min 30 sec each</span>
                </div>
                <div className="flex items-center gap-2">
                  <PenLine className="h-4 w-4 shrink-0 text-primary" />
                  <span>2 Long answers — 6 marks · 5 min each</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span>Total time ~22 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>Total: 20 marks</span>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full name</label>
                  <input
                    type="text"
                    value={nameVal}
                    onChange={e => setNameVal(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
                    onKeyDown={e => e.key === "Enter" && startQuiz()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={emailVal}
                    onChange={e => setEmailVal(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 text-sm border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
                    onKeyDown={e => e.key === "Enter" && startQuiz()}
                  />
                </div>
              </div>
              {landErr && <p className="text-sm text-destructive mb-4">{landErr}</p>}

              {/* Actions */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={goAdmin}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg text-muted-foreground hover:bg-muted transition"
                >
                  <Lock className="h-4 w-4" />
                  Admin panel
                </button>
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                >
                  Start quiz
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── QUIZ ─── */}
        {screen === "quiz" && (
          <motion.div key={`quiz-${cq}`}
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Question <strong className="text-foreground">{cq + 1}</strong>
                  <span className="text-muted-foreground/60"> / {Qs.length}</span>
                </span>
                <span className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums",
                  isLow ? "text-destructive" : "text-foreground"
                )}>
                  <Clock className="h-4 w-4" />
                  {fmtTime(tl)}
                </span>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1.5 flex-wrap mb-4">
                {Qs.map((_, i) => (
                  <div key={i} className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors duration-200",
                    i < cq ? "bg-primary" : i === cq ? "bg-primary/60 ring-2 ring-primary/30" : "bg-muted border border-border"
                  )} />
                ))}
              </div>

              {/* Timer bar */}
              <div className="h-1 bg-muted rounded-full overflow-hidden mb-5">
                <div
                  className={cn("h-full rounded-full transition-all duration-1000 ease-linear", isLow ? "bg-destructive" : "bg-primary")}
                  style={{ width: `${timerPct}%` }}
                />
              </div>

              {/* Meta badges */}
              <div className="flex items-center flex-wrap gap-2 mb-3">
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
                  q.type === "mcq"
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                    : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                )}>
                  {q.type === "mcq" ? "MCQ" : "Long answer"}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                  {q.marks} mark{q.marks > 1 ? "s" : ""}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                  {q.topic}
                </span>
              </div>

              {/* Question text */}
              <p className="text-[15px] text-foreground leading-relaxed whitespace-pre-wrap mb-5">{q.q}</p>

              {/* MCQ options */}
              {q.type === "mcq" && (
                <div className="space-y-2">
                  {q.opts!.map((opt, i) => {
                    const isCorrect = locked && i === q.ans;
                    const isWrong = locked && i === sel && sel !== q.ans;
                    const isSelected = !locked && i === sel;
                    return (
                      <button
                        key={i}
                        onClick={() => pick(i)}
                        disabled={locked}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150",
                          isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium",
                          isWrong && "border-red-400 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300",
                          isSelected && "border-primary bg-primary/5 text-primary font-medium",
                          !locked && !isSelected && "border-border bg-background text-foreground hover:bg-muted cursor-pointer",
                          locked && !isCorrect && !isWrong && "border-border bg-background text-muted-foreground cursor-default opacity-70"
                        )}
                      >
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                        {isCorrect && <CheckCircle2 className="inline h-4 w-4 ml-2 text-emerald-500" />}
                        {isWrong && <XCircle className="inline h-4 w-4 ml-2 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Long answer */}
              {q.type === "long" && (
                <div>
                  <textarea
                    value={longText}
                    onChange={e => setLongText(e.target.value)}
                    disabled={longDone}
                    placeholder="Write your answer here..."
                    className="w-full min-h-[140px] px-3 py-2.5 text-sm border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition resize-vertical leading-relaxed"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">Aim for a detailed response. 50+ words recommended for full marks.</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-end mt-5 gap-3">
                {q.type === "mcq" && showNextBtn && (
                  <button
                    onClick={advance}
                    disabled={adv}
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                {q.type === "long" && (
                  <button
                    onClick={saveLong}
                    disabled={longDone}
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition"
                  >
                    {longDone ? "Saved!" : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Save &amp; continue
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── DONE ─── */}
        {screen === "done" && (
          <motion.div key="done"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Quiz submitted!</h2>
              <p className="text-sm text-muted-foreground mb-6">Your responses have been saved. Thank you for participating!</p>

              {/* Score card */}
              <div className="bg-muted/50 rounded-xl p-5 mb-6 text-left space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">MCQ score</span>
                  <span className="font-semibold text-foreground">{finMCQ} / 8</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Long answers (Q9 &amp; Q10)</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    Pending review
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-semibold text-foreground">MCQ total</span>
                  <span className="font-bold text-lg text-foreground">{finMCQ} / 8</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-6">
                Long answers (max 12 marks) will be reviewed by the organizer. Full results will be shared at the webinar.
              </p>

              <button
                onClick={restartForNew}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border border-border rounded-lg text-muted-foreground hover:bg-muted transition"
              >
                <RotateCcw className="h-4 w-4" />
                New participant
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── ADMIN ─── */}
        {screen === "admin" && (
          <motion.div key="admin"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              {!adminUnlocked ? (
                /* Login */
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={() => setScreen("land")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg text-muted-foreground hover:bg-muted transition"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <h2 className="text-xl font-semibold text-foreground">Admin panel</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Enter the organizer password to view all participant responses.</p>
                  <div className="flex gap-3 mb-2">
                    <input
                      type="password"
                      value={adminPassVal}
                      onChange={e => setAdminPassVal(e.target.value)}
                      placeholder="Password"
                      className="flex-1 px-3 py-2.5 text-sm border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
                      onKeyDown={e => e.key === "Enter" && chkAdmin()}
                    />
                    <button
                      onClick={chkAdmin}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                    >
                      <Lock className="h-4 w-4" />
                      Unlock
                    </button>
                  </div>
                  {adminErr && <p className="text-sm text-destructive mt-2">{adminErr}</p>}
                </div>
              ) : (
                /* Panel */
                <div>
                  {/* Panel header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold text-foreground">Participant Responses</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => { setSubs(loadData()); setExpanded(null); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-muted-foreground hover:bg-muted transition">
                        <RefreshCw className="h-3.5 w-3.5" /> Refresh
                      </button>
                      <button onClick={exportCSV}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-muted-foreground hover:bg-muted transition">
                        <Download className="h-3.5 w-3.5" /> Download CSV
                      </button>
                      <button onClick={clearData}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-muted-foreground hover:bg-muted transition">
                        <Trash2 className="h-3.5 w-3.5" /> Clear all
                      </button>
                      <button onClick={() => setScreen("land")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-muted-foreground hover:bg-muted transition">
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {[
                      { num: subs.length, lbl: "Participants" },
                      { num: subs.length > 0 ? (subs.reduce((a, d) => a + (d.mcq || 0), 0) / subs.length).toFixed(1) : "—", lbl: "Avg MCQ score" },
                      { num: subs.length > 0 ? Math.max(...subs.map(d => d.mcq || 0)) : "—", lbl: "Top MCQ score" },
                      { num: 20, lbl: "Total marks" },
                    ].map(({ num, lbl }) => (
                      <div key={lbl} className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">{num}</div>
                        <div className="text-xs text-muted-foreground mt-1">{lbl}</div>
                      </div>
                    ))}
                  </div>

                  {/* Table */}
                  {subs.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      No submissions yet. Share this quiz link with participants!
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border bg-muted/30">
                            <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground w-8">#</th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">Name</th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">Email</th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground">MCQ</th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">Long</th>
                            <th className="px-3 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">Submitted</th>
                            <th className="w-8" />
                          </tr>
                        </thead>
                        <tbody>
                          {subs.map((d, idx) => {
                            const dt = new Date(d.ts).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" });
                            const longDoneCount = [8, 9].filter(qi => d.answers[qi] && String(d.answers[qi]).trim().length > 10).length;
                            const isOpen = expanded === idx;
                            return (
                              <Fragment key={idx}>
                                <tr
                                  onClick={() => setExpanded(isOpen ? null : idx)}
                                  className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
                                >
                                  <td className="px-3 py-3 text-muted-foreground text-xs">{idx + 1}</td>
                                  <td className="px-3 py-3 font-medium text-foreground">{d.name}</td>
                                  <td className="px-3 py-3 text-muted-foreground text-xs hidden sm:table-cell">{d.email}</td>
                                  <td className="px-3 py-3">
                                    <span className="font-semibold text-foreground">{d.mcq}</span>
                                    <span className="text-muted-foreground text-xs"> /8</span>
                                  </td>
                                  <td className="px-3 py-3 hidden sm:table-cell">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                                      {longDoneCount}/2
                                    </span>
                                  </td>
                                  <td className="px-3 py-3 text-xs text-muted-foreground hidden md:table-cell">{dt}</td>
                                  <td className="px-3 py-3">
                                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                                  </td>
                                </tr>
                                {isOpen && (
                                  <tr className="bg-muted/20">
                                    <td colSpan={7} className="px-4 py-4">
                                      <div className="space-y-3">
                                        {Qs.map((qq, qi) => {
                                          const a = d.answers[qi];
                                          const isMCQ = qq.type === "mcq";
                                          const correct = isMCQ && a === qq.ans;
                                          const wrong = isMCQ && a != null && a !== qq.ans;
                                          const displayAns = isMCQ
                                            ? (a != null ? qq.opts![a as number] : "Not answered")
                                            : (a && String(a).trim() ? String(a) : "No answer submitted");
                                          return (
                                            <div key={qi} className="bg-card border border-border rounded-lg p-3">
                                              <div className="flex items-start justify-between gap-2 mb-2">
                                                <span className="text-xs font-semibold text-muted-foreground">Q{qi + 1} · {qq.topic}</span>
                                                {isMCQ ? (
                                                  correct
                                                    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-3 w-3" /> +1</span>
                                                    : wrong
                                                      ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"><XCircle className="h-3 w-3" /> 0</span>
                                                      : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground"><AlertCircle className="h-3 w-3" /> Skipped</span>
                                                ) : (
                                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                                                    Pending /6
                                                  </span>
                                                )}
                                              </div>
                                              <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">{displayAns}</p>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Lightbulb hint for first-time visitors */}
      {screen === "land" && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-4 flex items-start gap-2 text-xs text-muted-foreground px-1"
        >
          <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />
          <span>This quiz tests your knowledge on AI, climate change, future skills, and engineering ethics covered in the webinar.</span>
        </motion.div>
      )}
    </div>
  );
}
