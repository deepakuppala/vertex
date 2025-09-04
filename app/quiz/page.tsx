"use client";

import React, { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { FiCheckCircle, FiShare2 } from "react-icons/fi";
import { MdOutlineQuiz, MdDownload } from "react-icons/md";
import Link from "next/link";
import "./custom.css";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-8 py-3 flex items-center justify-between shadow">
      <div className="text-xl font-bold">
        Verte<span className="text-white">X</span>
      </div>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/roadmaps">Roadmaps</Link>
        <Link href="/internships">Internships</Link>
        <Link href="/certifications">Certifications</Link>
        <Link href="/cheatsheets">Cheat Sheets</Link>
      </div>
    </nav>
  );
}

type Question = {
  q: string;
  options: string[];
  answer: number;
};

const QUIZ_DATA: Record<string, Question[]> = {
  "Web Development": [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup", "Hyperlinks Text Markup", "HighText Machine Lang"], answer: 0 },
    { q: "Which CSS property changes text color?", options: ["font-weight", "color", "text-style", "font-color"], answer: 1 },
    { q: "Which hook is used for state in React?", options: ["useEffect", "useState", "useContext", "useRef"], answer: 1 },
    { q: "Which is a JS package manager?", options: ["NPM", "HTTP", "TCP", "SSH"], answer: 0 },
    { q: "Which tag is used to include JS?", options: ["<script>", "<js>", "<source>", "<include>"], answer: 0 },
    { q: "What's the default port used by create-react-app dev server?", options: ["3000", "5000", "8080", "4200"], answer: 0 },
    { q: "Which CSS layout is one-dimensional?", options: ["Grid", "Flexbox", "Table", "Block"], answer: 1 },
    { q: "JSX is a syntax extension for which language?", options: ["Java", "JavaScript", "Python", "C#"], answer: 1 },
    { q: "Which tool helps create responsive designs fast?", options: ["Tailwind", "SASS", "jQuery", "Lodash"], answer: 0 },
    { q: "Which meta tag is important for responsive pages?", options: ["<meta name='viewport' ...>", "<meta charset>", "<meta robots>", "<meta refresh>"], answer: 0 },
  ],
  "AI/ML": [
    { q: "What does 'ML' stand for?", options: ["Machine Learning", "Model Logic", "Memory Load", "Matrix Labs"], answer: 0 },
    { q: "Which library is popular for neural networks?", options: ["Pandas", "TensorFlow", "Flask", "Express"], answer: 1 },
    { q: "Supervised learning uses:", options: ["Labeled data", "Unlabeled data", "No data", "Only images"], answer: 0 },
    { q: "Which algorithm is for clustering?", options: ["K-Means", "Linear Regression", "Logistic Regression", "Decision Tree"], answer: 0 },
    { q: "Overfitting means:", options: ["Model fits noise", "Model is too simple", "Training completed", "Model underfits"], answer: 0 },
    { q: "Activation functions are used in:", options: ["Neural Networks", "Databases", "Web servers", "CSS"], answer: 0 },
    { q: "Which is dimensionality reduction technique?", options: ["PCA", "SVM", "RNN", "CNN"], answer: 0 },
    { q: "Loss function is used for:", options: ["Optimization", "Visualization", "Data entry", "Storage"], answer: 0 },
    { q: "Which optimizes neural nets?", options: ["Gradient Descent", "Binary Search", "DFS", "BFS"], answer: 0 },
    { q: "GAN stands for:", options: ["Generative Adversarial Network", "General A.I. Network", "Graph Automata Net", "Generic Android Node"], answer: 0 },
  ],
};

function gradeFromScore(scorePercent: number) {
  if (scorePercent >= 90) return "A";
  if (scorePercent >= 75) return "B";
  if (scorePercent >= 60) return "C";
  return "D";
}

function badgeFromScore(scorePercent: number) {
  if (scorePercent >= 90) return { name: "Mastery", color: "bg-amber-400" };
  if (scorePercent >= 75) return { name: "Advanced", color: "bg-green-400" };
  if (scorePercent >= 60) return { name: "Proficient", color: "bg-blue-400" };
  return { name: "Participant", color: "bg-gray-300" };
}

export default function Page() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("");
  const [step, setStep] = useState<"form" | "quiz" | "result">("form");
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [time, setTime] = useState(0);

  const availableRoles = useMemo(() => Object.keys(QUIZ_DATA), []);
  const questions = role ? QUIZ_DATA[role] : [];

  useEffect(() => {
    if (step === "quiz") {
      setAnswers(new Array(questions.length).fill(-1));
      setTime(0);
    }
  }, [step, role, questions.length]);

  // Timer
  useEffect(() => {
    if(step === 'quiz') {
      const timer = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    const copy = [...answers];
    copy[qIndex] = optionIndex;
    setAnswers(copy);
  };

  const submitQuiz = () => {
    if (answers.includes(-1)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const correct = answers.reduce((acc, ans, idx) => acc + (ans === questions[idx].answer ? 1 : 0), 0);
    setScore(correct);
    setStep("result");
  };

  const downloadCertificate = async () => {
    if (!name || !role || score === null) {
      alert("Missing data (name/role/score).");
      return;
    }
    setIsGenerating(true);

    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const img = new Image();
    img.src = "/certificate-template.png";

    img.onload = () => {
      doc.addImage(img, "PNG", 0, 0, 842, 595);
      doc.setFont("Times", "Bold");
      doc.setFontSize(36);
      doc.setTextColor(10, 34, 64);
      doc.text(name, 421, 280, { align: "center" });

      doc.setFont("Times", "Italic");
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text(`For successfully completing the "${role}" quiz`, 421, 320, { align: "center" });

      const percent = Math.round((Number(score) / questions.length) * 100);
      const grade = gradeFromScore(percent);
      doc.setFont("Times", "Normal");
      doc.setFontSize(14);
      doc.text(`Score: ${score} / ${questions.length} (${percent}%)     Grade: ${grade}`, 421, 360, { align: "center" });

      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 421, 395, { align: "center" });

      const badge = badgeFromScore(percent);
      doc.setFillColor(255, 255, 255, 0);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Achievement: ${badge.name}`, 120, 500);

      const verificationUrl = `https://your-site.example.com/verify?name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}&score=${percent}`;
      const qrUrl = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(verificationUrl)}&choe=UTF-8`;

      const qrImg = new Image();
      qrImg.crossOrigin = "anonymous";
      qrImg.src = qrUrl;
      qrImg.onload = () => {
        doc.addImage(qrImg, "PNG", 700, 430, 90, 90);
        doc.save(`${name.replace(/\s+/g, "_")}_certificate.pdf`);
        setIsGenerating(false);
      };

      qrImg.onerror = () => {
        doc.save(`${name.replace(/\s+/g, "_")}_certificate.pdf`);
        setIsGenerating(false);
      };
    };

    img.onerror = () => {
      alert("Certificate template not found. Please upload /certificate-template.png in public folder.");
      setIsGenerating(false);
    };
  };

  const shareUrl = useMemo(() => {
    return `https://your-site.example.com/verify?name=${encodeURIComponent(name)}&role=${encodeURIComponent(role)}`;
  }, [name, role]);

  const percent = score !== null && questions.length ? Math.round((Number(score) / questions.length) * 100) : null;
  const grade = percent !== null ? gradeFromScore(percent) : null;
  const badge = percent !== null ? badgeFromScore(percent) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-start justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Form / Quiz / Result */}
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <MdOutlineQuiz size={36} className="text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Vertex Quiz & Certificate</h1>
              <p className="text-sm text-gray-500">Take the quiz, earn a verified certificate with QR & share it.</p>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {step === "form" && (
              <>
                <h2 className="text-xl text-brown mb-3">Start - Enter details</h2>
                <div className="space-y-3">
                  <input
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select a role / course</option>
                    {availableRoles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => {
                        if (!name || !role) {
                          alert("Please enter your name and select a role.");
                          return;
                        }
                        setStep("quiz");
                      }}
                    >
                      Start Quiz
                    </button>
                    <button
                      className="flex-1 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                      onClick={() => {
                        if(confirm("Are you sure you want to reset?")) {
                          setName("");
                          setRole("");
                        }
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === "quiz" && (
              <>
                <h2 className="quiz-title">Quiz: {role}</h2>
                <p className="quiz-subtitle">Answer the 10 questions. Good luck!</p>

                {/* Timer */}
                <p className="text-xs text-gray-400 mb-2">Time Elapsed: {Math.floor(time/60)}:{('0'+(time%60)).slice(-2)}</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="h-2 rounded bg-green-400 transition-all"
                    style={{ width: `${answers.filter(a => a !== -1).length / questions.length * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{answers.filter(a => a !== -1).length} / {questions.length} answered</p>

                <div className="space-y-5 max-h-[60vh] overflow-auto pr-2 mt-4">
                  {questions.map((qq, qi) => (
                    <div key={qi} className="p-4 border rounded-lg transition hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{qi + 1}. {qq.q}</p>
                        <div className="text-sm text-gray-400">Q{qi + 1}</div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {qq.options.map((opt, oi) => {
                          const selected = answers[qi] === oi;
                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelectAnswer(qi, oi)}
                              className={`px-3 py-1.5 rounded-lg border transition transform duration-200 ${
                                selected ? "bg-blue-600 text-white border-blue-700" : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 hover:scale-105"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      if(confirm("Are you sure you want to go back? Your progress will be lost.")) {
                        setStep("form");
                      }
                    }}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={submitQuiz}
                    className="ml-auto px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                  >
                    Submit Quiz
                  </button>
                </div>
              </>
            )}

            {step === "result" && (
              <>
                <div className="result-header text-center mb-6">
                  <h3 className="text-2xl font-bold text-blue-700">🎉 Quiz Completed</h3>
                  <p className="text-base text-gray-700">
                    Nice work, {name} — see your results below.
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="result-box">
                    <p className="result-label">Score</p>
                    <p className="result-score">{score} / {questions.length}</p>
                    <div className="w-full bg-gray-200 h-3 rounded mt-3">
                      <div
                        className="h-3 rounded bg-gradient-to-r from-green-400 to-blue-600"
                        style={{ width: `${(Number(score) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="result-box grade">
                    <p className="label">Grade</p>
                    <p className="value">{grade}</p>
                    <div className="badge-container mt-2">
                       <div className={`badge-pill ${badge?.color} px-2 py-1 rounded text-xs text-white`}>{badge?.name}</div>
                       <div className="badge-text text-xs text-gray-500">Verified Badge</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      if(confirm("Retake quiz? Previous answers will be lost.")) {
                        setStep("quiz");
                        setScore(null);
                        setAnswers(new Array(questions.length).fill(-1));
                        setTime(0);
                      }
                    }}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                  >
                    Retake
                  </button>

                  <button
                    onClick={downloadCertificate}
                    className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                    disabled={isGenerating}
                  >
                    <MdDownload /> {isGenerating ? "Generating..." : "Download Certificate"}
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Share your certificate: 
                  <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=I scored ${score} in the ${role} quiz! Verify here: ${shareUrl}`} className="text-blue-600 hover:underline mx-1">Twitter</a>
                  |
                  <a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} className="text-blue-600 hover:underline mx-1">LinkedIn</a>
                  |
                  <a target="_blank" rel="noreferrer" href={`https://wa.me/?text=I scored ${score} in ${role} quiz! Verify here: ${shareUrl}`} className="text-green-600 hover:underline mx-1">WhatsApp</a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Certificate Preview */}
        {step !== "form" && (
          <div className="relative flex items-center justify-center p-6">
            <div className="relative w-full shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src="/certificate-template.png" alt="Certificate Preview" className="w-full rounded-2xl" />
              {step === "result" && badge && percent !== null && (
                <>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded text-xs text-white font-bold" style={{ backgroundColor: badge.color.replace("bg-", "") }}>
                    {badge.name} ({percent}%)
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-600 text-white rounded-lg text-sm">
                    Verified Certificate
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
