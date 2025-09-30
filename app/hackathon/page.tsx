"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// --- Design Constants ---
const PRIMARY_COLOR = "#0070f3"; // Modern Blue
const ACCENT_COLOR = "#10b981"; // Vibrant Green (Default Success)
const WARNING_COLOR = "#f97316"; // Orange (Prize Focus)
const DANGER_COLOR = "#dc2626"; // Red (High Value/Priority)
const CARD_BG = "#ffffff";
const BG_COLOR = "linear-gradient(to bottom right, #f8faff 0%, #ffffff 100%)";
const TEXT_COLOR_DARK = "#1e293b"; 
const TEXT_COLOR_MUTED = "#64748b"; 

// --- Types ---
type Hackathon = {
  id: number;
  title: string;
  theme: string;
  host: string; 
  type: 'Online' | 'In-Person' | 'Hybrid';
  location: string; 
  startDate: string; // YYYY-MM-DD
  prizePool: string;
  registrationLink: string;
  isLive: boolean;
  // Tags
  isDiversityFocused?: boolean;
  hasHiringTrack?: boolean;
};

// --- DATA: Enhanced with Hyderabad Events ---
const LIVE_HACKATHONS: Hackathon[] = [
  // --- AIGNITE (Current Event) ---
  {
    id: 100,
    title: "Aignite 2K25 - Month of AI",
    theme: "Igniting Innovation: Engineering Intelligence & Open Innovation",
    host: "MLSC - Malla Reddy University (MRU)",
    type: 'Hybrid',
    location: "Hyderabad, Telangana",
    startDate: "2025-09-27", 
    prizePool: "Exciting Prizes & Certificates",
    registrationLink: "https://evntora.foo/events/aignite-AIGNITE",
    isLive: true,
  },
  
  // --- NEW HYDERABAD ENGINEERING COLLEGE EVENTS ---
  { 
    id: 14, 
    title: "NHETIS'25 (Gen/Agentic AI Hackathon)", 
    theme: "Generative AI and Intelligent Systems", 
    host: "Gokaraju Rangaraju Inst. of Eng. & Tech (GRIET)", 
    type: 'In-Person', 
    location: "GRIET Campus, Hyderabad", 
    startDate: "2025-09-25", // Final Hackathon Day
    prizePool: "₹50,000 Cash Prizes", 
    registrationLink: "https://unstop.com/hackathons/nhetis25-gokaraju-rangaraju-institute-of-engineering-and-technology-griet-hyderabad-1545280", 
    isLive: true, 
    hasHiringTrack: true, // PPI opportunities suggested in context
  },
  { 
    id: 15, 
    title: "MECHOVATE 2025", 
    theme: "Technical Hackathon", 
    host: "Anurag Group of Institutions", 
    type: 'In-Person', 
    location: "Hyderabad, Telangana", 
    startDate: "2025-10-17",
    prizePool: "Cash Prizes + Recognition", 
    registrationLink: "https://www.knowafest.com/explore/events/2024/10/1684-mecho-vate-2025-hackathon-anurag-group-institutions-hyderabad", // Using KnowaFest link
    isLive: true,
  },
  // Note: Vivitsu 2025 (GRIET) and SPECFIESTA 2025 (St. Peter's) are also visible in results but
  // their primary registration periods or exact hackathon dates are less clear for the immediate window.

  // --- EXISTING HYDERABAD EVENTS ---
  { id: 10, title: "Megathon 2025: The Deccan Edition", theme: "Meet. Ideate. Hack. (General Open Innovation)", host: "E-Cell IIIT Hyderabad", type: 'In-Person', location: "Hyderabad, Telangana", startDate: "2025-10-11", prizePool: "₹6,50,000+", registrationLink: "https://megathon.in/", isLive: true, hasHiringTrack: true },
  { id: 11, title: "D-CoDE'25 Design Hackathon", theme: "Design Innovation for MSMEs", host: "Centre of Design Excellence, IIT Hyderabad", type: 'In-Person', location: "IIT Hyderabad Campus", startDate: "2025-10-24", prizePool: "Mentorship + Industry Recognition", registrationLink: "https://code.design.iith.ac.in/events", isLive: true,},
  { id: 12, title: "VJ Hackathon 2025 (Victory & Joy)", theme: "Agriculture, Healthcare, EduTech, Industry 4.0", host: "VNRVJIET, Hyderabad", type: 'In-Person', location: "Hyderabad, Telangana", startDate: "2025-10-17", prizePool: "₹1,00,000", registrationLink: "https://unstop.com/hackathons/vj-hackathon-2025-vallurupalli-nageswara-rao-vignana-jyothi-institute-of-engineering-technology-telangana-1548432", isLive: true,},
  { id: 13, title: "PSB's FinTech Cybersecurity Hackathon", theme: "FinTech & Cybersecurity for Public Sector Banks (BOI)", host: "IIT Hyderabad & IDRBT", type: 'Hybrid', location: "IIT Hyderabad / Online", startDate: "2025-09-02", prizePool: "₹20 Lakhs", registrationLink: "https://www.iith.ac.in/events/2025/06/01/PSBs-FinTech-Cybersecurity-Hackathon-2025/", isLive: true,},

  // --- EXISTING GLOBAL EVENTS ---
  { id: 1, title: "Future of Finance 2025", theme: "Decentralized Lending & AI Risk", host: "Stanford University", type: 'In-Person', location: "Palo Alto, CA", startDate: "2025-10-15", prizePool: "$25,000", registrationLink: "https://example.com/stanford", isLive: true, hasHiringTrack: true },
  { id: 2, title: "GKE Turns 10 Hackathon", theme: "Build Next Gen Microservices with AI Agents on Google Kubernetes Engine", host: "Google Cloud", type: 'Online', location: "Global", startDate: "2025-09-15", prizePool: "Cloud Credits + Cash Prizes", registrationLink: "https://bit.ly/gketurns10u", isLive: true },
  { id: 3, title: "HackHarvard 2025", theme: "Innovation Across All Disciplines", host: "Harvard University", type: 'In-Person', location: "Cambridge, MA", startDate: "2025-10-03", prizePool: "$30,000+", registrationLink: "https://hackharvard.io/", isLive: true },
  { id: 4, title: "Technica 2025", theme: "Celebrating Underrepresented Genders in Tech", host: "University of Maryland (UMD)", type: 'Hybrid', location: "College Park, MD / Virtual", startDate: "2025-10-26", prizePool: "$5,000", registrationLink: "https://gotechnica.org/", isLive: true, isDiversityFocused: true },
  { id: 5, title: "AI Agents on Arc with USDC", theme: "Next Generation Payment Systems using AI + Arc Blockchain", host: "Circle / Arc Blockchain", type: 'Hybrid', location: "Global / Selected On-site Locations", startDate: "2025-10-27", prizePool: "$150,000+", registrationLink: "https://lablab.ai/event", isLive: true, hasHiringTrack: true },
  { id: 6, title: "HackwithMAIT 6.0", theme: "Innovative Tracks", host: "Maharaja Agrasen Institute of Technology (MAIT)", type: 'In-Person', location: "New Delhi, India", startDate: "2025-10-30", prizePool: "₹30,000", registrationLink: "https://unstop.com/hackathons/hackwithmait-60-mait-new-delhi-140590", isLive: true },
];


// --- Utility for Prize Filtering ---
const parsePrize = (prize: string): number => {
  if (prize.includes('$')) {
    const numericPart = prize.replace(/[$,+>]/g, '').trim();
    return parseInt(numericPart.replace(/,/g, ''), 10);
  } else if (prize.includes('₹')) {
     // Rough conversion for filtering purposes
     const numericPart = prize.replace(/[^0-9]/g, '').trim();
     return parseInt(numericPart, 10) / 80; 
  }
  return 0; 
};


export default function HackathonsPage() {
  const [filterType, setFilterType] = useState<'All' | 'Online' | 'In-Person' | 'Hybrid'>('All');
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMonth, setFilterMonth] = useState<string>(''); 
  const [minPrize, setMinPrize] = useState<number>(0);

  const filteredHackathons = useMemo(() => {
    const hydKeywords = ['hyderabad', 'iiit', 'iit', 'telangana', 'vits'];
    
    return LIVE_HACKATHONS.filter(h => {
      const typeMatch = filterType === 'All' || h.type === filterType;
      // Enhanced Location Match: Check location, host, or specific Hyderabad keywords
      const locationMatch = filterLocation === '' || 
                            h.location.toLowerCase().includes(filterLocation.toLowerCase()) || 
                            h.host.toLowerCase().includes(filterLocation.toLowerCase()) ||
                            (filterLocation.toLowerCase() === 'hyderabad' && hydKeywords.some(k => h.location.toLowerCase().includes(k) || h.host.toLowerCase().includes(k)));
                            
      const searchMatch = searchQuery === '' || h.title.toLowerCase().includes(searchQuery.toLowerCase()) || h.theme.toLowerCase().includes(searchQuery.toLowerCase());
      
      const prizeMatch = parsePrize(h.prizePool) >= minPrize;
      
      const dateMatch = filterMonth === '' || h.startDate.startsWith(filterMonth);

      return typeMatch && locationMatch && searchMatch && prizeMatch && dateMatch && h.isLive;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [filterType, filterLocation, searchQuery, filterMonth, minPrize]);

  // Generate date options for the next 6 months
  const dateOptions = useMemo(() => {
    const options = [{ value: '', label: 'Any Time' }];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      options.push({ value: `${year}-${month}`, label });
    }
    return options;
  }, []);


  return (
    <div style={{ minHeight: '100vh', background: BG_COLOR, fontFamily: 'sans-serif', paddingTop: '80px' }}>
      
      {/* --- NAVBAR --- */}
      <nav style={{ position: 'fixed', width: '100%', zIndex: 50, top: 0, left: 0, backgroundColor: PRIMARY_COLOR, color: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>VerteX</h1>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
              {["Home", "Roadmaps", "Internships", "ResumeBuilder", "Projects", "Certifications", "Cheat Sheets"].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase().replace(/\s/g, "")}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#bfdbfe'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                      {item}
                  </Link>
              ))}
          </div>
      </nav>

      <main style={{ padding: '40px 1.5rem' }}>
        <header style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: PRIMARY_COLOR, marginBottom: '0.5rem' }}>
           Build. Innovate. Win.
          </h1>
          <p style={{ fontSize: '1.1rem', color: TEXT_COLOR_MUTED }}>
            Discover, register, and win at the top ongoing and upcoming hackathons—curated for ambitious builders.
          </p>
        </header>

        {/* --- Advanced Filters Section (FIXED INPUT STYLES) --- */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 40px', padding: '25px', backgroundColor: '#f0f8ff', borderRadius: '12px', borderLeft: `5px solid ${PRIMARY_COLOR}`, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
            
            {/* Quick Search Input (FIXED) */}
            <div style={{ flex: '1 1 100%' }}>
              <label style={{ display: 'block', fontWeight: 700, color: TEXT_COLOR_DARK, marginBottom: '5px' }}>Quick Search (Name, Theme, or Host)</label>
              <input
                type="text"
                placeholder="e.g., AI, Google Cloud, Stanford, Hyderabad"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #aaa', 
                    borderRadius: '8px', 
                    fontSize: '1rem',
                    backgroundColor: CARD_BG, // Ensures visible background
                    color: TEXT_COLOR_DARK // Ensures visible text
                }}
              />
            </div>

            {/* Type Filter (FIXED) */}
            <div style={{ minWidth: '150px' }}>
              <label style={{ display: 'block', fontWeight: 600, color: TEXT_COLOR_DARK, marginBottom: '5px' }}>Event Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'All' | 'Online' | 'In-Person' | 'Hybrid')}
                style={{ 
                    padding: '12px', 
                    border: '1px solid #aaa', 
                    borderRadius: '8px', 
                    width: '100%',
                    backgroundColor: CARD_BG, 
                    color: TEXT_COLOR_DARK
                }}
              >
                <option value="All">All Types</option>
                <option value="Online">Online Only</option>
                <option value="In-Person">In-Person Only</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Date Filter (FIXED) */}
            <div style={{ minWidth: '150px' }}>
              <label style={{ display: 'block', fontWeight: 600, color: TEXT_COLOR_DARK, marginBottom: '5px' }}>Upcoming Month</label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                style={{ 
                    padding: '12px', 
                    border: '1px solid #aaa', 
                    borderRadius: '8px', 
                    width: '100%',
                    backgroundColor: CARD_BG, 
                    color: TEXT_COLOR_DARK
                }}
              >
                {dateOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Prize Pool Filter (FIXED) */}
            <div style={{ minWidth: '180px' }}>
              <label style={{ display: 'block', fontWeight: 600, color: TEXT_COLOR_DARK, marginBottom: '5px' }}>Min. Prize Pool (USD Est.)</label>
              <select
                value={minPrize}
                onChange={(e) => setMinPrize(parseInt(e.target.value, 10))}
                style={{ 
                    padding: '12px', 
                    border: '1px solid #aaa', 
                    borderRadius: '8px', 
                    width: '100%',
                    backgroundColor: CARD_BG, 
                    color: TEXT_COLOR_DARK
                }}
              >
                <option value={0}>Any Prize</option>
                <option value={1000}>$1,000+</option>
                <option value={10000}>$10,000+</option>
                <option value={50000}>$50,000+ (Elite)</option>
              </select>
            </div>
            
            {/* Location Filter (FIXED) */}
            <div style={{ minWidth: '180px' }}>
              <label style={{ display: 'block', fontWeight: 600, color: TEXT_COLOR_DARK, marginBottom: '5px' }}>Location / Near Me</label>
              <input
                type="text"
                placeholder="City (e.g., Hyderabad)"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                style={{ 
                    padding: '12px', 
                    border: '1px solid #aaa', 
                    borderRadius: '8px', 
                    width: '100%',
                    backgroundColor: CARD_BG, 
                    color: TEXT_COLOR_DARK
                }}
              />
            </div>

          </div>
        </div>
        
        {/* --- Hackathon List --- */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: PRIMARY_COLOR, marginBottom: '20px' }}>
            Found {filteredHackathons.length} Active Events
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
            {filteredHackathons.map((h) => {
                const isOnline = h.type === 'Online';
                const isHighPrize = parsePrize(h.prizePool) >= 10000;
                const accentColor = isHighPrize ? DANGER_COLOR : (isOnline ? PRIMARY_COLOR : ACCENT_COLOR);
                const date = new Date(h.startDate);

                return (
                <div key={h.id} style={{ 
                    backgroundColor: CARD_BG, 
                    borderRadius: '12px', 
                    padding: '30px', 
                    boxShadow: '0 6px 15px rgba(0,0,0,0.08)', 
                    borderLeft: `5px solid ${accentColor}`,
                    transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: TEXT_COLOR_DARK, marginBottom: '5px' }}>{h.title}</h3>
                  <p style={{ color: TEXT_COLOR_MUTED, fontSize: '0.95rem', marginBottom: '15px' }}>Host: **{h.host}**</p>

                  {/* Tags and Type */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                    <span style={{ 
                        backgroundColor: isHighPrize ? DANGER_COLOR : (isOnline ? PRIMARY_COLOR : ACCENT_COLOR), 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontWeight: 700,
                        fontSize: '0.8rem',
                    }}>
                        {h.type.toUpperCase()}
                    </span>
                    {h.isDiversityFocused && (
                         <span style={{ backgroundColor: '#f0e6ff', color: '#6b21a8', padding: '4px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem' }}>
                            ⭐ DIVERSITY TRACK
                        </span>
                    )}
                    {h.hasHiringTrack && (
                         <span style={{ backgroundColor: '#fff7e6', color: WARNING_COLOR, padding: '4px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem' }}>
                            💼 HIRING TRACK
                        </span>
                    )}
                  </div>
                  
                  <p style={{ fontWeight: 600, color: TEXT_COLOR_DARK, marginBottom: '8px' }}>Theme: <span style={{ color: TEXT_COLOR_MUTED, fontWeight: 500 }}>{h.theme}</span></p>
                  <p style={{ fontWeight: 600, color: TEXT_COLOR_DARK, marginBottom: '20px' }}>Location: <span style={{ color: TEXT_COLOR_MUTED, fontWeight: 500 }}>{h.location}</span></p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                      <div style={{ textAlign: 'left' }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: DANGER_COLOR, margin: 0 }}>{h.prizePool}</p>
                            <p style={{ fontSize: '0.9rem', color: TEXT_COLOR_MUTED, margin: 0 }}>Start: {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                      </div>
                      <a href={h.registrationLink} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: ACCENT_COLOR, color: 'white', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ACCENT_COLOR}>
                          Register Now →
                      </a>
                  </div>

                </div>
            )})}
          </div>

          {filteredHackathons.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px', backgroundColor: CARD_BG, borderRadius: '12px', border: '1px solid #ccc', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '1.1rem', color: TEXT_COLOR_MUTED }}>No upcoming events match your current elite filters. Try widening your time range or location!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}