"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";

// --- Design Constants (Defined Globally) ---
const PRIMARY_COLOR = "#00BFA5"; // Teal
const ACCENT_COLOR = "#00796B";
const DANGER_COLOR = "#E53935";
const CARD_BG = "#ffffff";
const BG_COLOR = "#f5f7f9";
const TEXT_COLOR_DARK = "#212121";
const TEXT_COLOR_MUTED = "#757575";
const BORDER_COLOR = "#E0E0E0";
const SIDEBAR_WIDTH = '280px';
const NAVBAR_HEIGHT = '65px';

// Gradient map is no longer strictly necessary but is kept for sidebar headers
const GRADIENT_MAP: Record<string, string> = {
    "Web Developer": "linear-gradient(to right, #FFC72C, #FFD700)",
    "ML Engineer": "linear-gradient(to right, #5D3FD3, #8A2BE2)",
    "Data Scientist": "linear-gradient(to right, #00BFFF, #1E90FF)",
    "DevOps Engineer": "linear-gradient(to right, #FF5722, #FF9800)",
    "Cloud Architect": "linear-gradient(to right, #38761D, #6AA84F)",
    "Product Manager": "linear-gradient(to right, #E040FB, #AB47BC)",
    "Cyber Security Analyst": "linear-gradient(to right, #000000, #434343)",
    "iOS Developer": "linear-gradient(to right, #A9A9A9, #C0C0C0)",
    "Backend Engineer": "linear-gradient(to right, #795548, #BCAAA4)",
    "Data Analyst": "linear-gradient(to right, #1E88E5, #42A5F5)",
    "Behavioral": "linear-gradient(to right, #00BFA5, #004D40)",
    "Default": "linear-gradient(to right, #3949AB, #5C6BC0)",
};
// ---------------------------------------------

// --- Types (Defined Globally) ---
type Difficulty = 'Easy' | 'Medium' | 'Hard';
type Category = 'Technical' | 'Behavioral' | 'Architectural';
type Confidence = 'Low' | 'Medium' | 'High';

type Question = {
    id: number;
    companyFocus: string;
    difficulty: Difficulty;
    category: Category;
    question: string;
    resource: string;
    answerPoints: string[];
    followUp: string[];
    companyInsight: string;
    hrFocus?: string;
};

type RoleQuestions = {
    [role: string]: Question[];
};

// --- CORE DATA STRUCTURE ---
const DIFFICULTY_LEVELS: Difficulty[] = ['Easy', 'Easy', 'Easy', 'Easy', 'Medium', 'Medium', 'Medium', 'Hard', 'Hard', 'Hard'];

const COMPANIES_BY_ROLE: Record<string, string[]> = {
    "Web Developer": ["Google", "Facebook", "Netflix"],
    "ML Engineer": ["Amazon", "Google", "DeepMind"],
    "Data Scientist": ["Microsoft", "LinkedIn", "Uber"],
    "DevOps Engineer": ["Amazon (AWS)", "Microsoft (Azure)", "Google (GCP)"],
    "Cloud Architect": ["Salesforce", "IBM", "VMware"],
    "Product Manager": ["Apple", "Spotify", "Airbnb"],
    "Cyber Security Analyst": ["JP Morgan", "Lockheed Martin", "Cisco"],
    "iOS Developer": ["Apple", "Square", "Meta"],
    "Backend Engineer": ["Twitter", "Stripe", "Dropbox"],
    "Data Analyst": ["Goldman Sachs", "Deloitte", "PwC"],
};

const createQuestions = (baseQuestions: { q: string, c: Category, a: string[], f: string, d: Difficulty }[], role: string, companies: string[]): Question[] => {
    return baseQuestions.map((bQ, i) => ({
        id: parseInt(`${role.slice(0, 1).toUpperCase().charCodeAt(0)}${i + 1}`),
        companyFocus: `${companies[i % companies.length]} (${bQ.f})`,
        difficulty: bQ.d,
        category: bQ.c,
        question: `Q${i + 1}: ${bQ.q}`,
        resource: "#",
        answerPoints: bQ.a,
        followUp: [],
        companyInsight: "",
    }));
};

// --- BASE QUESTIONS (10 Unique Questions per Role) ---
const ROLE_BASE_DATA: Record<string, { companies: string[], questions: { q: string, c: Category, a: string[], f: string, d: Difficulty }[] }> = {
    "Web Developer": {
        companies: ["Google", "Facebook", "Netflix"],
        questions: [
            { d: 'Easy', f: 'JS Fundamentals', c: 'Technical', q: "Explain the concept of **hoisting** in JavaScript.", a: ["Hoisting moves declarations to the top.", "Only declarations are hoisted, not assignments.", "Var declarations are initialized to undefined."] },
            { d: 'Easy', f: 'React Basics', c: 'Technical', q: "What are **React Hooks** and name three common ones?", a: ["Functions that let you 'hook into' state/lifecycle features.", "useState, useEffect, useContext.", "Introduced to replace class components."] },
            { d: 'Easy', f: 'CSS/Layout', c: 'Technical', q: "Describe **CSS BEM methodology** and its benefit.", a: ["BEM stands for Block, Element, Modifier.", "Creates modular, reusable, and structured CSS.", "Reduces specificity conflicts."] },
            { d: 'Easy', f: 'Async JS', c: 'Technical', q: "What is the difference between synchronous and asynchronous operations in JavaScript?", a: ["Sync operations block the thread.", "Async operations run in the background via the event loop.", "Async uses callbacks, Promises, or async/await."] },
            { d: 'Medium', f: 'DOM API', c: 'Technical', q: "Explain **event bubbling and capturing** in the DOM.", a: ["Bubbling: events propagate up the DOM tree.", "Capturing: events propagate down.", "`addEventListener` controls the phase."] },
            { d: 'Medium', f: 'State Management', c: 'Technical', q: "How would you handle global state management without Redux?", a: ["Use React Context API with `useReducer`.", "Implement a lightweight library like Zustand.", "Use selectors to optimize rendering."] },
            { d: 'Medium', f: 'Performance', c: 'Architectural', q: "Discuss the trade-offs of **Server-Side Rendering (SSR)** vs. Client-Side Rendering (CSR).", a: ["SSR improves SEO/initial load but increases server load.", "CSR is good for highly interactive apps.", "Choose based on content type and SEO needs."] },
            { d: 'Hard', f: 'Security', c: 'Architectural', q: "Discuss the security trade-offs between **JWTs and Session Cookies** for authentication.", a: ["JWTs are stateless/scalable.", "Cookies are stateful, but safer against XSS if HttpOnly.", "Cookies are preferred for web apps for security."] },
            { d: 'Hard', f: 'Advanced JS', c: 'Technical', q: "Implement a **custom Promise.all()** function from scratch.", a: ["Function takes an array of promises.", "Returns a new promise that resolves when all input promises resolve.", "Rejects immediately upon the first rejection."] },
            { d: 'Hard', f: 'System Design', c: 'Architectural', q: "Design an efficient **client-side caching mechanism** for API responses.", a: ["Use React Query/SWR for state management.", "Implement a Time-to-Live (TTL) invalidation.", "Use IndexedDB for persistent storage."] },
        ],
    },
    "ML Engineer": {
        companies: ["Amazon", "Google", "DeepMind"],
        questions: [
            { d: 'Easy', f: 'Foundations', c: 'Technical', q: "Explain the purpose of the **Softmax activation function**.", a: ["Converts logits into a probability distribution.", "Used in the final layer for multi-class classification.", "Output values sum to 1."] },
            { d: 'Easy', f: 'Evaluation', c: 'Technical', q: "Define **Precision and Recall** and when to prioritize one over the other.", a: ["Precision: Accuracy of positive predictions.", "Recall: Coverage of actual positive samples.", "Prioritize Recall for fraud/disease detection."] },
            { d: 'Easy', f: 'Optimization', c: 'Technical', q: "Describe the function of the **Learning Rate** in Gradient Descent.", a: ["The step size taken towards the minimum loss.", "Too large: may overshoot (divergence).", "Too small: slow convergence."] },
            { d: 'Easy', f: 'Model Basics', c: 'Technical', q: "What is **Overfitting** and how do you detect it?", a: ["Model performs well on training but poorly on test data.", "Detected by monitoring the gap between training/validation loss.", "Remedies: regularization, more data."] },
            { d: 'Medium', f: 'Regularization', c: 'Technical', q: "Explain **L1 and L2 regularization** and which one enforces sparsity.", a: ["L1 (Lasso) enforces sparsity (zeroing weights).", "L2 (Ridge) adds squared penalty.", "Both prevent overfitting."] },
            { d: 'Medium', f: 'Production', c: 'Architectural', q: "What is **Concept Drift** and how does it affect production models?", a: ["Concept drift: relationship between inputs/outputs changes over time.", "Causes model degradation.", "Mitigation involves continuous monitoring and retraining."] },
            { d: 'Medium', f: 'DL Architecture', c: 'Technical', q: "Explain the purpose of a **Convolutional Layer** and how pooling works in a CNN.", a: ["Conv layer extracts features using filters.", "Pooling (Max/Avg) downsamples feature maps.", "Pooling reduces computational cost and variance."] },
            { d: 'Hard', f: 'System Design', c: 'Architectural', q: "Design a **low-latency inference system** for a high-volume API.", a: ["Use optimized model formats (ONNX, TF-Lite).", "Implement a caching layer (Redis).", "Deploy on specialized cloud hardware (GPUs/TPUs)."] },
            { d: 'Hard', f: 'MLOps', c: 'Architectural', q: "Describe practices for deploying and monitoring a model via a **Kubernetes cluster**.", a: ["Containerize model using Docker.", "Use Prometheus/Grafana for monitoring drift.", "Implement canary deployments/shadow mode."] },
            { d: 'Hard', f: 'Advanced Stats', c: 'Technical', q: "Explain the **Kernel Trick** in Support Vector Machines (SVMs).", a: ["Allows SVMs to operate in a high-dimensional feature space implicitly.", "Avoids the explicit calculation of coordinates.", "Uses kernel functions (e.g., polynomial, RBF)."] },
        ],
    },
    "Data Scientist": {
        companies: ["Microsoft", "LinkedIn", "Uber"],
        questions: [
            { d: 'Easy', f: 'SQL', c: 'Technical', q: "Write a SQL query to find the **second highest salary** from a table.", a: ["Use DENSE_RANK() or a subquery with LIMIT and OFFSET.", "Handle potential ties or NULL values in the salary column."] },
            { d: 'Easy', f: 'Statistics', c: 'Technical', q: "Explain the difference between **Mean, Median, and Mode** and when to use the Median.", a: ["Median is the middle value (robust to outliers).", "Mean is the average (sensitive to outliers).", "Use Median for skewed data (e.g., income)."] },
            { d: 'Easy', f: 'Data Prep', c: 'Technical', q: "What is **one-hot encoding** and why is it necessary for categorical data?", a: ["Converts categorical variables into a binary vector format.", "Prevents the model from incorrectly assuming an ordinal relationship.", "Avoids models assigning arbitrary meaning to numbers."] },
            { d: 'Easy', f: 'Hypothesis Testing', c: 'Technical', q: "Explain the difference between **Type I and Type II errors**.", a: ["Type I (False Positive): Rejecting a true Null Hypothesis.", "Type II (False Negative): Failing to reject a false Null Hypothesis.", "Alpha ($\alpha$) controls Type I error."] },
            { d: 'Medium', f: 'ETL', c: 'Architectural', q: "Describe the core stages of a typical **ETL pipeline** for data warehousing.", a: ["Extract: pulling data from various sources.", "Transform: cleaning, validating, and restructuring the data.", "Load: writing the data into the final target system."] },
            { d: 'Medium', f: 'Data Cleaning', c: 'Technical', q: "How would you handle **outliers** in a dataset before feeding it to a regression model?", a: ["Identify outliers using IQR or Z-scores.", "Option 1: Winsorizing (capping the value).", "Option 2: Log Transformation."] },
            { d: 'Medium', f: 'Time Series', c: 'Technical', q: "Describe the components of an **ARIMA** model and how parameters are determined.", a: ["AR (Autoregression), I (Integrated/Differencing), MA (Moving Average).", "Used for forecasting time-dependent data.", "Parameters determined by ACF/PACF plots."] },
            { d: 'Hard', f: 'Metrics', c: 'Architectural', q: "Design an **evaluation metric system** for a platform that recommends content to users.", a: ["Primary Metric: Click-Through Rate (CTR).", "Secondary Metric: Time spent consuming the recommended content.", "Guardrail Metric: User Churn Rate.", "Need to address bias."] },
            { d: 'Hard', f: 'A/B Testing', c: 'Architectural', q: "What is **P-Hacking** and how can you design an A/B test to avoid it?", a: ["P-Hacking: Running multiple tests until a statistically significant result is found.", "Avoid by pre-registering the hypothesis, sample size, and duration.", "Use sequential testing."] },
            { d: 'Hard', f: 'Communication', c: 'Technical', q: "Explain **data storytelling** and its importance in presenting analytical findings.", a: ["Involves narrative, visuals, and data.", "Moves beyond raw numbers to provide context and drive action.", "Focuses on audience understanding and impact."] },
        ],
    },
    "DevOps Engineer": {
        companies: ["Amazon (AWS)", "Microsoft (Azure)", "Google (GCP)"],
        questions: [
            { d: 'Easy', f: 'Networking', c: 'Technical', q: "Explain the purpose of **SSH keys** and the public/private key mechanism.", a: ["Uses public-key cryptography for secure access.", "Private key stays secret; public key is shared on the server.", "More secure than password authentication."] },
            { d: 'Easy', f: 'Containers', c: 'Technical', q: "What is the primary benefit of using **Docker containers** over traditional VMs?", a: ["Containers share the host OS kernel (lighter and faster).", "Provides environment consistency.", "Lower resource utilization."] },
            { d: 'Easy', f: 'IaC Basics', c: 'Technical', q: "Describe **Idempotency** in the context of configuration management.", a: ["Running the same code multiple times yields the same result.", "Crucial for declarative tools (Terraform).", "Prevents configuration drift."] },
            { d: 'Easy', f: 'CI/CD', c: 'Architectural', q: "Define **CI/CD** and name the main tool used for Continuous Integration.", a: ["CI: Continuously integrating code changes frequently.", "CD: Continuously deploying/delivering.", "Tools: Jenkins, GitLab CI, GitHub Actions."] },
            { d: 'Medium', f: 'Kubernetes', c: 'Technical', q: "Explain the function of a **Kubernetes Service** and the ClusterIP type.", a: ["An abstraction layer providing stable networking for Pods.", "ClusterIP: Exposes the Service on an internal cluster-only IP.", "Used for internal communication."] },
            { d: 'Medium', f: 'IaC Tools', c: 'Technical', q: "Compare **Terraform and Ansible** and their primary use cases.", a: ["Terraform: Orchestration (provisioning infrastructure).", "Ansible: Configuration Management (installing software).", "Often used together for full lifecycle management."] },
            { d: 'Medium', f: 'Deployment Strategy', c: 'Architectural', q: "Describe the use case for a **Canary Deployment** strategy.", a: ["Rolling out a new version to a small subset of users.", "Monitors performance/errors of the new version in real traffic.", "Minimizes blast radius."] },
            { d: 'Hard', f: 'Automation', c: 'Architectural', q: "Design an automated **roll-back mechanism** triggered by monitoring alerts.", a: ["Monitoring (Prometheus) detects failure.", "Alertmanager triggers a CI/CD pipeline.", "Pipeline executes a deployment rollback to the last stable tag."] },
            { d: 'Hard', f: 'System Design', c: 'Architectural', q: "How would you ensure **Kubernetes Pods** are always running on different physical hosts for high availability?", a: ["Use Pod Anti-Affinity rules.", "Set hard constraints to repel pods from nodes already running specific labels.", "Increases fault tolerance against host failure."] },
            { d: 'Hard', f: 'Networking', c: 'Technical', q: "Explain the difference between a **Load Balancer and a Reverse Proxy** in a cloud environment.", a: ["Load Balancer: Distributes traffic across backend servers.", "Reverse Proxy: Sits in front of servers, handles SSL/TLS termination, and caching.", "A load balancer is often a specialized type of reverse proxy."] },
        ],
    },
    "Cloud Architect": {
        companies: ["Salesforce", "IBM", "VMware"],
        questions: [
            { d: 'Easy', f: 'Cloud Fundamentals', c: 'Architectural', q: "Compare **IaaS, PaaS, and SaaS** with a common cloud example for each.", a: ["IaaS: Virtual machine (EC2).", "PaaS: Managed database (RDS).", "SaaS: CRM software (Salesforce).", "Defines the customer's level of control."] },
            { d: 'Easy', f: 'Security', c: 'Architectural', q: "Explain the principle of **Least Privilege** in cloud security design.", a: ["Giving users/services only the permissions necessary to perform their work.", "Minimizes the potential blast radius of a security breach.", "Use IAM roles/policies."] },
            { d: 'Easy', f: 'Networking', c: 'Architectural', q: "What is a **Virtual Private Cloud (VPC)** and why is it segmented?", a: ["An isolated virtual network in the cloud.", "Segmented into subnets to manage traffic flow and security boundaries.", "Default subnets are often public/private."] },
            { d: 'Easy', f: 'Cost', c: 'Architectural', q: "Name three strategies for **cost optimization** in a cloud deployment.", a: ["Rightsizing instances to match demand.", "Using Reserved Instances (RIs) or Savings Plans.", "Implementing auto-scaling and turning off non-production environments."] },
            { d: 'Medium', f: 'Networking', c: 'Architectural', q: "Explain **Micro-segmentation** and its benefits in a large cloud environment.", a: ["Dividing the network into small, isolated zones.", "Each zone has its own security policy.", "Prevents lateral movement of threats.", "Implemented using NSGs or security groups."] },
            { d: 'Medium', f: 'Database', c: 'Architectural', q: "What are the trade-offs between using a **Serverless Database** vs. a Managed Relational Database?", a: ["Serverless: Auto-scaling, pay-per-use, no operations.", "RDS: Fixed schema, ACID compliance, complex joins.", "Choose based on required consistency and schema rigidity."] },
            { d: 'Medium', f: 'Storage', c: 'Architectural', q: "Compare **Object Storage (S3) and Block Storage (EBS)** and provide a use case for each.", a: ["Object: Highly scalable, immutable, HTTP access (S3 for media files).", "Block: Low-latency, file-system level access (EBS for OS boot volumes)."] },
            { d: 'Hard', f: 'DR/HA', c: 'Architectural', q: "Design a **disaster recovery strategy** with an RTO of 30 minutes and an RPO of 5 minutes.", a: ["RPO (Recovery Point Objective): Use continuous replication/snapshots every 5 mins.", "RTO (Recovery Time Objective): Use pilot light or warm standby for fast failover.", "Utilize cross-region deployment."] },
            { d: 'Hard', f: 'Migration', c: 'Architectural', q: "Discuss the challenges of migrating a **legacy data center application** to a multi-cloud environment.", a: ["Application refactoring/compatibility.", "Data gravity and migration complexity (downtime).", "Latency between clouds/data center.", "Vendor lock-in and security standardization."] },
            { d: 'Hard', f: 'Security', c: 'Architectural', q: "How would you implement a **security compliance baseline** using IaC (e.g., Terraform)?", a: ["Define security rules (encryption, IAM policies) in code.", "Use policy-as-code tools (Sentinel, OPA) to enforce standards pre-deployment.", "Automate audits using native cloud tools."] },
        ],
    },
    "Product Manager": {
        companies: ["Apple", "Spotify", "Airbnb"],
        questions: [
            { d: 'Easy', f: 'Strategy', c: 'Behavioral', q: "How do you define **Minimum Viable Product (MVP)**?", a: ["Smallest set of features to satisfy early customers.", "Goal is to validate key assumptions.", "Focuses on the core problem solution."] },
            { d: 'Easy', f: 'Prioritization', c: 'Behavioral', q: "Explain the **RICE scoring model** and how you use it to prioritize your product roadmap.", a: ["RICE stands for Reach, Impact, Confidence, Effort.", "Provides a quantitative prioritization score.", "Used to balance value vs. cost."] },
            { d: 'Easy', f: 'Discovery', c: 'Behavioral', q: "Explain the **'Jobs-to-be-Done'** framework.", a: ["Focuses on the customer's motivations/goals (the job).", "Helps define market size and competition.", "The customer 'hires' the product to do the job."] },
            { d: 'Easy', f: 'Execution', c: 'Behavioral', q: "Describe the difference between **Scrum and Kanban** and when you would choose each.", a: ["Scrum: Time-boxed sprints, fixed goals (predictive).", "Kanban: Continuous flow, variable goals (responsive).", "Choose Kanban for maintenance/support teams; Scrum for feature teams."] },
            { d: 'Medium', f: 'Metrics', c: 'Behavioral', q: "You see a **significant drop in Daily Active Users (DAU)**. What is your process to diagnose and fix it?", a: ["Validate data accuracy.", "Segment users (new vs. existing, platform).", "Check for recent feature releases/bugs.", "Run qualitative interviews/surveys."] },
            { d: 'Medium', f: 'Leadership', c: 'Behavioral', q: "How do you handle a situation where engineering tells you a key feature will take 3x longer than you planned?", a: ["Focus on understanding the root cause.", "Collaborate to redefine the scope (find the MVP path).", "Communicate the timeline impact clearly to stakeholders."] },
            { d: 'Medium', f: 'Strategy', c: 'Behavioral', q: "Design a **success metric system (North Star Metric)** for a new in-app social sharing feature.", a: ["NSM should be a measure of value delivered.", "Example: 'Weekly Shared Content Views'.", "Counter-metrics: user churn, abuse reports."] },
            { d: 'Hard', f: 'Communication', c: 'Behavioral', q: "How would you convince an executive team to invest in fixing **technical debt** instead of building a new feature?", a: ["Translate technical debt into business risk.", "Use metrics like lead time, deployment frequency.", "Present a clear ROI for the investment."] },
            { d: 'Hard', f: 'Strategy', c: 'Behavioral', q: "Outline your approach to launching a **major product pivot** after receiving negative feedback from beta users.", a: ["Analyze feedback to confirm the core problem.", "Define the new target segment and value proposition.", "Launch the pivot as a new MVP with clear success criteria."] },
            { d: 'Hard', f: 'A/B Testing', c: 'Behavioral', q: "What is the biggest challenge in A/B testing two different landing page layouts, and how do you ensure valid results?", a: ["Challenge: Sample size, duration, and novelty effects.", "Ensure valid results by pre-calculating sample size/duration.", "Ensure clear, mutually exclusive user segmentation."] },
        ],
    },
    "Cyber Security Analyst": {
        companies: ["JP Morgan", "Lockheed Martin", "Cisco"],
        questions: [
            { d: 'Easy', f: 'Networking', c: 'Technical', q: "Describe the function of a **Firewall** and the difference between stateful and stateless.", a: ["A firewall monitors and filters network traffic.", "Stateless filters based only on packets/ACLs.", "Stateful tracks connection state (more secure)."] },
            { d: 'Easy', f: 'Vulnerabilities', c: 'Technical', q: "What is a **SQL Injection** attack and how do you prevent it?", a: ["Inserting malicious SQL queries via user input.", "Attacker can read/modify sensitive data.", "Prevention: Use prepared statements/parameterized queries."] },
            { d: 'Easy', f: 'Foundations', c: 'Technical', q: "Explain the **CIA Triad (Confidentiality, Integrity, Availability)**.", a: ["Confidentiality: Protecting data privacy.", "Integrity: Ensuring data accuracy and completeness.", "Availability: Guaranteeing system accessibility."] },
            { d: 'Easy', f: 'Identity', c: 'Technical', q: "What is the benefit of using **Multi-Factor Authentication (MFA)**?", a: ["Requires two or more verification factors.", "Significantly reduces the risk of unauthorized access.", "MFA methods include SMS, apps, or biometrics."] },
            { d: 'Medium', f: 'Encryption', c: 'Technical', q: "Compare **Symmetric and Asymmetric encryption** methods and when to use each.", a: ["Symmetric: Uses one key (fast, large data).", "Asymmetric: Uses public/private keys (slow, key exchange).", "TLS/SSL uses both."] },
            { d: 'Medium', f: 'Monitoring', c: 'Technical', q: "What is the role of a **SIEM system** in an organization's security posture?", a: ["Security Information and Event Management.", "Aggregates and analyzes log data from various sources.", "Used for real-time threat detection and compliance."] },
            { d: 'Medium', f: 'Architecture', c: 'Architectural', q: "Explain **Micro-segmentation** and how it helps prevent lateral movement of threats.", a: ["Dividing the network into small, isolated zones.", "Each zone has its own security policy.", "Prevents an attacker from moving easily from one compromised server to another."] },
            { d: 'Hard', f: 'Incident Response', c: 'Architectural', q: "Outline the steps you would take to handle a **Zero-Day vulnerability** disclosure in production.", a: ["Isolation/Containment: Immediately patch or disable the affected service.", "Monitor: Scan logs for exploitation attempts.", "Patching: Rapidly deploy vendor patches.", "Review: Post-mortem analysis."] },
            { d: 'Hard', f: 'Vulnerability Mgmt', c: 'Technical', q: "Describe the **OWASP Top 10** risks and how to mitigate the most critical threat.", a: ["Injections, Broken Authentication, Sensitive Data Exposure, etc.", "Mitigation involves rigorous security testing (DAST/SAST) and defense-in-depth.", "Focus on validating user input."] },
            { d: 'Hard', f: 'Advanced Threats', c: 'Technical', q: "Explain the concept of a **Side-Channel Attack** and give a modern example.", a: ["Attacks that exploit information leaked from physical implementation (time, power consumption).", "Example: Spectre/Meltdown (exploiting speculative execution).", "Requires physical/local access or highly optimized code."] },
        ],
    },
    "iOS Developer": {
        companies: ["Apple", "Square", "Meta"],
        questions: [
            { d: 'Easy', f: 'Swift Basics', c: 'Technical', q: "What is **Optionals** in Swift and why are they important?", a: ["Handle the presence or absence of a value.", "Prevents runtime crashes due to nil references (nil-safety).", "Declared using `?` or `!`."] },
            { d: 'Easy', f: 'Memory Mgmt', c: 'Technical', q: "Explain the purpose of **ARC (Automatic Reference Counting)** in Swift.", a: ["Automatically tracks and manages memory usage.", "Deallocates objects when no longer needed.", "Prevents memory leaks/dangling pointers."] },
            { d: 'Easy', f: 'Types', c: 'Technical', q: "Explain the difference between a **struct and a class** in Swift and when to use each.", a: ["Structs are value types (copied on assignment).", "Classes are reference types (shared instance).", "Use structs for simple data models; classes for inheritance/identity."] },
            { d: 'Easy', f: 'UI Basics', c: 'Technical', q: "What is the difference between **UIViewController and UIView**?", a: ["UIViewController manages the lifecycle of a view hierarchy.", "UIView is a rectangle area on the screen responsible for drawing/event handling.", "Views are children of ViewControllers."] },
            { d: 'Medium', f: 'Memory Mgmt', c: 'Technical', q: "Explain the difference between **`strong`, `weak`, and `unowned`** reference types.", a: ["Strong: Increments reference count (ARC).", "Weak: Does not increment, becomes nil when reference count is zero.", "Unowned: Assumes the reference will always exist."] },
            { d: 'Medium', f: 'Concurrency', c: 'Technical', q: "Explain **Dispatch Queues (GCD)** and how they handle concurrency.", a: ["GCD manages work through queues.", "Main queue (serial, UI updates).", "Global queues (concurrent, background tasks).", "Used to prevent UI blocking and perform tasks efficiently."] },
            { d: 'Medium', f: 'Storage', c: 'Architectural', q: "How is data typically persisted locally in an iOS application?", a: ["UserDefaults (small data/settings).", "Core Data or Realm (complex object graphs).", "KeyChain (sensitive data like passwords)."] },
            { d: 'Hard', f: 'Architecture', c: 'Architectural', q: "Describe a scalable architecture pattern for a complex iOS app (e.g., MVVM, VIPER).", a: ["MVVM: separation of UI/business logic (ViewModel).", "VIPER: highly modular, complex but scalable.", "Choose based on project size and team expertise."] },
            { d: 'Hard', f: 'Networking', c: 'Technical', q: "How would you handle **offline data synchronization** and conflict resolution between local and remote data?", a: ["Use a timestamp or versioning system for conflict resolution.", "Use Core Data/Realm with CloudKit sync or custom backend logic.", "Implement background fetch/sync for seamless updates."] },
            { d: 'Hard', f: 'Concurrency', c: 'Technical', q: "Explain **Thread Sanitizer** and how it helps detect concurrency issues.", a: ["Thread Sanitizer is a dynamic code analysis tool.", "Detects data races, unsafe access to variables, and other threading issues.", "Enables detection of bugs that are hard to reproduce in testing."] },
        ],
    },
    "Backend Engineer": {
        companies: ["Twitter", "Stripe", "Dropbox"],
        questions: [
            { d: 'Easy', f: 'Databases', c: 'Technical', q: "Compare **SQL and NoSQL** databases and when to choose each.", a: ["SQL (Relational): Structured, ACID compliant.", "NoSQL (Non-Relational): Flexible schema, high scalability.", "Use SQL for transactional systems; NoSQL for large unstructured data."] },
            { d: 'Easy', f: 'API Design', c: 'Architectural', q: "Compare **REST and GraphQL** API design paradigms.", a: ["REST: Resource-centric, multiple endpoints (over-fetching).", "GraphQL: Data-centric, single endpoint, client controls data received.", "GraphQL reduces chattiness."] },
            { d: 'Easy', f: 'Database', c: 'Technical', q: "Explain the purpose of **Database Indexing** and when it might hurt performance.", a: ["Indexing speeds up data retrieval operations (WHERE clauses).", "Hurts performance during INSERT/UPDATE/DELETE (writes).", "Trade-off between read speed and write speed."] },
            { d: 'Easy', f: 'Networking', c: 'Technical', q: "What is the difference between HTTP **GET and POST** requests?", a: ["GET retrieves data (idempotent, cacheable).", "POST sends data to be processed (not idempotent, not cacheable).", "POST body contains data; GET uses URL parameters."] },
            { d: 'Medium', f: 'Messaging', c: 'Architectural', q: "What are the benefits of using a **Message Queue (e.g., Kafka)** in a microservices system?", a: ["Decoupling services (producer/consumer).", "Asynchronous processing (improving response time).", "Buffering (handling traffic spikes)."] },
            { d: 'Medium', f: 'Distributed Sys', c: 'Technical', q: "Explain the **CAP theorem** and its relevance to distributed databases.", a: ["CAP stands for Consistency, Availability, Partition Tolerance.", "A distributed system can only guarantee two out of three.", "NoSQL databases often prioritize AP."] },
            { d: 'Medium', f: 'Authentication', c: 'Technical', q: "Explain the **OAuth 2.0** Authorization Code Flow.", a: ["Standard protocol for delegated authorization.", "Client exchanges an Authorization Code for an Access Token.", "Used for third-party access without sharing user credentials."] },
            { d: 'Hard', f: 'Scaling', c: 'Architectural', q: "Design a **rate-limiting system** to protect a high-traffic API endpoint.", a: ["Use a distributed cache (Redis) to store usage counters/timestamps.", "Apply throttling algorithms (Token Bucket).", "Implement rate limits at the API Gateway level."] },
            { d: 'Hard', f: 'Transactions', c: 'Architectural', q: "What is **idempotency** and why is it essential for processing payments/transactions?", a: ["Idempotency: An operation can be repeated multiple times without changing the result after the first successful execution.", "Prevents duplicate charges due to network retries.", "Implemented using unique request keys."] },
            { d: 'Hard', f: 'System Design', c: 'Architectural', q: "How would you design a highly available **session store** for a service (millions of concurrent users)?", a: ["Use a highly distributed, in-memory data store (e.g., Redis Cluster).", "Implement sharding (horizontal partitioning) based on user ID.", "Use replication for high availability/read scaling."] },
        ],
    },
    "Data Analyst": {
        companies: ["Goldman Sachs", "Deloitte", "PwC"],
        questions: [
            { d: 'Easy', f: 'SQL', c: 'Technical', q: "Write a SQL query to find the **second highest salary** from an Employee table.", a: ["Use a subquery with LIMIT and OFFSET.", "Alternatively, use a window function like DENSE_RANK().", "Handle edge cases like ties."] },
            { d: 'Easy', f: 'Statistics', c: 'Technical', q: "Explain the difference between a **LEFT JOIN and an INNER JOIN** in SQL.", a: ["INNER JOIN returns matching rows only.", "LEFT JOIN returns all rows from the left table (and matches from the right).", "Use LEFT JOIN for completeness checks."] },
            { d: 'Easy', f: 'Statistics', c: 'Technical', q: "Explain the purpose of **data normalization** (e.g., Min-Max, Z-Score).", a: ["Scales data to a standard range.", "Prevents features with larger values from dominating distance-based algorithms.", "Ensures convergence in machine learning algorithms."] },
            { d: 'Easy', f: 'Tools', c: 'Technical', q: "Describe a scenario where you would use a **pivot table** (cross-tabulation).", a: ["Used to summarize and reorganize data by transforming rows into columns.", "Example: comparing sales figures across multiple regions AND product types.", "Simplifies aggregation viewing."] },
            { d: 'Medium', f: 'Data Quality', c: 'Technical', q: "How would you handle a situation where your client's **KPI definitions are inconsistent**?", a: ["Establish a single source of truth (documentation).", "Implement data validation and ETL checks to align definitions.", "Collaborate with stakeholders to finalize consistent definitions."] },
            { d: 'Medium', f: 'Statistics', c: 'Technical', q: "Explain **Central Limit Theorem (CLT)** and its practical importance for A/B testing.", a: ["CLT states that the distribution of sample means approximates a normal distribution.", "Allows us to use Z-scores/T-tests for hypothesis testing.", "Crucial for determining statistical significance in A/B tests."] },
            { d: 'Medium', f: 'Communication', c: 'Technical', q: "What is **data storytelling** and why is it essential for analytical findings?", a: ["Involves narrative, visuals, and data.", "Moves beyond raw numbers to provide context and drive action.", "Focuses on audience understanding and impact."] },
            { d: 'Hard', f: 'A/B Testing', c: 'Technical', q: "Walk me through calculating the **required sample size** for an A/B test.", a: ["Requires: Baseline conversion rate, Minimum Detectable Effect (MDE), Alpha ($\alpha$), and Beta ($\beta$).", "Formula involves Z-scores for $\alpha$/$\beta$ and variance."] },
            { d: 'Hard', f: 'SQL/Window', c: 'Technical', q: "Write a SQL query to calculate a **running total** of sales by day.", a: ["Use a Window Function: `SUM(sales) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING)`.", "Window functions partition and order data without collapsing rows.", "Essential for cumulative metrics."] },
            { d: 'Hard', f: 'Modeling', c: 'Technical', q: "Explain the difference between **Regression and Classification** and give an example of each.", a: ["Regression predicts a continuous numerical output (e.g., house price).", "Classification predicts a categorical label (e.g., spam/not spam).", "Both are supervised learning methods."] },
        ],
    },
};


// --- PROPRIETARY QUESTIONS (10 questions per role) ---
const PROPRIETARY_QUESTIONS: RoleQuestions = {};
Object.keys(ROLE_BASE_DATA).forEach(role => {
    PROPRIETARY_QUESTIONS[role] = createQuestions(ROLE_BASE_DATA[role].questions, role, ROLE_BASE_DATA[role].companies);
});


const UNIVERSAL_HR_BASE_QUESTIONS = [
    { id: 5001, question: "Tell me about yourself, and why are you interested in this role and our company?", topic: "Elevator Pitch", difficulty: 'Easy' },
    { id: 5002, question: "Describe a time you had a fundamental disagreement with a manager. How did you handle it?", topic: "Conflict Resolution", difficulty: 'Easy' },
    { id: 5003, question: "What is your greatest weakness, and what are you doing to improve it?", topic: "Self-Awareness", difficulty: 'Easy' },
    { id: 5004, question: "Describe a project where you failed or made a major mistake. What did you learn?", topic: "Learning from Failure", difficulty: 'Easy' },
    { id: 5005, question: "Give an example of when you had to prioritize competing project deadlines.", topic: "Prioritization", difficulty: 'Medium' },
    { id: 5006, question: "Tell me about a technical decision you regret and how you would change it now.", topic: "Technical Judgment", difficulty: 'Medium' },
    { id: 5007, question: "How do you handle working with a difficult or non-communicative team member?", topic: "Teamwork/Collaboration", difficulty: 'Medium' },
    { id: 5008, question: "Describe a time you innovated or went above and beyond your job requirements.", topic: "Initiative/Innovation", difficulty: 'Hard' },
    { id: 5009, question: "Walk me through a complex project you led from start to finish.", topic: "Project Leadership", difficulty: 'Hard' },
    { id: 5010, question: "Why are you looking to leave your current company?", topic: "Motivation/Fit", difficulty: 'Hard' },
];

const UNIVERSAL_HR_QUESTIONS: Question[] = UNIVERSAL_HR_BASE_QUESTIONS.map(q => ({
    id: q.id,
    companyFocus: `Behavioral (${q.topic})`,
    difficulty: q.difficulty as Difficulty,
    category: 'Behavioral' as Category,
    question: q.question,
    resource: "#",
    answerPoints: ["Use the STAR method (Situation, Task, Action, Result).", `Focus on the key trait: ${q.topic}.`, "Ensure the outcome is positive and highlights growth.", "Keep your answer concise (2-3 minutes max)."],
    followUp: [],
    companyInsight: "",
}));

const ALL_ROLES = Object.keys(PROPRIETARY_QUESTIONS).sort();
const ALL_COMPANIES = Array.from(new Set(Object.values(COMPANIES_BY_ROLE).flatMap(d => d))).sort();
// ---------------------------------------------------------------------------------------------------------

// --- Main Component ---
const InterviewPrepPage: React.FC = () => {

    // --- Hooks for Interactive State ---
    const [confidenceState, setConfidenceState] = useState<Record<number, Confidence>>({});
    const [selectedRole, setSelectedRole] = useState<string>("Web Developer");
    const [selectedCompany, setSelectedCompany] = useState<string>('');
    const [activeAnswerId, setActiveAnswerId] = useState<number | null>(null);
    const [showReviewQueue, setShowReviewQueue] = useState(false);
    const [activeMode, setActiveMode] = useState<'Technical' | 'HR'>('Technical');

    // --- Derived State ---
    const baseQuestions = activeMode === 'HR'
        ? UNIVERSAL_HR_QUESTIONS
        : (PROPRIETARY_QUESTIONS[selectedRole] || []);

    const filteredQuestions = baseQuestions.filter(q => {
        if (!selectedCompany) return true;
        return q.companyFocus.toLowerCase().includes(selectedCompany.toLowerCase());
    });

    const reviewQueue = filteredQuestions.filter(q => confidenceState[q.id] === 'Low' || confidenceState[q.id] === 'Medium');

    const questions = showReviewQueue
        ? reviewQueue
        : filteredQuestions;

    // --- Utility functions (simplified) ---
    const setConfidence = (id: number, rating: Confidence) => {
        setConfidenceState(prev => ({ ...prev, [id]: rating }));
    };

    const toggleAnswer = (id: number) => {
        setActiveAnswerId(activeAnswerId === id ? null : id);
    };

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
        setSelectedCompany('');
        setActiveAnswerId(null);
    };

    const handleCompanyChange = (company: string) => {
        setSelectedCompany(prev => prev === company ? '' : company);
        setActiveAnswerId(null);
    };

    const handleModeChange = (mode: 'Technical' | 'HR') => {
        setActiveMode(mode);
        setSelectedCompany('');
        setActiveAnswerId(null);
    };

    // =======================================================
    // --- Question Accordion Item Component (New UI) ---
    // =======================================================

    const QuestionAccordion: React.FC<{ q: Question }> = ({ q }) => {
        const isAnswerActive = activeAnswerId === q.id;
        const currentConfidence = confidenceState[q.id];

        // Determine icon direction
        const arrowStyle: React.CSSProperties = {
            marginLeft: 'auto',
            transition: 'transform 0.2s',
            transform: isAnswerActive ? 'rotate(180deg)' : 'rotate(0deg)',
            color: PRIMARY_COLOR,
            fontSize: '1.2rem',
        };
        
        // Define color for quick difficulty tagging
        const getDifficultyColor = (difficulty: Difficulty) => {
            switch (difficulty) {
                case 'Easy': return PRIMARY_COLOR;
                case 'Medium': return '#FFB300'; // Amber
                case 'Hard': return DANGER_COLOR;
                default: return TEXT_COLOR_MUTED;
            }
        };


        return (
            <div style={{ marginBottom: '5px', border: `1px solid ${BORDER_COLOR}`, borderRadius: '4px', overflow: 'hidden' }}>
                {/* --- Question Header/Toggle Button --- */}
                <button
                    onClick={() => toggleAnswer(q.id)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 15px',
                        backgroundColor: CARD_BG,
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background-color 0.1s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = isAnswerActive ? '#f0f0f0' : '#fafafa'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isAnswerActive ? '#f0f0f0' : CARD_BG; }}
                >
                    <span style={{ 
                        marginRight: '10px', 
                        fontSize: '0.9rem', 
                        fontWeight: 700,
                        color: getDifficultyColor(q.difficulty),
                        minWidth: '45px'
                    }}>
                        {q.question.split(':')[0]}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500, color: TEXT_COLOR_DARK, flexGrow: 1 }}>
                        {q.question.split(':')[1] ? q.question.split(':')[1].trim() : q.question}
                    </span>
                    <span style={arrowStyle}>
                        ▼
                    </span>
                </button>

                {/* --- Answer Body (Expanded Content) --- */}
                {isAnswerActive && (
                    <div style={{ padding: '15px 25px', backgroundColor: '#f0f0f0', borderTop: `1px solid ${BORDER_COLOR}` }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: ACCENT_COLOR, margin: '0 0 10px 0' }}>Key Talking Points:</h4>
                        
                        {/* Answer Points */}
                        <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', margin: '0 0 15px 0', fontSize: '0.9rem', color: TEXT_COLOR_DARK, lineHeight: 1.6 }}>
                            {q.answerPoints.map((point, idx) => (
                                <li key={idx} style={{ marginBottom: '5px' }}>{point}</li>
                            ))}
                        </ul>

                        {/* Confidence Rating and Resource Link */}
                        <div style={{ display: 'flex', alignItems: 'center', borderTop: `1px dashed ${BORDER_COLOR}`, paddingTop: '10px' }}>
                            <p style={{ fontWeight: 700, color: TEXT_COLOR_MUTED, fontSize: '0.85rem', margin: '0 10px 0 0' }}>Rate:</p>
                            {['Low', 'Medium', 'High'].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => setConfidence(q.id, rating as Confidence)}
                                    style={{
                                        padding: '4px 8px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer',
                                        border: `1px solid ${currentConfidence === rating ? DANGER_COLOR : BORDER_COLOR}`,
                                        backgroundColor: currentConfidence === rating ? DANGER_COLOR : CARD_BG,
                                        color: currentConfidence === rating ? CARD_BG : TEXT_COLOR_DARK,
                                        fontSize: '0.75rem', marginRight: '5px'
                                    }}
                                >
                                    {rating}
                                </button>
                            ))}
                            
                            <a
                                href={q.resource}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    color: PRIMARY_COLOR,
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    textDecoration: 'none',
                                    marginLeft: 'auto',
                                }}
                            >
                                Resource Link →
                            </a>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: BG_COLOR,
                fontFamily: 'Roboto, sans-serif',
                color: TEXT_COLOR_DARK,
            }}
        >
            {/* --- TOP NAVBAR --- */}
             <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
                   <h1 className="text-2xl font-bold">VerteX</h1>
                    <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/roadmaps" className="hover:underline">Roadmaps</Link>
            <Link href="/internships" className="hover:underline">Internships</Link>
             <Link href="/resume" className="hover:underline">ResumeBuilder</Link>
             <Link href="/interview" className="hover:underline">Interviewprep</Link>
             <Link href="/projects" className="hover:underline">Projects</Link>
            <Link href="/hackathon" className="hover:underline">Hackathons</Link>
            <Link href="/certifications" className="hover:underline">Certifications</Link>
            <Link href="/cheatsheets" className="hover:underline">Cheat Sheets</Link>
          </div>
                 </nav>

            {/* --- LAYOUT CONTAINER (Below Navbar) --- */}
            <div style={{ display: 'flex', paddingTop: NAVBAR_HEIGHT, minHeight: `calc(100vh - ${NAVBAR_HEIGHT})` }}>

                {/* --- SIDEBAR NAVIGATION (LEFT) --- */}
                <div
                    style={{
                        width: SIDEBAR_WIDTH,
                        minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
                        backgroundColor: CARD_BG,
                        borderRight: `1px solid ${BORDER_COLOR}`,
                        boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
                        padding: '0 0 20px 0',
                        position: 'sticky',
                        top: NAVBAR_HEIGHT,
                    }}
                >
                    {/* Search Bar (Top of Sidebar) */}
                    <div style={{ padding: '20px', borderBottom: `1px solid ${BORDER_COLOR}` }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: `1px solid ${BORDER_COLOR}`,
                                fontSize: '1rem',
                            }}
                        />
                    </div>

                    {/* Main Navigation */}
                    <div style={{ padding: '20px 0' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: TEXT_COLOR_DARK, padding: '0 20px 10px' }}>Interview Preparation</h3>

                        {/* Navigation Links */}
                        <nav>
                            {[
                                { name: 'Popular Guides', icon: '✨', mode: 'Technical', active: activeMode === 'Technical' && !showReviewQueue },
                                { name: 'Universal HR Questions', icon: '🤝', mode: 'HR', active: activeMode === 'HR' },
                                { name: `Review Queue (${reviewQueue.length})`, icon: '🧠', mode: 'Review', active: showReviewQueue },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    onClick={() => {
                                        if (item.mode === 'Review') {
                                            setShowReviewQueue(!showReviewQueue);
                                            if (activeMode !== 'HR') setActiveMode('Technical');
                                        } else {
                                            handleModeChange(item.mode as 'Technical' | 'HR');
                                            setShowReviewQueue(false);
                                        }
                                    }}
                                    style={{
                                        padding: '10px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: item.active ? PRIMARY_COLOR + '10' : 'transparent',
                                        color: item.active ? ACCENT_COLOR : TEXT_COLOR_MUTED,
                                        fontWeight: item.active ? 600 : 400,
                                        borderLeft: item.active ? `3px solid ${PRIMARY_COLOR}` : '3px solid transparent',
                                        transition: 'all 0.1s',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!item.active) e.currentTarget.style.backgroundColor = '#f0f0f0';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!item.active) e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <span style={{ fontSize: '1.2rem', color: item.active ? PRIMARY_COLOR : TEXT_COLOR_MUTED }}>{item.icon}</span>
                                    {item.name}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Role/Specialization Filter (Technical Mode Only) */}
                    {activeMode === 'Technical' && (
                        <div style={{ padding: '0 20px 20px 20px', borderTop: `1px solid ${BORDER_COLOR}` }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: TEXT_COLOR_DARK, margin: '15px 0 10px 0' }}>Role Specialization</h3>
                            <div style={{ position: 'relative', marginBottom: '15px' }}>
                                <select
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    style={{
                                        width: '100%', padding: '8px 10px', border: `1px solid ${BORDER_COLOR}`, borderRadius: '4px',
                                        backgroundColor: CARD_BG, fontSize: '0.95rem', color: TEXT_COLOR_DARK, cursor: 'pointer',
                                    }}
                                >
                                    <option value="" disabled style={{ color: TEXT_COLOR_MUTED }}>-- Select Role --</option>
                                    {ALL_ROLES.map((role) => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: TEXT_COLOR_DARK, margin: '15px 0 10px 0' }}>Company Focus</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {ALL_COMPANIES.map(company => (
                                    <button
                                        key={company}
                                        onClick={() => handleCompanyChange(company)}
                                        style={{
                                            padding: '4px 10px',
                                            backgroundColor: selectedCompany === company ? PRIMARY_COLOR : '#e0f7fa',
                                            color: selectedCompany === company ? CARD_BG : ACCENT_COLOR,
                                            borderRadius: '4px',
                                            border: `1px solid ${selectedCompany === company ? PRIMARY_COLOR : '#e0f7fa'}`,
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.1s',
                                        }}
                                        onMouseEnter={(e) => { if (selectedCompany !== company) e.currentTarget.style.backgroundColor = '#b2ebf2'; }}
                                        onMouseLeave={(e) => { if (selectedCompany !== company) e.currentTarget.style.backgroundColor = '#e0f7fa'; }}
                                    >
                                        {company}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick Tags Section (Bottom of Sidebar) */}
                    <div style={{ padding: '0 20px' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: TEXT_COLOR_DARK, margin: '15px 0 10px 0' }}>Popular Tags</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['JavaScript', 'React', 'Python', 'AWS', 'Security', 'SQL', 'Behavioral'].map(tag => (
                                <span key={tag} style={{
                                    padding: '4px 10px',
                                    backgroundColor: '#e0f7fa',
                                    color: ACCENT_COLOR,
                                    borderRadius: '16px',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#b2ebf2'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e0f7fa'; }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Main Content Area (RIGHT) --- */}
                <main style={{ flexGrow: 1, padding: '30px', maxWidth: '850px', margin: '0 auto' }}> {/* Centered and fixed-width for focus */}

                    {/* --- Main Topic Header (What is Angular?) --- */}
                    <div style={{ marginBottom: '30px', padding: '0 10px' }}>
                        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: TEXT_COLOR_DARK, margin: 0 }}>
                            {activeMode === 'HR' ? 'Universal Behavioral Interview Questions' : `${selectedRole} Interview Questions`}
                        </h1>
                        <p style={{ fontSize: '1rem', color: TEXT_COLOR_MUTED, marginTop: '5px' }}>
                            {activeMode === 'HR' ? `Showing ${questions.length} core behavioral prompts.` : `Deep Dive: ${questions.length} questions focused on ${selectedCompany || 'All Companies'}.`}
                        </p>
                    </div>

                    {/* Review Queue Alert (if active) */}
                    {showReviewQueue && (
                        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3e0', border: `1px solid ${DANGER_COLOR}`, borderRadius: '6px' }}>
                            <h3 style={{ color: DANGER_COLOR, fontWeight: 700, marginBottom: '5px', fontSize: '1rem' }}>⚠️ Review Mode Active</h3>
                            <p style={{ color: TEXT_COLOR_DARK, fontSize: '0.9rem', margin: 0 }}>
                                Showing **{questions.length}** items you previously marked as Low or Medium confidence.
                            </p>
                        </div>
                    )}

                    {/* Questions Accordion List */}
                    <div style={{ padding: '10px 0' }}>
                        {questions.length > 0 ? (
                            questions.map((q) => (
                                <QuestionAccordion key={q.id} q={q} />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: CARD_BG, borderRadius: '8px', border: `1px solid ${BORDER_COLOR}` }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: TEXT_COLOR_DARK, marginBottom: '10px' }}>No Questions Found</h3>
                                <p style={{ color: TEXT_COLOR_MUTED }}>
                                    Adjust your **Role Specialization** or **Company Focus** filter to find relevant questions.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default InterviewPrepPage;