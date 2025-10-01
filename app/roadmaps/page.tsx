"use client";

import React, { useState, useCallback, useEffect } from "react";

// --- Inline SVG Icon Definitions ---
const ChevronDownIcon = (props: { size: number; className?: string; style?: React.CSSProperties }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PlayCircleIcon = (props: { size: number; className?: string; style?: React.CSSProperties }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10 8 16 12 10 16 10 8"></polygon>
  </svg>
);

const MapIcon = (props: { size: number; className?: string; style?: React.CSSProperties }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

// --- Roadmaps Data (Example for 3, you can add full list) ---
const roadmaps = [
  // 1. Frontend Developer
  {
    role: "Frontend Developer",
    img: "https://cdn.simpleicons.org/html5/E34F26",
    youtube: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    steps: [
      "Day 1-10: HTML, CSS, JavaScript basics and responsive design",
      "Day 11-20: Advanced JS, ES6+, DOM manipulation, events",
      "Day 21-30: React basics, components, props, state",
      "Day 31-40: React hooks, router, context API, Redux",
      "Day 41-50: API integration, styling (Tailwind/SCSS), forms",
      "Day 51-60: Testing, performance optimization, mini projects",
      "Day 61-70: Advanced React, PWA, TypeScript integration",
      "Day 71-80: Next.js SSR/SSG, GraphQL, security basics",
      "Day 81-90: Final project, deployment, portfolio ready",
    ],
  },
  // 2. Backend Developer
  {
    role: "Backend Developer",
    img: "https://cdn.simpleicons.org/node.js/339933",
    youtube: "https://www.youtube.com/watch?v=Q33KBiDriJY",
    steps: [
      "Day 1-10: Learn Node.js/Java/Python basics and environment setup",
      "Day 11-20: File handling, OOP concepts, modules, packages",
      "Day 21-30: REST API creation, routing, middleware",
      "Day 31-40: Database integration (SQL, NoSQL), ORM/ODM",
      "Day 41-50: Authentication, authorization, JWT, security",
      "Day 51-60: Testing, error handling, logging",
      "Day 61-70: Microservices basics, caching, queues",
      "Day 71-80: Deployment with Docker/Kubernetes, CI/CD",
      "Day 81-90: Final backend project, performance optimization",
    ],
  },
  // 3. Full Stack Developer
  {
    role: "Full Stack Developer",
    img: "https://cdn.simpleicons.org/javascript/F7DF1E",
    youtube: "https://www.youtube.com/watch?v=4xC1bCNqD3Q",
    steps: [
      "Day 1-10: Frontend basics (HTML, CSS, JS) + mini project",
      "Day 11-20: Backend basics (Node.js/Express, DBs) + mini API",
      "Day 21-30: Advanced frontend (React/Angular/Vue)",
      "Day 31-40: Advanced backend (auth, APIs, ORM)",
      "Day 41-50: Integrate frontend and backend projects",
      "Day 51-60: State management, caching, optimization",
      "Day 61-70: TypeScript integration, testing frontend + backend",
      "Day 71-80: Deployment, CI/CD pipelines, cloud basics",
      "Day 81-90: Final full-stack project (portfolio/e-commerce)",
    ],
  },
  // 4. Data Scientist
  {
    role: "Data Scientist",
    img: "https://cdn.simpleicons.org/python/3776AB",
    youtube: "https://www.youtube.com/watch?v=ua-CiDNNj30",
    steps: [
      "Day 1-10: Python/R basics, NumPy, Pandas",
      "Day 11-20: Statistics, probability, EDA on datasets",
      "Day 21-30: Data visualization (Matplotlib, Seaborn, Plotly)",
      "Day 31-40: Machine Learning basics (regression, classification)",
      "Day 41-50: Advanced ML (ensemble, feature engineering, cross-validation)",
      "Day 51-60: NLP, recommendation systems",
      "Day 61-70: Deep Learning basics (TensorFlow, PyTorch)",
      "Day 71-80: Model deployment (Flask/FastAPI), cloud ML",
      "Day 81-90: Capstone project + portfolio",
    ],
  },
  // 5. Machine Learning Engineer
  {
    role: "Machine Learning Engineer",
    img: "https://cdn.simpleicons.org/tensorflow/FF6F00",
    youtube: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
    steps: [
      "Day 1-10: ML fundamentals and math review (linear algebra, probability)",
      "Day 11-20: Supervised & unsupervised learning algorithms",
      "Day 21-30: Feature engineering and preprocessing",
      "Day 31-40: Model evaluation, cross-validation, hyperparameter tuning",
      "Day 41-50: Deep learning basics (CNN, RNN, LSTM)",
      "Day 51-60: Advanced frameworks (TensorFlow, PyTorch)",
      "Day 61-70: Model deployment with Flask/FastAPI",
      "Day 71-80: Cloud ML platforms (AWS Sagemaker, GCP AI)",
      "Day 81-90: Full ML project deployment",
    ],
  },
  // 6. AI Researcher
  {
    role: "AI Researcher",
    img: "https://cdn.simpleicons.org/openai/412991",
    youtube: "https://www.youtube.com/watch?v=aircAruvnKk",
    steps: [
      "Day 1-10: Advanced math (linear algebra, probability, statistics)",
      "Day 11-20: Deep learning theory (CNN, RNN, Transformers)",
      "Day 21-30: Learn PyTorch/TensorFlow",
      "Day 31-40: Read and replicate research papers",
      "Day 41-50: Experiment with novel ideas",
      "Day 51-60: Participate in Kaggle/competitions",
      "Day 61-70: Open source contributions",
      "Day 71-80: Advanced model optimization & experimentation",
      "Day 81-90: Publish research, build portfolio",
    ],
  },
  // 7. DevOps Engineer
  {
    role: "DevOps Engineer",
    img: "https://cdn.simpleicons.org/docker/2496ED",
    youtube: "https://www.youtube.com/watch?v=6QOOZfYmrY0",
    steps: [
      "Day 1-10: Linux fundamentals, scripting, version control (Git)",
      "Day 11-20: CI/CD basics, build pipelines",
      "Day 21-30: Docker & containerization",
      "Day 31-40: Kubernetes basics",
      "Day 41-50: Monitoring & logging (Prometheus, Grafana)",
      "Day 51-60: Infrastructure as code (Terraform, Ansible)",
      "Day 61-70: Cloud platforms (AWS, Azure, GCP)",
      "Day 71-80: Security, scalability, backups",
      "Day 81-90: Deploy full project with CI/CD pipeline",
    ],
  },
  // 8. UI/UX Designer
  {
    role: "UI/UX Designer",
    img: "https://cdn.simpleicons.org/figma/F24E1E",
    youtube: "https://www.youtube.com/watch?v=1Rq2NnsbyAw",
    steps: [
      "Day 1-10: Learn design principles, color theory, typography",
      "Day 11-20: Wireframing & prototyping (Figma/AdobeXD)",
      "Day 21-30: UX research, user personas, journey maps",
      "Day 31-40: Responsive design and accessibility",
      "Day 41-50: Advanced UI animations & micro-interactions",
      "Day 51-60: Design systems, components, style guides",
      "Day 61-70: Tools (Sketch, Adobe Suite), advanced prototyping",
      "Day 71-80: Usability testing & feedback analysis",
      "Day 81-90: Portfolio project & case studies",
    ],
  },
  // 9. Blockchain Developer
  {
    role: "Blockchain Developer",
    img: "https://cdn.simpleicons.org/ethereum/3C3C3D",
    youtube: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
    steps: [
      "Day 1-10: Blockchain fundamentals & cryptography basics",
      "Day 11-20: Ethereum, Smart contracts, Solidity",
      "Day 21-30: DApps development basics",
      "Day 31-40: Web3.js integration",
      "Day 41-50: Testing smart contracts & deployment",
      "Day 51-60: Layer 2 solutions & scaling",
      "Day 61-70: DeFi concepts, NFT development",
      "Day 71-80: Security & audits",
      "Day 81-90: Build full blockchain project",
    ],
  },
  // 10. Cybersecurity Engineer
  {
    role: "Cybersecurity Engineer",
    img: "https://img.icons8.com/color/64/000000/cyber-security.png",
    youtube: "https://www.youtube.com/watch?v=inWWhr5tnEA",
    steps: [
      "Day 1-10: Networking fundamentals & OS basics",
      "Day 11-20: Cybersecurity principles & threats",
      "Day 21-30: Penetration testing basics",
      "Day 31-40: Vulnerability scanning & ethical hacking",
      "Day 41-50: Firewalls, IDS/IPS, VPNs",
      "Day 51-60: Cryptography & PKI",
      "Day 61-70: Cloud security & secure coding",
      "Day 71-80: Incident response & monitoring",
      "Day 81-90: Capstone security project",
    ],
  },
  // 11. Mobile App Developer
  {
    role: "Mobile App Developer (Android/iOS)",
    img: "https://cdn.simpleicons.org/android/3DDC84",
    youtube: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
    steps: [
      "Day 1-10: Java/Kotlin or Swift basics",
      "Day 11-20: UI layout, activity lifecycle, navigation",
      "Day 21-30: Data storage, SQLite, SharedPreferences",
      "Day 31-40: API integration & network calls",
      "Day 41-50: Firebase integration & push notifications",
      "Day 51-60: Advanced UI, animations, and gestures",
      "Day 61-70: Testing & debugging",
      "Day 71-80: Performance optimization",
      "Day 81-90: Final app deployment on Play Store / App Store",
    ],
  },
  // 12. Cloud Engineer
  {
    role: "Cloud Engineer",
    img: "https://img.icons8.com/color/64/000000/cloud.png",
    youtube: "https://www.youtube.com/watch?v=Ia-UEYYR44s",
    steps: [
      "Day 1-10: Cloud fundamentals (AWS, Azure, GCP basics)",
      "Day 11-20: Compute & storage services",
      "Day 21-30: Networking & security in cloud",
      "Day 31-40: Monitoring & logging",
      "Day 41-50: Infrastructure as code (Terraform, CloudFormation)",
      "Day 51-60: Containers & serverless computing",
      "Day 61-70: CI/CD in cloud",
      "Day 71-80: Cloud architecture design",
      "Day 81-90: Capstone deployment project",
    ],
  },
  // 13. Data Engineer
  {
    role: "Data Engineer",
    img: "https://cdn.simpleicons.org/apache/green",
    youtube: "https://www.youtube.com/watch?v=0g3z8kKJcOE",
    steps: [
      "Day 1-10: SQL, databases, ETL concepts",
      "Day 11-20: Python/Scala for data pipelines",
      "Day 21-30: Big data basics (Hadoop, Spark)",
      "Day 31-40: Data modeling & warehousing",
      "Day 41-50: Cloud data services (AWS Redshift, BigQuery)",
      "Day 51-60: Streaming pipelines (Kafka, Spark Streaming)",
      "Day 61-70: Data quality & validation",
      "Day 71-80: Workflow orchestration (Airflow)",
      "Day 81-90: End-to-end data pipeline project",
    ],
  },
  // 14. Game Developer
  {
    role: "Game Developer",
    img: "https://cdn.simpleicons.org/unity/000000",
    youtube: "https://www.youtube.com/watch?v=2a2aAOA9Mro",
    steps: [
      "Day 1-10: Game engine basics (Unity/Unreal), C# or C++ basics",
      "Day 11-20: Game physics, math, and graphics basics",
      "Day 21-30: 2D game development, sprites, animation",
      "Day 31-40: 3D game development basics",
      "Day 41-50: Input handling & UI in games",
      "Day 51-60: Game AI and mechanics",
      "Day 61-70: Networking & multiplayer basics",
      "Day 71-80: Optimization & profiling",
      "Day 81-90: Final game project",
    ],
  },
  // 15. AR/VR Developer
  {
    role: "AR/VR Developer",
    img: "https://cdn.simpleicons.org/oculus/007AFF",
    youtube: "https://www.youtube.com/watch?v=ZcThhweq0x0",
    steps: [
      "Day 1-10: AR/VR fundamentals, Unity/Unreal basics",
      "Day 11-20: 3D modeling & animation basics",
      "Day 21-30: VR interactions & controls",
      "Day 31-40: AR tracking & rendering",
      "Day 41-50: Physics & optimization in VR/AR",
      "Day 51-60: UI/UX for AR/VR",
      "Day 61-70: Networking & multiplayer VR",
      "Day 71-80: Integration with mobile/desktop",
      "Day 81-90: Final AR/VR project",
    ],
  },
  // 16. Robotics Engineer
  {
    role: "Robotics Engineer",
    img: "https://cdn.simpleicons.org/arduino/00979D",
    youtube: "https://www.youtube.com/watch?v=go0i44H9B8U",
    steps: [
      "Day 1-10: Robotics fundamentals & electronics basics",
      "Day 11-20: Sensors & actuators",
      "Day 21-30: Arduino / Raspberry Pi projects",
      "Day 31-40: Robot kinematics & control systems",
      "Day 41-50: Robot operating system (ROS basics)",
      "Day 51-60: Path planning & navigation",
      "Day 61-70: Machine learning for robotics",
      "Day 71-80: Simulation & testing",
      "Day 81-90: Final robotics project",
    ],
  },
  // 17. IoT Developer
  {
    role: "IoT Developer",
    img: "https://img.icons8.com/color/64/000000/iot.png",
    youtube: "https://www.youtube.com/watch?v=sKoF9F7uF6Y",
    steps: [
      "Day 1-10: IoT fundamentals, sensors, and hardware basics",
      "Day 11-20: Microcontrollers (Arduino, ESP32)",
      "Day 21-30: Communication protocols (MQTT, HTTP, BLE)",
      "Day 31-40: Data collection & processing",
      "Day 41-50: Cloud integration & dashboards",
      "Day 51-60: IoT security basics",
      "Day 61-70: Real-time data streaming",
      "Day 71-80: Automation & control systems",
      "Day 81-90: Final IoT project",
    ],
  },
  // 18. SEO & Digital Marketing Specialist
  {
    role: "SEO & Digital Marketing Specialist",
    img: "https://cdn.simpleicons.org/googleads/4285F4",
    youtube: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    steps: [
      "Day 1-10: Marketing fundamentals & SEO basics",
      "Day 11-20: Keyword research & on-page SEO",
      "Day 21-30: Content strategy & blogging",
      "Day 31-40: Google Analytics & Search Console",
      "Day 41-50: Link building & outreach",
      "Day 51-60: Social media marketing basics",
      "Day 61-70: Paid campaigns (Google Ads, Meta Ads)",
      "Day 71-80: Email marketing & automation",
      "Day 81-90: Final marketing campaign project",
    ],
  },
  // 19. Product Manager
  {
    role: "Product Manager",
    img: "https://cdn.simpleicons.org/trello/0052CC",
    youtube: "https://www.youtube.com/watch?v=k8u3oM0xTdw",
    steps: [
      "Day 1-10: Product management fundamentals & market research",
      "Day 11-20: Requirement gathering & user stories",
      "Day 21-30: Wireframing & prototyping",
      "Day 31-40: Roadmapping & prioritization",
      "Day 41-50: Agile & Scrum basics",
      "Day 51-60: Stakeholder management",
      "Day 61-70: Analytics & metrics",
      "Day 71-80: Go-to-market strategy",
      "Day 81-90: Launch & post-launch analysis",
    ],
  },
  // 20. QA Engineer
  {
    role: "QA Engineer",
    img: "https://cdn.simpleicons.org/selenium/43B02A",
    youtube: "https://www.youtube.com/watch?v=5XQL5FwTg4A",
    steps: [
      "Day 1-10: QA fundamentals, testing types & SDLC",
      "Day 11-20: Manual testing basics, test cases",
      "Day 21-30: Bug tracking & reporting",
      "Day 31-40: Automation basics (Selenium, Cypress)",
      "Day 41-50: API testing basics (Postman, RestAssured)",
      "Day 51-60: CI/CD integration & test pipelines",
      "Day 61-70: Performance & security testing basics",
      "Day 71-80: Advanced automation frameworks",
      "Day 81-90: Capstone QA project",
    ],
  },
];

// Color gradients for cards
const roleColors = [
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-purple-400 to-purple-600",
];

export default function RoadmapPage() {
  const [openRole, setOpenRole] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load jsPDF via CDN
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).jspdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const generatePDF = useCallback((roadmap: typeof roadmaps[0]) => {
    if (!(window as any).jspdf) {
      alert("PDF generator not loaded yet!");
      return;
    }

    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const img = new Image();
    img.src = "/pdftemp.jpg";

    img.onload = () => {
      doc.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);

      let y = 100;
      const margin = 80;
      const contentWidth = pageWidth - 2 * margin;

      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 41, 55);
      doc.text(`Professional Roadmap: ${roadmap.role}`, pageWidth / 2, y, { align: "center" });
      y += 30;

      doc.setFontSize(16);
      doc.setTextColor(59, 130, 246);
      doc.text("90-Day Milestones:", margin, y);
      y += 15;

      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      const lineSpacing = 12;

      roadmap.steps.forEach((step, i) => {
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        const stepNumber = `${i + 1}.`;
        const text = doc.splitTextToSize(step, contentWidth - 20);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(250, 204, 21);
        doc.text(stepNumber, margin, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(75, 85, 99);
        doc.text(text, margin + 20, y);

        y += text.length * lineSpacing;
      });

      y = pageHeight - 50;
      doc.setFontSize(10);
      doc.setTextColor(37, 99, 235);
      doc.text("Video Guide: " + roadmap.youtube, margin, y);

      doc.save(`${roadmap.role.replace(/\s+/g, "_")}_Roadmap.pdf`);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-20">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">VerteX</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 justify-center flex-grow">
            {["Home", "Roadmaps", "Internships", "Resume Builder", "Interview Prep", "Projects"].map((item) => (
              <a key={item} href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-blue-600 text-gray-700">
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-2 border rounded text-blue-600 border-blue-600 hover:bg-blue-50 transition"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-100 px-4 py-2 space-y-2 border-t">
            {["Home", "Roadmaps", "Internships", "Resume Builder", "Interview Prep", "Projects"].map((item) => (
              <a key={item} href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="block text-gray-700 hover:text-blue-600">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">90-Day Roadmaps for Students & Developers</h1>
        <p className="text-lg md:text-2xl">Master skills, land internships, and prepare for your career efficiently</p>
      </header>

      {/* Roadmap Cards */}
      <main className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmaps.map((roadmap, idx) => {
          const isOpen = openRole === idx;
          const color = roleColors[idx % roleColors.length];

          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-xl text-white transition-transform transform hover:scale-105`}
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 cursor-pointer" onClick={() => setOpenRole(isOpen ? null : idx)}>
                <div className="flex items-center gap-4">
                  <img src={roadmap.img} alt={roadmap.role} className="w-12 h-12 object-contain rounded-full" />
                  <h2 className="text-lg font-semibold truncate">{roadmap.role}</h2>
                </div>
                <ChevronDownIcon size={24} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </div>

              {/* Steps */}
              <div className={`mt-4 text-sm text-white/90 overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
                <ul className="list-disc list-inside space-y-1">
                  {roadmap.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>

                {/* PDF Button */}
                {isOpen && (
                  <button
                    onClick={() => generatePDF(roadmap)}
                    className="mt-4 px-4 py-2 bg-white text-gray-800 font-bold rounded-lg hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <PlayCircleIcon size={18} /> Download PDF
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
