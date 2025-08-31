"use client";

import React, { useState } from "react";
import Link from "next/link";

// --- AI Chatbox Component ---
function AIChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { user: true, text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { user: false, text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { user: false, text: "Error: AI response failed." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white rounded-full w-14 h-14 flex justify-center items-center shadow-lg hover:bg-blue-700 transition"
      >
        💬
      </button>

      {open && (
        <div className="mt-4 w-80 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">AI Chat</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="p-4 h-64 overflow-y-auto space-y-3 flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[75%] ${
                  msg.user ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Home Component ---
export default function Home() {
  const features = [
    {
      title: "Personalized Dashboard",
      desc: "Track your roadmap progress, ongoing courses, and upcoming deadlines all in one place.",
      icon: "📊",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Career Quiz & Recommendations",
      desc: "Take a short quiz to get personalized career path suggestions based on your skills and interests.",
      icon: "🧩",
      color: "from-green-400 to-green-600",
      interactive: true,
    },
    {
      title: "Coding Challenges & Practice",
      desc: "Solve mini coding challenges and DSA problems to sharpen your skills and track progress.",
      icon: "💻",
      color: "from-purple-400 to-purple-600",
    },
  ];

  // Other states (dashboard, quiz, etc.) remain the same...
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const dashboardItems = [
    { title: "Frontend Roadmap", progress: 70 },
    { title: "Data Science Path", progress: 40 },
    { title: "AI/ML Projects", progress: 20 },
  ];

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number[]>([]);

  const quizQuestions = [
    { question: "Do you enjoy designing websites?", options: ["Yes", "No"] },
    { question: "Do you like working with data?", options: ["Yes", "No"] },
    { question: "Are you interested in AI/ML?", options: ["Yes", "No"] },
    // ...rest of questions
  ];

  const roles = ["Frontend Developer", "Backend Developer", "AI/ML Engineer", "Data Scientist", "Full-Stack Developer"];
  const roleScores: { [key: string]: number[] } = {
    "Frontend Developer": [0, 8, 13],
    "Backend Developer": [3, 4, 6, 14],
    "AI/ML Engineer": [2, 10, 12],
    "Data Scientist": [1, 7, 11, 12],
    "Full-Stack Developer": [0, 3, 5, 6, 13, 14],
  };
  const calculateResult = () => {
    const scores: { [key: string]: number } = {};
    roles.forEach((role) => (scores[role] = 0));
    quizAnswer.forEach((ans, idx) => {
      Object.keys(roleScores).forEach((role) => {
        if (roleScores[role].includes(idx) && ans === 0) scores[role] += 1;
      });
    });
    const sortedRoles = Object.entries(scores).sort((a, b) => b[1] - a[1]).map((entry) => entry[0]);
    return sortedRoles.slice(0, 2).join(" & ");
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 relative">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Vertex</h1>
          <div className="space-x-6">
            <Link href="/" className="hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/roadmaps" className="hover:text-blue-600 font-medium transition">Roadmaps</Link>
            <Link href="/internships" className="hover:text-blue-600 font-medium transition">Internships</Link>
            <Link href="/certifications" className="hover:text-blue-600 font-medium transition">Certifications</Link>
            <Link href="/cheatsheets" className="hover:text-blue-600 font-medium transition">Cheat Sheets</Link>
          </div>
          <button
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className="ml-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📊 Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center py-32 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore. Learn. Achieve.</h1>
        <p className="max-w-2xl text-lg md:text-xl mb-8">
          Vertex helps students and professionals explore career roadmaps, take quizzes, solve coding challenges, and track progress on one platform.
        </p>
        <div className="flex gap-4">
          <Link href="/roadmaps" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
            Explore Roadmaps
          </Link>
          <Link href="/cheatsheets" className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition">
            Access Cheat Sheets
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">🌟 Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl text-white shadow-xl hover:scale-105 transform transition-all bg-gradient-to-br ${feature.color} cursor-pointer`}
              onClick={() => { if (feature.interactive) setQuizOpen(!quizOpen); }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Quiz */}
        {quizOpen && (
          <div className="mt-12 p-8 bg-gray-100 rounded-xl shadow-lg max-w-2xl mx-auto">
            {quizStep < quizQuestions.length ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">{quizQuestions[quizStep].question}</h3>
                <div className="flex gap-4 flex-wrap">
                  {quizQuestions[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      onClick={() => {
                        setQuizAnswer([...quizAnswer, i]);
                        setQuizStep(quizStep + 1);
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center mt-4">
                <h3 className="text-2xl font-bold">Recommended Careers:</h3>
                <p className="text-xl mt-2 text-blue-600">{calculateResult()}</p>
                <button
                  className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={() => {
                    setQuizStep(0);
                    setQuizAnswer([]);
                  }}
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="py-12 bg-blue-600 text-center text-white">
        <p>© {new Date().getFullYear()} Vertex. All rights reserved.</p>
      </footer>

      {/* --- AI Chatbox --- */}
      <AIChatBox />
    </main>
  );
}
