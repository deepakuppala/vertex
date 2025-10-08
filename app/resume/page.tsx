"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// ===================================
// Design Constants (Consolidated & Corrected)
// ===================================
const PRIME_COLOR = "#007AFF"; // Modern, deep blue (Premium look)
const ACCENT_COLOR = "#10b981"; // Vibrant Green (Success)
const DANGER_COLOR = "#ef4444";  // Red (Error)
const WARNING_COLOR = "#f59e0b"; // Amber (Warning)
const BG_COLOR_LIGHT = "#f9fafb";
const TEXT_COLOR_DARK = "#1f2937";
const TEXT_COLOR_MUTED = "#6b7280";
const INPUT_BORDER = "#d1d5db";
const CARD_SHADOW = "0 4px 12px rgba(0, 0, 0, 0.08)";
const CARD_RADIUS = "12px";
const BUTTON_SHADOW = "0 2px 5px rgba(0,0,0,0.2)";
const BORDER_COLOR = "#e5e7eb";
const CARD_BG = "#ffffff";
const SECONDARY_COLOR = ACCENT_COLOR;
// ---------------------------------

// Renamed templates to emphasize ATS compliance (Feature)
const TEMPLATE_OPTIONS = [
    { value: "ats_minimal", name: "1. Minimalist (Highest ATS Compliance)" },
    { value: "ats_twocolumn", name: "2. Structured (Simulated Two-Column)" },
    { value: "ats_colorblock", name: "3. Header-Focused (Visual Impact)" },
];

// --- Type Definitions ---
type Education = { degree: string; college: string; year: string };
type Experience = { role: string; company: string; duration: string; summary: string };
type Project = { title: string; description: string };
type Certification = { name: string; year: string };

type FormData = {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
    skills: string;
    photo: string | null;
    education: Education[];
    experience: Experience[];
    projects: Project[];
    certifications: Certification[];
    hobbies: string;
    languages: string;
    achievements: string;
};

// --- ATS Logic (Helper function must be outside the component) ---
const calculateAtsScore = (data: FormData): { score: number, suggestions: string[] } => {
    let score = 0;
    const suggestions: string[] = [];
    const keywords = data.skills.toLowerCase().split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 2);
    const hasPhoto = !!data.photo;

    // 1. Core Sections Check (Weight: 40%)
    const requiredSections = [data.experience.length, data.education.length, keywords.length];
    const presentSections = requiredSections.filter(s => s > 0).length;
    score += (presentSections / 3) * 40;

    if (data.experience.every(exp => exp.summary.length < 10)) {
        suggestions.push("Experience summaries are too short. Use **quantifiable metrics (numbers/percentages)**.");
        score -= 5;
    }
    if (data.education.length === 0) suggestions.push("Missing **Education** section.");
    if (data.experience.length === 0) suggestions.push("Missing **Work Experience**.");
    
    // 2. Formatting & Length (Weight: 30%)
    const wordCount = (data.summary + ' ' + data.skills + ' ' + data.experience.map(e => e.summary).join(' ')).split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 150) suggestions.push("Resume is too brief (<150 words). Add more detail.");
    if (wordCount > 600) suggestions.push("Resume is too long (>600 words). Be concise.");
    score += (wordCount >= 150 && wordCount <= 600) ? 30 : 15;

    // 3. ATS Compliance Warnings (Weight: 30%)
    if (hasPhoto) suggestions.push("⚠️ **AVOID PHOTOS**. ATS systems ignore them and they take up valuable space.");
    if (data.summary.length < 50) suggestions.push("Professional **Summary is too short**. Aim for 3-4 impactful lines.");
    if (data.hobbies.length > 0) suggestions.push("⚠️ **Hobbies** should be removed unless strictly relevant to the job.");

    // 4. Keyword Density (Crucial)
    if (keywords.length < 10) suggestions.push(`Low **Skill Keyword Count** (${keywords.length}). Aim for 15-30 relevant skills.`);
    score += (keywords.length >= 10) ? 30 : 15;


    // Final Score Calculation
    return {
        score: Math.min(100, Math.round(score)),
        suggestions: Array.from(new Set(suggestions)),
    };
};
// -------------------------------------------------------------

// --- Main Component ---
export default function ResumeBuilderPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "Samantha Brooks",
        email: "samantha.b@vertexi.co",
        phone: "(555) 123-4567",
        linkedin: "linkedin.com/in/sbrooks",
        github: "github.com/sbrooks",
        summary: "Highly skilled Software Engineer with 5+ years of experience specializing in scalable microservices and cloud architecture (AWS, Azure). Proven ability to deliver high-quality, maintainable code for enterprise applications. Seeking challenging role at a leading technology firm.",
        skills: "Python, Django, React, AWS, Docker, Kubernetes, SQL, REST APIs, TDD, Agile", // String
        photo: null,
        education: [{ degree: "M.S. Computer Science", college: "Stanford University", year: "2018" }],
        experience: [{ role: "Senior Backend Developer", company: "Innovatech Solutions", duration: "2020 - Present", summary: "Led core microservice development (Python/Django), improving API response time by 30%. Implemented CI/CD pipelines using Kubernetes/Helm." }],
        projects: [{ title: "VerteX ATS Scorer", description: "Developed an NLP model to score resume keyword match rates against job descriptions." }],
        certifications: [{ name: "AWS Certified Developer – Associate", year: "2022" }],
        hobbies: "Hiking, Chess, Open Source Contributions",
        languages: "English (Native), Spanish (Conversational)", // String
        achievements: "Raised $50k in seed funding for a startup project.", // String
    });

    const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_OPTIONS[0].value);
    const resumeRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    // --- Data Handlers ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value ?? "" });
    };

    const handleArrayChange = <T extends keyof FormData>(
        type: T,
        index: number,
        field: string,
        value: string
    ) => {
        const updated = [...(formData[type] as any)];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, [type]: updated } as any);
    };

    const addNewField = (type: keyof FormData) => {
        if (type === "education")
            setFormData({ ...formData, education: [...formData.education, { degree: "", college: "", year: "" }] });
        else if (type === "experience")
            setFormData({ ...formData, experience: [...formData.experience, { role: "", company: "", duration: "", summary: "" }] });
        else if (type === "projects")
            setFormData({ ...formData, projects: [...formData.projects, { title: "", description: "" }] });
        else if (type === "certifications")
            setFormData({ ...formData, certifications: [...formData.certifications, { name: "", year: "" }] });
    };
    
    // --- Real-time ATS Score (useMemo for efficiency) ---
    const atsResult = useMemo(() => calculateAtsScore(formData), [formData]);

    // --- Download Logic ---
    const downloadPDF = () => {
        if (!resumeRef.current) return;
        html2canvas(resumeRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "pt", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save(`${formData.name.replace(/\s/g, "_")}_ATS_Resume.pdf`);
        });
    };

    // --- Styling Functions (Inline for React structure) ---
    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: `1px solid ${INPUT_BORDER}`,
        marginBottom: "12px",
        color: TEXT_COLOR_DARK,
        fontSize: "15px",
        transition: "border-color 0.2s",
    };
    
    const buttonStyle: React.CSSProperties = {
        backgroundColor: PRIME_COLOR,
        color: "white",
        padding: "12px 24px",
        borderRadius: "8px",
        fontWeight: 600,
        transition: "background-color 0.2s, box-shadow 0.2s",
        cursor: "pointer",
        border: "none",
        boxShadow: BUTTON_SHADOW,
    };
    
    const secondaryButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: "transparent",
        color: PRIME_COLOR,
        border: `1px solid ${PRIME_COLOR}`,
        boxShadow: 'none',
        padding: '10px 16px',
        fontWeight: 500,
    };

    const sectionCardStyle: React.CSSProperties = {
        backgroundColor: CARD_BG,
        padding: "20px",
        borderRadius: CARD_RADIUS,
        boxShadow: CARD_SHADOW,
        marginBottom: "20px",
    };

    const getPreviewSectionStyle = (color: string, borderType: 'solid' | 'dashed' = 'solid'): React.CSSProperties => ({
        borderBottom: `2px ${borderType} ${color}`,
        paddingBottom: "2px",
        marginBottom: "6px",
        marginTop: "12px",
        color: color,
        textTransform: "uppercase",
        fontWeight: 700,
        fontSize: "12pt",
    });

    // Determine ATS score color for the widget
    const getAtsColor = (score: number) => {
        if (score >= 80) return ACCENT_COLOR;
        if (score >= 50) return WARNING_COLOR;
        return DANGER_COLOR;
    };
    
    // --- Template Style Logic (Passed to the renderer) ---
    const getTemplateStyles = (template: string): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            fontFamily: "Arial, sans-serif",
            fontSize: "11pt",
            lineHeight: 1.4,
            maxWidth: "650px",
            minHeight: '842px', 
            boxShadow: CARD_SHADOW,
            color: TEXT_COLOR_DARK,
        };

        switch (template) {
            case "ats_minimal":
                return { 
                    ...baseStyle, 
                    padding: "30px", 
                    border: `1px solid ${BORDER_COLOR}`, 
                    backgroundColor: CARD_BG,
                };
            case "ats_twocolumn":
                return { 
                    ...baseStyle, 
                    padding: "30px", 
                    backgroundColor: "#f0f4f8", 
                    borderLeft: `8px solid ${PRIME_COLOR}`,
                    lineHeight: 1.5,
                };
            case "ats_colorblock":
                return { 
                    ...baseStyle, 
                    padding: "0",
                    backgroundColor: CARD_BG,
                    boxShadow: CARD_SHADOW,
                    border: 'none',
                    overflow: 'hidden',
                };
            default:
                return getTemplateStyles("ats_minimal");
        }
    };
    
    // --- Resume Content Renderer Function ---
    const renderResumeContent = (template: string, data: FormData) => {
        const templateStyle = getTemplateStyles(template);

        const PreviewSection = ({ title, children, color = PRIME_COLOR }: { title: string, children: React.ReactNode, color?: string }) => (
            <>
                <div style={getPreviewSectionStyle(color, 'solid')}>{title}</div>
                {children}
            </>
        );

        // --- Core Content Structure (Reusable across all templates) ---
        const CoreContent = (
            <>
                <PreviewSection title="Professional Summary">
                    <p style={{ margin: '0 0 10px 0', fontSize: '11pt', color: TEXT_COLOR_DARK }}>{data.summary || "Highly motivated professional..."}</p>
                </PreviewSection>

                <PreviewSection title="Technical Skills & Languages">
                    <p style={{ margin: '0 0 10px 0', fontSize: '11pt', color: TEXT_COLOR_DARK }}>
                        <strong>Skills:</strong> {data.skills || "List your skills here..."}
                        {data.languages && <><br /><strong>Languages:</strong> {data.languages}</>}
                    </p>
                </PreviewSection>

                <PreviewSection title="Experience">
                    {data.experience.map((exp, idx) => (
                        <div key={idx} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ margin: 0, fontWeight: 700, fontSize: '11pt', color: TEXT_COLOR_DARK }}>{exp.role || "(Role Title)"}</p>
                                <p style={{ margin: 0, fontWeight: 500, fontSize: '10pt', color: TEXT_COLOR_MUTED }}>{exp.duration || "(Duration)"}</p>
                            </div>
                            <p style={{ margin: '0 0 5px 0', fontWeight: 600, fontSize: '10pt', color: PRIME_COLOR }}>{exp.company || "(Company Name)"}</p>
                            {exp.summary && <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '10pt', color: TEXT_COLOR_DARK }}><li>{exp.summary}</li></ul>}
                        </div>
                    ))}
                </PreviewSection>

                <PreviewSection title="Projects">
                    {data.projects.map((proj, idx) => (
                        <div key={idx} style={{ marginBottom: '10px' }}>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: '11pt', color: TEXT_COLOR_DARK }}>{proj.title || "(Project Title)"}</p>
                            <p style={{ margin: '2px 0 0 0', fontSize: '10pt', color: TEXT_COLOR_DARK }}>{proj.description || "(Description)"}</p>
                        </div>
                    ))}
                </PreviewSection>

                <PreviewSection title="Education">
                    {data.education.map((edu, idx) => (
                        <div key={idx} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ margin: 0, fontWeight: 700, fontSize: '11pt', color: TEXT_COLOR_DARK }}>{edu.degree || "(Degree)"}</p>
                                <p style={{ margin: 0, fontWeight: 500, fontSize: '10pt', color: TEXT_COLOR_MUTED }}>{edu.year || "(Year)"}</p>
                            </div>
                            <p style={{ margin: '2px 0 0 0', fontSize: '10pt', color: TEXT_COLOR_DARK }}>{edu.college || "(University/College)"}</p>
                        </div>
                    ))}
                </PreviewSection>
                
                <PreviewSection title="Certifications & Awards">
                    <p style={{ margin: '0', fontSize: '11pt', color: TEXT_COLOR_DARK }}>
                        {data.achievements || "(Achievements)"}
                        {data.certifications.length > 0 && <span style={{display: 'block', marginTop: '5px'}}> | {data.certifications.map(c => `${c.name} (${c.year})`).join(' | ')}</span>}
                    </p>
                </PreviewSection>
            </>
        );
        // ------------------------------------------------------------------

        if (template === "ats_colorblock") {
            return (
                <div ref={resumeRef} style={templateStyle}>
                    {/* Header Block (Dark/Color) */}
                    <div style={{ background: PRIME_COLOR, color: CARD_BG, padding: '25px 30px', textAlign: 'left', marginBottom: '15px' }}>
                        <h2 style={{ fontSize: "24pt", fontWeight: 700, margin: 0, letterSpacing: '1px' }}>{data.name.toUpperCase() || "YOUR NAME"}</h2>
                        <p style={{ margin: '4px 0 0 0', fontSize: '11pt', color: '#e0e7ff' }}>{data.experience[0]?.role || "SOFTWARE ENGINEER"}</p>
                        <p style={{ margin: '15px 0 0 0', fontSize: '9pt' }}>
                            {data.phone || "Phone"} | {data.email || "Email"} | {data.linkedin || "LinkedIn"} | {data.github || "GitHub"}
                        </p>
                    </div>

                    <div style={{ padding: '0 30px 30px 30px', fontSize: '10pt' }}>
                        {CoreContent}
                    </div>
                </div>
            );
        }
        
        if (template === "ats_twocolumn") {
            // Note: This visual layout simulates two columns for the human reader
            return (
                <div ref={resumeRef} style={getTemplateStyles(template)}>
                    <div style={{ padding: '0 30px' }}>
                        {/* Header */}
                        <div style={{ textAlign: "left", marginBottom: "16px", borderBottom: `3px solid ${PRIME_COLOR}`, paddingBottom: '10px' }}>
                            <h2 style={{ fontSize: "20pt", fontWeight: 800, margin: 0, color: TEXT_COLOR_DARK }}>{data.name.toUpperCase() || "YOUR NAME"}</h2>
                            <p style={{ margin: '4px 0 0 0', fontSize: '10pt', color: TEXT_COLOR_MUTED }}>{data.email || "Email"} | {data.phone || "Phone"}</p>
                            <p style={{ margin: '0', fontSize: '10pt', color: TEXT_COLOR_MUTED }}>{data.linkedin || "LinkedIn"} | {data.github || "GitHub"}</p>
                        </div>
                        
                        {/* Two Column Simulation */}
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {/* LEFT COLUMN: Skills, Education, Awards */}
                            <div style={{ width: '35%', flexShrink: 0 }}>
                                <div style={getPreviewSectionStyle(SECONDARY_COLOR, 'dashed')}>Technical Skills</div>
                                <p style={{ margin: '5px 0 10px 0', fontSize: '10pt', color: TEXT_COLOR_DARK }}>{data.skills || "List your skills here..."}</p>

                                <div style={getPreviewSectionStyle(SECONDARY_COLOR, 'dashed')}>Education</div>
                                {data.education.map((edu, idx) => (
                                    <div key={idx} style={{ marginBottom: '10px' }}>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: '10pt', color: TEXT_COLOR_DARK }}>{edu.degree || "(Degree)"} ({edu.year || "(Year)"})</p>
                                        <p style={{ margin: '2px 0 0 0', fontSize: '9pt', color: TEXT_COLOR_MUTED }}>{edu.college || "(University/College)"}</p>
                                    </div>
                                ))}

                                <div style={getPreviewSectionStyle(SECONDARY_COLOR, 'dashed')}>Awards</div>
                                <p style={{ margin: '5px 0 10px 0', fontSize: '10pt', color: TEXT_COLOR_DARK }}>{data.achievements || "(Achievements)"}</p>
                                
                            </div>

                            {/* RIGHT COLUMN: Summary, Experience, Projects */}
                            <div style={{ width: '65%' }}>
                                <div style={getPreviewSectionStyle(PRIME_COLOR)}>Professional Summary</div>
                                <p style={{ margin: '0 0 10px 0', fontSize: '10pt', color: TEXT_COLOR_DARK }}>{data.summary || "Highly motivated professional..."}</p>

                                <div style={getPreviewSectionStyle(PRIME_COLOR)}>Experience</div>
                                {data.experience.map((exp, idx) => (
                                    <div key={idx} style={{ marginBottom: '15px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p style={{ margin: 0, fontWeight: 700, fontSize: '11pt', color: TEXT_COLOR_DARK }}>{exp.role || "(Role Title)"} @ {exp.company || "(Company)"}</p>
                                            <p style={{ margin: 0, fontWeight: 500, fontSize: '10pt', color: TEXT_COLOR_MUTED }}>{exp.duration || "(Duration)"}</p>
                                        </div>
                                        {exp.summary && <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '10pt', color: TEXT_COLOR_DARK }}><li>{exp.summary}</li></ul>}
                                    </div>
                                ))}

                                <div style={getPreviewSectionStyle(PRIME_COLOR)}>Projects & Certs</div>
                                {data.projects.map((proj, idx) => (
                                    <div key={idx} style={{ marginBottom: '8px' }}>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: '10pt', color: TEXT_COLOR_DARK }}>{proj.title || "(Project Title)"}</p>
                                        <p style={{ margin: '2px 0 0 0', fontSize: '9pt', color: TEXT_COLOR_DARK }}>{proj.description || "(Description)"}</p>
                                    </div>
                                ))}
                                <p style={{ margin: '10px 0 0 0', fontSize: '10pt', color: TEXT_COLOR_DARK }}>
                                    <strong>Certs:</strong> {data.certifications.map(c => `${c.name} (${c.year})`).join(' | ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Default: ats_minimal
        return (
            <div ref={resumeRef} style={getTemplateStyles(template)}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    <h2 style={{ fontSize: "22pt", fontWeight: 700, margin: 0, color: TEXT_COLOR_DARK, letterSpacing: '1px' }}>{data.name.toUpperCase() || "YOUR NAME"}</h2>
                    <p style={{ margin: '4px 0 0 0', fontSize: '10pt', color: TEXT_COLOR_MUTED }}>
                        {data.phone || "Phone"} | {data.email || "Email"} | {data.linkedin || "LinkedIn"} | {data.github || "GitHub"}
                    </p>
                </div>
                {CoreContent}
            </div>
        );
    };


    return (
        <div style={{ minHeight: "100vh", background: BG_COLOR_LIGHT }}>
            {/* Navbar (Premium Look) */}
           <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", background: PRIME_COLOR, color: "#fff" }}>
    <h1 style={{ fontSize: "24px", fontWeight: "bold", letterSpacing: '1px' }}>VerteX </h1>
    <div style={{ display: "flex", gap: "20px" }}>
        {/* Added Home link */}
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Home</Link>
        
        {/* Existing Links */}
        <Link href="/roadmaps" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Roadmaps</Link>
        <Link href="/ai" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>AI Tools</Link> 
        <Link href="/internships" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Internships</Link>
        <Link href="/resume" style={{ color: 'white', textDecoration: 'none', fontWeight: 700, borderBottom: '2px solid white' }}>Resume Builder</Link>
        <Link href="/interview" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Interview Prep</Link>
        <Link href="/projects" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Projects</Link>
        <Link href="/hackathon" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Hackathons</Link>
        <Link href="/certifications" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Certifications</Link>
        <Link href="/cheatsheets" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Cheat Sheets</Link>
    </div>
</nav>
            <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}>
               {/* --- Hero Section for Resume Builder --- */}
<header className="text-center mb-16 pt-5"> {/* Added pt-20 for spacing below a fixed navbar */}
    <div 
        className="inline-block px-4 py-1 text-sm font-medium rounded-full mb-3"
        style={{ color: PRIME_COLOR, backgroundColor: 'rgba(0, 122, 255, 0.1)' }}
    >
        Land Your Dream Job 🚀
    </div>
    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: TEXT_COLOR_DARK }}>
        Build an **ATS-Ready** <span style={{ color: PRIME_COLOR }}>Resume</span> in Minutes
    </h1>
    <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
        Stop guessing and start winning. Use our **AI-powered Resume Builder** to create professional, job-winning resumes that pass automated screening and impress hiring managers.
    </p>
</header>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "30px" }}>
                    
                    {/* Form Section - Clean Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        
                        {/* Contact Card */}
                        <div style={sectionCardStyle}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: PRIME_COLOR }}>Contact & Profile</h3>
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle} />
                            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} />
                            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} style={inputStyle} />
                            <input type="text" name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} style={inputStyle} />
                            
                            <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: TEXT_COLOR_DARK }}>Professional Photo (Optional - ATS recommends skipping this)</label>
                            <input type="file" accept="image/*" onChange={(e) => { 
                                if (e.target.files && e.target.files[0] && typeof window !== "undefined") {
                                    setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) });
                                }
                            }} style={inputStyle} />
                        </div>
                        
                        {/* Summary & Skills Card (Changed to string input) */}
                        <div style={sectionCardStyle}>
                             <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: PRIME_COLOR }}>Summary & Core Competencies</h3>
                             <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: TEXT_COLOR_DARK }}>Professional Summary (3-4 Lines)</label>
                             <textarea name="summary" placeholder="Targeted summary matching the job description..." value={formData.summary} onChange={handleChange} style={{ ...inputStyle, height: "80px" }} />

                             <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: TEXT_COLOR_DARK }}>Technical Skills (Comma Separated for ATS)</label>
                             <textarea name="skills" placeholder="Python, Django, AWS, Kubernetes, TDD, Agile" value={formData.skills} onChange={handleChange} style={{ ...inputStyle, height: "60px" }} />
                             
                             <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", color: TEXT_COLOR_DARK }}>Languages (Comma Separated)</label>
                             <textarea name="languages" placeholder="English (Native), Spanish (Conversational)" value={formData.languages} onChange={handleChange} style={{ ...inputStyle, height: "40px" }} />
                        </div>

                        {/* Experience Card */}
                        <div style={sectionCardStyle}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: PRIME_COLOR }}>Work Experience (Focus on quantifiable results)</h3>
                            {formData.experience.map((exp, i) => (
                                <div key={i} style={{ border: `1px solid ${BORDER_COLOR}`, padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                                    <input style={inputStyle} placeholder="Role Title" value={exp.role} onChange={(e) => handleArrayChange("experience", i, "role", e.target.value)} />
                                    <input style={inputStyle} placeholder="Company Name" value={exp.company} onChange={(e) => handleArrayChange("experience", i, "company", e.target.value)} />
                                    <input style={inputStyle} placeholder="Duration (e.g., 2020 - Present)" value={exp.duration} onChange={(e) => handleArrayChange("experience", i, "duration", e.target.value)} />
                                    <textarea name={`experienceSummary_${i}`} style={{ ...inputStyle, height: '80px' }} placeholder="Summary: Action verbs & quantifiable results (e.g., Led, Developed, Reduced by 30%)" value={exp.summary} onChange={(e) => handleArrayChange("experience", i, "summary", e.target.value)} />
                                </div>
                            ))}
                            <button onClick={() => addNewField("experience")} style={secondaryButtonStyle}>+ Add Position</button>
                        </div>
                        
                        {/* Education, Projects, Certs Card */}
                        <div style={sectionCardStyle}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: PRIME_COLOR }}>Education & Achievements</h3>
                            
                            {/* Education */}
                            <h4 style={{ fontWeight: 600, margin: '15px 0 10px 0', color: TEXT_COLOR_DARK }}>Education</h4>
                            {formData.education.map((edu, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: '10px' }}>
                                    <input style={{ ...inputStyle, marginBottom: '10px' }} placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)} />
                                    <input style={{ ...inputStyle, marginBottom: '10px' }} placeholder="University/College" value={edu.college} onChange={(e) => handleArrayChange("education", i, "college", e.target.value)} />
                                    <input style={{ ...inputStyle, marginBottom: '10px' }} placeholder="Year" value={edu.year} onChange={(e) => handleArrayChange("education", i, "year", e.target.value)} />
                                </div>
                            ))}
                            <button onClick={() => addNewField("education")} style={secondaryButtonStyle}>+ Add Education</button>
                            
                            {/* Projects */}
                            <h4 style={{ fontWeight: 600, margin: '20px 0 10px 0', color: TEXT_COLOR_DARK }}>Projects</h4>
                            {formData.projects.map((proj, i) => (
                                <div key={i}>
                                    <input style={inputStyle} placeholder="Project Title" value={proj.title} onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)} />
                                    <textarea name={`projectDescription_${i}`} style={{ ...inputStyle, height: '60px' }} placeholder="Key technologies and impact (ATS keywords!)" value={proj.description} onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)} />
                                </div>
                            ))}
                            <button onClick={() => addNewField("projects")} style={secondaryButtonStyle}>+ Add Project</button>
                            
                            {/* Certifications & Awards */}
                            <h4 style={{ fontWeight: 600, margin: '20px 0 10px 0', color: TEXT_COLOR_DARK }}>Certifications & Awards</h4>
                             <textarea name="achievements" placeholder="List key achievements/awards here, comma separated." value={formData.achievements} onChange={handleChange} style={{ ...inputStyle, height: "60px" }} />
                            {formData.certifications.map((cert, i) => (
                                <div key={i} style={{ display: 'flex', gap: '10px' }}>
                                    <input style={inputStyle} placeholder="Certification Name" value={cert.name} onChange={(e) => handleArrayChange("certifications", i, "name", e.target.value)} />
                                    <input style={inputStyle} placeholder="Year" value={cert.year} onChange={(e) => handleArrayChange("certifications", i, "year", e.target.value)} />
                                </div>
                            ))}
                            <button onClick={() => addNewField("certifications")} style={secondaryButtonStyle}>+ Add Cert</button>
                            
                        </div>
                        
                        {/* Hobbies (Optional/Last priority) */}
                         <div style={sectionCardStyle}>
                             <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: PRIME_COLOR }}>Interests (Optional)</h3>
                             <textarea name="hobbies" placeholder="Your hobbies... (ATS Warning: Remove if space is tight)" value={formData.hobbies} onChange={handleChange} style={{ ...inputStyle, height: "60px" }} />
                        </div>
                    </div>
                    
                    {/* Resume Preview & ATS Widget */}
                    <div>
                        {/* ATS Widget (Real-time Feedback) */}
                        <div style={{ ...sectionCardStyle, border: `3px solid ${getAtsColor(atsResult.score)}` }}>
                            <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "10px", color: TEXT_COLOR_DARK }}>
                                Real-Time ATS Score
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <div style={{ fontSize: '32px', fontWeight: 900, color: getAtsColor(atsResult.score) }}>
                                    {atsResult.score}%
                                </div>
                                <p style={{ margin: 0, fontWeight: 600, color: TEXT_COLOR_MUTED }}>
                                    {atsResult.score >= 80 ? "EXCELLENT SCANNER READABILITY" : "NEEDS OPTIMIZATION"}
                                </p>
                            </div>

                            <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px", color: PRIME_COLOR }}>
                                Suggestions ({atsResult.suggestions.length})
                            </h4>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: TEXT_COLOR_DARK, lineHeight: 1.5 }}>
                                {atsResult.suggestions.length > 0 ? (
                                    atsResult.suggestions.map((s, i) => (
                                        <li key={i} style={{ color: s.includes('AVOID') || s.includes('too short') || s.includes('too long') ? DANGER_COLOR : WARNING_COLOR }}>
                                            {s}
                                        </li>
                                    ))
                                ) : (
                                    <li style={{ color: ACCENT_COLOR }}>✅ Resume looks great! Focus on keywords.</li>
                                )}
                            </ul>
                        </div>
                        
                        {/* Template Selector & Download */}
                        <div style={sectionCardStyle}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: PRIME_COLOR }}>Template Selector</h3>
                            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} style={{ ...inputStyle, marginTop: '10px' }}>
                                {TEMPLATE_OPTIONS.map((t, i) => <option key={i} value={t.value}>{t.name}</option>)}
                            </select>
                            
                            <button onClick={downloadPDF} style={{ ...buttonStyle, marginTop: "16px", width: '100%' }}>
                                <span style={{ marginRight: '8px' }}>⬇️</span> Download ATS-Ready PDF
                            </button>
                        </div>

                        <div style={{ padding: '0 10px' }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "15px", color: TEXT_COLOR_DARK }}>Live Preview: {TEMPLATE_OPTIONS.find(t => t.value === selectedTemplate)?.name}</h3>
                        </div>

                        {/* Resume Preview Rendering */}
                        {isMounted && (
                            renderResumeContent(selectedTemplate, formData)
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}