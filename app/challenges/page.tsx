"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Editor from "@monaco-editor/react";

interface TestCase {
  stdin: string;
  expected?: string;
}

interface Challenge {
  name: string;
  description: string;
  codeStarter: string;
  language: string;
  testCases: TestCase[];
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  hint?: string;
}

// Sample 10+ challenges (expandable to 30+)
const sampleChallenges: Challenge[] = [
  {
    name: "Sum of Two Numbers",
    description: "Given two integers a and b, return their sum.",
    codeStarter: "def solve(a, b):\n    # write your code here\n    return 0",
    language: "71",
    testCases: [
      { stdin: "1 2", expected: "3" },
      { stdin: "5 7", expected: "12" },
    ],
    difficulty: "Easy",
    tags: ["Math", "Easy"],
    hint: "Use the + operator.",
  },
  {
    name: "Reverse a String",
    description: "Given a string s, return it reversed.",
    codeStarter: "def reverse_string(s):\n    # write your code here\n    return s",
    language: "71",
    testCases: [
      { stdin: "hello", expected: "olleh" },
      { stdin: "world", expected: "dlrow" },
    ],
    difficulty: "Easy",
    tags: ["String", "Easy"],
    hint: "Use slicing: s[::-1]",
  },
  // Add more challenges here up to 30
];

export default function Challenges() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(
    sampleChallenges[0]
  );
  const [code, setCode] = useState(currentChallenge?.codeStarter || "");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [runHistory, setRunHistory] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [simpliTC, setSimpliTC] = useState<string>("");

  const selectChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setCode(challenge.codeStarter);
    setResults([]);
    setSimpliTC("");
  };

  const runCode = async () => {
    if (!currentChallenge) return;
    setLoading(true);
    setResults([]);
    setSimpliTC("");

    try {
      const startTime = performance.now();
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language_id: Number(currentChallenge.language),
          testCases: currentChallenge.testCases,
        }),
      });
      const data = await res.json();
      const endTime = performance.now();

      if (data.results) {
        const newResults: string[] = data.results.map((result: any, idx: number) => {
          const output: string = result.stdout?.trim() || "";
          const expected: string = currentChallenge.testCases[idx].expected?.trim() || "";
          if (!expected) return "⚠ No expected output";
          return output === expected
            ? `✅ Passed (Output: ${output})`
            : `❌ Failed (Expected: ${expected}, Got: ${output || "No Output"})`;
        });

        setResults(newResults);
        setRunHistory([
          ...runHistory,
          `Run at ${new Date().toLocaleTimeString()} (${((endTime - startTime) / 1000).toFixed(2)}s)`,
        ]);

        // Streak tracker
        if (newResults.every((r) => typeof r === "string" && r.startsWith("✅"))) {
          setStreak(streak + 1);
          // Award badge for streak milestone
          if ((streak + 1) % 3 === 0) {
            setBadges([...badges, `🏆 ${streak + 1}-Day Streak!`]);
          }
        } else {
          setStreak(0);
        }

        // SimpliTC: custom feature to summarize test case results
        const passedCount = newResults.filter((r) => r.startsWith("✅")).length;
        const failedCount = newResults.filter((r) => r.startsWith("❌")).length;
        setSimpliTC(`📊 SimpliTC: ✅ ${passedCount} | ❌ ${failedCount}`);

      } else if (data.error) {
        setResults([`Backend error: ${data.error}\nDetails: ${data.details || ""}`]);
      } else {
        setResults(["Failed to execute code"]);
      }
    } catch (err: any) {
      setResults([`Network error: ${err.message || err}`]);
    }

    setLoading(false);
  };

  const panelStyle = {
    background: "#1e1e2f",
    borderRadius: "8px",
    padding: "20px",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  };
  const buttonStyle = (bg: string) => ({
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.2s",
    marginRight: "10px",
  });
  const getResultColor = (res: string) =>
    res.startsWith("✅") ? "#0f0" : res.startsWith("❌") ? "#f55" : "#aaa";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#121212",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Vertex</h1>
        <div>🔥 Streak: {streak} | 🏅 Badges: {badges.join(" ")}</div>
      </nav>

      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        ⚡ Coding Challenges
      </h2>

      {/* Challenge selection */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {sampleChallenges.map((ch) => (
          <button
            key={ch.name}
            onClick={() => selectChallenge(ch)}
            style={buttonStyle("#007bff")}
          >
            {ch.name}
          </button>
        ))}
      </div>

      {currentChallenge && (
        <>
          <div style={{ ...panelStyle, marginBottom: "20px" }}>
            <h2>{currentChallenge.name}</h2>
            <p>
              <strong>Difficulty:</strong> {currentChallenge.difficulty}
            </p>
            <p>
              <strong>Tags:</strong> {currentChallenge.tags.join(", ")}
            </p>
            <p>
              <strong>Description:</strong> {currentChallenge.description}
            </p>
            {currentChallenge.hint && (
              <p>
                <strong>Hint:</strong> {currentChallenge.hint}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Editor */}
            <div style={{ flex: "1 1 500px", ...panelStyle }}>
              <h3>Code Editor</h3>
              <Editor
                height="400px"
                defaultLanguage={currentChallenge.language === "71" ? "python" : "javascript"}
                defaultValue={currentChallenge.codeStarter}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || "")}
              />
            </div>

            {/* Right panel */}
            <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={panelStyle}>
                <h3>Test Cases</h3>
                {currentChallenge.testCases.map((tc, idx) => (
                  <p key={idx} style={{ margin: 0, color: "#0ff" }}>
                    Input: {tc.stdin} | Expected: {tc.expected}
                  </p>
                ))}
              </div>

              <div style={panelStyle}>
                <h3>Results</h3>
                {results.map((res, idx) => (
                  <pre
                    key={idx}
                    style={{
                      background: "#000",
                      color: getResultColor(res),
                      padding: "15px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      overflowX: "auto",
                      whiteSpace: "pre-wrap",
                      marginBottom: "10px",
                    }}
                  >
                    {res}
                  </pre>
                ))}
                {simpliTC && <p style={{ color: "#ff0", fontWeight: "bold" }}>{simpliTC}</p>}
              </div>

              <button
                onClick={runCode}
                style={buttonStyle("#28a745")}
                disabled={loading}
              >
                {loading ? "Running..." : "▶ Run Code"}
              </button>

              {runHistory.length > 0 && (
                <div style={panelStyle}>
                  <h3>🕒 Run History</h3>
                  <ul>{runHistory.map((h, idx) => (<li key={idx}>{h}</li>))}</ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
