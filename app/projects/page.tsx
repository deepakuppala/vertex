"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// --- Design Constants ---
const PRIMARY_COLOR = "#325AA8"; // Deep Modern Blue
const ACCENT_COLOR = "#00BFA5"; // Startup Teal/Green
const WARNING_COLOR = "#FFC300"; // Gold/Amber
const DANGER_COLOR = "#E94E77"; // Action/High Value Red
const CARD_BG = "#ffffff";
const GRADIENT_BG = "linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)"; // Very light, clean background
const TEXT_COLOR_DARK = "#212529";
const TEXT_COLOR_MUTED = "#6c757d";
const SHADOW_LIGHT = "0 6px 15px rgba(0,0,0,0.08)";
const SHADOW_ACCENT = "0 12px 30px rgba(50, 90, 168, 0.3)"; // Primary color shadow

// --- Type Definitions ---
type Prompt = {
    type: 'Technical' | 'Behavioral' | 'Architectural';
    question: string;
    keywords: string[];
};

type Project = {
    id: number;
    title: string;
    description: string;
    githubLink?: string;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    interviewPrompts: Prompt[];
    skillsGained: string[]; 
    targetRoles: string[];
    realWorldContext: string;
    primaryLanguage: 'JavaScript/TS' | 'Python' | 'Java' | 'Go' | 'SQL' | 'C#';
};

type RoleProjectsMap = {
    [role: string]: Project[];
};

// --- Data: Roles and Languages ---
const ALL_ROLES: string[] = [
    "Web Developer", 
    "Frontend Developer", 
    "Data Scientist", 
    "ML Engineer", 
    "DevOps Engineer", 
    "Cybersecurity Analyst", 
    "Software Architect", 
    "Cloud Security Engineer",
    "Product Manager (Technical)",
    "Blockchain Developer",
];

const ALL_LANGUAGES: string[] = [
    'JavaScript/TS', 'Python', 'Java', 'SQL', 'C#', 'Go'
];

// --- STABLE, FLAT PROJECT DATA (60 PROJECTS) ---
const ALL_PROJECTS_FLAT: Project[] = [
    // =================================== 1. WEB DEVELOPER (6 Projects) ===================================
    { id: 101, title: "Recipe Finder API (Node.js)", description: "Build a simple REST API (Node.js/Express) that serves recipe data from a local JSON file or basic database. Focus on routing and HTTP methods.", githubLink: "https://github.com/expressjs/express", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "Explain the difference between GET and POST requests.", keywords: ["HTTP Methods", "REST", "Routing"] }],
        skillsGained: ['Node.js', 'Express', 'REST API', 'JSON Handling'], targetRoles: ['Junior Backend', 'Web Developer'], realWorldContext: "Foundation of any microservice or data-driven web app." },
    { id: 102, title: "URL Shortener Microservice (Go)", description: "Implement a simple URL shortener. Focus on string generation, database storage (SQLite), and efficient redirect logic.", githubLink: "https://github.com/ant-media/url-shortener-go", difficulty: 'Intermediate', primaryLanguage: 'Go',
        interviewPrompts: [{ type: 'Technical', question: "How did you ensure the generated short codes are unique?", keywords: ["Hash Function", "Base62 Encoding", "Collisions"] }],
        skillsGained: ['GoLang', 'SQLite/Redis', 'HTTP Routing', 'URL Redirection'], targetRoles: ['Backend Engineer', 'Platform Engineer'], realWorldContext: "High-performance microservices used by bit.ly or tinyurl." },
    { id: 103, title: "Task Manager API (ASP.NET Core)", description: "Develop a basic Task Manager API using ASP.NET Core MVC/minimal APIs, including simple CRUD operations and database integration (EF Core).", githubLink: "https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/tutorials/min-apis", difficulty: 'Intermediate', primaryLanguage: 'C#',
        interviewPrompts: [{ type: 'Technical', question: "Explain the purpose of middleware in an ASP.NET Core application.", keywords: ["Middleware", "Dependency Injection", "Entity Framework"] }],
        skillsGained: ['ASP.NET Core', 'C#', 'Entity Framework', 'CRUD Operations'], targetRoles: ['Junior Backend (.NET)', 'Web Developer'], realWorldContext: "Building simple data management systems within large organizations." },
    { id: 104, title: "User Auth Prototype (Java/Spring)", description: "Create a web application with user registration and login functionality using Spring Boot and Spring Security. Focus on secure password hashing.", githubLink: "https://github.com/spring-projects/spring-security", difficulty: 'Intermediate', primaryLanguage: 'Java',
        interviewPrompts: [{ type: 'Technical', question: "Why should you never store plain-text passwords?", keywords: ["Hashing (Bcrypt)", "Salt", "Session Management"] }],
        skillsGained: ['Spring Boot', 'Spring Security', 'Java', 'User Authentication'], targetRoles: ['Junior Backend', 'Fullstack Developer'], realWorldContext: "Fundamental security requirement for all major web services." },
    { id: 105, title: "Markdown Blog Generator (Python)", description: "Build a static site generator (using Python/Jinja) that converts Markdown files into HTML blog posts.", githubLink: "https://github.com/getpelican/pelican", difficulty: 'Beginner', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Python', 'File I/O', 'Templating (Jinja)', 'Static Site Generation'], targetRoles: ['Junior Developer', 'Blogger'], realWorldContext: "Tools like Jekyll or Gatsby for technical documentation and personal blogs." },
    { id: 106, title: "Basic Calculator Console App", description: "Develop a functional command-line calculator that handles basic arithmetic (+, -, \*, /) and simple input error handling.", githubLink: "https://github.com/topics/calculator-cli", difficulty: 'Beginner', primaryLanguage: 'C#',
        interviewPrompts: [], skillsGained: ['C# Basics', 'Console I/O', 'Error Handling', 'Basic Logic'], targetRoles: ['Junior Developer', 'Web Developer'], realWorldContext: "A foundational exercise in mastering language syntax and functions." },
    
    // =================================== 2. FRONTEND DEVELOPER (6 Projects) ===================================
    { id: 401, title: "Interactive Calculator (React/TS)", description: "Build a fully functional calculator that handles order of operations and displays calculation history, focusing on component logic.", githubLink: "https://react.dev/learn/tutorial-tic-tac-toe", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "Explain how you managed the calculation state and history within your components.", keywords: ["Component State", "Event Handling", "Input Parsing"] }],
        skillsGained: ['React Hooks', 'Component Logic', 'State Management'], targetRoles: ['Junior Frontend', 'Frontend Developer'], realWorldContext: "A foundational exercise in managing complex client-side state." }, 
    { id: 402, title: "Weather App with API Fetch", description: "Display the current weather using a public API (e.g., OpenWeatherMap). Focus on asynchronous data fetching, error handling, and conditional rendering.", githubLink: "https://github.com/public-apis/public-apis", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "Describe how you handled the loading and error states during the API call.", keywords: ["fetch API", "Async/Await", "useEffect Hook", "Error Boundaries"] }],
        skillsGained: ['React/Vue', 'API Consumption', 'Async Data Fetching', 'Conditional Rendering'], targetRoles: ['Frontend Developer'], realWorldContext: "Basic component of many mobile and web dashboards." }, 
    { id: 403, title: "Responsive Landing Page (CSS Grid)", description: "Replicate a modern website landing page, using CSS Grid and Flexbox for complex responsive layouts.", githubLink: "https://css-tricks.com/snippets/css/complete-guide-grid/", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "Explain the difference between CSS Grid and Flexbox and when to use each.", keywords: ["CSS Grid", "Flexbox", "Media Queries", "Responsive Design"] }],
        skillsGained: ['Advanced CSS', 'Responsive Design', 'Flexbox', 'CSS Grid'], targetRoles: ['UI Developer', 'UX Engineer', 'Frontend Developer'], realWorldContext: "Essential skills for any commercial website layout." }, 
    { id: 404, title: "Basic To-Do List (Persistent Storage)", description: "A To-Do List application that uses local storage to persist data across browser sessions.", githubLink: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['DOM Manipulation', 'Local Storage', 'State Management'], targetRoles: ['Junior Frontend', 'Frontend Developer'], realWorldContext: "The basic concept behind saving user preferences in any modern app." }, 
    { id: 405, title: "Simple Form Validation", description: "Build a multi-step form (e.g., checkout) and implement client-side validation for email, password strength, and field length.", githubLink: "https://github.com/jquense/yup", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['Form Handling', 'Client-side Validation', 'Regex', 'Error Messages'], targetRoles: ['Frontend Developer', 'Web Developer'], realWorldContext: "Securing data input on payment pages and registration forms." },
    { id: 406, title: "Vanilla JS Image Carousel", description: "Build a pure JavaScript image carousel/slider without using any external libraries. Focus on performance and DOM manipulation.", githubLink: "https://github.com/topics/vanilla-javascript-slider", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['Vanilla JS', 'DOM Manipulation', 'Performance', 'Event Listeners'], targetRoles: ['Frontend Developer'], realWorldContext: "Building foundational UI features and understanding browser performance." },

    // =================================== 3. DATA SCIENTIST (6 Projects) ===================================
    { id: 301, title: "Titanic Survival Analysis", description: "Use the classic Titanic dataset for data cleaning, feature engineering, and training simple classification models.", githubLink: "https://www.kaggle.com/c/titanic", difficulty: 'Beginner', primaryLanguage: 'Python', 
        interviewPrompts: [{ type: 'Technical', question: "How did you handle missing values in the 'Age' column, and why did you choose that method?", keywords: ['Data Cleaning', 'Imputation', 'Pandas', 'Classification'] }],
        skillsGained: ['Pandas', 'Numpy', 'Scikit-learn', 'Data Cleaning', 'Feature Engineering'], targetRoles: ['Junior Data Analyst', 'Data Scientist'], realWorldContext: "A foundational exercise in predictive modeling and data hygiene." }, 
    { id: 302, title: "Exploratory Data Analysis (EDA) Report", description: "Choose a public dataset and create a comprehensive Jupyter notebook report detailing distributions, correlations, and initial insights.", githubLink: "https://github.com/Tanu-N-Prabhu/Python/tree/master/Exploratory%20Data%20Analysis", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "What is the purpose of checking for multicollinearity in a dataset?", keywords: ['EDA', 'Correlation', 'Histograms', 'Data Visualization'] }],
        skillsGained: ['Jupyter Notebooks', 'Matplotlib/Seaborn', 'Statistical Analysis', 'Pandas'], targetRoles: ['Data Analyst', 'Data Scientist'], realWorldContext: "First step of any major data project within a business." },
    { id: 303, title: "Movie Recommendation System (Co-occurrence)", description: "Build a basic recommendation system that suggests movies based on simple item-to-item co-occurrence.", githubLink: "https://github.com/topics/recommendation-system", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "What are the limitations of a co-occurrence-based recommender?", keywords: ['Collaborative Filtering', 'Co-occurrence', 'Cold Start Problem'] }],
        skillsGained: ['Recommender Systems', 'Data Structures', 'Basic Algorithms'], targetRoles: ['ML Engineer', 'Data Scientist'], realWorldContext: "Basic personalization logic for streaming services (e.g., Netflix)." }, 
    { id: 304, title: "Employee Database Queries", description: "Set up a mock employee database (PostgreSQL/SQLite) and write advanced queries using JOINs, aggregations, and subqueries to answer HR and payroll questions.", githubLink: "https://github.com/bradtraversy/sql_tutorial_files", difficulty: 'Intermediate', primaryLanguage: 'SQL',
        interviewPrompts: [{ type: 'Technical', question: "Write a SQL query to find the department with the highest average salary.", keywords: ['JOINs', 'GROUP BY', 'Subqueries', 'Aggregate Functions'] }],
        skillsGained: ['Advanced SQL', 'Data Manipulation', 'Database Design', 'PostgreSQL'], targetRoles: ['Analytics Engineer', 'Data Analyst', 'Data Scientist'], realWorldContext: "Standard operations in HR, Finance, and Business Intelligence." }, 
    { id: 305, title: "Simple Linear Regression Model", description: "Use a simple dataset (e.g., hours studied vs. test score) to implement and evaluate a basic linear regression model.", githubLink: "https://scikit-learn.org/stable/modules/linear_model.html", difficulty: 'Beginner', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Linear Regression', 'Model Evaluation (R-squared)', 'Scikit-learn Basics'], targetRoles: ['Junior Data Analyst', 'Data Scientist'], realWorldContext: "Predicting continuous values like sales or temperatures." },
    { id: 306, title: "Data Cleaning and ETL Script", description: "Build a Python script that reads messy CSV data, cleans missing values, standardizes formats, and writes the clean data to a new file, simulating a simple ETL process.", githubLink: "https://github.com/topics/data-cleaning", difficulty: 'Beginner', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['ETL', 'Pandas', 'Data Transformation', 'Data Quality'], targetRoles: ['Junior Data Engineer', 'Data Scientist'], realWorldContext: "Preprocessing data before it enters a production database or warehouse." },
    
    // =================================== 4. ML ENGINEER (6 Projects) ===================================
    { id: 201, title: "House Price Prediction (ML Model)", description: "Predict house prices using a dataset, focusing on pre-processing, feature scaling, and comparing multiple regression models.", githubLink: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "Explain why feature scaling (normalization/standardization) is necessary for many ML algorithms.", keywords: ["Feature Scaling", "Regression", "Data Preprocessing"] }],
        skillsGained: ['Regression', 'Feature Scaling', 'Model Comparison', 'Python'], targetRoles: ['ML Engineer', 'Data Scientist'], realWorldContext: "Pricing models used by real estate and insurance companies." },
    { id: 202, title: "Spam Email Classifier (NLP Basics)", description: "Build a spam detector using text data, implementing basic NLP techniques like Tokenization and Bag-of-Words.", githubLink: "https://github.com/topics/spam-detection", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "Explain the concept of Tokenization and its role in text processing.", keywords: ["Tokenization", "Bag-of-Words", "Naive Bayes", "NLP"] }],
        skillsGained: ['NLP Basics', 'Scikit-learn', 'Text Vectorization'], targetRoles: ['ML Engineer', 'NLP Specialist'], realWorldContext: "Filtering unsolicited messages (e.g., Gmail, Outlook)." },
    { id: 206, title: "Handwritten Digit Recognition (CNN)", description: "Implement a Convolutional Neural Network (CNN) using TensorFlow/Keras to classify handwritten digits (MNIST dataset).", githubLink: "https://github.com/keras-team/keras", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "What is the purpose of the pooling layer in a Convolutional Neural Network (CNN)?", keywords: ["CNN", "TensorFlow/Keras", "Convolution", "Pooling"] }],
        skillsGained: ['Deep Learning', 'CNNs', 'TensorFlow/Keras', 'Image Classification'], targetRoles: ['ML Engineer'], realWorldContext: "Foundation for OCR systems and computer vision." },
    { id: 207, title: "Basic Model Serving (Flask)", description: "Wrap a simple trained model (e.g., a prediction function) in a basic REST API using the Flask framework, enabling external access.", githubLink: "https://github.com/pallets/flask", difficulty: 'Beginner', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Flask', 'REST API', 'JSON Handling', 'Model Packaging'], targetRoles: ['Junior ML Engineer', 'Backend Developer'], realWorldContext: "Serving ML models as production endpoints." },
    { id: 208, title: "Data Versioning with DVC", description: "Take an existing data science project and implement Data Version Control (DVC) to track and reproduce datasets and models separately from Git.", githubLink: "https://github.com/iterative/dvc", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['DVC', 'Git', 'Data Versioning', 'Reproducibility'], targetRoles: ['MLOps Engineer', 'Data Scientist'], realWorldContext: "Ensuring models can be reliably recreated from source data." },
    { id: 209, title: "Sentiment Analysis Web Scraper", description: "Build a Python scraper (BeautifulSoup/Requests) to pull customer reviews from an e-commerce site and perform basic sentiment analysis.", githubLink: "https://github.com/topics/sentiment-analysis-python", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Web Scraping', 'Requests', 'BeautifulSoup', 'Sentiment Analysis', 'TextBlob'], targetRoles: ['Data Scientist', 'Business Intelligence', 'ML Engineer'], realWorldContext: "Analyzing product feedback and market trends." },
    
    // =================================== 5. DEVOPS ENGINEER (6 Projects) ===================================
    { id: 501, title: "Containerize a Fullstack App", description: "Take a simple web application (Node.js/React) and write Dockerfiles for both the frontend and backend, then orchestrate them using Docker Compose.", githubLink: "https://github.com/docker/compose", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS', 
        interviewPrompts: [{ type: 'Technical', question: "Explain the difference between a Docker image and a container.", keywords: ['Docker', 'Docker Compose', 'Multi-stage Builds', 'Containerization'] }],
        skillsGained: ['Docker', 'Docker Compose', 'Containerization', 'Microservices'], targetRoles: ['Junior DevOps', 'Fullstack Engineer'], realWorldContext: "Setting up a standard modern local development environment." }, 
    { id: 502, title: "Basic CI Pipeline (GitHub Actions)", description: "Set up a GitHub Actions workflow to automatically run tests and build a Docker image upon code push to the main branch.", githubLink: "https://github.com/actions/starter-workflows", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS', 
        interviewPrompts: [{ type: 'Technical', question: "What is Continuous Integration (CI), and what is the role of a test gate?", keywords: ['CI/CD', 'GitHub Actions', 'Test Automation', 'YAML'] }],
        skillsGained: ['CI/CD', 'GitHub Actions', 'YAML', 'Automated Testing'], targetRoles: ['DevOps Engineer', 'SRE'], realWorldContext: "Automating quality checks before merging code (e.g., GitLab, CircleCI)." },
    { id: 503, title: "Basic Cloud VM Provisioning (Terraform)", description: "Write a simple Terraform script to provision a single virtual machine (EC2/GCE) on a cloud provider and a simple security group rule.", githubLink: "https://github.com/hashicorp/terraform-provider-aws", difficulty: 'Beginner', primaryLanguage: 'Go', 
        interviewPrompts: [{ type: 'Technical', question: "What is the function of a Terraform state file?", keywords: ['Terraform', 'IaC', 'EC2/GCE', 'State File'] }],
        skillsGained: ['Terraform', 'IaC Basics', 'AWS/GCP CLI', 'Cloud Networking'], targetRoles: ['Cloud Engineer', 'DevOps Engineer'], realWorldContext: "The basic way to manage cloud infrastructure." }, 
    { id: 504, title: "Basic Monitoring Setup (Prometheus/Grafana)", description: "Integrate a simple Python/Node app with Prometheus and visualize a custom metric (e.g., request latency) in a Grafana dashboard.", githubLink: "https://github.com/prometheus/client_python", difficulty: 'Intermediate', primaryLanguage: 'Python', 
        interviewPrompts: [{ type: 'Technical', question: "Explain the difference between metrics, logs, and traces (The three pillars of Observability).", keywords: ['Prometheus', 'Grafana', 'Metrics', 'Observability'] }],
        skillsGained: ['Prometheus', 'Grafana', 'Python Instrumentation', 'Time-series data'], targetRoles: ['SRE', 'DevOps Engineer'], realWorldContext: "Monitoring service health in production." }, 
    { id: 505, title: "Simple Kubernetes Deployment", description: "Write a basic YAML manifest to deploy a single container application (Deployment, Service) onto a local Kubernetes instance (Minikube/K3s).", githubLink: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", difficulty: 'Intermediate', primaryLanguage: 'Go',
        interviewPrompts: [{ type: 'Technical', question: "What is the purpose of a Pod in Kubernetes?", keywords: ['Kubernetes', 'Pod', 'Deployment', 'Service'] }],
        skillsGained: ['Kubernetes Basics', 'YAML', 'Minikube/K3s', 'Container Orchestration'], targetRoles: ['Junior DevOps', 'SRE'], realWorldContext: "The fundamental unit of modern large-scale application delivery." },
    { id: 506, title: "Automated Backup Script (Bash/Python)", description: "Write a simple script to regularly compress a database backup and upload it securely to cloud storage (AWS S3/GCP Bucket).", githubLink: "https://github.com/topics/s3-backup-script", difficulty: 'Beginner', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Bash Scripting', 'Python', 'File Compression', 'S3/Cloud Storage'], targetRoles: ['Junior DevOps', 'Cloud Engineer'], realWorldContext: "Implementing fundamental disaster recovery procedures." },

    // =================================== 6. CYBERSECURITY ANALYST (6 Projects) ===================================
    { id: 601, title: "Basic Port Scanner", description: "Build a simple Python script that scans a network range for open ports, demonstrating basic network enumeration.", githubLink: "https://github.com/topics/port-scanner", difficulty: 'Beginner', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "Explain the difference between TCP and UDP ports.", keywords: ['TCP/UDP', 'Network Scanning', 'Socket Programming', 'Python'] }],
        skillsGained: ['Socket Programming', 'Network Enumeration', 'Python', 'TCP/IP'], targetRoles: ['Security Analyst', 'Pen Tester'] , realWorldContext: "First step in any penetration test (like Nmap)."}, 
    { id: 602, title: "Password Hashing Utility", description: "Create a simple command-line tool that takes a password and securely hashes it using a modern algorithm (e.g., bcrypt).", githubLink: "https://github.com/topics/bcrypt", difficulty: 'Beginner', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "What is 'salting' a password hash, and why is it essential?", keywords: ['Bcrypt', 'Salting', 'Hashing', 'Data Security'] }],
        skillsGained: ['Cryptography Basics', 'Bcrypt', 'Password Security', 'Python'], targetRoles: ['AppSec Engineer', 'Security Analyst'], realWorldContext: "Implementing secure authentication mechanisms." }, 
    { id: 603, title: "File Integrity Checker (Checksums)", description: "Develop a Python script that calculates the SHA256 checksum of critical system files and compares them against a known good baseline to detect tampering.", githubLink: "https://github.com/topics/checksum", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "Why is a cryptographic hash (SHA256) better than a simple CRC for integrity checking?", keywords: ['Hashing', 'MD5/SHA256', 'File Integrity', 'Tampering Detection'] }],
        skillsGained: ['Cryptography', 'File I/O', 'System Monitoring', 'Python'], targetRoles: ['SOC Analyst', 'Cybersecurity Analyst'], realWorldContext: "Detecting rootkits and unauthorized file changes on servers." }, 
    { id: 604, title: "Simple SQL Injection Lab", description: "Set up a vulnerable local web app (PHP/SQLite) and demonstrate a basic SQL injection attack, then fix the vulnerability using parameterized queries.", githubLink: "https://github.com/search?q=sqli+vulnerable+app", difficulty: 'Intermediate', primaryLanguage: 'SQL',
        interviewPrompts: [{ type: 'Technical', question: "What is a parameterized query, and how does it prevent SQL Injection?", keywords: ['SQL Injection', 'Parameterized Queries', 'Input Validation', 'Vulnerability'] }],
        skillsGained: ['SQL Injection', 'Input Sanitization', 'OWASP Basics'], targetRoles: ['AppSec Engineer', 'Pen Tester', 'Cybersecurity Analyst'], realWorldContext: "Most common application vulnerability exploited today." }, 
    { id: 605, title: "Network Traffic Analyzer (TShark)", description: "Use TShark (Wireshark CLI) and simple Python parsing to identify protocols, common ports, and find a simple unencrypted credential transmission.", githubLink: "https://www.wireshark.org/docs/wsug_html_chunked/ChToolsTShark.html", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Network Protocols', 'Wireshark/TShark', 'Packet Analysis', 'Network Security'], targetRoles: ['Junior Analyst', 'Cybersecurity Analyst'], realWorldContext: "Fundamental skill for troubleshooting and threat detection." },
    { id: 606, title: "Cross-Site Scripting (XSS) Demo", description: "Set up a vulnerable web form and demonstrate a stored/reflected XSS attack, then implement sanitization and Content Security Policy (CSP) headers to fix it.", githubLink: "https://github.com/topics/xss-vulnerability", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['XSS', 'CSP', 'Input Sanitization', 'HTML/JS Security'], targetRoles: ['AppSec Engineer', 'Frontend Developer', 'Cybersecurity Analyst'], realWorldContext: "Protecting user sessions and data integrity on the client side." },
    
    // =================================== 7. SOFTWARE ARCHITECT (6 Projects) ===================================
    { id: 701, title: "Design Patterns Demo (Factory/Singleton)", description: "Implement two fundamental GoF design patterns (e.g., Factory and Singleton) within a small C# or Java application.", githubLink: "https://github.com/DesignPatternsPHP/DesignPatternsPHP", difficulty: 'Intermediate', primaryLanguage: 'Java',
        interviewPrompts: [{ type: 'Technical', question: "Explain the Singleton pattern and discuss why it is often considered an anti-pattern.", keywords: ['Design Patterns', 'SOLID', 'Factory', 'Singleton'] }],
        skillsGained: ['Design Patterns', 'OOP', 'UML Diagrams', 'Architecture Principles'], targetRoles: ['Senior Engineer', 'Team Lead', 'Software Architect'], realWorldContext: "Standard architectural vocabulary for communicating design intent." }, 
    { id: 702, title: "Simple Load Balancing Simulation", description: "Create a Python script that simulates client requests distributing traffic across 3 'servers' using Round Robin and Least Connections.", githubLink: "https://github.com/topics/load-balancing", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "What is 'session stickiness,' and why is it a challenge for load balancing?", keywords: ['Load Balancing', 'Round Robin', 'High Availability'] }],
        skillsGained: ['Concurrency', 'Networking', 'Load Balancing Algorithms', 'Python'], targetRoles: ['Platform Engineer', 'SRE', 'Software Architect'], realWorldContext: "Ensuring services remain available under high traffic (e.g., NGINX, AWS ELB)." },
    { id: 703, title: "UML Diagram Portfolio", description: "Create professional UML diagrams (Class, Sequence, Component) for two applications: one simple API and one complex microservice system.", githubLink: "https://www.uml-diagrams.org/", difficulty: 'Beginner', primaryLanguage: 'SQL',
        interviewPrompts: [{ type: 'Behavioral', question: "When communicating a design to non-technical stakeholders, which diagrams are most effective and why?", keywords: ['UML', 'Sequence Diagrams', 'Component Diagrams'] }],
        skillsGained: ['UML/Modeling', 'Technical Communication', 'Design Documentation'], targetRoles: ['Technical Lead', 'Product Manager', 'Software Architect'], realWorldContext: "Essential for communicating design intent to development teams." }, 
    { id: 704, title: "Monolith vs. Microservice Rationale (ADR)", description: "Document a project and write an Architectural Decision Record (ADR) arguing for a Monolith now but designing for a Microservice transition later.", githubLink: "https://github.com/joelparkerhenderson/architecture-decision-record", difficulty: 'Intermediate', primaryLanguage: 'Java', 
        interviewPrompts: [{ type: 'Architectural', question: "List the key indicators that a monolithic system is ready for decomposition into microservices.", keywords: ['Monolith', 'Microservices', 'ADR', 'Transition Strategy'] }],
        skillsGained: ['Trade-off Analysis', 'ADR', 'System Design Rationale'], targetRoles: ['Software Architect', 'Product Manager'], realWorldContext: "Crucial decision-making at growing startups." }, 
    { id: 705, title: "Database Normalization Demo", description: "Start with a denormalized database schema for a complex system and apply steps to reach 3rd Normal Form (3NF), demonstrating efficiency gains.", githubLink: "https://www.databasestar.com/database-normalization/", difficulty: 'Beginner', primaryLanguage: 'SQL',
        interviewPrompts: [], skillsGained: ['Database Normalization', 'Schema Design', 'Data Integrity', 'SQL'], targetRoles: ['Junior Data Engineer', 'Backend Developer', 'Software Architect'], realWorldContext: "The foundation of reliable relational databases." },
    { id: 706, title: "Command Line Calculator (Go)", description: "Build an expressive calculator using Go, focusing on clean error handling and implementing an abstract syntax tree (AST).", githubLink: "https://github.com/topics/command-line-calculator", difficulty: 'Intermediate', primaryLanguage: 'Go',
        interviewPrompts: [], skillsGained: ['GoLang', 'AST/Parsing', 'CLI Applications', 'Error Handling'], targetRoles: ['Backend Engineer', 'Software Architect'], realWorldContext: "Building reliable, fast command-line tools." },
    
    // =================================== 8. CLOUD SECURITY ENGINEER (6 Projects) ===================================
    { id: 801, title: "Cloud Storage Bucket Policy Auditor", description: "Write a Python script that uses the AWS/GCP SDK to scan all cloud storage buckets and report any configured for public read/write access.", githubLink: "https://github.com/cloud-custodian/cloud-custodian", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "What is the primary risk of an unintentionally public S3 bucket, aside from data theft?", keywords: ["AWS S3", "Bucket Policy", "IAM", "Data Exposure"] }],
        skillsGained: ['Python Boto3/SDK', 'Cloud Security Posture', 'Storage Policies', 'Least Privilege'], targetRoles: ['Cloud Security Engineer', 'DevSecOps'], realWorldContext: "Preventing major data breaches caused by misconfiguration." },
    { id: 802, title: "Basic IAM Role Creation (Terraform)", description: "Define three distinct IAM roles (Admin, Developer, Auditor) using Terraform, enforcing the **principle of least privilege** for each role.", githubLink: "https://github.com/hashicorp/terraform-provider-aws", difficulty: 'Beginner', primaryLanguage: 'Go', 
        interviewPrompts: [{ type: 'Technical', question: "Define the Principle of Least Privilege (PoLP) and give a non-technical analogy.", keywords: ['IAM Policy', 'Least Privilege', 'Role Definition', 'Terraform'] }],
        skillsGained: ['IAM Policy', 'Terraform', 'Cloud Access Control', 'Security Governance'], targetRoles: ['Cloud Engineer', 'DevSecOps', 'Cloud Security Engineer'], realWorldContext: "Securing access within large cloud accounts." },
    { id: 803, title: "VPC Network Security Group Demo", description: "Using cloud console or Terraform, set up a simple two-tier application and configure Security Groups/Network ACLs to allow only necessary traffic.", githubLink: "https://github.com/aws-samples/aws-vpc-sample", difficulty: 'Intermediate', primaryLanguage: 'SQL', 
        interviewPrompts: [{ type: 'Technical', question: "Explain the stateful nature of Security Groups versus the stateless nature of Network ACLs.", keywords: ['Security Groups', 'Network ACL', 'Stateful/Stateless', 'VPC Networking'] }],
        skillsGained: ['VPC/Networking', 'Security Groups', 'Access Control Lists', 'Cloud Configuration'], targetRoles: ['Network Engineer', 'Cloud Security', 'Cloud Security Engineer'], realWorldContext: "Securing the network perimeter of the cloud environment." },
    { id: 804, title: "Simple CloudTrail/Audit Log Filter", description: "Use Python/CloudWatch Logs to filter cloud audit logs (CloudTrail/Azure Activity) to detect and alert on unauthorized 'Delete' or 'Modify' actions.", githubLink: "https://github.com/topics/cloudtrail-analyzer", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [{ type: 'Technical', question: "What is the importance of having read-only audit logs in a separate, secure account?", keywords: ['CloudTrail', 'Audit Logs', 'Event Monitoring', 'Alerting'] }],
        skillsGained: ['Log Analysis', 'CloudTrail/Audit Logs', 'Python Scripting', 'Alerting'], targetRoles: ['Security Analyst', 'Cloud Engineer', 'Cloud Security Engineer'], realWorldContext: "Implementing basic Intrusion Detection on the cloud control plane." },
    { id: 805, title: "HTTPS/TLS Enforcement", description: "Set up a web server and enforce HTTPS using self-signed or Let's Encrypt certificates, ensuring all non-TLS traffic is redirected and secure headers are set.", githubLink: "https://github.com/certbot/certbot", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['TLS/SSL', 'HTTPS', 'Certificates', 'Security Headers'], targetRoles: ['Junior DevOps', 'Web Developer', 'Cloud Security Engineer'], realWorldContext: "Standard security practice for all live websites." },
    { id: 806, title: "Web Application Firewall (WAF) Simulation", description: "Configure a cloud WAF (using mock rules or a simple Python proxy) to block common attack patterns like `/etc/passwd` attempts (Path Traversal).", githubLink: "https://github.com/topics/web-application-firewall", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['WAF', 'Path Traversal', 'Filtering Logic', 'Regex'], targetRoles: ['Cloud Security Engineer'], realWorldContext: "Protecting web applications from common external threats." },
    
    // =================================== 9. PRODUCT MANAGER (6 Projects) ===================================
    { id: 901, title: "User Story & Acceptance Criteria Spec", description: "For a new feature (e.g., 'Dark Mode'), write detailed User Stories, Acceptance Criteria, and corresponding technical requirements for an engineering team.", githubLink: "https://github.com/topics/user-stories", difficulty: 'Beginner', primaryLanguage: 'SQL',
        interviewPrompts: [{ type: 'Behavioral', question: "How do you ensure user stories remain lightweight and actionable for engineers?", keywords: ["User Stories", "Acceptance Criteria", "Gherkin", "Agile"] }],
        skillsGained: ['Requirements Gathering', 'User Stories', 'Agile/Scrum Basics'], targetRoles: ['Product Analyst', 'Junior PM', 'Product Manager (Technical)'], realWorldContext: "The core communication method between PMs and Engineering." },
    { id: 902, title: "MVP Definition Document (Tech Product)", description: "Select a real-world problem and create a formal Minimum Viable Product (MVP) definition, scope, and non-functional requirements.", githubLink: "https://github.com/product-manager/product-management-frameworks", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Behavioral', question: "How do you decide which features to cut from the MVP scope?", keywords: ['MVP Definition', 'Scoping', 'Prioritization', 'Non-Functional Requirements'] }],
        skillsGained: ['MVP Strategy', 'Product Scoping', 'Non-Functional Requirements'], targetRoles: ['Product Manager', 'PM Analyst', 'Product Manager (Technical)'], realWorldContext: "The first major deliverable for any product launch." },
    { id: 903, title: "Metrics and Funnel Analysis Plan", description: "Define 5 key business metrics (AARRR) for a fictional SaaS app and define the data points needed (events, properties) to track a user through a core funnel.", githubLink: "https://github.com/topics/pirate-metrics", difficulty: 'Intermediate', primaryLanguage: 'SQL',
        interviewPrompts: [{ type: 'Technical', question: "Write a SQL query to calculate the conversion rate between two steps in your funnel.", keywords: ['AARRR Metrics', 'Conversion Funnel', 'Data Events', 'Cohort Analysis'] }],
        skillsGained: ['Product Metrics', 'Funnel Analysis', 'SQL for Analytics'], targetRoles: ['Growth PM', 'Product Analyst', 'Product Manager (Technical)'], realWorldContext: "Tracking business performance using tools like Amplitude or Mixpanel." },
    { id: 904, title: "User Persona and Journey Mapping", description: "Develop 3 detailed user personas for an existing app, and create a journey map for a key use case.", githubLink: "https://github.com/topics/user-persona", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['User Research', 'Persona Creation', 'UX Basics', 'Empathy Mapping'], targetRoles: ['UX/PM Intern', 'Product Manager (Technical)'], realWorldContext: "Ensuring product decisions are user-centric." },
    { id: 905, title: "Technical Glossary and Documentation", description: "Create a technical glossary for a complex concept (e.g., Microservices, Kubernetes) suitable for non-technical leadership.", githubLink: "https://github.com/joelparkerhenderson/architecture-decision-record", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['Technical Writing', 'Communication', 'Documentation'], targetRoles: ['Junior PM', 'Product Manager (Technical)'], realWorldContext: "Translating engineering concepts into business language." },
    { id: 906, title: "Basic A/B Test Results Analysis", description: "Given a mock dataset from an A/B test (control vs. treatment), use Python/stats to determine if the result is statistically significant and write a recommendation.", githubLink: "https://github.com/topics/ab-testing", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['A/B Testing', 'Hypothesis Testing', 'Statistical Significance', 'Python'], targetRoles: ['Growth PM', 'Data Analyst', 'Product Manager (Technical)'], realWorldContext: "Making data-driven decisions on product features." },
    
    // =================================== 10. BLOCKCHAIN DEVELOPER (6 Projects) ===================================
    { id: 1001, title: "Simple ERC-20 Token (Solidity)", description: "Write and deploy a basic ERC-20 compliant fungible token smart contract on a local chain (Ganache/Hardhat).", githubLink: "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "Explain the purpose of the 'allowance' mechanism in the ERC-20 standard.", keywords: ['ERC-20', 'Solidity', 'Fungible Token', 'Truffle/Hardhat'] }],
        skillsGained: ['Solidity Basics', 'ERC-20', 'Smart Contract Deployment', 'Hardhat/Truffle'], targetRoles: ['Junior Web3 Developer', 'Blockchain Developer'], realWorldContext: "Foundation of almost all tokens in the DeFi ecosystem (e.g., DAI, UNI)." },
    { id: 1002, title: "Simple Wallet Tracker DApp", description: "Create a basic React DApp that connects to MetaMask (using Wagmi/Ethers.js) and displays the connected wallet's ETH balance.", githubLink: "https://github.com/web3-examples/nextjs-dapp-starter", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "How does the DApp interact with the Ethereum node to fetch balance data?", keywords: ['Wagmi/Viem', 'Ethers.js', 'MetaMask', 'RPC Calls'] }],
        skillsGained: ['Wagmi/Viem', 'Next.js', 'Ethers.js', 'Wallet Connect', 'DApp UI'], targetRoles: ['Frontend Web3 Developer', 'DApp Engineer', 'Blockchain Developer'], realWorldContext: "Interacting with any blockchain service from a modern web browser." },
    { id: 1003, title: "Basic Voting Contract", description: "Implement a simple contract where users can register and vote on a proposal. Focus on ensuring one vote per user address.", githubLink: "https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/governance", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "Why is using `msg.sender` for user identification crucial in smart contract security?", keywords: ['Solidity Functions', 'Storage Mapping', 'Voting Logic'] }],
        skillsGained: ['Solidity Basics', 'Smart Contract Logic', 'Testing (Mocha/Chai)'], targetRoles: ['Junior Blockchain Developer', 'Blockchain Developer'], realWorldContext: "Simple governance and decision-making logic." },
    { id: 1004, title: "Basic NFT Minting Contract (ERC-721)", description: "Write and deploy a basic ERC-721 contract that allows the contract owner to mint tokens to any address.", githubLink: "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol", difficulty: 'Intermediate', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [{ type: 'Technical', question: "Explain the core difference between ERC-20 and ERC-721 standards.", keywords: ['ERC-721', 'Non-Fungible', 'TokenURI', 'Minting'] }],
        skillsGained: ['ERC-721', 'Solidity', 'NFT Standards', 'Deployment'], targetRoles: ['Web3 Developer', 'Blockchain Developer'], realWorldContext: "Creating digital assets (e.g., art, domain names)." },
    { id: 1005, title: "Public Data Logging Contract", description: "Implement a simple contract function that allows anyone to pay a small fee to log an immutable text message to the blockchain for permanent storage.", githubLink: "https://github.com/trufflesuite/truffle", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['Storage Optimization', 'Payable Functions', 'Basic Transactions'], targetRoles: ['Junior Blockchain Developer', 'Blockchain Developer'], realWorldContext: "Decentralized, immutable data storage concepts." },
    { id: 1006, title: "Token Faucet DApp", description: "Build a frontend where users can click a button to receive a small, free amount of a test ERC-20 token from a pre-loaded contract (a common practice on testnets).", githubLink: "https://github.com/web3-examples/nextjs-dapp-starter", difficulty: 'Beginner', primaryLanguage: 'JavaScript/TS',
        interviewPrompts: [], skillsGained: ['Web3 UI', 'Transaction Signing', 'Contract Interaction', 'MetaMask'], targetRoles: ['Frontend Web3 Developer', 'Blockchain Developer'], realWorldContext: "Dispensing tokens for testing and development purposes." },
    
    // =================================== Projects for ML, DS, etc. (already included above) ===================================
    { id: 307, title: "Basic Time Series Forecasting (ARIMA)", description: "Use historical stock data (or weather data) and apply the ARIMA model to forecast future trends.", githubLink: "https://github.com/topics/time-series-forecasting", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Time Series Analysis', 'ARIMA/SARIMA', 'Statsmodels', 'Forecasting'], targetRoles: ['Data Scientist', 'Business Analyst'], realWorldContext: "Predicting inventory, sales, or financial trends." },
    { id: 210, title: "Collaborative Filtering (Matrix Factorization)", description: "Implement a basic collaborative filtering engine (e.g., SVD or Matrix Factorization) to recommend items based on user preferences.", githubLink: "https://github.com/topics/collaborative-filtering", difficulty: 'Intermediate', primaryLanguage: 'Python',
        interviewPrompts: [], skillsGained: ['Collaborative Filtering', 'SVD', 'NumPy', 'Recommender Systems'], targetRoles: ['ML Engineer', 'Data Scientist'], realWorldContext: "Improving recommendations in any e-commerce or media app." },
];

// --- Final Project Map Creation (STABLE REDUCER) ---
// This uses a functional approach to build the RoleProjectsMap safely from the flat array.
const PROJECT_DATABASE: RoleProjectsMap = ALL_PROJECTS_FLAT.reduce((acc, project) => {
    // Find the primary role key from the targetRoles array (must be one of the ALL_ROLES keys)
    const primaryRole = project.targetRoles.find(role => ALL_ROLES.includes(role));

    if (primaryRole) {
        if (!acc[primaryRole]) {
            acc[primaryRole] = [];
        }
        // Only push if the project ID hasn't been added to this role yet
        if (!acc[primaryRole].some(p => p.id === project.id)) {
            acc[primaryRole].push(project);
        }
    }
    return acc;
}, {} as RoleProjectsMap);


// --- UTILITY FUNCTION (Difficulty Style) ---
const getDifficultyStyle = (difficulty?: 'Beginner' | 'Intermediate' | 'Advanced') => {
    switch (difficulty) {
        case 'Beginner': return { color: '#065f46', background: '#d1fae5', borderColor: '#a7f3d0' };
        case 'Intermediate': return { color: '#92400e', background: '#fef3c7', borderColor: '#fde68a' };
        case 'Advanced': return { color: '#991b1b', background: '#fee2e2', borderColor: '#fca5a5' };
        default: return { color: TEXT_COLOR_MUTED, background: '#e5e7eb', borderColor: '#d1d5db' };
    }
};

// --- NEW COMPONENT: Dynamic Sliding Key Tech Cards ---

const KEY_TECHNOLOGIES = [
    { name: "Node.js", emoji: "🟢", color: "#325AA8", desc: "Backend API" },
    { name: "Python", emoji: "🐍", color: "#FFC300", desc: "Data/ML" },
    { name: "Docker", emoji: "🐳", color: "#326ce5", desc: "Containers" },
    { name: "React", emoji: "⚛️", color: "#00b2ff", desc: "Frontend UI" },
    { name: "SQL", emoji: "💿", color: "#E94E77", desc: "Data Modeling" },
    { name: "Git", emoji: "🧠", color: "#e6522c", desc: "Version Control" },
    { name: "Solidity", emoji: "🪙", color: ACCENT_COLOR, desc: "Smart Contracts" },
    { name: "AWS/GCP", emoji: "☁️", color: "#212529", desc: "Cloud Basics" },
];

if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
}

const KeyTechCards = () => (
    <>
        <h2 className="text-center text-2xl font-extrabold text-gray-800 mb-6">
            Focus on Foundational Skills
        </h2>
        <div className="flex overflow-x-scroll hide-scrollbar space-x-5 p-4 mx-auto max-w-7xl mb-12">
            {KEY_TECHNOLOGIES.map((tech, index) => (
                <div 
                    key={index} 
                    className="flex-shrink-0 w-48 p-5 rounded-xl bg-white border border-gray-200 text-center shadow-lg transition-all duration-200 cursor-default"
                    style={{ border: `1px solid ${tech.color}40` }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = `0 10px 30px ${tech.color}4D`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                    }}
                >
                    <span className="text-4xl block mb-2">{tech.emoji}</span>
                    <h4 className="m-0 font-black text-lg" style={{ color: tech.color }}>{tech.name}</h4>
                    <p className="text-xs text-gray-500 m-0">{tech.desc}</p>
                </div>
            ))}
        </div>
    </>
);

// --- Reusable Sub-Components ---

const Navbar = () => (
    <nav className="fixed w-full z-50 top-0 left-0 bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold tracking-wider">VERTE<span className="text-green-300">X</span></h1>

            {/* Desktop Links (FROM USER REQUEST) */}
            <div className="hidden md:flex space-x-6 text-sm font-medium">
                <Link href="/" className="hover:text-gray-200 transition">Home</Link>
                <Link href="/roadmaps" className="hover:text-gray-200 transition">Roadmaps</Link>
                <Link href="/internships" className="hover:text-gray-200 transition">Internships</Link>
                <Link href="/resume" className="hover:text-gray-200 transition">ResumeBuilder</Link>
                <Link href="/interview" className="hover:text-gray-200 transition">Interviewprep</Link>
                <Link href="/projects" className="hover:text-gray-200 transition">Projects</Link>
                <Link href="/hackathon" className="hover:text-gray-200 transition">Hackathons</Link>
                <Link href="/certifications" className="hover:text-gray-200 transition">Certifications</Link>
                <Link href="/cheatsheets" className="hover:text-gray-200 transition">Cheat Sheets</Link>
            </div>
        </div>
    </nav>
);

const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => {
    let emoji = '⚙️';
    let typeColor = '#3b82f6'; 
    if (prompt.type === 'Architectural') {
        emoji = '🏗️';
        typeColor = '#f97316'; 
    } else if (prompt.type === 'Behavioral') {
        emoji = '🤝';
        typeColor = '#10b981'; 
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between" style={{ borderTop: `4px solid ${typeColor}` }}>
            <p className="text-sm font-extrabold mb-4" style={{ color: typeColor }}>
                {emoji} {prompt.type} Question
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-relaxed">
                {prompt.question}
            </h3>
            <div>
                <p className="text-xs font-bold text-gray-500 mb-2">
                    Key Concepts to Mention:
                </p>
                <div className="flex flex-wrap gap-2">
                    {prompt.keywords.map((keyword, i) => (
                        <span key={i} className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Main ProjectsHub Component Render Logic ---

export default function ProjectsHub() {
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // FIX: Stabilized the filtering logic based on the flat data
    const projects = useMemo(() => {
        const allProjects: Project[] = ALL_PROJECTS_FLAT;

        let filteredList = allProjects.filter(p => {
            let roleMatch = true;
            let languageMatch = true;

            // 1. Filter by Role 
            if (selectedRole) {
                roleMatch = p.targetRoles.includes(selectedRole); 
            }

            // 2. Filter by Language
            if (selectedLanguage) {
                languageMatch = p.primaryLanguage === selectedLanguage;
            }

            return roleMatch && languageMatch;
        });

        // Default to a small set of Beginner projects if no filters are applied
        if (!selectedRole && !selectedLanguage) {
            return allProjects.filter(p => p.difficulty === 'Beginner').slice(0, 3);
        }

        return filteredList;

    }, [selectedRole, selectedLanguage]);


    const completionMessage = useMemo(() => {
        const roleText = selectedRole ? `**${selectedRole}**` : '';
        const langText = selectedLanguage ? `using **${selectedLanguage}**` : '';

        if (selectedRole || selectedLanguage) {
            return `🎯 Showing ${projects.length} curated projects for ${roleText} ${langText}. Click a card to see the full prep guide!`;
        }
        return "💡 Select a Domain or a Primary Language below to instantly discover your next portfolio-defining project.";
    }, [selectedRole, selectedLanguage, projects.length]);


    // --- Render Interview Prep View (The "Separate Page") ---
    if (selectedProject) {
        const sortedPrompts = selectedProject.interviewPrompts.sort((a, b) => {
            const order = { 'Architectural': 1, 'Technical': 2, 'Behavioral': 3 };
            return order[a.type] - order[b.type];
        });

        const targetRolesString = selectedProject.targetRoles.join(' | ');
        const skillsString = selectedProject.skillsGained.join(', ');

        return (
            <div className="min-h-screen pb-12" style={{ background: 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)' }}>
                <Navbar />
                <main className="pt-24 px-4 max-w-7xl mx-auto">
                    
                    {/* Back Button */}
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="bg-transparent border-2 text-blue-600 font-bold py-2 px-4 rounded-lg mb-8 transition hover:bg-blue-50"
                        style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
                    >
                        ← Back to Projects Hub
                    </button>

                    {/* Project Details */}
                    <header className="mb-10 p-6 bg-white rounded-2xl shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-4xl font-extrabold" style={{ color: PRIMARY_COLOR }}>
                                {selectedProject.title}
                            </h1>
                            <span className="text-base font-extrabold py-2 px-4 rounded-xl whitespace-nowrap" style={{ ...getDifficultyStyle(selectedProject.difficulty) }}>
                                {selectedProject.difficulty}
                            </span>
                        </div>
                        <p className="text-lg text-gray-600 mt-3 mb-6">
                            <strong>Challenge:</strong> {selectedProject.description}
                        </p>

                        {/* Project Outcomes/Skills Section */}
                        <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">🎯 Target Roles</h3>
                                <p className="text-base text-gray-600">{targetRolesString}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Real-World Context</h3>
                                <p className="text-base text-gray-600">{selectedProject.realWorldContext}</p>
                            </div>
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">⚙️ Key Skills Gained</h3>
                                <p className="text-base text-gray-600">{skillsString}</p>
                            </div>
                        </div>


                        {selectedProject.githubLink && (
                            <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" 
                               className="inline-block mt-6 font-bold text-green-600 underline transition hover:text-green-700"
                               style={{ color: ACCENT_COLOR }}
                            >
                                Get Starter Code (GitHub) →
                            </a>
                        )}
                    </header>

                    {/* Interview Prompts Grid */}
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                        🧠 Interview Prep Questions
                    </h2>
                    {sortedPrompts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sortedPrompts.map((prompt, index) => (
                                <PromptCard key={index} prompt={prompt} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-lg text-gray-600 p-8 border border-gray-300 rounded-xl bg-gray-50">
                            No specific interview prompts have been added for this project yet, but focus on the **Technical** and **Architectural** choices you made!
                        </div>
                    )}
                </main>
            </div>
        );
    }

    // --- Render Projects Hub View (The "Main Page") ---
    return (
        <div className="min-h-screen pb-12" style={{ background: 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)' }}>
            <Navbar />
            <main className="pt-24 px-4">
                
                {/* Hero Section */}
                <header className="text-center mx-auto max-w-4xl mb-8">
                    <h1 className="text-5xl font-black mb-4 leading-tight">
                        <span className="text-gray-800">Code. Create. Conquer.</span><br/>
                        <span className="text-3xl font-extrabold text-gray-800">The Portfolio Builder for Senior Engineers</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Stop practicing small apps. **Master high-scale projects** with **the same frameworks the pros use** (K8s, Kafka, Istio) to land your 6-figure role.
                    </p>
                </header>

                {/* SLIDING CARDS SECTION */}
                <KeyTechCards />

                {/* Filter Block Container */}
                <div className="mx-auto max-w-7xl mb-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200" style={{ boxShadow: SHADOW_ACCENT }}>
                    
                    {/* Role Filter (Domain) */}
                    <div className="mb-6 pb-4 border-b border-gray-100">
                        <h3 className="font-black text-xl mb-4" style={{ color: PRIMARY_COLOR }}>
                            1. SELECT DOMAIN / ROLE:
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3 px-4">
                            {ALL_ROLES.map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setSelectedRole(role)}
                                    className="px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-md"
                                    style={{
                                        backgroundColor: selectedRole === role ? PRIMARY_COLOR : 'transparent',
                                        color: selectedRole === role ? CARD_BG : TEXT_COLOR_DARK,
                                        border: `2px solid ${PRIMARY_COLOR}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedRole !== role) { e.currentTarget.style.backgroundColor = PRIMARY_COLOR + '1a'; e.currentTarget.style.color = PRIMARY_COLOR; }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedRole !== role) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = TEXT_COLOR_DARK; }
                                    }}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Language Filter */}
                    <div>
                        <h3 className="font-black text-xl mb-4" style={{ color: ACCENT_COLOR }}>
                            2. SELECT PRIMARY LANGUAGE (Optional):
                        </h3>
                        <div className="flex flex-wrap justify-center gap-3 px-4">
                            {ALL_LANGUAGES.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setSelectedLanguage(lang)}
                                    className="px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-md"
                                    style={{
                                        backgroundColor: selectedLanguage === lang ? ACCENT_COLOR : 'transparent',
                                        color: selectedLanguage === lang ? CARD_BG : TEXT_COLOR_DARK,
                                        border: `2px solid ${ACCENT_COLOR}`,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (selectedLanguage !== lang) { e.currentTarget.style.backgroundColor = ACCENT_COLOR + '1a'; e.currentTarget.style.color = ACCENT_COLOR; }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (selectedLanguage !== lang) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = TEXT_COLOR_DARK; }
                                    }}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <button 
                                onClick={() => { setSelectedRole(''); setSelectedLanguage(''); }}
                                className="text-sm text-gray-500 underline transition hover:text-red-500 mt-4"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dynamic Message Bar */}
                <div className="text-center mx-auto max-w-3xl mb-10 p-4 rounded-xl font-bold text-lg" 
                    style={{ 
                        background: ACCENT_COLOR + '1a', 
                        color: ACCENT_COLOR, 
                        borderLeft: `6px solid ${ACCENT_COLOR}`,
                        opacity: selectedRole || selectedLanguage ? 1 : 0.7 
                    }}>
                    {completionMessage}
                </div>

                {/* Project Cards Grid (FIXED OVERFLOW + NEW FEATURES) */}
                <section className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {projects.map((proj, idx) => {
                        const diffStyle = getDifficultyStyle(proj.difficulty); 
                        return (
                            <div
                                key={proj.id} // Use stable project ID for key
                                onClick={() => setSelectedProject(proj)}
                                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                                style={{
                                    border: `1px solid #e0e0e0`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-8px)";
                                    e.currentTarget.style.boxShadow = `0 15px 35px ${PRIMARY_COLOR}40`;
                                    e.currentTarget.style.border = `1px solid ${PRIMARY_COLOR}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.border = `1px solid #e0e0e0`;
                                }}
                            >
                                <div>
                                    {/* Title & Difficulty Tag (FIXED FOR OVERFLOW) */}
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-black text-2xl text-gray-800 leading-snug flex-shrink" style={{ flexShrink: 1, minWidth: 0, marginRight: '10px' }}>
                                            {proj.title}
                                        </h3>
                                        {proj.difficulty && (
                                            <span className="flex-shrink-0 text-sm font-extrabold px-3 py-1 rounded-full whitespace-nowrap" style={{ ...diffStyle }}>
                                                {proj.difficulty}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <p className="text-base text-gray-600 leading-relaxed mb-6 border-l-4 pl-4" style={{ borderColor: PRIMARY_COLOR + '40' }}>
                                        {proj.description}
                                    </p>

                                    {/* NEW FEATURE: Skill Tags and Target Roles */}
                                    <div className="mb-4">
                                        <div className="text-sm font-bold text-gray-700 mb-2">
                                            🚀 Primary Language: <span className="font-semibold text-xs text-gray-500" style={{color: PRIMARY_COLOR, fontWeight: 700}}>{proj.primaryLanguage}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {proj.skillsGained.slice(0, 4).map((skill, i) => (
                                                <span key={i} className="text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ background: ACCENT_COLOR }}>
                                                    {skill}
                                                </span>
                                            ))}
                                            {proj.skillsGained.length > 4 && (
                                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                                                    +{proj.skillsGained.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                
                                {/* Footer / Call to Action */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                                    <span className="font-bold text-base" style={{ color: PRIMARY_COLOR }}>
                                        View Full Prep & Docs →
                                    </span>
                                    {proj.githubLink && (
                                        <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-extrabold transition hover:underline" style={{ color: ACCENT_COLOR }} onClick={(e) => e.stopPropagation()}>
                                            <span className="mr-1">🔗</span>GitHub Starter
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>
            </main>
        </div>
    );
}