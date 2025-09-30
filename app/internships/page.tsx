"use client";

import React from "react";
import Link from "next/link";

const internships = [
  {
    company: "Google India",
    role: "Software Engineering Intern",
    category: "Software",
    location: "Bengaluru / Hyderabad",
    stipend: "₹60,000 – ₹1.2 Lakh/month",
    duration: "10–12 Weeks",
    link: "https://careers.google.com",
  },
  {
    company: "Microsoft India",
    role: "Software Development Intern",
    category: "Software",
    location: "Hyderabad / Noida / Bengaluru",
    stipend: "₹70,000 – ₹1.3 Lakh/month",
    duration: "12 Weeks (Summer)",
    link: "https://careers.microsoft.com",
  },
  {
    company: "Amazon India",
    role: "Software Development Intern",
    category: "Software",
    location: "Chennai / Bengaluru / Mumbai",
    stipend: "₹45,000 – ₹60,000/month",
    duration: "8–12 Weeks",
    link: "https://www.amazon.jobs",
  },
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Internship Program",
    category: "IT / Consulting",
    location: "PAN India / Remote",
    stipend: "₹15,000 – ₹25,000/month",
    duration: "2–6 Months",
    link: "https://www.tcs.com/careers",
  },
  {
    company: "Infosys",
    role: "InStep Internship",
    category: "IT / Consulting",
    location: "Bengaluru / Global",
    stipend: "₹35,000 – ₹45,000/month",
    duration: "8–12 Weeks",
    link: "https://www.infosys.com/instep",
  },
  {
    company: "Reliance Industries",
    role: "Internship Program",
    category: "Business / Engineering",
    location: "Mumbai / PAN India",
    stipend: "₹15,000 – ₹30,000/month",
    duration: "6–8 Weeks",
    link: "https://relianceinternship.com",
  },
  {
    company: "Deloitte India",
    role: "Internship Program",
    category: "Consulting",
    location: "Gurgaon / Bengaluru / Mumbai",
    stipend: "₹20,000 – ₹35,000/month",
    duration: "6–12 Weeks",
    link: "https://careers.deloitte.com",
  },
  {
    company: "EY India",
    role: "Internship Program",
    category: "Consulting",
    location: "PAN India",
    stipend: "₹20,000 – ₹30,000/month",
    duration: "8 Weeks",
    link: "https://www.ey.com/en_in/careers",
  },
  {
    company: "Wipro",
    role: "Internship Program",
    category: "IT / Software",
    location: "Chennai / Hyderabad / Virtual",
    stipend: "₹10,000 – ₹20,000/month",
    duration: "3–6 Months",
    link: "https://careers.wipro.com",
  },
  {
    company: "Accenture",
    role: "Summer Internship Program – Technology",
    category: "IT / Technology",
    location: "PAN India",
    stipend: "Varies",
    duration: "May to August 2025",
    link: "https://www.accenture.com/sg-en/careers/jobdetails?id=R00245672_en",
  },
];

export default function InternshipsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow">
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

      {/* Internships Section */}
      <section id="internships" className="px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Current Internship Opportunities</h2>
        <p className="text-gray-600 mb-8">
          Explore top internships across leading companies in India. Click "Apply" to start your application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-blue-700">{internship.company}</h3>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{internship.category}</span>
              </div>
              <p className="text-lg font-medium text-gray-900 mt-2">{internship.role}</p>
              <p className="text-sm text-gray-600 mt-1"><strong>Location:</strong> {internship.location}</p>
              <p className="text-sm text-gray-600"><strong>Stipend:</strong> {internship.stipend}</p>
              <p className="text-sm text-gray-600"><strong>Duration:</strong> {internship.duration}</p>
              <a
                href={internship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
