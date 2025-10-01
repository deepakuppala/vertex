"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

const internships = [
{ company: "Google India", role: "Software Engineering Intern", category: "Software", location: "Bengaluru", stipend: "₹1.2 Lakh/month", duration: "10–12 Weeks", link: "https://careers.google.com/students/internships/", type: "Onsite", size: "MNC", requiredSkills: ["Python", "Algorithms", "React"], verified: true, durationType: "Short-term", collegePartner: true, status: "Open" },
    { company: "Microsoft India", role: "Software Development Intern", category: "Software", location: "Hyderabad / Noida", stipend: "₹1.3 Lakh/month", duration: "12 Weeks", link: "https://careers.microsoft.com/students/us/en/internship-opportunities", type: "Hybrid", size: "MNC", requiredSkills: ["C++", "DSA", "Azure"], verified: true, durationType: "Short-term", collegePartner: true, status: "Hot" },
    { company: "Amazon India", role: "Data Science Intern (ML)", category: "Data Science", location: "Bengaluru", stipend: "₹60,000/month", duration: "8–12 Weeks", link: "https://www.amazon.jobs/en/business_categories/students", type: "Onsite", size: "MNC", requiredSkills: ["Python", "SQL", "ML/PyTorch"], verified: true, durationType: "Short-term", collegePartner: true, status: "Open" },
    { company: "Accenture", role: "Summer Internship Program", category: "Technology", location: "PAN India", stipend: "₹40,000/month", duration: "4 Months", link: "https://www.accenture.com/in-en/careers/jobsearch?param=internship", type: "Hybrid", size: "MNC", requiredSkills: ["Java", "Cloud", "Agile"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "NVIDIA", role: "Graphics Software Intern", category: "Hardware/GPU", location: "Pune", stipend: "₹80,000/month", duration: "6 Months", link: "https://www.nvidia.com/en-us/careers/students/", type: "Onsite", size: "MNC", requiredSkills: ["C++", "CUDA", "Linux"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },

    // Mid-Size & Consulting (Hybrid/Onsite) - URLS UPDATED
    { company: "Deloitte India", role: "Consulting Analyst Intern", category: "Consulting", location: "Mumbai", stipend: "₹35,000/month", duration: "6 Weeks", link: "https://jobs.deloitte.com/in/en/students", type: "Onsite", size: "Mid-Size", requiredSkills: ["Excel", "Business Analysis"], verified: true, durationType: "Weekly", collegePartner: false, status: "Open" },
    { company: "EY India", role: "Tax Technology Intern", category: "Consulting", location: "Gurgaon", stipend: "₹30,000/month", duration: "8 Weeks", link: "https://www.ey.com/en_in/careers/students", type: "Hybrid", size: "Mid-Size", requiredSkills: ["SQL", "Data Modeling"], verified: true, durationType: "Short-term", collegePartner: false, status: "Hot" },
    { company: "VMware", role: "Cloud Security Intern", category: "Cyber Security", location: "Bengaluru", stipend: "₹65,000/month", duration: "4 Months", link: "https://careers.vmware.com/student-programs", type: "Hybrid", size: "MNC", requiredSkills: ["Networking", "Python", "Security"], verified: true, durationType: "Long-term", collegePartner: true, status: "Open" },
    
    // Startups & Remote Opportunities (Remote/Hybrid)
    { company: "DataMind AI", role: "Full Stack Development Intern", category: "Full Stack", location: "Remote (India)", stipend: "₹40,000/month", duration: "6 Months", link: "https://datamind.co", type: "Remote", size: "Startup", requiredSkills: ["React", "Node.js", "MongoDB"], verified: false, durationType: "Long-term", collegePartner: false, status: "Hot" },
    { company: "InfraSoft", role: "Backend Engineer Intern (Go/Python)", category: "Backend", location: "Virtual", stipend: "₹30,000/month", duration: "3 Months", link: "https://infrasoft.in", type: "Remote", size: "Startup", requiredSkills: ["Go", "Python", "APIs"], verified: false, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "ByteWave", role: "Frontend Developer (React)", category: "Frontend", location: "Remote (Preferred)", stipend: "₹20,000/month", duration: "3 Months", link: "https://bytewave.tech", type: "Remote", size: "Startup", requiredSkills: ["React", "CSS/Tailwind"], verified: false, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "Apex Consulting", role: "Cyber Security Analyst Intern", category: "Cyber Security", location: "Gurgaon", stipend: "₹35,000/month", duration: "6 Months", link: "https://apexconsulting.com", type: "Onsite", size: "Mid-Size", requiredSkills: ["Networking", "Linux"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    
    // Adding 38 more diverse listings for 50 total (Generic links retained)
    { company: "Flipkart", role: "E-commerce Analyst Intern", category: "Data", location: "Bengaluru", stipend: "₹55,000/month", duration: "4 Months", link: "#", type: "Hybrid", size: "MNC", requiredSkills: ["SQL", "Excel", "Data Mining"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },
    { company: "Wipro", role: "AI/ML Engineering Intern", category: "AI/ML", location: "Pune", stipend: "₹40,000/month", duration: "6 Months", link: "#", type: "Hybrid", size: "MNC", requiredSkills: ["Python", "TensorFlow", "NLP"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "TCS iON", role: "Digital Marketing Intern", category: "Marketing", location: "Remote", stipend: "₹15,000/month", duration: "3 Months", link: "#", type: "Remote", size: "MNC", requiredSkills: ["SEO", "Content Creation"], verified: true, durationType: "Short-term", collegePartner: true, status: "Hot" },
    { company: "HCLTech", role: "Infrastructure Intern", category: "Cloud/IT", location: "Noida", stipend: "₹30,000/month", duration: "1 Year", link: "#", type: "Onsite", size: "MNC", requiredSkills: ["Linux", "AWS", "Networking"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "InMobi", role: "AdTech Developer Intern", category: "Software", location: "Bengaluru", stipend: "₹90,000/month", duration: "6 Months", link: "#", type: "Onsite", size: "Mid-Size", requiredSkills: ["Java", "Distributed Systems"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },
    { company: "Zerodha", role: "FinTech Analyst Intern", category: "Finance", location: "Remote", stipend: "₹35,000/month", duration: "4 Months", link: "#", type: "Remote", size: "Startup", requiredSkills: ["SQL", "Finance Modeling"], verified: false, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "Paytm", role: "Mobile Development Intern (Android)", category: "Mobile", location: "Delhi", stipend: "₹45,000/month", duration: "3 Months", link: "#", type: "Hybrid", size: "MNC", requiredSkills: ["Kotlin", "Android SDK"], verified: true, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "Swiggy", role: "Operations Research Intern", category: "Data Science", location: "Bengaluru", stipend: "₹50,000/month", duration: "6 Months", link: "#", type: "Onsite", size: "MNC", requiredSkills: ["Optimization", "Python"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },
    { company: "Dream11", role: "Game Developer Intern", category: "Gaming", location: "Mumbai", stipend: "₹40,000/month", duration: "3 Months", link: "#", type: "Hybrid", size: "Mid-Size", requiredSkills: ["C#", "Unity"], verified: false, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "Byju's", role: "Frontend UI/UX Intern", category: "Design", location: "Remote", stipend: "₹25,000/month", duration: "2 Months", link: "#", type: "Remote", size: "MNC", requiredSkills: ["Figma", "HTML/CSS"], verified: true, durationType: "Weekly", collegePartner: false, status: "Open" },
    { company: "Adobe", role: "Research Science Intern", category: "Research", location: "Noida", stipend: "₹95,000/month", duration: "6 Months", link: "https://www.adobe.com/careers/university-programs.html", type: "Onsite", size: "MNC", requiredSkills: ["C++", "ML Theory"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },
    { company: "Cisco", role: "Network Engineer Intern", category: "Networking", location: "Chennai", stipend: "₹50,000/month", duration: "5 Months", link: "https://www.cisco.com/c/en/us/about/careers/students-and-graduates.html", type: "Onsite", size: "MNC", requiredSkills: ["C", "Networking Basics"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "Zomato", role: "Product Management Intern", category: "Product", location: "Delhi", stipend: "₹70,000/month", duration: "3 Months", link: "#", type: "Hybrid", size: "Mid-Size", requiredSkills: ["SQL", "Market Research"], verified: false, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "Urban Company", role: "Growth Hacker Intern", category: "Marketing", location: "Remote", stipend: "₹25,000/month", duration: "6 Months", link: "#", type: "Remote", size: "Startup", requiredSkills: ["SEO", "Analytics"], verified: false, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "TATA Steel", role: "Industrial Automation Intern", category: "Engineering", location: "Jamshedpur", stipend: "₹20,000/month", duration: "3 Months", link: "#", type: "Onsite", size: "MNC", requiredSkills: ["C++", "IoT"], verified: true, durationType: "Short-term", collegePartner: true, status: "Open" },
    { company: "GoJek", role: "Platform Engineer Intern", category: "Backend", location: "Bengaluru", stipend: "₹75,000/month", duration: "6 Months", link: "#", type: "Hybrid", size: "MNC", requiredSkills: ["Go", "Microservices"], verified: false, durationType: "Long-term", collegePartner: false, status: "Hot" },
    { company: "Freshworks", role: "Technical Writer Intern", category: "Content", location: "Remote", stipend: "₹30,000/month", duration: "4 Months", link: "https://www.freshworks.com/company/careers/students-and-graduates/", type: "Remote", size: "Mid-Size", requiredSkills: ["English", "Documentation"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "Ola", role: "Electrical Vehicle Intern", category: "Engineering", location: "Chennai", stipend: "₹35,000/month", duration: "6 Months", link: "#", type: "Onsite", size: "MNC", requiredSkills: ["C", "Electrical Circuits"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "ShareChat", role: "Video Processing Intern", category: "Media", location: "Bengaluru", stipend: "₹40,000/month", duration: "3 Months", link: "#", type: "Onsite", size: "Startup", requiredSkills: ["Python", "Video Encoding"], verified: false, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "Jio Platforms", role: "5G Research Intern", category: "Telecom", location: "Mumbai", stipend: "₹45,000/month", duration: "6 Months", link: "https://careers.jio.com/students-graduates/", type: "Hybrid", size: "MNC", requiredSkills: ["Networking", "C++"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },
    { company: "Razorpay", role: "Payment Gateway Intern", category: "FinTech", location: "Bengaluru", stipend: "₹60,000/month", duration: "4 Months", link: "https://razorpay.com/careers/internships/", type: "Onsite", size: "Mid-Size", requiredSkills: ["Java", "API Testing"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "L&T", role: "Construction Tech Intern", category: "Civil/Eng", location: "Pune", stipend: "₹15,000/month", duration: "6 Weeks", link: "https://www.lntecc.com/careers/internship/", type: "Onsite", size: "MNC", requiredSkills: ["AutoCAD", "Project Planning"], verified: true, durationType: "Weekly", collegePartner: true, status: "Open" },
    { company: "Urban Company", role: "Growth Hacker Intern", category: "Marketing", location: "Remote", stipend: "₹25,000/month", duration: "6 Months", link: "#", type: "Remote", size: "Startup", requiredSkills: ["SEO", "Analytics"], verified: false, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "Unacademy", role: "EdTech Frontend Intern", category: "Frontend", location: "Remote", stipend: "₹35,000/month", duration: "3 Months", link: "#", type: "Remote", size: "Mid-Size", requiredSkills: ["React", "TypeScript"], verified: true, durationType: "Short-term", collegePartner: false, status: "Hot" },
    { company: "Wipro", role: "Cyber Security Analyst", category: "Cyber Security", location: "Hyderabad", stipend: "₹40,000/month", duration: "6 Months", link: "https://careers.wipro.com/internships", type: "Hybrid", size: "MNC", requiredSkills: ["Networking", "Python"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "BYJU'S", role: "Data Science Intern", category: "Data Science", location: "Bengaluru", stipend: "₹45,000/month", duration: "4 Months", link: "#", type: "Hybrid", size: "MNC", requiredSkills: ["Python", "ML Basics"], verified: true, durationType: "Long-term", collegePartner: true, status: "Open" },
    { company: "HCLTech", role: "Software Developer Trainee", category: "Software", location: "Noida", stipend: "₹30,000/month", duration: "6 Months", link: "https://www.hcltech.com/careers/students-graduates", type: "Onsite", size: "MNC", requiredSkills: ["Java", "SQL"], verified: true, durationType: "Long-term", collegePartner: false, status: "Hot" },
    { company: "Infosys", role: "Cloud Solutions Intern", category: "Cloud/IT", location: "Pune", stipend: "₹35,000/month", duration: "3 Months", link: "https://www.infosys.com/careers/internships.html", type: "Remote", size: "MNC", requiredSkills: ["AWS", "Linux"], verified: true, durationType: "Short-term", collegePartner: true, status: "Open" },
    { company: "TCS", role: "Financial Analyst Intern", category: "Finance", location: "Mumbai", stipend: "₹20,000/month", duration: "6 Months", link: "https://www.tcs.com/careers/internships", type: "Onsite", size: "MNC", requiredSkills: ["Excel", "Finance"], verified: true, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "Apex Consulting", role: "Blockchain Developer Intern", category: "FinTech", location: "Remote", stipend: "₹50,000/month", duration: "4 Months", link: "#", type: "Remote", size: "Startup", requiredSkills: ["Go", "Cryptography"], verified: false, durationType: "Long-term", collegePartner: false, status: "Hot" },
    { company: "Wipro", role: "IoT Engineer Intern", category: "Engineering", location: "Hyderabad", stipend: "₹35,000/month", duration: "3 Months", link: "https://careers.wipro.com/internships", type: "Hybrid", size: "MNC", requiredSkills: ["C", "Embedded Systems"], verified: true, durationType: "Short-term", collegePartner: true, status: "Open" },
    { company: "Swiggy", role: "Product Designer Intern", category: "Design", location: "Bengaluru", stipend: "₹60,000/month", duration: "6 Months", link: "#", type: "Onsite", size: "Mid-Size", requiredSkills: ["Figma", "UX/UI"], verified: false, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "Dream11", role: "Data Visualization Intern", category: "Data", location: "Mumbai", stipend: "₹45,000/month", duration: "3 Months", link: "#", type: "Hybrid", size: "Mid-Size", requiredSkills: ["Python", "Tableau"], verified: false, durationType: "Short-term", collegePartner: false, status: "Hot" },
    { company: "Urban Company", role: "Content Writer Intern", category: "Content", location: "Remote", stipend: "₹20,000/month", duration: "4 Months", link: "#", type: "Remote", size: "Startup", requiredSkills: ["Writing", "SEO"], verified: false, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "L&T", role: "CAD Designer Intern", category: "Engineering", location: "Chennai", stipend: "₹18,000/month", duration: "6 Weeks", link: "https://www.lntecc.com/careers/internship/", type: "Onsite", size: "MNC", requiredSkills: ["AutoCAD", "Design"], verified: true, durationType: "Weekly", collegePartner: true, status: "Open" },
    { company: "Razorpay", role: "Mobile QA Intern", category: "QA/Testing", location: "Bengaluru", stipend: "₹30,000/month", duration: "3 Months", link: "https://razorpay.com/careers/internships/", type: "Onsite", size: "Mid-Size", requiredSkills: ["Testing", "Selenium"], verified: true, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "Jio Platforms", role: "Network Testing Intern", category: "Telecom", location: "Mumbai", stipend: "₹35,000/month", duration: "6 Months", link: "https://careers.jio.com/students-graduates/", type: "Hybrid", size: "MNC", requiredSkills: ["Networking", "Python"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },
    { company: "Freshworks", role: "Marketing Analyst Intern", category: "Marketing", location: "Remote", stipend: "₹25,000/month", duration: "3 Months", link: "https://www.freshworks.com/company/careers/students-and-graduates/", type: "Remote", size: "Mid-Size", requiredSkills: ["Analytics", "Excel"], verified: true, durationType: "Short-term", collegePartner: false, status: "Open" },
    { company: "ShareChat", role: "Backend Developer Intern", category: "Backend", location: "Bengaluru", stipend: "₹50,000/month", duration: "6 Months", link: "#", type: "Onsite", size: "Startup", requiredSkills: ["Go", "Redis"], verified: false, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "InMobi", role: "Data Engineer Intern", category: "Data", location: "Remote", stipend: "₹70,000/month", duration: "4 Months", link: "#", type: "Remote", size: "Mid-Size", requiredSkills: ["SQL", "ETL"], verified: true, durationType: "Long-term", collegePartner: false, status: "Hot" },
    { company: "TATA Steel", role: "Mechanical Design Intern", category: "Engineering", location: "Jamshedpur", stipend: "₹22,000/month", duration: "3 Months", link: "#", type: "Onsite", size: "MNC", requiredSkills: ["AutoCAD", "SolidWorks"], verified: true, durationType: "Short-term", collegePartner: true, status: "Open" },
    { company: "Zomato", role: "Business Analyst Intern", category: "Business", location: "Delhi", stipend: "₹25,000/month", duration: "6 Months", link: "#", type: "Hybrid", size: "Mid-Size", requiredSkills: ["Sales", "Communication"], verified: false, durationType: "Long-term", collegePartner: false, status: "Open" },
    { company: "Swiggy", role: "Frontend Developer Intern", category: "Frontend", location: "Bengaluru", stipend: "₹45,000/month", duration: "6 Months", link: "#", type: "Onsite", size: "MNC", requiredSkills: ["React", "TypeScript"], verified: true, durationType: "Long-term", collegePartner: true, status: "Hot" },
    { company: "Dream11", role: "Backend Engineer Intern (Java)", category: "Backend", location: "Mumbai", stipend: "₹55,000/month", duration: "3 Months", link: "#", type: "Hybrid", size: "Mid-Size", requiredSkills: ["Java", "Spring Boot"], verified: false, durationType: "Short-term", collegePartner: false, status: "Open" },
];

export default function InternshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInternships = useMemo(
    () =>
      internships.filter(
        (intern) =>
          intern.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          intern.company.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow">
        <h1 className="text-2xl font-bold">VerteX</h1>
        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/roadmaps">Roadmaps</Link>
          <Link href="/internships">Internships</Link>
          <Link href="/resume">ResumeBuilder</Link>
          <Link href="/interview">Interviewprep</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/hackathon">Hackathons</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/cheatsheets">Cheat Sheets</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6 text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Discover Top Internships in India</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Explore hundreds of internships across leading companies like Google, Microsoft, Amazon, and more. Find your perfect role, gain real-world experience, and jumpstart your career.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search internships by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          />
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* Internship List */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((intern, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700">{intern.company}</h3>
              <p className="mt-2 text-gray-900 font-medium">{intern.role}</p>
              <p className="text-gray-600 mt-1"><strong>Category:</strong> {intern.category}</p>
              <p className="text-gray-600"><strong>Location:</strong> {intern.location}</p>
              <p className="text-gray-600"><strong>Stipend:</strong> {intern.stipend}</p>
              <p className="text-gray-600"><strong>Duration:</strong> {intern.duration}</p>
              <a
                href={intern.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
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
