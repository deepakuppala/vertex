"use client";

import React, { useState } from "react";
import Link from "next/link";

const cheatSheets = [
  // Java
  { name: "Java Programming Cheatsheet", category: "Java", link: "https://introcs.cs.princeton.edu/11cheatsheet.pdf" },
  { name: "Java Language Cheat Sheet", category: "Java", link: "https://cs2113f18.github.io/java/JavaCheatSheet.pdf" },

  // Python
  { name: "Python for Data Science Cheat Sheet", category: "Python", link: "https://www.utc.fr/~jlaforet/Suppl/python-cheatsheets.pdf" },
  { name: "Python Cheat Sheet - Code with Mosh", category: "Python", link: "https://cdn.codewithmosh.com/image/upload/v1702942822/cheat-sheets/python.pdf" },

  // HTML
  { name: "HTML Cheat Sheet", category: "HTML", link: "https://html.com/wp-content/uploads/html-cheat-sheet.pdf" },
  { name: "HTML Cheat Sheet - Stanford", category: "HTML", link: "https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf" },

  // CSS
  { name: "CSS Cheat Sheet", category: "CSS", link: "https://stonybrook.edu/~mkaiser/css-cheatsheet.pdf" },
  { name: "CSS Quick Reference", category: "CSS", link: "https://websitesetup.org/wp-content/uploads/2015/04/css3-cheat-sheet.pdf" },

  // JavaScript
  { name: "JavaScript Cheat Sheet", category: "JavaScript", link: "https://htmlcheatsheet.com/js-cheat-sheet.pdf" },
  { name: "jQuery Cheat Sheet", category: "JavaScript", link: "https://oscarotero.com/jquerycheatsheet.pdf" },

  // React
  { name: "React Cheat Sheet", category: "React", link: "https://reactcheatsheet.com.pdf" },

  // Node.js
  { name: "Node.js Quick Reference", category: "NodeJS", link: "https://nodejs.dev/static/pdf/nodejs-cheatsheet.pdf" },

  // SQL
  { name: "SQL Quick Reference", category: "SQL", link: "https://www.sqltutorial.org/sql-cheat-sheet/pdf/" },
  { name: "MySQL Cheat Sheet", category: "SQL", link: "https://www.mysqltutorial.org/wp-content/uploads/2014/08/mysql-cheat-sheet.pdf" },
  { name: "PostgreSQL Cheat Sheet", category: "SQL", link: "https://www.postgresql.org/files/documentation/pdf/postgresql-cheat-sheet.pdf" },

  // Data Structures & Algorithms
  { name: "Data Structures Cheat Sheet", category: "DSA", link: "https://www.cs.cmu.edu/~adamchik/15-121/lectures/cheatsheet.pdf" },
  { name: "Algorithms Cheat Sheet", category: "DSA", link: "https://algs4.cs.princeton.edu/cheatsheet/cheatsheet.pdf" },

  // Git & DevOps
  { name: "Git Commands", category: "DevOps", link: "https://education.github.com/git-cheat-sheet-education.pdf" },
  { name: "Docker Cheatsheet", category: "DevOps", link: "https://www.docker.com/sites/default/files/d8/2019-09/docker-cheat-sheet.pdf" },
  { name: "Linux Commands", category: "DevOps", link: "https://www.guru99.com/linux-commands-cheat-sheet.html" },

  // AI/ML
  { name: "Machine Learning Cheatsheet", category: "AI/ML", link: "https://scikit-learn.org/stable/tutorial/machine_learning_map/cheatsheet.pdf" },
  { name: "Deep Learning Cheatsheet", category: "AI/ML", link: "https://deeplearning4j.konduit.ai/docs/cheatsheet" },
  { name: "TensorFlow Guide", category: "AI/ML", link: "https://www.tensorflow.org/resources/learn-ml" },
];

export default function CheatSheetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Java", "Python", "HTML", "CSS", "JavaScript", "React", "NodeJS", "SQL", "DSA", "DevOps", "AI/ML"];

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
        <div className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/roadmaps">Roadmaps</Link>
          <Link href="/internships">Internships</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/cheatsheets">Cheat Sheets</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">📚 Cheat Sheets & PDFs</h1>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
