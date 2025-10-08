"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

const ChevronDownIcon = (props: { size: number; className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PlayCircleIcon = (props: { size: number; className?: string }) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10 8 16 12 10 16 10 8"></polygon>
  </svg>
);

// --- Your roadmaps array ---
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
// --- NEW LANGUAGE ROADMAPS ---
    // 21. Python Programmer
  {
    role: "Python Programmer",
    img: "https://cdn.simpleicons.org/python/3776AB",
    youtube: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    steps: [
      "Day 1-10: Python syntax, data structures (lists, dicts), control flow",
      "Day 11-20: Functions, scope, modules, and file I/O",
      "Day 21-30: OOP: Classes, inheritance, polymorphism",
      "Day 31-40: Exception handling, context managers, generators (yield)",
      "Day 41-50: NumPy/Pandas basics for data manipulation",
      "Day 51-60: Virtual environments, pip, project structure",
      "Day 61-70: Flask/Django setup for backend APIs",
      "Day 71-80: Testing (unittest, pytest) and deployment basics",
      "Day 81-90: Intermediate scripting project",
    ],
  },
    // 22. Java Developer
  {
    role: "Java Developer",
    img: "https://cdn.simpleicons.org/java/007396",
    youtube: "https://www.youtube.com/watch?v=grEKG-4458g",
    steps: [
      "Day 1-10: Java basics, data types, control flow, JVM",
      "Day 11-20: Core OOP: Classes, objects, constructors, encapsulation",
      "Day 21-30: Inheritance, interfaces, abstract classes, polymorphism",
      "Day 31-40: Collections Framework (List, Map, Set), Generics",
      "Day 41-50: Exception Handling, File I/O, Streams",
      "Day 51-60: Multithreading and Concurrency (Runnable, Executors)",
      "Day 61-70: JDBC basics and SQL interaction",
      "Day 71-80: Maven/Gradle, Spring Boot setup",
      "Day 81-90: Build a REST API with Spring Boot",
    ],
  },
    // 23. C Programmer
  {
    role: "C Programmer",
    img: "https://cdn.simpleicons.org/c/A8B9CC",
    youtube: "https://www.youtube.com/watch?v=KJgsSFOSAXk",
    steps: [
      "Day 1-10: Syntax, variables, I/O (printf, scanf), loops",
      "Day 11-20: Functions, scope, static variables",
      "Day 21-30: Arrays, strings, and multi-dimensional arrays",
      "Day 31-40: Pointers: arithmetic, double pointers, heap vs stack",
      "Day 41-50: Dynamic Memory Allocation (malloc, calloc, free)",
      "Day 51-60: Structs, Unions, Enums",
      "Day 61-70: File handling (FILE pointers)",
      "Day 71-80: Preprocessor directives and complex compilation",
      "Day 81-90: Build a command-line utility project",
    ],
  },
    // 24. C++ Developer
  {
    role: "C++ Developer",
    img: "https://cdn.simpleicons.org/cplusplus/00599C",
    youtube: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    steps: [
      "Day 1-10: C++ Syntax and references",
      "Day 11-20: Core OOP: Classes, objects, encapsulation, constructors",
      "Day 21-30: Inheritance, virtual functions, polymorphism (runtime vs compile)",
      "Day 31-40: STL: Vectors, Maps, Algorithms",
      "Day 41-50: Memory Management: new, delete, smart pointers (RAII)",
      "Day 51-60: Move semantics and perfect forwarding",
      "Day 61-70: Templates and Generics",
      "Day 71-80: File I/O and exception handling",
      "Day 81-90: Build a competitive programming environment project",
    ],
  },
    // 25. SQL & Database Expert
  {
    role: "SQL & Database Expert",
    img: "https://cdn.simpleicons.org/mysql/4479A9",
    youtube: "https://www.youtube.com/watch?v=HXV3zeQMqjg",
    steps: [
      "Day 1-10: SQL basics (SELECT, FROM, WHERE), DDL/DML/DCL",
      "Day 11-20: Joins (INNER, LEFT, RIGHT, FULL), Subqueries",
      "Day 21-30: Grouping, Aggregation, and HAVING clause",
      "Day 31-40: Advanced functions (Window functions, CTEs)",
      "Day 41-50: Database normalization (1NF to 3NF)",
      "Day 51-60: Indexing, performance optimization, execution plans",
      "Day 61-70: Stored Procedures, Views, and Triggers",
      "Day 71-80: Transactions and concurrency control",
      "Day 81-90: Capstone project (Data Modeling)",
    ],
  },
    // 26. MongoDB Developer
  {
    role: "MongoDB Developer",
    img: "https://cdn.simpleicons.org/mongodb/47A248",
    youtube: "https://www.youtube.com/watch?v=W-Lh_Q60YJ8",
    steps: [
      "Day 1-10: NoSQL concepts, MongoDB architecture, BSON/JSON",
      "Day 11-20: CRUD operations (find, insert, update, delete)",
      "Day 21-30: Indexing and query optimization",
      "Day 31-40: Data modeling (Embedding vs. Referencing)",
      "Day 41-50: Aggregation Framework (match, group, project, unwind)",
      "Day 51-60: Transactions and concurrency",
      "Day 61-70: Sharding and replication sets",
      "Day 71-80: Cloud integration (Atlas)",
      "Day 81-90: Build a NoSQL database project",
    ],
  },
    // 27. PHP Developer
  {
    role: "PHP Developer",
    img: "https://cdn.simpleicons.org/php/777BB4",
    youtube: "https://www.youtube.com/watch?v=2eYfN5g7T8g",
    steps: [
      "Day 1-10: PHP syntax, variables, arrays, control flow",
      "Day 11-20: Functions, superglobals ($_GET, $_POST), forms",
      "Day 21-30: File handling, sessions, and cookies",
      "Day 31-40: OOP in PHP: classes, traits, interfaces",
      "Day 41-50: Database connection (MySQLi/PDO) and CRUD",
      "Day 51-60: PHP Framework basics (Laravel/Symfony)",
      "Day 61-70: Security: XSS, CSRF prevention, prepared statements",
      "Day 71-80: REST API development with PHP",
      "Day 81-90: Build a simple web application",
    ],
  },
    // 28. Go Developer
  {
    role: "Go Developer",
    img: "https://cdn.simpleicons.org/go/00ADD8",
    youtube: "https://www.youtube.com/watch?v=YS4e4q9oBaU",
    steps: [
      "Day 1-10: Go basics, syntax, variables, packages (fmt, time)",
      "Day 11-20: Control flow, functions, error handling (defer, panic)",
      "Day 21-30: Pointers, structs, methods, interfaces",
      "Day 31-40: Concurrency: Goroutines and Channels",
      "Day 41-50: Standard library usage (net/http, json)",
      "Day 51-60: Building REST APIs with Go",
      "Day 61-70: Database integration (SQL) and ORM",
      "Day 71-80: Testing and performance benchmarking",
      "Day 81-90: Build a high-performance backend microservice",
    ],
  },
    // 29. C# (.NET) Developer
  {
    role: "C# (.NET) Developer",
    img: "https://cdn.simpleicons.org/csharp/239120",
    youtube: "https://www.youtube.com/watch?v=GhQNFyGSfdw",
    steps: [
      "Day 1-10: C# syntax, variables, basic control flow",
      "Day 11-20: OOP fundamentals (properties, methods, encapsulation)",
      "Day 21-30: Interfaces, abstract classes, delegates, events",
      "Day 31-40: LINQ (Language Integrated Query) and Collections",
      "Day 41-50: Asynchronous programming (async/await)",
      "Day 51-60: .NET Framework/Core basics and project structure",
      "Day 61-70: ASP.NET Core MVC/Web API development",
      "Day 71-80: Database integration (Entity Framework)",
      "Day 81-90: Build a full-stack web application",
    ],
  },
    // 30. TypeScript Expert
  {
    role: "TypeScript Expert",
    img: "https://cdn.simpleicons.org/typescript/3178C6",
    youtube: "https://www.youtube.com/watch?v=F2JCjVSaNss",
    steps: [
      "Day 1-10: TypeScript basics, primitive types, functions",
      "Day 11-20: Interfaces, type aliases, literal types",
      "Day 21-30: Classes, access modifiers, advanced OOP in TS",
      "Day 31-40: Generics and utility types (Partial, Required)",
      "Day 41-50: Modules, namespaces, and declaration files",
      "Day 51-60: TS with React/Node.js setup and configuration",
      "Day 61-70: Advanced type inference and conditional types",
      "Day 71-80: State management and debugging TS applications",
      "Day 81-90: Convert large JS codebase to strict TS",
    ],
  },
];
const PRIME_COLOR = "#007AFF"; // Modern, deep blue (Equivalent to blue-600/700)
const ACCENT_COLOR = "#10b981"; // Vibrant Green (Equivalent to emerald-500/600)
const BG_COLOR_LIGHT = "#f9fafb"; // Equivalent to gray-50
const CARD_BG = "#ffffff"; // White
const TEXT_COLOR_DARK = "#1f2937"; // Equivalent to gray-800

export default function RoadmapPage() {
  const [openRole, setOpenRole] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).jspdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, []);

  const generatePDF = useCallback((roadmap: typeof roadmaps[0]) => {
    if (!(window as any).jspdf) return alert("PDF generator not loaded yet!");
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
        if (y > pageHeight - margin) { doc.addPage(); y = margin; }
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
    <div className="min-h-screen bg-gray-50 pb-12 pt-0">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
  {/* Logo */}
  <h1 className="text-2xl font-bold">
    <Link href="/">VerteX</Link>
  </h1>

  {/* Desktop Links */}
  <div className="hidden md:flex space-x-8">
    <Link href="/" className="hover:underline">Home</Link>
    <Link href="/roadmaps" className="hover:underline">Roadmaps</Link>
    <Link href="/internships" className="hover:underline">Internships</Link>
    <Link href="/resume" className="hover:underline">Resume Builder</Link>
    <Link href="/interview" className="hover:underline">Interview Prep</Link>
    <Link href="/projects" className="hover:underline">Projects</Link>
    <Link href="/hackathon" className="hover:underline">Hackathons</Link>
    <Link href="/certifications" className="hover:underline">Certifications</Link>
    <Link href="/cheatsheets" className="hover:underline">Cheat Sheets</Link>
  </div>
</nav>

      {/* Hero */}
      {/* Header/Intro Section (PROFESSIONAL & ATTRACTIVE REVAMP) */}
<header className="text-center mb-16 pt-10">
  {/* Small Badge */}
  <div
    className="inline-block px-4 py-1 text-sm font-medium rounded-full mb-3"
    style={{ color: PRIME_COLOR, backgroundColor: "rgba(0, 122, 255, 0.1)" }}
  >
    Career Growth Roadmaps
  </div>

  {/* Big Heading */}
  <h1
    className="text-5xl lg:text-6xl font-extrabold tracking-tight"
    style={{ color: TEXT_COLOR_DARK }}
  >
    Master Your Career with <span style={{ color: PRIME_COLOR }}>Step-by-Step Roadmaps</span>
  </h1>

  {/* Subtitle */}
  <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
    Follow structured learning paths for <strong>Frontend, Backend, AI/ML, and
    Data Science</strong>. Vertex helps you stay on track with curated resources
    and actionable milestones.
  </p>
</header>


      {/* Roadmaps list */}
      <main className="max-w-5xl mx-auto px-4 mt-12 space-y-6">
        {roadmaps.map((roadmap, idx) => {
          const isOpen = openRole === idx;
          return (
            <section
              key={idx}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => setOpenRole(isOpen ? null : idx)}
            >
              <div className="flex items-center gap-4">
                <img src={roadmap.img} alt={roadmap.role} className="w-12 h-12 object-contain rounded-full border border-gray-200" />
                <h2 className="text-xl font-semibold text-gray-800">{roadmap.role}</h2>
                <ChevronDownIcon size={20} className={`ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </div>

              <div className={`mt-4 text-gray-700 transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
                <ul className="list-disc list-inside space-y-1">
                  {roadmap.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ul>

                {isOpen && (
                  <button
                    onClick={() => generatePDF(roadmap)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <PlayCircleIcon size={18} /> Download PDF
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
