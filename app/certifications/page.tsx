"use client";

import React, { useState } from "react";
import Link from "next/link";

const allCourses = [
  // Paid Courses (10)
  { name: "AWS Certified Solutions Architect", platform: "Amazon Web Services", duration: 40, category: "Cloud", type: "Paid", link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
  { name: "Google Cloud Professional Data Engineer", platform: "Google Cloud", duration: 50, category: "Cloud", type: "Paid", link: "https://cloud.google.com/certification/data-engineer" },
  { name: "Microsoft Azure Fundamentals", platform: "Microsoft Learn", duration: 30, category: "Cloud", type: "Paid", link: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/" },
  { name: "Certified Ethical Hacker (CEH)", platform: "EC-Council", duration: 40, category: "Cybersecurity", type: "Paid", link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/" },
  { name: "Certified Kubernetes Administrator (CKA)", platform: "CNCF", duration: 24, category: "DevOps", type: "Paid", link: "https://www.cncf.io/certification/cka/" },
  { name: "PMP Certification", platform: "PMI", duration: 35, category: "Management", type: "Paid", link: "https://www.pmi.org/certifications/project-management-pmp" },
  { name: "Salesforce Administrator", platform: "Salesforce", duration: 30, category: "CRM", type: "Paid", link: "https://trailhead.salesforce.com/en/credentials/administrator" },
  { name: "Google Professional Cloud Architect", platform: "Google Cloud", duration: 50, category: "Cloud", type: "Paid", link: "https://cloud.google.com/certification/cloud-architect" },
  { name: "AWS Certified DevOps Engineer", platform: "Amazon Web Services", duration: 45, category: "DevOps", type: "Paid", link: "https://aws.amazon.com/certification/certified-devops-engineer-professional/" },
  { name: "CompTIA Security+", platform: "CompTIA", duration: 30, category: "Cybersecurity", type: "Paid", link: "https://www.comptia.org/certifications/security" },

  // Free Courses (10)
  { name: "Google Data Analytics Certificate", platform: "Coursera", duration: 180, category: "Data", type: "Free", link: "https://grow.google/certificates/data-analytics/" },
  { name: "Python for Everybody", platform: "Coursera", duration: 60, category: "Web Development", type: "Free", link: "https://www.coursera.org/specializations/python" },
  { name: "CS50's Introduction to Computer Science", platform: "Harvard / edX", duration: 60, category: "Web Development", type: "Free", link: "https://cs50.harvard.edu/x/" },
  { name: "AI For Everyone", platform: "Coursera", duration: 10, category: "AI/ML", type: "Free", link: "https://www.coursera.org/learn/ai-for-everyone" },
  { name: "Introduction to Cybersecurity", platform: "Cisco Networking Academy", duration: 20, category: "Cybersecurity", type: "Free", link: "https://www.netacad.com/courses/cybersecurity/intro-cybersecurity" },
  { name: "Deep Learning Specialization", platform: "Coursera / Andrew Ng", duration: 90, category: "AI/ML", type: "Free", link: "https://www.coursera.org/specializations/deep-learning" },
  { name: "Full-Stack Web Development with React", platform: "Coursera", duration: 60, category: "Web Development", type: "Free", link: "https://www.coursera.org/specializations/full-stack-react" },
  { name: "Google IT Support Professional Certificate", platform: "Coursera", duration: 150, category: "IT", type: "Free", link: "https://grow.google/certificates/it-support/" },
  { name: "Machine Learning by Stanford", platform: "Coursera", duration: 60, category: "AI/ML", type: "Free", link: "https://www.coursera.org/learn/machine-learning" },
  { name: "Data Science MicroMasters", platform: "edX", duration: 100, category: "Data", type: "Free", link: "https://www.edx.org/micromasters/mitx-data-science" },
];
const PRIME_COLOR = "#007AFF"; // Modern, deep blue (Equivalent to blue-600/700)
const ACCENT_COLOR = "#10b981"; // Vibrant Green (Equivalent to emerald-500/600)
const BG_COLOR_LIGHT = "#f9fafb"; // Equivalent to gray-50
const CARD_BG = "#ffffff"; // White
const TEXT_COLOR_DARK = "#1f2937"; // Equivalent to gray-800
export default function CertificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const categories = ["All", "AI/ML", "Web Development", "Cloud", "Data", "Cybersecurity", "DevOps", "IT", "Management", "CRM"];
  const types = ["All", "Paid", "Free"];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesType = selectedType === "All" || course.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => a.duration - b.duration);

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

      {/* Hero Section */}
    <header className="text-center mb-16 pt-10">
  {/* Small Badge */}
  <div
    className="inline-block px-4 py-1 text-sm font-medium rounded-full mb-3"
    style={{ color: PRIME_COLOR, backgroundColor: "rgba(0, 122, 255, 0.1)" }}
  >
    Skill Validation
  </div>

  {/* Big Heading */}
  <h1
    className="text-5xl lg:text-6xl font-extrabold tracking-tight"
    style={{ color: TEXT_COLOR_DARK }}
  >
    Showcase Your <span style={{ color: PRIME_COLOR }}>Certifications</span>
  </h1>

  {/* Subtitle */}
  <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
    Highlight your achievements and earned certifications from top platforms.
    Build credibility and stand out in your career with verified skills and
    professional growth opportunities.
  </p>

  {/* Call-to-Action */}
  <div className="mt-8 flex justify-center gap-4">
    <a
      href="#my-certifications"
      className="px-6 py-3 rounded-lg font-semibold text-white shadow"
      style={{ backgroundColor: PRIME_COLOR }}
    >
      View My Certifications
    </a>
    <a
      href="#add-certification"
      className="px-6 py-3 rounded-lg font-semibold border shadow"
      style={{ borderColor: PRIME_COLOR, color: PRIME_COLOR }}
    >
      Add New
    </a>
  </div>
</header>


      <main id="courses" className="max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">📜 Certifications</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/3 text-gray-800 placeholder-gray-500"
          />

          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 w-full md:w-auto"
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 w-full md:w-auto"
            >
              {types.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-shadow border border-gray-200"
            >
              <h3 className={`text-xl font-bold ${course.type === "Paid" ? "text-blue-700" : "text-green-700"}`}>
                {course.name}
              </h3>
              <p className="text-gray-600 mt-1"><strong>Platform:</strong> {course.platform}</p>
              <p className="text-gray-600"><strong>Category:</strong> {course.category}</p>
              <p className="text-gray-600"><strong>Duration:</strong> {course.duration} hours</p>
              <p className={`mt-2 inline-block px-2 py-1 rounded-full text-white font-semibold ${course.type === "Paid" ? "bg-blue-600" : "bg-green-600"}`}>
                {course.type}
              </p>
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full text-center bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                View Course
              </a>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No courses found matching your filters.</p>
        )}
      </main>
    </div>
  );
}
