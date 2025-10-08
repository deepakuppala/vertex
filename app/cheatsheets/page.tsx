"use client";

import React, { useState } from "react";
import Link from "next/link";
const cheatSheets = [
  // Java
  { name: "Java Programming Cheatsheet", category: "Java", link: "https://introcs.cs.princeton.edu/java/11cheatsheet/" },
  { name: "Java Language Cheat Sheet", category: "Java", link: "https://cs2113f18.github.io/java/JavaCheatSheet.pdf" },

  // Python
  { name: "Python for Data Science Cheat Sheet", category: "Python", link: "https://www.utc.fr/~jlaforet/Suppl/python-cheatsheets.pdf" },
  { name: "Python Cheat Sheet - Code with Mosh", category: "Python", link: "https://cdn.codewithmosh.com/image/upload/v1702942822/cheat-sheets/python.pdf" },

  // HTML
  { name: "HTML Cheat Sheet", category: "HTML", link: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
  { name: "HTML Cheat Sheet - Stanford", category: "HTML", link: "https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf" },

  // CSS
  { name: "CSS Cheat Sheet", category: "CSS", link: "https://www.codewithharry.com/blogpost/css-cheatsheet" },
  { name: "CSS Quick Reference", category: "CSS", link: "https://www3.cs.stonybrook.edu/~pramod.ganapathi/doc/CSE102/CSE102-CheatSheetCSSLong.pdf" },

  // JavaScript
  { name: "JavaScript Cheat Sheet", category: "JavaScript", link: "https://htmlcheatsheet.com/js-cheat-sheet.pdf" },
  { name: "jQuery Cheat Sheet", category: "JavaScript", link: "https://htmlcheatsheet.com/jquery/jQuery-Cheat-Sheet.pdf" },

  // React
  { name: "React Cheat Sheet", category: "React", link: "https://ihatetomatoes.net/wp-content/uploads/2017/01/react-cheat-sheet.pdf" },

  // Node.js
  { name: "Node.js Quick Reference", category: "NodeJS", link: "https://courses.cs.washington.edu/courses/cse154/19su/resources/assets/cheatsheets/node-cheatsheet.pdf" },

  // SQL
  { name: "SQL Quick Reference", category: "SQL", link: "https://www.dbvis.com/wp-content/uploads/2024/04/SQL-Cheat-Sheet.pdf" },
  { name: "MySQL Cheat Sheet", category: "SQL", link: "https://learnsql.com/blog/mysql-cheat-sheet/mysql-cheat-sheet-a4.pdf" },
  { name: "PostgreSQL Cheat Sheet", category: "SQL", link: "https://learnsql.com/blog/postgresql-cheat-sheet/postgresql-cheat-sheet-a4.pdf" },

  // Data Structures & Algorithms
  { name: "Data Structures Cheat Sheet", category: "DSA", link: "https://www.scribd.com/document/875983183/Detailed-DSA-CheatSheet-TCS-Ninja" },
  { name: "Algorithms Cheat Sheet", category: "DSA", link: "https://algs4.cs.princeton.edu/cheatsheet/" },

  // Git & DevOps
  { name: "Git Commands", category: "DevOps", link: "https://education.github.com/git-cheat-sheet-education.pdf" },
  { name: "Docker Cheatsheet", category: "DevOps", link: "https://docs.docker.com/get-started/docker_cheatsheet.pdf" },
  { name: "Linux Commands", category: "DevOps", link: "https://www.loggly.com/wp-content/uploads/2015/05/Linux-Cheat-Sheet-Sponsored-By-Loggly.pdf" },

  // AI/ML
  { name: "Machine Learning Cheatsheet", category: "AI/ML", link: "https://www.datacamp.com/cheat-sheet/machine-learning-cheat-sheet" },
  { name: "Deep Learning Cheatsheet", category: "AI/ML", link: "http://stanford.edu/~shervine/teaching/cs-229/cheatsheet-deep-learning" },
  { name: "TensorFlow Guide", category: "AI/ML", link: "https://www.beoptimized.be/pdf/TensorFlow2Cheatsheet.pdf" },
];

const PRIME_COLOR = "#007AFF"; 
const TEXT_COLOR_DARK = "#1f2937";

export default function CheatSheetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", "Java", "Python", "HTML", "CSS", "JavaScript", "React", "NodeJS", "SQL", "DSA", "DevOps", "AI/ML"
  ];

  const filteredSheets = cheatSheets.filter(sheet => {
    const matchesSearch = sheet.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || sheet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold">VerteX</h1>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/roadmaps" className="hover:underline">Roadmaps</Link>
          <Link href="/internships" className="hover:underline">Internships</Link>
          <Link href="/resume" className="hover:underline">ResumeBuilder</Link>
          <Link href="/interview" className="hover:underline">Interviewprep</Link>
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/hackathon" className="hover:underline">Hackathons</Link>
          <Link href="/certifications" className="hover:underline">Certifications</Link>
          <Link href="/cheatsheets" className="hover:underline">Cheat Sheets</Link>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center mb-16 pt-10">
        <div
          className="inline-block px-4 py-1 text-sm font-medium rounded-full mb-3"
          style={{ color: PRIME_COLOR, backgroundColor: "rgba(0, 122, 255, 0.1)" }}
        >
          Quick References
        </div>
        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: TEXT_COLOR_DARK }}>
          Master Concepts with <span style={{ color: PRIME_COLOR }}>Cheat Sheets</span>
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          Access concise guides, formulas, and tips to accelerate your learning and improve productivity. Perfect for coding, exam prep, and professional growth.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#all-cheatsheets"
            className="px-6 py-3 rounded-lg font-semibold text-white shadow"
            style={{ backgroundColor: PRIME_COLOR }}
          >
            Explore Cheat Sheets
          </a>
          <a
            href="#create-cheatsheet"
            className="px-6 py-3 rounded-lg font-semibold border shadow"
            style={{ borderColor: PRIME_COLOR, color: PRIME_COLOR }}
          >
            Create Your Own
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search cheat sheets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3 text-gray-800 placeholder-gray-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 w-full md:w-auto"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Cheat Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSheets.map((sheet, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-shadow border border-gray-200">
              <h3 className="text-xl font-bold text-blue-700">{sheet.name}</h3>
              <p className="text-gray-600 mt-1"><strong>Category:</strong> {sheet.category}</p>
              <a
                href={sheet.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full text-center bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                View / Download PDF
              </a>
            </div>
          ))}
        </div>

        {filteredSheets.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No cheat sheets found matching your filters.</p>
        )}
      </main>
    </div>
  );
}
