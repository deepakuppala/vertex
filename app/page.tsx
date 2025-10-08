"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdDashboard, MdExplore, MdLightbulbOutline, MdMilitaryTech } from "react-icons/md"; // Added more icons for the tagline
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

/* ========================
 *   Login / Signup Component
 *   (shows before Home when not signed in)
 *   ======================== */
function AuthPanel({ onSignedIn }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setLoading(false);
      onSignedIn();
    } catch (err) {
      setError(err.message || "Error creating account");
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setLoading(false);
      onSignedIn();
    } catch (err) {
      setError(err.message || "Invalid credentials");
      setLoading(false);
    }
  };

  // --- Theme Constants (Dark Blue) ---
  const PRIMARY_BLUE = '#1E3A8A'; // Deep Navy Blue
  const ROYAL_BLUE = '#3B82F6';   // Royal Blue (Accent)
  const LIGHT_GRAY = '#F8FAFC'; // Background
  const BUTTON_COLOR = mode === "login" ? PRIMARY_BLUE : ROYAL_BLUE;
  const TOGGLE_COLOR = mode === "login" ? ROYAL_BLUE : PRIMARY_BLUE;

  // Placeholder for animations (not functional with inline CSS, but kept for context)
  const fadeIn = "";
  const slideInUp = ""; 
  
  return (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(to bottom right, ${LIGHT_GRAY}, #E0E7FF)`, 
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden',
    }}>
        {/* ======================================================= */}
        {/* LEFT ILLUSTRATION SIDE (Clean, Large Shapes) */}
        {/* ======================================================= */}
        <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '40%', 
            height: '100%',
            pointerEvents: 'none',
        }}>
            {/* Large Deep Blue Shape (Top Left) */}
            <div style={{
                position: 'absolute',
                top: '50px',
                left: '-50px',
                width: '300px',
                height: '300px',
                backgroundColor: PRIMARY_BLUE,
                borderRadius: '50% 50% 50% 0%',
                opacity: '0.15', // Increased opacity for definition
                transform: 'rotate(-45deg)',
            }}></div>
            {/* Medium Royal Blue Circle (Bottom Left) */}
            <div style={{
                position: 'absolute',
                bottom: '50px',
                left: '20px',
                width: '120px',
                height: '120px',
                backgroundColor: ROYAL_BLUE, 
                borderRadius: '50%',
                opacity: '0.25', // Increased opacity
                transform: 'rotate(15deg)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            }}></div>
            {/* Small Navy Dot (Detail) */}
            <div style={{
                position: 'absolute',
                bottom: '150px',
                left: '200px',
                width: '15px',
                height: '15px',
                backgroundColor: PRIMARY_BLUE, 
                borderRadius: '50%',
                opacity: '0.6',
            }}></div>
        </div>

        {/* ======================================================= */}
        {/* RIGHT ILLUSTRATION SIDE (Clean, Large Shapes) */}
        {/* ======================================================= */}
        <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '40%', 
            height: '100%',
            pointerEvents: 'none',
        }}>
            {/* Large Royal Blue Circle (Bottom Right) */}
            <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '350px',
                height: '350px',
                backgroundColor: ROYAL_BLUE,
                borderRadius: '50%',
                opacity: '0.2',
            }}></div>
            {/* Medium Navy Shape (Top Right) */}
             <div style={{
                position: 'absolute',
                top: '10%',
                right: '50px',
                width: '150px',
                height: '80px',
                backgroundColor: PRIMARY_BLUE, 
                borderRadius: '20px 20px 50% 20px',
                opacity: '0.15',
                transform: 'rotate(-20deg)',
            }}></div>
            {/* Small Royal Blue Dot (Detail) */}
            <div style={{
                position: 'absolute',
                bottom: '180px',
                right: '180px',
                width: '15px',
                height: '15px',
                backgroundColor: ROYAL_BLUE, 
                borderRadius: '50%',
                opacity: '0.7',
            }}></div>
        </div>
        {/* ======================================================= */}

        <div 
            // Main Form Card: High Z-index ensures it sits above the illustrations
            style={{
                position: 'relative',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '1.5rem',
                boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -5px rgba(0, 0, 0, 0.05)',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '24rem',
                textAlign: 'center',
                transform: 'scale(1)',
                transition: 'box-shadow 0.3s',
                zIndex: 10, // CRUCIAL: Ensures card is on top
            }}
        >
            
            {/* Brand & Tagline Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem',
            }}>
                <div style={{
                    padding: '1rem',
                    borderRadius: '9999px',
                    background: `linear-gradient(to bottom right, ${PRIMARY_BLUE}, #2563EB)`, 
                    boxShadow: '0 8px 12px -3px rgba(0, 0, 0, 0.2)',
                    marginBottom: '0.75rem',
                }}>
                    <MdDashboard style={{ color: 'white', height: '2.25rem', width: '2.25rem' }} /> 
                </div>
                <h1 style={{
                    fontSize: '2.25rem',
                    fontWeight: '800',
                    color: '#1F2937', 
                    marginBottom: '0.75rem',
                }}>
                    Vertex
                </h1>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '1rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#4B5563',
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', color: PRIMARY_BLUE }}>
                        <MdExplore style={{ marginRight: '0.25rem' }} /> explore
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', color: PRIMARY_BLUE }}>
                        <MdLightbulbOutline style={{ marginRight: '0.25rem' }} /> learn
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', color: PRIMARY_BLUE }}>
                        <MdMilitaryTech style={{ marginRight: '0.25rem' }} /> achieve
                    </span>
                </div>
            </div>
            {/* --- */}

            {error && (
                <p style={{
                    fontSize: '0.875rem',
                    color: '#DC2626',
                    backgroundColor: '#FFF5F5',
                    border: '1px solid #F87171',
                    padding: '0.75rem',
                    borderRadius: '0.75rem',
                    marginBottom: '1.5rem',
                    fontWeight: '500',
                }}>
                    {error}
                </p>
            )}

            <form onSubmit={mode === "login" ? handleLogin : handleSignup} style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '1.5rem',
            }}>
                {/* Input fields */}
                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        style={{
                            width: '100%',
                            border: '1px solid #D1D5DB',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            outline: 'none',
                            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
                            color: '#1F2937',
                            fontSize: '1rem',
                            transition: 'border-color 0.2s',
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password (min 6 chars)"
                        style={{
                            width: '100%',
                            border: '1px solid #D1D5DB',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            outline: 'none',
                            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
                            color: '#1F2937',
                            fontSize: '1rem',
                            transition: 'border-color 0.2s',
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            fontWeight: '700',
                            fontSize: '1.125rem',
                            color: 'white',
                            transition: 'background-color 0.3s',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            
                            backgroundColor: loading 
                                ? '#9CA3AF' 
                                : BUTTON_COLOR,
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg style={{ marginRight: '0.75rem', height: '1.25rem', width: '1.25rem', color: 'white' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                                </svg>
                                {mode === "login" ? "Signing In..." : "Creating Account..."}
                            </span>
                        ) : (
                            mode === "login" ? "Login Securely" : "Create Account"
                        )}
                    </button>
                </div>
            </form>
            
            {/* Mode Toggle & Footer */}
            <div style={{ marginTop: '2rem' }}>
                <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>
                    {mode === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <button 
                                onClick={() => {setMode("signup"); setError("");}} 
                                style={{ 
                                    color: ROYAL_BLUE, 
                                    fontWeight: '700',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                }}
                            >
                                Sign Up Now
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button 
                                onClick={() => {setMode("login"); setError("");}} 
                                style={{ 
                                    color: PRIMARY_BLUE, 
                                    fontWeight: '700',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                }}
                            >
                                Login Here
                            </button>
                        </>
                    )}
                </p>
                <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#9CA3AF' }}>Powered by Firebase Authentication.</p>
            </div>
        </div>
    </div>
  );
}


function HomeContent() {
  // NOTE: I preserved your original Home code *as is*.
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
    { name: "Pranay", text: "Vertex helped me land my first internship! 🚀" },
    { name: "Anil", text: "The roadmap section kept me on track and confident." },
    { name: "Bharath", text: "The resume builder is 🔥 – super easy and professional." },
  ];

  const trustedBy = [
    { name: "Mallareddy University", logo: "/logos/mru.png" },
    { name: "KL University", logo: "/logos/download.png" },
    { name: "CMR", logo: "/logos/cmr.jpeg" },
    { name: "VNR VJIET", logo: "/logos/vnr.jpeg" },
    { name: "MLRIT", logo: "/logos/download.jpeg" },
    { name: "GRIET", logo: "/logos/griet.png" },
    { name: "Anurag University", logo: "/logos/anurag.jpeg" },
    { name: "GITAM Hyderabad", logo: "/logos/gitam.jpeg" }
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
 const trendingData = [
      {
          category: 'Certification courses',
          title: 'Master the in-demand skills!',
          description: 'Get govt.-accredited certification and level-up your resume.',
          buttonText: 'Know more',
          bgColor: 'bg-blue-600',
          buttonColor: 'bg-yellow-400 text-gray-800',
          imageUrl: 'https://cdn.iconscout.com/icon/premium/png-512-thumb/certificate-3561322-2983790.png?f=webp&w=512'
      },
      {
          category: 'Certification Courses',
          title: 'Earn your Training Certificate',
          description: 'Get 55% + 10% OFF on all online trainings',
          buttonText: 'Know more',
          tag: 'FINAL HOURS',
          bgColor: 'bg-sky-500',
          buttonColor: 'bg-white text-sky-500',
          imageUrl: 'https://internshala.com/static/images/common/homepage/training_homepage_banner_v2.png'
      },
      {
          category: 'Campus Competition',
          title: 'TATA CRUCIBLE',
          description: 'Dream Internships at the Tata Group*',
          prize: '₹2.5L Grand Prize*',
          rewards: 'Epic Rewards',
          buttonText: 'Register now',
          bgColor: 'bg-gradient-to-br from-purple-600 to-pink-500',
          buttonColor: 'bg-green-400 text-white',
          imageUrl: 'https://internshala.com/static/images/common/homepage/crucible_banner_v2.png'
      }
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
      <span className="text-sm text-gray-500">Zero to Hero</span>
    </div>

    {/* Navigation Links */}
    <div className="hidden md:flex space-x-6 items-center">
      <Link href="/" className="hover:text-blue-600 font-medium transition">
        Home
      </Link>
      <Link href="/roadmaps" className="hover:text-blue-600 font-medium transition">
        Roadmaps
      </Link>
      <Link href="/ai" className="hover:text-blue-600 font-medium transition">
        AI tools
      </Link>
      <Link href="/internships" className="hover:text-blue-600 font-medium transition">
        Internships
      </Link>
      <Link href="/resume" className="hover:text-blue-600 font-medium transition">
        Resume Builder
      </Link>
      <Link href="/interview" className="hover:text-blue-600 font-medium transition">
        Interview Prep
      </Link>
      <Link href="/projects" className="hover:text-blue-600 font-medium transition">
        Projects
      </Link>
      <Link href="/hackathon" className="hover:text-blue-600 font-medium transition">
        Hackathons
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


{/* Hero Section - Increased Padding */}
<section id="home" className="relative flex flex-col justify-center items-center text-center py-28 md:py-40 bg-gradient-to-br from-blue-700 to-indigo-800 text-white overflow-hidden">
    
    {/* Optional: Subtle background texture/pattern for depth */}
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/path/to/subtle-pattern.svg')]"></div>

    <div className="relative z-10 animate-fadeInUp max-w-4xl mx-auto px-6"> 
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-2xl">
            Master the Tech Stack. <span className="text-yellow-400">Prove Your Skills.</span>
        </h1>
        
        {/* Subtitle */}
        <p className="max-w-3xl text-lg md:text-xl mb-8 text-blue-100 font-light leading-relaxed">
            **VerteX** provides the ultimate practice ground: take **targeted quizzes** and solve **real-world coding challenges**.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
            
            {/* CTA 1: Quizzes (Primary Focus) */}
            <a 
                onClick={() => document.getElementById('quiz')?.scrollIntoView({behavior:'smooth'})} 
                className="px-6 py-3 bg-green-500 text-white font-extrabold text-md rounded-xl shadow-xl hover:bg-green-600 transition transform hover:scale-105 cursor-pointer ring-4 ring-green-300/50"
            >
                Start Rapid Quiz 🧠
            </a>
            
            {/* CTA 2: Challenges (Strong Secondary Focus) */}
            <a 
                onClick={() => document.getElementById('challenges')?.scrollIntoView({behavior:'smooth'})} 
                className="px-6 py-3 bg-purple-500 text-white font-extrabold text-md rounded-xl shadow-xl hover:bg-purple-600 transition transform hover:scale-105 cursor-pointer ring-4 ring-purple-300/50"
            >
                View Coding Challenges 💻
            </a>
            
        </div>
        
    </div>
</section>
{/* Key Benefits/Feature Highlight Section */}
<section className="py-20 bg-gray-100">
    <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900 tracking-tight">
            The VerteX Advantage: Built for Your Success
        </h2>
        
        <div className="grid md:grid-cols-4 gap-10">
            
            {/* Feature 1: ATS Compliance */}
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border-t-4 border-blue-600">
                <div className="text-4xl mb-4 text-blue-600">✅</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">ATS Optimization</h3>
                <p className="text-gray-600">
                    Bypass robotic screeners. Our tools ensure your resume and applications are fully compliant and keyword-rich.
                </p>
            </div>

            {/* Feature 2: Structured Learning */}
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border-t-4 border-green-600">
                <div className="text-4xl mb-4 text-green-600">🗺️</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Structured Roadmaps</h3>
                <p className="text-gray-600">
                    Follow expert-vetted learning paths from beginner to master in popular tech domains like AI/ML or Web Dev.
                </p>
            </div>

            {/* Feature 3: Interview Mastery */}
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border-t-4 border-purple-600">
                <div className="text-4xl mb-4 text-purple-600">🧠</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Interview Mastery</h3>
                <p className="text-gray-600">
                    Prepare with realistic challenges, quizzes, and preparation guides tailored for top-tier companies.
                </p>
            </div>

            {/* Feature 4: Practical Projects */}
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border-t-4 border-red-600">
                <div className="text-4xl mb-4 text-red-600">💻</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Project Portfolio</h3>
                <p className="text-gray-600">
                    Get ideas and resources to build portfolio-worthy projects that impress hiring managers instantly.
                </p>
            </div>
        </div>
    </div>
</section>

            <section id="roadmaps" className="py-20 px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">🌟 Key Features</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <a
                            key={idx}
                            // leaving link fields as-is (they may be external or internal)
                            href={feature.link || "#"}
                            className={`block p-8 rounded-2xl text-white shadow-xl hover:scale-105 transform transition-all bg-gradient-to-br ${feature.color} relative hover:rotate-1`}
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </a>
                    ))}
                </div>
            </section>
            <section id="practice" className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-900 tracking-tight">
            **Practice & Assessment Tools** 🧠
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
            
            {/* Quiz Link: Higher Contrast, Stronger Hover */}
            <a href="/quiz" className="group block p-8 rounded-2xl border-4 border-green-500 bg-green-50 shadow-2xl hover:bg-white transform hover:scale-[1.02] transition duration-300">
                <div className="flex items-center mb-4">
                    <div className="text-5xl mr-4">⏱️</div> {/* Icon */}
                    <h3 className="text-3xl font-extrabold text-green-700">Rapid Quizzes</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                    **Test your foundational knowledge** with quick, targeted assessments on core CS and technical skills. Get instant, detailed feedback!
                </p>
                <span className="inline-flex items-center text-xl font-bold text-green-700 group-hover:text-green-500 transition">
                    Start Assessment →
                </span>
            </a>
            
            {/* Challenges Link: Higher Contrast, Stronger Hover */}
            <a href="/challenges" className="group block p-8 rounded-2xl border-4 border-purple-500 bg-purple-50 shadow-2xl hover:bg-white transform hover:scale-[1.02] transition duration-300">
                <div className="flex items-center mb-4">
                    <div className="text-5xl mr-4">💻</div> {/* Icon */}
                    <h3 className="text-3xl font-extrabold text-purple-700">Coding Challenges</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                    **Solve real-world problems** and refine your problem-solving skills. Essential preparation for any technical interview environment.
                </p>
                <span className="inline-flex items-center text-xl font-bold text-purple-700 group-hover:text-purple-500 transition">
                    Tackle Challenges →
                </span>
            </a>
        </div>
    </div>
</section>
            {/* Resources Section (Keep core resources here) */}
<section id="resources" className="py-20 bg-gray-100">
    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Learn from Core Resources 📚</h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/*
            Map over resources array, but filter out Quizzes and Challenges
            if they were previously included in this array.
            
            Example: {resources.filter(r => r.type === 'core').map((r, i) => (
        */}
        {/* Placeholder Card for Roadmaps */}
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Roadmaps</h3>
            <p className="text-gray-600 mb-4">Structured guides to master development paths like Frontend or AI/ML.</p>
            <a href="/roadmaps" className="text-blue-600 font-semibold hover:underline">Start Learning →</a>
        </div>
        {/* Placeholder Card for Internships */}
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Internships</h3>
            <p className="text-gray-600 mb-4">Latest listings and preparation guides for tech internships.</p>
            <a href="/internships" className="text-blue-600 font-semibold hover:underline">View Listings →</a>
        </div>
        {/* Placeholder Card for Cheat Sheets */}
        <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-2">Cheat Sheets</h3>
            <p className="text-gray-600 mb-4">Quick reference guides for key languages, frameworks, and algorithms.</p>
            <a href="/cheatsheets" className="text-blue-600 font-semibold hover:underline">Browse Sheets →</a>
        </div>
    </div>
</section>

{/* ---------------------------------------------------------------------------------- */}


{/* 🌟 Futuristic Hackathons Section */}
            <section id="hackathons" className="py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden w-full">
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
                                rel="noopener noreferrer"
                                className="mt-6 inline-block px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition transform text-center"
                            >
                                Register Now
                            </a>
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

            {/* Resources Section */}
            <section id="resources" className="py-20 bg-gray-100">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Learn from  Resources 📚</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {resources.map((r, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                            <h3 className="text-xl font-bold mb-2">{r.title}</h3>
                            <p className="text-gray-600 mb-4">{r.desc}</p>
                            <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">Read More →</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Top Tools Section */}
            <section className="py-20 bg-white">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Top Tools & Platforms 🛠️</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {topTools.map((tool, i) => (
                        <a key={i} href={tool.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow hover:scale-105 transition w-36">
                            <img src={tool.logo} alt={tool.name} className="h-16 w-16 object-contain mb-2" />
                            <p className="text-gray-700 font-semibold text-center">{tool.name}</p>
                        </a>
                    ))}
                </div>
            </section>
            {/* --- END: Testimonials Slider --- */}
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
                            <img src={blog.img} alt={blog.title} className="w-full h-40 object-cover" />
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
          {/* --- 4️⃣ Motivational Quotes Section --- */}
{/* --- 4️⃣ Motivational Quotes Section (Simple Full-Width) --- */}
<section className="py-20 bg-gray-50">
  <div className="max-w-3xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold mb-12 text-blue-700">🌟 Daily Motivation</h2>
    
    {/* Quote 1 */}
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-indigo-600 transition hover:scale-105">
      <p className="text-xl font-semibold text-gray-800 italic">
        "Success is not final, failure is not fatal: it is the courage to continue that counts."
      </p>
      <span className="block mt-3 text-sm text-indigo-500 font-medium">— Winston Churchill</span>
    </div>

    {/* Quote 2 */}
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-green-500 transition hover:scale-105">
      <p className="text-xl font-semibold text-gray-800 italic">
        "Don't watch the clock; do what it does. Keep going."
      </p>
      <span className="block mt-3 text-sm text-green-600 font-medium">— Sam Levenson</span>
    </div>

    {/* Quote 3 */}
    <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-pink-500 transition hover:scale-105">
      <p className="text-xl font-semibold text-gray-800 italic">
        "The only way to do great work is to love what you do."
      </p>
      <span className="block mt-3 text-sm text-pink-600 font-medium">— Steve Jobs</span>
    </div>

    <a href="#more-quotes" className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition">
      Read More Quotes
    </a>
  </div>
</section>



            {/* Footer */}
            <footer className="py-12 bg-blue-600 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">🚀 Ready to Boost Your Career?</h3>
                <a onClick={() => document.getElementById('resume')?.scrollIntoView({behavior:'smooth'})} className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:scale-105 cursor-pointer">
                    Get Started Free
                </a>
                <p className="mt-6 text-sm">© {new Date().getFullYear()} Vertex. All rights reserved. Built by team careerai</p>
            </footer>
        </div>

        {/* Dashboard Sidebar */}
        {dashboardOpen && (
            <aside className="w-64 bg-white border-l border-gray-200 shadow-lg p-6 fixed right-0 top-0 h-full flex flex-col z-50">
                <h2 className="text-xl font-bold mb-6 text-blue-600">📊 Dashboard</h2>
                <nav className="flex flex-col space-y-4">
                    <a onClick={() => document.getElementById('profile')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-600 font-medium cursor-pointer">My Profile</a>
                    <a onClick={() => document.getElementById('resume')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-600 font-medium cursor-pointer">Resume Builder</a>
                    <a onClick={() => document.getElementById('progress')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-600 font-medium cursor-pointer">Progress Tracker</a>
                    <a onClick={() => document.getElementById('certificates')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-600 font-medium cursor-pointer">Certificates</a>
                    <a onClick={() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-600 font-medium cursor-pointer">Projects</a>
                    <a onClick={() => document.getElementById('settings')?.scrollIntoView({behavior:'smooth'})} className="hover:text-blue-600 font-medium cursor-pointer">Settings</a>
                </nav>
                <button onClick={() => setDashboardOpen(false)} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Close</button>
            </aside>
        )}
    </main>
  );
}

/* ========================
   Page wrapper: auth guard
   ======================== */
export default function Page() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false); // wait for initial auth check

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecked(true);
    });
    return () => unsub();
  }, []);

  // simple onSignedIn callback (after successful login/signup)
  const handleSignedIn = () => {
    // onAuthStateChanged will fire and set user — nothing else needed
  };

  // show nothing until we know auth state to avoid flicker
  if (!checked) return null;

  if (!user) {
    return <AuthPanel onSignedIn={handleSignedIn} />;
  }

  return (
    <div className="relative">
      {/* optional small top-right logout button (non-intrusive) */}
      <div style={{ position: "fixed", right: 16, top: 16, zIndex: 60 }}>
        <button
          onClick={async () => { await signOut(auth); }}
          className="px-3 py-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600"
          title="Logout"
        >
          Logout
        </button>
      </div>

      {/* Render your unchanged Home page */}
      <HomeContent />
    </div>
  );
}
