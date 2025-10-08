"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
// Using lucide-react for professional icons
import { 
  Zap, 
  Code, 
  LayoutGrid, 
  PenTool, 
  TrendingUp, 
  Search, 
  X, 
  Rocket, 
  Shield, 
  Server, 
  Palette, 
  FileText,
  ChevronDown,
  ExternalLink,
  Github,
  CheckCircle
} from "lucide-react";

// ===================================
// Design Constants (Tailwind Friendly)
// ===================================
const PRIME_COLOR = "#007AFF"; // Modern, deep blue (Equivalent to blue-600/700)
const ACCENT_COLOR = "#10b981"; // Vibrant Green (Equivalent to emerald-500/600)
const BG_COLOR_LIGHT = "#f9fafb"; // Equivalent to gray-50
const CARD_BG = "#ffffff"; // White
const TEXT_COLOR_DARK = "#1f2937"; // Equivalent to gray-800

// ===================================
// Type Definitions & Trending Mock Data
// ===================================

type ToolCategory = "Coding" | "Design" | "Productivity" | "Writing" | "Career" | "DevOps" | "All";

interface AITool {
  id: number;
  name: string;
  description: string;
  category: ToolCategory;
  link: string;
  icon: React.ElementType; 
  // New detailed fields for the modal content
  features: string[];
  pricing: string;
  integration?: string;
}

const CATEGORIES: { name: ToolCategory; icon: React.ElementType }[] = [
  { name: "All", icon: LayoutGrid },
  { name: "Coding", icon: Code },
  { name: "Design", icon: Palette },
  { name: "Productivity", icon: Zap },
  { name: "Writing", icon: FileText },
  { name: "Career", icon: TrendingUp },
  { name: "DevOps", icon: Server },
];

const MOCK_TOOLS: AITool[] = [
  {
    id: 1,
    name: "GitHub Copilot",
    description: "Your AI pair programmer. Suggests code, functions, and tests in real-time.",
    category: "Coding",
    link: "https://copilot.github.com/",
    icon: Code,
    features: ["Line-by-line completion", "Generate entire functions", "Supports dozens of languages (Python, JS, etc.)"],
    pricing: "Paid Subscription ($10/month), Free for verified students/teachers",
    integration: "VS Code, JetBrains IDEs, Neovim",
  },
  {
    id: 2,
    name: "Midjourney/DALL-E",
    description: "Generate high-fidelity, photorealistic images and concepts from text prompts.",
    category: "Design",
    link: "https://www.midjourney.com/",
    icon: Palette,
    features: ["Text-to-Image Generation", "Inpainting & Outpainting", "Aspect Ratio Control"],
    pricing: "Subscription required (starts at $10/month)",
  },
  {
    id: 3,
    name: "Notion AI",
    description: "Automate notes, summarize documents, and draft content directly within your workspace.",
    category: "Productivity",
    link: "https://www.notion.so/product/ai",
    icon: Zap,
    features: ["Summarization & Action Items", "Blog post drafting", "Meeting memo creation"],
    pricing: "Add-on to existing Notion plans",
    integration: "Native to Notion workspace",
  },
  {
    id: 4,
    name: "GPT-4 (API)",
    description: "The leading large language model for advanced content creation, translation, and analysis.",
    category: "Writing",
    link: "https://openai.com/gpt-4",
    icon: FileText,
    features: ["Creative writing & editing", "Complex data analysis", "Multi-modal input (text/image)"],
    pricing: "Pay-as-you-go via API token usage",
  },
  {
    id: 5,
    name: "Vertex InterviewPrep",
    description: "Simulates mock interviews and provides real-time feedback on structure and delivery.",
    category: "Career",
    link: "/interview",
    icon: TrendingUp,
    features: ["Behavioral question practice", "Technical coding challenges", "Tone and confidence analysis"],
    pricing: "Included in Vertex Pro subscription (Free tier available)",
  },
  {
    id: 6,
    name: "Terraform AI",
    description: "Write and manage Infrastructure as Code (IaC) faster with AI-generated templates.",
    category: "DevOps",
    link: "https://www.hashicorp.com/products/terraform",
    icon: Server,
    features: ["HCL generation from English", "Drift detection alerts", "Security policy enforcement"],
    pricing: "Free for open-source, Paid for team/enterprise",
    integration: "AWS, Azure, Google Cloud",
  },
  // Added a couple more for better variety in the grid
  {
    id: 7,
    name: "Jira Automation",
    description: "AI-driven project management to auto-assign tasks and forecast sprint completion.",
    category: "Productivity",
    link: "#",
    icon: Rocket,
    features: ["Automatic ticket triaging", "Sprint goal projection", "Burndown chart analysis"],
    pricing: "Included in Jira Cloud Premium plans",
  },
  {
    id: 8,
    name: "Code Review Bot",
    description: "Analyzes pull requests for bugs, security issues, and style guide violations automatically.",
    category: "Coding",
    link: "#",
    icon: Shield,
    features: ["Security vulnerability scanning", "Code complexity metric scoring", "Suggesting refactorings"],
    pricing: "Free trial, then per-developer license",
    integration: "GitHub, GitLab, Bitbucket",
  },
];

// ===================================
// New Component: Detail Modal
// ===================================

const AIToolDetailModal: React.FC<{
  tool: AITool;
  onClose: () => void;
}> = ({ tool, onClose }) => {
  const Icon = tool.icon;
  
  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);


  return (
    <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl m-4 p-8 w-full max-w-2xl transform transition-all duration-300 scale-100"
        style={{ color: TEXT_COLOR_DARK }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex justify-between items-start mb-4 border-b pb-4">
          <div className="flex items-center">
            <Icon className="w-8 h-8 mr-4" style={{ color: PRIME_COLOR }} />
            <h2 className="text-3xl font-bold">{tool.name}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">{tool.description}</p>

        {/* --- Key Information Grid --- */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6 p-4 rounded-lg" style={{backgroundColor: BG_COLOR_LIGHT}}>
            <div>
                <span className="font-semibold text-gray-500 block">Category</span>
                <span className="font-medium text-lg">{tool.category}</span>
            </div>
            <div>
                <span className="font-semibold text-gray-500 block">Pricing</span>
                <span className="font-medium text-lg">{tool.pricing}</span>
            </div>
            {tool.integration && (
                <div className="col-span-2">
                    <span className="font-semibold text-gray-500 block">Integrations</span>
                    <span className="font-medium text-lg">{tool.integration}</span>
                </div>
            )}
        </div>
        
        {/* --- Key Features --- */}
        <h3 className="text-xl font-bold mt-4 mb-3" style={{ color: PRIME_COLOR }}>Key Features</h3>
        <ul className="space-y-2 mb-6">
          {tool.features.map((feature, index) => (
            <li key={index} className="flex items-start text-base text-gray-700">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: ACCENT_COLOR }} />
              {feature}
            </li>
          ))}
        </ul>

        {/* --- Action Button --- */}
        <div className="pt-4 border-t">
          <Link href={tool.link} passHref legacyBehavior>
            <a 
              className="
                inline-flex items-center justify-center w-full px-6 py-3 text-lg font-medium rounded-lg
                text-white transition-colors duration-200 shadow-md
                hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
              "
              style={{ backgroundColor: PRIME_COLOR }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to {tool.name} Website <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};


// ===================================
// Components (Modified ToolCard)
// ===================================

/**
 * Tool Card Component (Modified to use onClick for modal)
 */
const ToolCard: React.FC<{ tool: AITool; onExplore: (tool: AITool) => void }> = ({ tool, onExplore }) => {
  const Icon = tool.icon;
  
  const categoryColor = useMemo(() => {
    switch (tool.category) {
      case "Coding": return "text-blue-600 bg-blue-100";
      case "Design": return "text-purple-600 bg-purple-100";
      case "Productivity": return "text-yellow-600 bg-yellow-100";
      case "Writing": return "text-pink-600 bg-pink-100";
      case "Career": return "text-emerald-600 bg-emerald-100";
      case "DevOps": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  }, [tool.category]);

  return (
    <div
      className="
        bg-white p-6 rounded-xl shadow-lg border border-gray-100
        transition-all duration-300 transform
        hover:shadow-2xl hover:-translate-y-1 
        flex flex-col justify-between cursor-pointer
      "
      style={{ minHeight: "220px", color: TEXT_COLOR_DARK }}
      onClick={() => onExplore(tool)} // <-- New behavior: Open modal
    >
      <div>
        <div className="flex items-start justify-between">
          <Icon className="w-8 h-8" style={{ color: PRIME_COLOR }} />
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
            {tool.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mt-3 mb-2">{tool.name}</h3>
        <p className="text-sm text-gray-500 mb-4">{tool.description}</p>
      </div>
      <button 
        className="
          inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg
          text-white transition-colors duration-200
          hover:bg-blue-800 focus:outline-none
        "
        style={{ backgroundColor: PRIME_COLOR }}
        // The click handler is on the parent div now, but keeping the button for style/aesthetics
      >
        View Details
      </button>
    </div>
  );
};

// Filter Sidebar (No change needed)
const FilterSidebar: React.FC<{
  selectedCategory: ToolCategory;
  onSelectCategory: (category: ToolCategory) => void;
}> = ({ selectedCategory, onSelectCategory }) => {
    // ... (FilterSidebar implementation remains the same)
    return (
        <div 
            className="
                bg-white p-6 rounded-xl shadow-lg border border-gray-100
                md:sticky md:top-20 h-fit
            "
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: PRIME_COLOR }}>Filter by Category</h3>
          <nav className="space-y-2">
            {CATEGORIES.map((cat) => {
              const isSelected = cat.name === selectedCategory;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => onSelectCategory(cat.name)}
                  className={`
                    w-full flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-150
                    ${isSelected 
                        ? `bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600`
                        : `text-gray-600 hover:bg-gray-50 hover:text-gray-800`
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {cat.name}
                </button>
              );
            })}
          </nav>
        </div>
    );
};


// ===================================
// Main Page Component
// ===================================

export default function AIToolsExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>("All");
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null); // <-- New state for modal

  // --- Filtering Logic (Memoized for performance) ---
  const filteredTools = useMemo(() => {
    return MOCK_TOOLS.filter(tool => {
      const categoryMatch = selectedCategory === "All" || tool.category === selectedCategory;
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.category.toLowerCase().includes(searchLower);

      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategorySelect = useCallback((category: ToolCategory) => {
    setSelectedCategory(category);
  }, []);

  const handleExploreClick = useCallback((tool: AITool) => {
    setSelectedTool(tool); // Show the modal with the tool content
  }, []);


  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG_COLOR_LIGHT }}>
    {/* --- Navbar --- */}
<nav className="flex justify-between items-center px-8 py-4 text-white shadow-md" style={{ backgroundColor: PRIME_COLOR }}>
    <h1 className="text-2xl font-bold">VerteX</h1>
    <div className="hidden md:flex space-x-8">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/roadmaps" className="hover:underline">Roadmaps</Link>
        <Link href="/ai" className="font-bold underline">AI tools</Link> {/* Changed from /tools to /ai for consistency */}
        <Link href="/internships" className="hover:underline">Internships</Link>
        <Link href="/resume" className="hover:underline">Resume Builder</Link>
        <Link href="/interview" className="hover:underline">Interview Prep</Link>
        <Link href="/projects" className="hover:underline">Projects</Link>
        <Link href="/hackathons" className="hover:underline">Hackathons</Link>
        <Link href="/certifications" className="hover:underline">Certifications</Link>
        <Link href="/cheatsheets" className="hover:underline">Cheat Sheets</Link>
    </div>
</nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* --- Hero Section --- */}
        <header className="text-center mb-16">
          <div 
            className="inline-block px-4 py-1 text-sm font-medium rounded-full mb-3"
            style={{ color: PRIME_COLOR, backgroundColor: 'rgba(0, 122, 255, 0.1)' }}
          >
            AI-Powered Career Tools
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: TEXT_COLOR_DARK }}>
            Explore the Future with <span style={{ color: PRIME_COLOR }}>AI Tools</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Find the perfect AI assistant for **coding, design, productivity, and your job search**. Vertex helps you streamline your career growth with the best tools available.
          </p>
        </header>
        
        {/* --- Search & Filter Controls --- */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search tools by name, description, or category (e.g., Copilot, Notion, IaC)..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="
                        w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150
                    "
                    style={{ color: TEXT_COLOR_DARK }}
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Mobile Category Dropdown */}
            <div className="md:hidden">
                <label htmlFor="mobile-category" className="sr-only">Filter Category</label>
                <div className="relative">
                    <select
                        id="mobile-category"
                        value={selectedCategory}
                        onChange={(e) => handleCategorySelect(e.target.value as ToolCategory)}
                        className="
                            appearance-none w-full py-3 pl-4 pr-10 border border-gray-300 rounded-xl shadow-sm 
                            bg-white text-gray-700 font-medium
                        "
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name} Tools</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
            </div>
        </div>

        {/* --- Main Content Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filter */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar 
                selectedCategory={selectedCategory} 
                onSelectCategory={handleCategorySelect} 
            />
          </div>

          {/* Tools Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6" style={{ color: TEXT_COLOR_DARK }}>
                {selectedCategory === "All" ? "All Trending AI Tools" : `${selectedCategory} Tools`} ({filteredTools.length})
            </h2>

            {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} onExplore={handleExploreClick} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-4 bg-white rounded-xl shadow-lg border border-gray-100">
                    <p className="text-xl font-medium text-gray-700">
                        No AI tools found matching your criteria.
                    </p>
                    <p className="text-gray-500 mt-2">
                        Try a different search term or select "**All**" categories.
                    </p>
                    <button 
                        onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                        className="mt-6 px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors duration-200"
                        style={{ backgroundColor: ACCENT_COLOR }}
                    >
                        Reset Filters
                    </button>
                </div>
            )}
          </div>
        </div>
      </main>

      {/* --- Detail Modal Render --- */}
      {selectedTool && (
        <AIToolDetailModal 
          tool={selectedTool} 
          onClose={() => setSelectedTool(null)} 
        />
      )}
    </div>
  );
}