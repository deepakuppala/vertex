"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";

export default function Home() {
 const features = [
  { 
    title: "Personalized Dashboard", 
    desc: "Track your roadmap progress, ongoing courses, and upcoming deadlines all in one place.", 
    icon: "📊", 
    color: "from-blue-400 to-blue-600", 
    link: "/dashboard" 
  },
  { 
    title: "Career Quiz & Recommendations", 
    desc: "Take a short quiz to get personalized career path suggestions based on your skills and interests.", 
    icon: "🧩", 
    color: "from-green-400 to-green-600", 
    link: "/quiz" 
  },
  { 
    title: "Coding Challenges & Practice", 
    desc: "Solve mini coding challenges and DSA problems to sharpen your skills and track progress.", 
    icon: "💻", 
    color: "from-purple-400 to-purple-600", 
    link: "/challenges" 
  },
  { 
    title: "Projects Hub", 
    desc: "Work on real-world projects, build your portfolio, and showcase your skills to recruiters.", 
    icon: "🚀", 
    color: "from-pink-400 to-pink-600", 
    link: "/projects" 
  },
  { 
    title: "Hackathons", 
    desc: "Discover nearby college and online hackathons, team up, and compete for exciting prizes.", 
    icon: "🏆", 
    color: "from-yellow-400 to-yellow-600", 
    link: "/hackathons" 
  },
  { 
    title: "Interview Preparation", 
    desc: "Prepare with mock interviews, common questions, and curated resources for cracking your dream job.", 
    icon: "🎯", 
    color: "from-indigo-400 to-indigo-600", 
    link: "/interview-prep" 
  },
  { 
    title: "Resume Builder", 
    desc: "Generate professional resumes and AI-powered portfolios with just a few clicks.", 
    icon: "📄", 
    color: "from-red-400 to-red-600", 
    link: "/resume-builder" 
  },
];


  const stats = [
    { number: "10k+", label: "Students" },
    { number: "50+", label: "Projects" },
    { number: "100+", label: "Colleges" },
  ];

  const testimonials = [
    { name: "Ananya", text: "Vertex helped me land my first internship! 🚀" },
    { name: "Rahul", text: "The roadmap section kept me on track and confident." },
    { name: "Sneha", text: "The resume builder is 🔥 – super easy and professional." },
  ];

  const trustedBy = [
    { name: "Mallareddy University", logo: "/logos/mru.png" },
    { name: "KL University", logo: "/logos/download.png" },
    { name: "CMR", logo: "/logos/cmr.jpeg" },
    { name: "VNR VJIET", logo: "/logos/vnr.jpeg" },
    { name: "MLRIT", logo: "/logos/download.jpeg" },
    { name: "GRIET", logo: "/logos/griet.png" },
    { name: "Anurag University", logo: "/logos/anurag.jpeg"},
    { name: "GITAM Hyderabad", logo: "/logos/gitam.jpeg"}
  ];

  const resources = [
    { title: "What is AI?", desc: "Learn the fundamentals of Artificial Intelligence and its applications.", link: "https://en.wikipedia.org/wiki/Artificial_intelligence" },
    { title: "What is Software?", desc: "Understand the basics of software, types, and development process.", link: "https://en.wikipedia.org/wiki/Software" },
    { title: "Machine Learning Basics", desc: "Introduction to ML concepts, algorithms, and real-world applications.", link: "https://en.wikipedia.org/wiki/Machine_learning" },
    { title: "Data Structures & Algorithms", desc: "Learn about essential data structures and algorithms for problem-solving.", link: "https://en.wikipedia.org/wiki/Data_structure" },
    { title: "Cloud Computing Overview", desc: "Understand cloud concepts, services, and deployment models.", link: "https://en.wikipedia.org/wiki/Cloud_computing" }
  ];

  const topTools = [
    { name: "GitHub", logo: "/logos/github.png", link: "https://github.com" },
    { name: "VS Code", logo: "/logos/vscode.jpeg", link: "https://code.visualstudio.com/" },
    { name: "Kaggle", logo: "/logos/kaggle.png", link: "https://www.kaggle.com/" },
    { name: "Figma", logo: "/logos/figma.png", link: "https://www.figma.com/" },
    { name: "Jupyter Notebook", logo: "/logos/jupitar.png", link: "https://jupyter.org/" }
  ];

 const hackathons = [
  {
    title: "AIGNITE AI 2025",
    host: "MRU",
    date: "Oct 12-14, 2025",
    desc: "Compete in AI-powered challenges, showcase your ML skills, and win exciting prizes.",
    link: "https://www.mru.edu.in/aignite-ai"
  },
  {
    title: "CodeFest 2025",
    host: "KL University",
    date: "Nov 5-7, 2025",
    desc: "Showcase your coding and problem-solving skills with live challenges and hackathons.",
    link: "https://www.kluniversity.in/codefest"
  },
  {
    title: "TechNova Hack",
    host: "CMR College",
    date: "Nov 20-22, 2025",
    desc: "Work on real-world projects and innovative solutions in a competitive environment.",
    link: "https://www.cmrcet.ac.in/technova"
  },
  {
    title: "InnovateAI",
    host: "Anurag University",
    date: "Dec 2-4, 2025",
    desc: "Hackathon focused on AI, ML, and IoT solutions. Prizes for best projects.",
    link: "https://www.anurag.edu.in/innovateai"
  },
  {
    title: "SmartCode Challenge",
    host: "GITAM Hyderabad",
    date: "Dec 15-17, 2025",
    desc: "Collaborate, code, and create amazing projects to win recognition and rewards.",
    link: "https://www.gitam.edu/hyderabad"
  }
]

const faqs = [
  {
    q: "What is Vertex?",
    a: "Vertex is a free platform designed for B.Tech students to explore career roadmaps, take quizzes, solve coding challenges, build resumes, and track their learning progress."
  },
  {
    q: "Do I need to pay anything to use Vertex?",
    a: "No! Vertex is 100% free for all B.Tech students. You get access to all features without any premium plans."
  },
  {
    q: "Can I build my resume on Vertex?",
    a: "Yes! You can create professional resumes and AI-powered portfolios quickly and easily."
  },
  {
    q: "Are the hackathons listed real?",
    a: "Absolutely! All hackathons on Vertex are curated from colleges and verified online platforms."
  },
  {
    q: "Can I track my learning progress?",
    a: "Yes, your dashboard lets you track completed courses, coding challenges, projects, and more—all in one place."
  },
];

  const [dashboardOpen, setDashboardOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 relative flex">
      <div className="flex-1">
        {/* Navbar */}
        <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-lg shadow-md">
  <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
    {/* Logo */}
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-blue-600">VerteX</h1>
      <span className="text-sm text-gray-500">by team careerai</span>
    </div>

    {/* Navigation Links */}
    <div className="hidden md:flex space-x-6 items-center">
      <Link href="/" className="hover:text-blue-600 font-medium transition">Home</Link>
      <Link href="/roadmaps" className="hover:text-blue-600 font-medium transition">Roadmaps</Link>
      <Link href="/internships" className="hover:text-blue-600 font-medium transition">Internships</Link>
      <Link href="/resume" className="hover:text-blue-600 font-medium transition">Resume Builder</Link>
      <Link href="/interview" className="hover:text-blue-600 font-medium transition">Interview Prep</Link>
      <Link href="/projects" className="hover:text-blue-600 font-medium transition">Projects</Link>
      <Link href="/hackathon" className="hover:text-blue-600 font-medium transition">Hackathons</Link>
      <Link href="/certifications" className="hover:text-blue-600 font-medium transition">Certifications</Link>
      <Link href="/cheat-sheets" className="hover:text-blue-600 font-medium transition">Cheat Sheets</Link>

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
        <section className="relative flex flex-col justify-center items-center text-center py-40 bg-gradient-to-r from-blue-500 to-indigo-600 text-white overflow-hidden">
          <div className="relative z-10 animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Explore. Learn. Achieve.</h1>
            <p className="max-w-2xl text-lg md:text-xl mb-8 text-gray-100">
              Vertex helps students and professionals explore career roadmaps, take quizzes, solve coding challenges, and track progress on one platform.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/roadmaps" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:scale-105">Explore Roadmaps</Link>
              <Link href="/cheatsheets" className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition transform hover:scale-105">Access Cheat Sheets</Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white flex justify-center gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold text-blue-600">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </section>

   <section className="py-20 px-8 max-w-7xl mx-auto">
  <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">🌟 Key Features</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {features.map((feature, idx) => (
      <Link
        key={idx}
        href={feature.link || "#"} // fallback if no link
        className={`block p-8 rounded-2xl text-white shadow-xl hover:scale-105 transform transition-all bg-gradient-to-br ${feature.color} relative hover:rotate-1`}
      >
        <div className="text-5xl mb-4">{feature.icon}</div>
        <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
        <p>{feature.desc}</p>
      </Link>
    ))}
  </div>
</section>


        {/* Resources Section */}
        <section className="py-20 bg-gray-100">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Learn from Our Resources 📚</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {resources.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                <h3 className="text-xl font-bold mb-2">{r.title}</h3>
                <p className="text-gray-600 mb-4">{r.desc}</p>
                <Link href={r.link} target="_blank" className="text-blue-600 font-semibold hover:underline">Read More →</Link>
              </div>
            ))}
          </div>
        </section>

        {/* Top Tools Section */}
        <section className="py-20 bg-white">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Top Tools & Platforms 🛠️</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {topTools.map((tool, i) => (
              <a key={i} href={tool.link} target="_blank" className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow hover:scale-105 transition w-36">
                <img src={tool.logo} alt={tool.name} className="h-16 w-16 object-contain mb-2"/>
                <p className="text-gray-700 font-semibold text-center">{tool.name}</p>
              </a>
            ))}
          </div>
        </section>

   {/* 🌟 Futuristic Hackathons Section */}
<section className="py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden w-full">
  <h2 className="text-5xl font-extrabold text-center mb-16 drop-shadow-lg">🔥 Upcoming Hackathons</h2>

  <div className="max-w-7xl mx-auto flex gap-10 overflow-x-auto px-4 md:px-12 snap-x snap-mandatory scrollbar-hide">
    {hackathons.map((h, i) => (
      <div
        key={i}
        className="snap-center flex-shrink-0 w-80 md:w-96 p-6 bg-gradient-to-br from-purple-700 to-indigo-600 rounded-3xl shadow-2xl transform hover:scale-105 hover:-rotate-2 transition-all duration-500 cursor-pointer relative"
      >
        <span className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-1 font-bold rounded-full shadow-lg animate-pulse">
          {h.date.split(",")[0]}
        </span>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <span>🚀</span> {h.title}
          </h3>
          <p className="text-sm text-gray-200 mb-2">Hosted by: <span className="font-semibold">{h.host}</span></p>
          <p className="text-gray-300 mb-4">{h.date}</p>
          <p className="text-gray-100">{h.desc}</p>
        </div>
        <a
          href={h.link}
          target="_blank"
          className="mt-6 inline-block px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition transform text-center"
        >
          Register Now
        </a>
      </div>
    ))}
  </div>
</section>

        {/* Trusted Colleges Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden">
          <h3 className="text-center text-3xl font-extrabold text-gray-700 mb-12">Trusted by Top Colleges & Students 🚀</h3>
          <div className="flex gap-8 overflow-x-auto px-8 snap-x snap-mandatory scrollbar-hide animate-marquee">
            {trustedBy.map((college, idx) => (
              <div key={idx} className="snap-center flex-shrink-0 w-36 h-36 bg-white rounded-full shadow-lg flex flex-col items-center justify-center p-4 hover:scale-110 transition-transform duration-500">
                <img src={college.logo} alt={college.name} className="h-16 w-16 object-contain mb-2"/>
                <p className="text-gray-600 font-semibold text-sm text-center">{college.name}</p>
              </div>
            ))}
          </div>
        </section>
{/* 🌟 Blog / News Section */}
<section className="py-20 bg-white">
  <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">📰 Latest Career & Tech Insights</h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {[
      {
        title: "Top 10 Skills to Put on Your Resume in 2025",
        desc: "Discover the most in-demand skills that employers are seeking in 2025.",
        link: "https://www.forbes.com/sites/rachelwells/2025/01/23/top-10-skills-to-include-in-your-resume/",
        img: "/logos/jing.jpeg"
      },
      {
        title: "Practice for Cracking Any Coding Interview",
        desc: "Ace your technical interviews with our comprehensive preparation guide.",
        link: "https://www.geeksforgeeks.org/practice-for-cracking-any-coding-interview/",
        img: "/logos/iter.jpeg"
      },
      {
        title: "How AI is Transforming Software Development",
        desc: "Explore how AI is reshaping software development processes and practices.",
        link: "https://www.techradar.com/pro/how-ai-is-transforming-software-development-for-the-better",
        img: "/logos/ai.jpeg"
      },
    ].map((blog, idx) => (
      <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300">
        <img src={blog.img} alt={blog.title} className="w-full h-40 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-gray-600 mb-4">{blog.desc}</p>
          <a 
            href={blog.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline"
          >
            Read More
          </a>
        </div>
      </div>
    ))}
  </div>
</section>
{/* 🌟 Mallareddy University – Featured Section */}
<section className="py-24 bg-gradient-to-r from-blue-50 via-white to-blue-50 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
    
    {/* University Logo */}
    <div className="flex-shrink-0 relative">
      <img
        src="/logos/mru.png"
        alt="Mallareddy University"
        className="h-48 w-48 object-contain rounded-full shadow-2xl border-4 border-blue-500"
      />
      <span className="absolute top-0 -right-4 bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded-full shadow-lg text-sm animate-pulse">
        Your University!
      </span>
    </div>

    {/* Recognition & Features */}
    <div className="text-center md:text-left flex-1">
      <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        🎓 Mallareddy University – Campus of Excellence
      </h2>
      <p className="text-gray-700 text-lg mb-6 max-w-xl">
        MRU is a hub of innovation and talent in Hyderabad. Active tech societies, hackathons, and collaborations empower students to shape their future.
      </p>

      {/* Stats */}
      <div className="flex justify-center md:justify-start gap-6 mb-6 flex-wrap">
        <div className="bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-bold text-blue-600">12k+</h3>
          <p className="text-gray-600 text-sm">Students</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-bold text-blue-600">8</h3>
          <p className="text-gray-600 text-sm">Active Clubs</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-bold text-blue-600">20+</h3>
          <p className="text-gray-600 text-sm">Hackathons Hosted</p>
        </div>
      </div>

      {/* Active Clubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[
          { name: "MLSC", logo: "/logos/mlsc.png" },
          { name: "GDG", logo: "/logos/gdg.png" },
          { name: "Alan Turing Club", logo: "/logos/alan.png" },
        ].map((club, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition flex flex-col items-center">
            <img src={club.logo} alt={club.name} className="h-16 w-16 mb-2 object-contain" />
            <h4 className="font-semibold text-blue-600">{club.name}</h4>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="https://www.mrucolleges.edu.in/"
          target="_blank"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition transform hover:scale-105"
        >
          Visit MRU Official Site
        </a>
        <a
          href="/clubs?college=mru"
          className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-xl shadow hover:bg-yellow-500 transition transform hover:scale-105"
        >
          Explore MRU Clubs
        </a>
      </div>
    </div>
  </div>

  {/* Hall of Fame / Achievements Carousel */}
  <div className="mt-16 max-w-7xl mx-auto px-8">
    <h3 className="text-3xl font-bold text-blue-700 mb-6 text-center">🏆 MRU Hall of Fame</h3>
    <div className="overflow-x-auto flex gap-6 scrollbar-hide animate-marquee">
      {[
        { title: "AIGNITE AI Winner", year: "2025", img: "/logos/hackathon1.png" },
        { title: "Best Project Award", year: "2024", img: "/logos/hackathon2.png" },
        { title: "Google Cloud Challenge Top 3", year: "2023", img: "/logos/hackathon3.png" },
        { title: "Robotics League Champions", year: "2023", img: "/logos/hackathon4.png" },
      ].map((item, idx) => (
        <div key={idx} className="flex-shrink-0 w-60 bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition flex flex-col items-center">
          <img src={item.img} alt={item.title} className="h-24 w-24 object-contain mb-2" />
          <h4 className="font-semibold text-blue-600 text-center">{item.title}</h4>
          <p className="text-gray-600 text-sm">{item.year}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Decorative Background */}
  <div className="absolute inset-0 -z-10 opacity-20">
    <svg className="w-full h-full" viewBox="0 0 1440 320">
      <path
        fill="#3b82f6"
        fillOpacity="0.05"
        d="M0,160L80,144C160,128,320,96,480,85.3C640,75,800,85,960,106.7C1120,128,1280,160,1360,176L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>
  </div>
</section>

{/* 🌟 Newsletter / Subscribe Section */}
<section className="py-20 bg-gray-50">
  <div className="max-w-2xl mx-auto text-center px-4">
    <h2 className="text-4xl font-extrabold mb-6 text-gray-800">📬 Stay Updated!</h2>
    <p className="text-gray-600 mb-8">
      Subscribe to our newsletter for the latest career tips, hackathon alerts, and tech resources.
    </p>
    <form 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST" 
      className="flex flex-col sm:flex-row justify-center gap-4"
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        className="px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
      >
        Subscribe
      </button>
    </form>
    <p className="text-gray-400 mt-4 text-sm">
      We respect your privacy. Unsubscribe at any time.
    </p>
  </div>
</section>


<section className="py-20 bg-gray-100">
  <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">❓ Frequently Asked Questions</h2>
  <div className="max-w-4xl mx-auto space-y-6">
    {faqs.map((f, i) => (
      <details key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <summary className="font-semibold text-blue-600 cursor-pointer">{f.q}</summary>
        <p className="mt-2 text-gray-700">{f.a}</p>
      </details>
    ))}
  </div>
</section>




        {/* Footer */}
        <footer className="py-12 bg-blue-600 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">🚀 Ready to Boost Your Career?</h3>
          <Link href="/signup" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
            Get Started Free
          </Link>
          <p className="mt-6 text-sm">© {new Date().getFullYear()} Vertex. All rights reserved. Built by team careerai</p>
        </footer>
      </div>

      {/* Dashboard Sidebar */}
      {dashboardOpen && (
        <aside className="w-64 bg-white border-l border-gray-200 shadow-lg p-6 fixed right-0 top-0 h-full flex flex-col z-50">
          <h2 className="text-xl font-bold mb-6 text-blue-600">📊 Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            <Link href="/profile" className="hover:text-blue-600 font-medium">My Profile</Link>
            <Link href="/resume" className="hover:text-blue-600 font-medium">Resume Builder</Link>
            <Link href="/progress" className="hover:text-blue-600 font-medium">Progress Tracker</Link>
            <Link href="/certificates" className="hover:text-blue-600 font-medium">Certificates</Link>
            <Link href="/projects" className="hover:text-blue-600 font-medium">Projects</Link>
            <Link href="/settings" className="hover:text-blue-600 font-medium">Settings</Link>
          </nav>
          <button onClick={() => setDashboardOpen(false)} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Close</button>
        </aside>
      )}
    </main>
  );
}
