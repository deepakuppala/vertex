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
{/* --- START: Testimonials Slider (Publicity Section) --- */}
<section className="py-20 bg-blue-50">
    <h2 className="text-3xl font-bold text-center mb-12 text-blue-700">Hear From Our Satisfied Students 🎤</h2>
    <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto px-4 md:px-8 pb-4 snap-x snap-mandatory">
        {testimonials.map((t, idx) => (
            <div 
                key={idx} 
                className="flex-shrink-0 w-80 p-6 bg-white rounded-2xl shadow-xl border-t-4 border-blue-400 hover:shadow-2xl transition duration-300 transform hover:translate-y-[-5px]"
            >
                <p className="italic text-gray-700 mb-4 text-lg">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-3xl">⭐</span>
                    <p className="font-bold text-blue-600">— {t.name}</p>
                </div>
            </div>
        ))}
    </div>
</section>
{/* --- END: Testimonials Slider --- */}
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
{/* --- START: AI Tools Explorer Spotlight (6-Tool Layout) --- */}
<section className="py-20 bg-indigo-50">
    <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-indigo-800">🚀 AI Tools & Platforms Explorer: The Essentials</h2>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Master the most impactful **Generative AI** tools used across coding, content creation, and data science to accelerate your career.
        </p>

        {/* 3x2 Grid for 6 Tools */}
        <div className="grid md:grid-cols-3 gap-8">
            
            {/* Tool Card 1: ChatGPT (Assistant) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 transform hover:translate-y-[-5px] border-b-4 border-purple-400">
                <div className="text-4xl mb-4 text-purple-600">🧠</div>
                <h3 className="text-xl font-bold mb-3 text-purple-800">ChatGPT (OpenAI)</h3>
                <p className="text-sm text-gray-600 mb-4">
                    The general-purpose language model for **complex problem-solving**, brainstorming, concept explanations, and API documentation.
                </p>
                <a href="https://openai.com/chatgpt" target="_blank" className="mt-4 inline-block text-purple-600 font-semibold hover:underline text-sm">
                    Access Platform →
                </a>
            </div>

            {/* Tool Card 2: GitHub Copilot (Coding) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 transform hover:translate-y-[-5px] border-b-4 border-blue-400">
                <div className="text-4xl mb-4 text-blue-600">💻</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">GitHub Copilot / Code Assistants</h3>
                <p className="text-sm text-gray-600 mb-4">
                    AI pair programmer that provides **real-time code suggestions**, auto-completes functions, and writes test cases directly in your IDE.
                </p>
                <a href="https://github.com/features/copilot" target="_blank" className="mt-4 inline-block text-blue-600 font-semibold hover:underline text-sm">
                    Explore Coding AI →
                </a>
            </div>

            {/* Tool Card 3: Midjourney / DALL-E (Generative Design) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 transform hover:translate-y-[-5px] border-b-4 border-red-400">
                <div className="text-4xl mb-4 text-red-600">🖼️</div>
                <h3 className="text-xl font-bold mb-3 text-red-800">Midjourney / DALL-E</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Leading **text-to-image generators** used for rapid prototyping, creating high-quality UI assets, and conceptual design mocks.
                </p>
                <a href="https://openai.com/dall-e-3" target="_blank" className="mt-4 inline-block text-red-600 font-semibold hover:underline text-sm">
                    Start Image Generation →
                </a>
            </div>
            
            {/* Tool Card 4: Canva (Design) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 transform hover:translate-y-[-5px] border-b-4 border-pink-400">
                <div className="text-4xl mb-4 text-pink-600">🎨</div>
                <h3 className="text-xl font-bold mb-3 text-pink-800">Canva AI Design Suite</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Integrates AI tools for **easy visual content creation**, presentations, social media graphics, and quick background removal/editing.
                </p>
                <a href="https://www.canva.com/" target="_blank" className="mt-4 inline-block text-pink-600 font-semibold hover:underline text-sm">
                    Start Designing →
                </a>
            </div>

            {/* Tool Card 5: Gamma (Presentations) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 transform hover:translate-y-[-5px] border-b-4 border-green-400">
                <div className="text-4xl mb-4 text-green-600">📝</div>
                <h3 className="text-xl font-bold mb-3 text-green-800">Gamma / AI Presentations</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Tool that uses AI to convert **text prompts into polished slides, documents, and web pages**—perfect for reports and pitch decks.
                </p>
                <a href="https://gamma.app/" target="_blank" className="mt-4 inline-block text-green-600 font-semibold hover:underline text-sm">
                    Generate Content →
                </a>
            </div>
            
            {/* Tool Card 6: Notion AI (Productivity/Notes) */}
            <div className="bg-white p-6 rounded-xl shadow-2xl hover:shadow-indigo-300/50 transition-all duration-300 transform hover:translate-y-[-5px] border-b-4 border-yellow-400">
                <div className="text-4xl mb-4 text-yellow-600">📋</div>
                <h3 className="text-xl font-bold mb-3 text-yellow-800">Notion AI / Productivity</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Embeds AI directly into **project management and note-taking** to summarize large documents, generate meeting agendas, and organize tasks.
                </p>
                <a href="https://www.notion.so/" target="_blank" className="mt-4 inline-block text-yellow-600 font-semibold hover:underline text-sm">
                    Explore Workspaces →
                </a>
            </div>
        </div>
    </div>
</section>
{/* --- END: AI Tools Explorer Spotlight (UPDATED) --- */}
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
{/* --- START: 5. Latest Opportunities / News --- */}
<section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">🎯 Latest Career Opportunities</h2>
        
        {/* Mock Internships Data (for the tabs) */}
        {(() => {
            const mockInternships = [
                { title: "Software Development Intern", host: "TechCorp Global", deadline: "Jan 15, 2026", link: "/internships/techcorp", type: "Internship" },
                { title: "Data Analyst Internship", host: "QuantLabs Inc.", deadline: "Feb 10, 2026", link: "/internships/quantlabs", type: "Internship" },
                { title: "Cloud Engineering Trainee", host: "Azure Partners", deadline: "Dec 30, 2025", link: "/internships/azure", type: "Internship" },
            ];

            // Combine and sort content (mocking a dynamic feed)
            const opportunityFeed = [
                ...mockInternships.slice(0, 3).map(i => ({ ...i, date: `Deadline: ${i.deadline}` })),
                ...hackathons.slice(0, 2).map(h => ({ ...h, type: "Hackathon", deadline: h.date }))
            ].sort((a, b) => new Date(a.deadline) > new Date(b.deadline) ? 1 : -1);

            return (
                <div className="space-y-8">
                    {/* Dynamic Feed Display */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {opportunityFeed.map((op, idx) => (
                            <a 
                                key={idx} 
                                href={op.link} 
                                className="block p-5 bg-gray-50 rounded-xl shadow hover:shadow-lg transition transform hover:scale-[1.02] border-l-4"
                                style={{ 
                                    borderColor: op.type === 'Hackathon' ? '#ec4899' : '#3b82f6' // Pink for Hackathon, Blue for Internship
                                }}
                            >
                                <p className="text-xs font-bold uppercase mb-1" style={{ color: op.type === 'Hackathon' ? '#db2777' : '#2563eb' }}>
                                    {op.type}
                                </p>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{op.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">Host: {op.host}</p>
                                <p className="text-xs text-red-500 font-semibold">
                                    {op.type === 'Hackathon' ? `Starts: ${op.date}` : `Apply By: ${op.deadline}`}
                                </p>
                            </a>
                        ))}
                    </div>

                    <div className="text-center pt-4">
                        <a href="/opportunities" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition inline-block">
                            View All {opportunityFeed.length}+ Openings →
                        </a>
                    </div>
                </div>
            );
        })()}
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
{/* --- 4️⃣ Community Preview (Forum Teaser) - PRO REVAMPED --- */}
<section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700">⚡ Developer Flow: Peer Discussions & Support</h2>
        <div className="grid md:grid-cols-2 gap-10">
            
            {/* Left Card: Trending Discussions (Dynamic Styling) */}
            <div className="p-8 bg-white rounded-2xl shadow-2xl border-t-8 border-indigo-600">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <span className="text-3xl text-indigo-500">🔥</span> Trending Technical Threads
                </h3>
                <ul className="space-y-3">
                    {/* Discussion Item 1: High-value topic */}
                    <li className="p-4 bg-gray-100 rounded-xl transition hover:bg-gray-200 cursor-pointer border border-gray-200">
                        <p className="text-base font-semibold text-gray-800">
                            The Future of Web Dev: **Signal-based State Management** in Angular vs React?
                        </p>
                        <span className="text-xs text-indigo-500 font-medium">Topic: #FrontendArchitecture | Replies: 124</span>
                    </li>
                    {/* Discussion Item 2: AI/ML topic */}
                    <li className="p-4 bg-gray-100 rounded-xl transition hover:bg-gray-200 cursor-pointer border border-gray-200">
                        <p className="text-base font-semibold text-gray-800">
                            **Hyperparameter Optimization** for Transformers: Best Practices in PyTorch.
                        </p>
                        <span className="text-xs text-indigo-500 font-medium">Topic: #DeepLearning | Replies: 89</span>
                    </li>
                    {/* Discussion Item 3: Backend/Database topic */}
                    <li className="p-4 bg-gray-100 rounded-xl transition hover:bg-gray-200 cursor-pointer border border-gray-200">
                        <p className="text-base font-semibold text-gray-800">
                            Choosing between **Go Channels and Java Concurrency** for high-throughput APIs.
                        </p>
                        <span className="text-xs text-indigo-500 font-medium">Topic: #BackendOps | Replies: 45</span>
                    </li>
                </ul>
                <a href="/forum" className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition">
                    Explore Developer Forum →
                </a>
            </div>

            {/* Right Card: Automated Support / Resource CTA (Visual update) */}
            <div className="p-8 bg-white rounded-2xl shadow-2xl border-b-8 border-green-500 flex flex-col justify-between">
                <div>
                    <h3 className="text-3xl font-bold mb-4 text-green-700 flex items-center gap-2">
                        <span className="text-4xl">💡</span> Instant Resource Library
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                        Access our curated, verified **Cheat Sheets** and use our integrated AI tools for quick answers and debugging help.
                    </p>
                    <ul className="list-disc list-inside text-base text-gray-700 space-y-2 ml-4">
                        <li>AI Debugging Assistance (24/7)</li>
                        <li>Verified Cheat Sheets (SQL, Python, C++)</li>
                        <li>Self-Service Documentation</li>
                    </ul>
                </div>
                <a href="/cheatsheets" className="mt-8 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition">
                    Access Resource Library
                </a>
            </div>
        </div>
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
