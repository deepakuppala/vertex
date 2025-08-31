"use client";

import React, { useState } from "react";
import Link from "next/link";

const roadmaps = [
  // 1. Frontend Developer
  {
    role: "Frontend Developer",
    img: "web-design.png",
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
    img: "https://img.icons8.com/color/64/000000/backend.png",
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
    img: "https://img.icons8.com/color/64/000000/full-stack.png",
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
    img: "https://img.icons8.com/color/64/000000/data-science.png",
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
    img: "https://img.icons8.com/color/64/000000/machine-learning.png",
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
    img: "https://img.icons8.com/color/64/000000/artificial-intelligence.png",
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
    img: "https://img.icons8.com/color/64/000000/devops.png",
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
    img: "https://img.icons8.com/color/64/000000/ui.png",
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
    img: "https://img.icons8.com/color/64/000000/blockchain.png",
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
    img: "https://img.icons8.com/color/64/000000/mobile-app.png",
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
    img: "https://img.icons8.com/color/64/000000/data-in-both-directions.png",
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
    img: "https://img.icons8.com/color/64/000000/game-controller.png",
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
    img: "https://img.icons8.com/color/64/000000/virtual-reality.png",
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
    img: "https://img.icons8.com/color/64/000000/robot-2.png",
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
    img: "https://img.icons8.com/color/64/000000/seo.png",
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
      "Day 81-90: Build portfolio & case studies",
    ],
  },
  // 19. Product Manager
  {
    role: "Product Manager",
    img: "https://img.icons8.com/color/64/000000/product-management.png",
    youtube: "https://www.youtube.com/watch?v=rR54k6z4y_M",
    steps: [
      "Day 1-10: Product management fundamentals & roadmap planning",
      "Day 11-20: Market research & user personas",
      "Day 21-30: Requirement gathering & user stories",
      "Day 31-40: Agile, Scrum, and Kanban basics",
      "Day 41-50: Product design and prototyping",
      "Day 51-60: Metrics, analytics, KPIs",
      "Day 61-70: Stakeholder communication & collaboration",
      "Day 71-80: Product launch strategies",
      "Day 81-90: Case study and portfolio",
    ],
  },
  // 20. Business Analyst
  {
    role: "Business Analyst",
    img: "https://img.icons8.com/color/64/000000/business-analytics.png",
    youtube: "https://www.youtube.com/watch?v=5GvC5bMzvVI",
    steps: [
      "Day 1-10: Basics of business analysis & requirements gathering",
      "Day 11-20: Process modeling & workflow diagrams",
      "Day 21-30: Data analysis & visualization",
      "Day 31-40: SQL and basic database concepts",
      "Day 41-50: Agile/Scrum methodologies",
      "Day 51-60: Stakeholder interviews & documentation",
      "Day 61-70: Business process improvement",
      "Day 71-80: Tools (Excel, Tableau, Power BI)",
      "Day 81-90: Final business analysis project",
    ],
  },
];

export default function RoadmapPage() {
  const [openRole, setOpenRole] = useState<number | null>(null);
  const roleColors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-500",
    "from-red-400 to-red-600",
    "from-teal-400 to-teal-600",
    "from-indigo-400 to-indigo-600",
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow">
        <h1 className="text-2xl font-bold">VerteX</h1>
        <div className="space-x-8">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/roadmaps" className="hover:underline">Roadmaps</Link>
          <Link href="/internships" className="hover:underline">Internships</Link>
          <Link href="/certifications" className="hover:underline">Certifications</Link>
          <Link href="/cheatsheets" className="hover:underline">Cheat Sheets</Link>
        </div>
      </nav>

      {/* Roadmaps Section */}
      <section id="roadmaps" className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Career Roadmaps</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br p-6 rounded-xl shadow-xl cursor-pointer transition transform hover:scale-105 hover:shadow-2xl ${
                roleColors[index % roleColors.length]
              } relative`}
              onClick={() => setOpenRole(openRole === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                {roadmap.img && (
                  <img src={roadmap.img} alt={roadmap.role} className="w-12 h-12 rounded-full" />
                )}
                <h3 className="text-xl font-bold text-white">{roadmap.role}</h3>
              </div>
              <div
                className={`overflow-hidden transition-all duration-500 mt-4 text-white ${
                  openRole === index ? "max-h-[2000px]" : "max-h-0"
                }`}
              >
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {roadmap.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
                <a
                  href={roadmap.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-white text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
