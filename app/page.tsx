"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md"; // ✅ Dashboard icon

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
      link: "/quiz", // ✅ added link
    },
    {
      title: "Coding Challenges & Practice",
      desc: "Solve mini coding challenges and DSA problems to sharpen your skills and track progress.",
      icon: "💻",
      color: "from-purple-400 to-purple-600",
      link: "/challenges",
    },
  ];

  const [dashboardOpen, setDashboardOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 relative flex">
      {/* Left: Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <nav className="fixed w-full z-50 top-0 left-0 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-blue-600">VerteX</h1>
              <span className="text-sm text-gray-500">by Deepak Uppala</span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link href="/" className="hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <Link href="/roadmaps" className="hover:text-blue-600 font-medium transition">
                Roadmaps
              </Link>
              <Link href="/internships" className="hover:text-blue-600 font-medium transition">
                Internships
              </Link>
              <Link href="/certifications" className="hover:text-blue-600 font-medium transition">
                Certifications
              </Link>
              <Link href="/cheatsheets" className="hover:text-blue-600 font-medium transition">
                Cheat Sheets
              </Link>

              {/* Dashboard Button */}
              <button
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <MdDashboard size={26} className="text-blue-600" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative flex flex-col justify-center items-center text-center py-32 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore. Learn. Achieve.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl mb-8">
            Vertex helps students and professionals explore career roadmaps, take quizzes, solve coding challenges, and track progress on one platform.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/roadmaps"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition"
            >
              Explore Roadmaps
            </Link>
            <Link
              href="/cheatsheets"
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition"
            >
              Access Cheat Sheets
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            🌟 Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const content = (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl text-white shadow-xl hover:scale-105 transform transition-all bg-gradient-to-br ${feature.color} cursor-pointer`}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              );

              return feature.link ? (
                <Link href={feature.link} key={idx}>
                  {content}
                </Link>
              ) : (
                content
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-blue-600 text-center text-white">
          <p>© {new Date().getFullYear()} Vertex. All rights reserved. Built by Deepak Uppala</p>
        </footer>
      </div>

      {/* Right: Dashboard Sidebar */}
      {dashboardOpen && (
        <aside className="w-64 bg-white border-l border-gray-200 shadow-lg p-6 fixed right-0 top-0 h-full flex flex-col z-50">
          <h2 className="text-xl font-bold mb-6 text-blue-600">📊 Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <Link href="/profile" className="hover:text-blue-600 font-medium">My Profile</Link>
            <Link href="/progress" className="hover:text-blue-600 font-medium">Progress Tracker</Link>
            <Link href="/certificates" className="hover:text-blue-600 font-medium">Certificates</Link>
            <Link href="/projects" className="hover:text-blue-600 font-medium">Projects</Link>
            <Link href="/settings" className="hover:text-blue-600 font-medium">Settings</Link>
          </nav>
          <button
            onClick={() => setDashboardOpen(false)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </aside>
      )}
    </main>
  );
}
