'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Play, 
  Code, 
  Palette, 
  Brain, 
  Calendar, 
  MapPin,
  Star,
  ArrowUpRight,
  Sparkles,
  Zap,
  Stars,
  OrbitIcon,
  Sparkle,
  Code2,
  DiamondIcon,
  DiamondMinus,
  LucideDiamond,
  DiamondPlus,
  Cross
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  fullDescription: string;
  tags: string[];
  status: 'Live' | 'Beta' | 'Production';
  year: string;
  timeline: string;
  role: string;
  challenges: string[];
  outcomes: string[];
  github?: string;
  demo?: string;
}

// Add this hook before the Portfolio component
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Seeded random number generator with fixed precision
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return Number((x - Math.floor(x)).toFixed(4));
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skillCategories = [
    {
      name: "Machine Learning",
      icon: Brain,
      description: "Building intelligent systems that learn and adapt",
      skills: [
        { name: "TensorFlow", level: 90, category: "Framework" },
        { name: "PyTorch", level: 90, category: "Framework" },
        { name: "Scikit-learn", level: 85, category: "Library" },
        { name: "MLOps", level: 80, category: "DevOps" },
        { name: "Computer Vision", level: 90, category: "Specialty" },
        { name: "NLP", level: 82, category: "Specialty" }
      ]
    },
    {
      name: "Engineering",
      icon: Code,
      description: "Full-stack development with modern architectures",
      skills: [
        { name: "TypeScript", level: 92, category: "Language" },
        { name: "Python", level: 95, category: "Language" },
        { name: "React/Next.js", level: 90, category: "Framework" },
        { name: "Node.js", level: 85, category: "Runtime" },
        { name: "Docker", level: 80, category: "DevOps" },
        { name: "AWS", level: 75, category: "Cloud" }
      ]
    },
    {
      name: "Design",
      icon: Palette,
      description: "Human-centered design with focus on accessibility",
      skills: [
        { name: "Figma", level: 88, category: "Tool" },
        { name: "Design Systems", level: 85, category: "Process" },
        { name: "User Research", level: 80, category: "Research" },
        { name: "Prototyping", level: 90, category: "Process" },
        { name: "Accessibility", level: 85, category: "Standards" },
        { name: "Animation", level: 82, category: "Motion" }
      ]
    }
  ];

  const projects = [
    {
      id: 1,
      title: "Ether Notes",
      type: "AI + Full Stack",
      description: "An AI-powered, self-organizing note taker that intelligently categorizes your notes and securely saves them to the cloud.",
      fullDescription: "Ether Notes is an AI-powered browser extension and web app that highlights, saves, and intelligently organizes web content for seamless access and smart search across devices.",
      tags: ["Next.js", "FastAPI", "PostgreSQL", "AI", "Full Stack"],
      status: "Beta" as const,
      year: "2025",
      timeline: "2 months",
      role: "Lead Engineer & UX Researcher",
      challenges: [
        "Complex Content Routing: Deciding when to append vs. create new notes required sophisticated prompt engineering and multiple LLM decision frameworks",
        "Real-time Performance: Balancing AI intelligence with speed - optimized from 3 API calls to 1 combined call",
        "Cross-Website Compatibility: Making text selection work reliably across different website structures and CSS frameworks",
        "Semantic Understanding: Teaching AI to understand user intent vs. just content similarity - breakthrough came with weighted decision making",
        "Chrome Extension Complexity: Managing state between content scripts, background workers, and popup interfaces"
      ],
      outcomes: [
        "AI-First Architecture: Built a system where AI makes intelligent decisions without human intervention",
        "50% API Efficiency Gain: Optimized from multiple LLM calls to single combined analysis",
        "Universal Compatibility: Works on any website with intelligent text selection and positioning",
        "Smart Evolution: Topics can evolve (e.g., Apple Stock → Tech Stock Analysis) based on user behavior",
        "Production-Ready: Full authentication, error handling, and scalable microservices architecture",
        "Intelligent Chunking: Handles large content with semantic splitting and cached embeddings"
      ]
    },
    {
      id: 2,
      title: "DeepVoxel: A 3D MRI Visualizer for Neural Networks",
      type: "DL + Interactive Design",
      description: "Real-time visualization of 3D MRI scans and segmentation with elegant animations and intuitive visulaizations for Medical Analysis.",
      fullDescription: "An advanced web application that provides real-time visualization of medical semantic-segmentation. Built with Next.js and Three.js for in-browser model viewing, D3 for dynamic visualizations, and ONNX for seamless backend integation.",
      tags: ["Next.js", "Three.js", "PyTorch", "ONNX", "Flask"],
      status: "Live" as const,
      year: "2024",
      timeline: "3 months",
      role: "Full Stack DL Engineer & Designer",
      challenges: [
        "Real-time performance optimization for complex visualizations",
        "Creating intuitive interfaces for complex Deep Learning concepts",
        "Cross-browser WebGL compatibility"
      ],
      outcomes: [
        "Real-time 3D model viewing and generating segmentation visualizations.",
        "Lightweight segmentation with 50% inference time reduction on low-power GPUs"
      ],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    // {
    //   id: 3,
    //   title: "Predictive Analytics Dashboard",
    //   type: "Full Stack + ML",
    //   description: "End-to-end platform for time series forecasting with beautiful data storytelling and interactive model exploration.",
    //   fullDescription: "A comprehensive analytics platform that combines advanced time series forecasting with intuitive data visualization. Features custom Prophet models, real-time data ingestion, and interactive exploration tools.",
    //   tags: ["Prophet", "FastAPI", "Next.js", "D3", "PostgreSQL"],
    //   status: "Production" as const,
    //   year: "2023",
    //   timeline: "8 months",
    //   role: "Technical Lead & Product Designer",
    //   challenges: [
    //     "Handling high-frequency time series data",
    //     "Creating intuitive ML model explanations",
    //     "Scaling to enterprise-level data volumes"
    //   ],
    //   outcomes: [
    //     "Improved forecast accuracy by 35%",
    //     "Reduced decision-making time by 60%",
    //     "Processing 1M+ data points daily"
    //   ]
    // }
  ];

  const experience = [
    {
      company: "Ether",
      role: "Full Stack Engineer",
      period: "2025 - Present",
      description: "Built AI-powered knowledge management system with Chrome extension and web app. Developed scalable backend and integrated OpenAI for content analysis.",
      current: true
    },
    {
      "company": "North South University",
      "role": "Researcher, Computer Vision & Deep Learning",
      "period": "2024 - 2025",
      "description": "Conducted research on knowledge distillation, domain adaptation, and reinforcement learning in transformer models for computer vision tasks. Developed deep learning architectures to improve model efficiency and adaptability.",
      "current": false
    }    
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative overflow-x-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        
        {/* Parallax gradient orb (scroll-based) */}
        <div 
          className="absolute left-1/2 top-0 w-[36rem] h-[36rem] -translate-x-1/2 rounded-full blur-3xl transition-transform duration-700 ease-out bg-gradient-to-tr from-zinc-400/5 via-zinc-300/5 to-zinc-200/5 shadow-2xl"
          style={{
            transform: `translate(-50%, ${scrollY * 0.2}px)`
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-zinc-400/5 to-zinc-300/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-zinc-300/5 to-zinc-200/5 rounded-full blur-xl animate-bounce" />
        
        {/* Additional floating orbs */}
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-zinc-400/3 to-zinc-300/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-r from-zinc-300/3 to-zinc-200/3 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-2/3 w-36 h-36 bg-gradient-to-r from-zinc-400/3 to-zinc-200/3 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Ethereal background effects */}
        <div className="absolute inset-0">
          {/* Soft white glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.02)_0%,transparent_100%)]" />
          
          {/* Subtle stars - only render on desktop */}
          {!isMobile && (
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => {
                const left = seededRandom(i * 1.1) * 100;
                const top = seededRandom(i * 1.2) * 100;
                const delay = seededRandom(i * 1.3) * 5;
                const duration = 80 + seededRandom(i * 1.4) * 20;
                const opacity = 0.1 + seededRandom(i * 1.5) * 0.4;
                const scale = 0.5 + seededRandom(i * 1.6) * 0.5;

                return (
                  <div
                    key={i}
                    className="falling-star fixed"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`,
                      opacity,
                      transform: `scale(${scale})`
                    }}
                  />
                );
              })}
            </div>
          )}
          
          {/* Vertical gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        </div>
      </div>

      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900/50 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-zinc-600">&lt;</span>
              <span className="bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 bg-clip-text text-transparent glow-x ripple-portfolio sliding-glow">
                portfolio
              </span>
              <span className="text-zinc-600">/&gt;</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {['Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-zinc-100 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-zinc-400 hover:text-zinc-100"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={isMenuOpen}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 max-h-0"
          enterTo="opacity-100 max-h-64"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 max-h-64"
          leaveTo="opacity-0 max-h-0"
        >
          <div className="md:hidden px-6 py-4 border-t border-zinc-900/50 bg-black/90 backdrop-blur-xl">
            <div className="space-y-4">
              {['Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-zinc-400 hover:text-zinc-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </Transition>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-zinc-900/50 text-zinc-300 border-zinc-800/50 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse mr-2" />
                  Available for new opportunities
                </Badge>
                
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-zinc-100">Imroz</span>
                  <span className="block bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 bg-clip-text text-transparent">
                    Eshan
                  </span>
                  {/* <span className="block text-zinc-400">experiences</span> */}
                </h1>
                
                <div className="space-y-4">
                  <p className="text-xl text-zinc-300 leading-relaxed">
                    Machine Learning Engineer <span className="font-bold text-white glow-x">×</span> Software Architect <span className="font-bold text-white glow-x">×</span> UX Designer
                  </p>
                  <p className="text-lg text-zinc-500">
                  Bringing structure to code, soul to design, and intelligence to everything I build.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-zinc-100 text-black hover:bg-zinc-200 group"
                >
                  Explore My Work
                  <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setIsContactModalOpen(true)}
                  className="border-zinc-800 text-zinc-300 hover:bg-zinc-900/50 group"
                >
                  Get In Touch
                  <Mail size={16} className="ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Enhanced Hero Visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <Card className="relative w-full h-full bg-zinc-900/30 border-zinc-800/30 backdrop-blur-2xl overflow-hidden group hover:border-zinc-700/30 transition-all duration-500 rounded-3xl">
                  <CardContent className="p-0 h-full relative">
                    {/* Clean card: no overlays, gradients, or extra backgrounds */}
                    {/* Tech icons */}
                    <div className="absolute top-6 left-6 w-12 h-12 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 hover:border-zinc-700/40 hover:bg-zinc-900/40">
                      <div className="relative">
                        <Brain size={16} className="text-zinc-200" />
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 w-12 h-12 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-700 hover:border-zinc-700/40 hover:bg-zinc-900/40">
                      <div className="relative">
                        <Code size={16} className="text-zinc-200" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 w-12 h-12 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-900 hover:border-zinc-700/40 hover:bg-zinc-900/40">
                      <div className="relative">
                        <Palette size={16} className="text-zinc-200" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-700 hover:border-zinc-700/40 hover:bg-zinc-900/40">
                      <div className="relative">
                        <Sparkles size={16} className="text-zinc-200" />
                      </div>
                    </div>
                    {/* Central element */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-24 h-24 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/30 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-zinc-500/10 transition-all duration-500 hover:border-zinc-700/40 hover:bg-zinc-900/40">
                        <span className="text-3xl font-mono text-zinc-200">&lt;/&gt;</span>
                      </div>
                    </div>

                    {/* Twinkling icons inside the hero card */}
                    <div className="pointer-events-none">
                      <Sparkle 
                        size={16} 
                        className={`text-zinc-400/70 absolute animate-twinkle1 ${
                          isMobile ? 'left-[5%] top-[50%]' : 'left-5 top-40'
                        }`} 
                      />
                      <Code2 
                        size={16} 
                        className={`text-zinc-400/70 absolute animate-twinkle2 ${
                          isMobile ? 'right-[50%] bottom-[0%]' : 'right-45 top-80'
                        }`} 
                      />
                      <DiamondIcon 
                        size={16} 
                        className={`text-zinc-400/70 absolute animate-twinkle3 ${
                          isMobile ? 'right-[50%] top-[0%]' : 'right-45 top-1'
                        }`} 
                      />
                      <Zap 
                        size={16} 
                        className={`text-zinc-400/70 absolute animate-twinkle4 ${
                          isMobile ? 'right-[5%] top-[50%]' : 'right-5 top-40'
                        }`} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            {/* <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Bridging the gap between artificial intelligence, robust engineering, and human-centered design
            </p> */}
          </div>
          
          <Tabs defaultValue="machine-learning" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-zinc-900/50 border border-zinc-800/50">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.name.toLowerCase().replace(' ', '-')}
                  value={category.name.toLowerCase().replace(' ', '-')}
                  className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
                >
                  <category.icon size={16} className="mr-2" />
                    <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
              {skillCategories.map((category, idx) => (
              <TabsContent
                key={category.name.toLowerCase().replace(' ', '-')}
                value={category.name.toLowerCase().replace(' ', '-')}
                className="space-y-0"
              >
                <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                  <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-3 bg-zinc-800/50 rounded-lg">
                            <category.icon size={24} className="text-zinc-300" />
                          </div>
                    <div>
                            <h3 className="text-2xl font-bold text-zinc-100">{category.name}</h3>
                            <p className="text-zinc-400">{category.description}</p>
                          </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIdx) => (
                        <div key={skillIdx} className="space-y-2">
                          <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-zinc-300">{skill.name}</span>
                              <Badge variant="secondary" className="bg-zinc-800/50 text-zinc-400 text-xs">
                              {skill.category}
                              </Badge>
                          </div>
                            <div className="w-full bg-zinc-800/50 h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </TabsContent>
              ))}
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              A showcase of interdisciplinary work spanning AI, engineering, and design
            </p>
          </div>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group bg-zinc-900/30 border-zinc-800/50 backdrop-blur-xl hover:border-zinc-700/50 transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-2 relative aspect-[4/3] lg:aspect-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 via-zinc-900/30 to-zinc-950/50 flex items-center justify-center group-hover:from-zinc-700/50 transition-all duration-500">
                        <div className="text-6xl text-zinc-600/30 font-mono group-hover:text-zinc-500/40 group-hover:scale-110 transition-all duration-500">
                          {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute top-4 right-4 flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full animate-pulse ${
                            project.status === 'Live' ? 'bg-emerald-400' :
                          project.status === 'Beta' ? 'bg-yellow-400' :
                          'bg-blue-400'
                        }`} />
                          <Badge variant="secondary" className="bg-zinc-800/80 text-zinc-300 text-xs">
                            {project.status}
                          </Badge>
                      </div>
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play size={16} className="text-zinc-400" />
                          <span className="text-xs text-zinc-400">View Details</span>
                      </div>
                    </div>
                  </div>
                  
                    <div className="lg:col-span-3 p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                          {project.type}
                          </Badge>
                        <span className="text-sm text-zinc-500">{project.year}</span>
                      </div>
                      
                        <h3 className="text-3xl font-bold text-zinc-100 group-hover:text-zinc-200 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                        <p className="text-lg text-zinc-400 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                            <Badge
                            key={tagIndex}
                              variant="secondary"
                              className="bg-zinc-800/50 text-zinc-300 border-zinc-700/50 hover:bg-zinc-700/50 transition-colors duration-300"
                          >
                            {tag}
                            </Badge>
                        ))}
                      </div>
                    </div>
                    
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" className="text-zinc-400 hover:text-zinc-100 p-0 h-auto font-medium group/btn">
                          View Details
                          <ChevronRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                        {project.github && (
                          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-300">
                            <Github size={16} />
                          </Button>
                        )}
                        {project.demo && (
                          <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-300">
                            <ArrowUpRight size={16} />
                          </Button>
                        )}
                  </div>
                </div>
              </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  Passionate about the intersection of artificial intelligence, 
                  elegant engineering, and human-centered design.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-zinc-500" />
                  <span className="text-zinc-300">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar size={18} className="text-zinc-500" />
                  <span className="text-zinc-300">Available for consulting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-zinc-500" />
                  <Button 
                    variant="link"
                    onClick={() => setIsContactModalOpen(true)}
                    className="text-zinc-300 hover:text-zinc-100 p-0 h-auto underline underline-offset-4"
                  >
                    imrozeshan@gmail.com
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="story" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-900/50 border border-zinc-800/50">
                  <TabsTrigger value="story" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Story</TabsTrigger>
                  <TabsTrigger value="experience" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Experience</TabsTrigger>
                  <TabsTrigger value="values" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100">Values</TabsTrigger>
                </TabsList>
                
                <TabsContent value="story" className="space-y-0">
                  <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                    <CardContent className="p-8 space-y-6 text-zinc-300 leading-relaxed">
                    <p>
                    I am currently an undergraduate student at North South University, pursuing a degree in Computer Science and Engineering.
                  </p>
                  <p>
                    My journey began with a fascination for both the mathematical elegance of machine learning and the psychology behind great design. This unique blend shapes my approach to building intelligent systems that are not only powerful but truly user-friendly.
                  </p>
                  <p>
                    I believe the future belongs to those who can bridge technology with human experience. My work focuses on creating solutions that are accessible, elegant, and genuinely helpful for people solving real-world problems.
                  </p>
                  <p>
                    Outside of coding and design, I am passionate about gaming, which inspires creativity, problem-solving, and engagement.
                  </p>
                  <p>
                    When I'm not working on projects, I enjoy spending time with family, gaming, and staying curious about the latest in AI.
                  </p>

                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="experience" className="space-y-0">
                  <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        {experience.map((exp, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                              exp.current ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-zinc-100">{exp.role}</h4>
                                {exp.current && (
                                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mb-3">
                                <span className="text-zinc-300 font-medium">{exp.company}</span>
                                <Separator orientation="vertical" className="h-4 bg-zinc-700" />
                                <span className="text-sm text-zinc-500">{exp.period}</span>
                              </div>
                              <p className="text-zinc-400 text-sm leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="values" className="space-y-0">
                  <Card className="bg-zinc-900/50 border-zinc-800/50 backdrop-blur-xl">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Human-Centered AI",
                            description: "Technology should augment human capabilities, not replace human judgment. Every AI system I build prioritizes transparency and user agency."
                          },
                          {
                            title: "Inclusive Design",
                            description: "Great design works for everyone. I ensure accessibility is built into every interface from the ground up, not bolted on as an afterthought."
                          },
                          {
                            title: "Continuous Learning",
                            description: "The intersection of AI, engineering, and design evolves rapidly. I'm committed to staying at the forefront of all three disciplines."
                          },
                          {
                            title: "Open Collaboration",
                            description: "The best solutions emerge from diverse perspectives. I actively contribute to open source and believe in sharing knowledge freely."
                          }
                        ].map((value, index) => (
                          <div key={index} className="space-y-3">
                            <h4 className="font-semibold text-zinc-100">{value.title}</h4>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                              {value.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setIsContactModalOpen(true)}
              className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 group"
            >
              Start a Conversation
              <Mail size={16} className="ml-2 group-hover:scale-110 transition-transform" />
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/50"
                onClick={() => window.open('https://github.com/Yok4ai', '_blank')}
              >
                <Github size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/50"
                onClick={() => window.open('https://www.linkedin.com/in/imroz-eshan/', '_blank')}
              >
                <Linkedin size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-zinc-500">
            <p className="font-mono text-sm">
              © Imroz Eshan • 2025 — All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <Transition appear show={selectedProject !== null} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedProject(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 shadow-2xl transition-all">
                  {selectedProject && (
                    <div className="p-8 max-h-[80vh] overflow-y-auto">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                              {selectedProject.type}
                            </Badge>
                            <Badge className={`${
                              selectedProject.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              selectedProject.status === 'Beta' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                              'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                              {selectedProject.status}
                            </Badge>
                          </div>
                          <Dialog.Title className="text-3xl font-bold text-zinc-100">
                            {selectedProject.title}
                          </Dialog.Title>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProject(null)}
                          className="text-zinc-400 hover:text-zinc-100"
                        >
                          <X size={20} />
                        </Button>
                      </div>

                      {/* Project Details */}
                      <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50">
                          <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Overview</TabsTrigger>
                          <TabsTrigger value="process" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Process</TabsTrigger>
                          <TabsTrigger value="results" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Results</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-6">
                          <p className="text-lg text-zinc-300 leading-relaxed">
                              {selectedProject.fullDescription}
                            </p>
                            
                          <div className="grid md:grid-cols-3 gap-6">
                            <Card className="bg-zinc-800/30 border-zinc-700/50">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-zinc-200 mb-2">Timeline</h4>
                                <p className="text-zinc-400">{selectedProject.timeline}</p>
                              </CardContent>
                            </Card>
                            <Card className="bg-zinc-800/30 border-zinc-700/50">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-zinc-200 mb-2">Role</h4>
                                <p className="text-zinc-400">{selectedProject.role}</p>
                              </CardContent>
                            </Card>
                            <Card className="bg-zinc-800/30 border-zinc-700/50">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-zinc-200 mb-2">Year</h4>
                                <p className="text-zinc-400">{selectedProject.year}</p>
                              </CardContent>
                            </Card>
                            </div>
                            
                            <div className="space-y-3">
                            <h4 className="font-semibold text-zinc-200">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map((tag: string, index: number) => (
                                <Badge
                                    key={index}
                                  variant="secondary"
                                  className="bg-zinc-800/50 text-zinc-300 border-zinc-700/50"
                                  >
                                    {tag}
                                </Badge>
                                ))}
                              </div>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="process" className="space-y-6">
                          <Card className="bg-zinc-800/30 border-zinc-700/50">
                            <CardHeader>
                              <CardTitle className="text-zinc-200">Key Challenges</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {selectedProject.challenges.map((challenge: string, index: number) => (
                                    <li key={index} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-zinc-500 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-zinc-300">{challenge}</span>
                                    </li>
                                  ))}
                                </ul>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="results" className="space-y-6">
                          <Card className="bg-zinc-800/30 border-zinc-700/50">
                            <CardHeader>
                              <CardTitle className="text-zinc-200">Key Outcomes</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {selectedProject.outcomes.map((outcome: string, index: number) => (
                                  <li key={index} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-zinc-300">{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                      
                      {/* Action Buttons */}
                      <div className="flex justify-between items-center pt-6 border-t border-zinc-800/50">
                        <div className="flex gap-3">
                          {selectedProject.github && (
                            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/50">
                              <Github size={16} className="mr-2" />
                              View Code
                            </Button>
                          )}
                          {selectedProject.demo && (
                            <Button className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200">
                              <ArrowUpRight size={16} className="mr-2" />
                              Live Demo
                            </Button>
                          )}
                            </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Contact Modal */}
      <Transition appear show={isContactModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsContactModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 shadow-2xl transition-all">
                  <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                      <Dialog.Title className="text-2xl font-bold text-zinc-100">
                      Let's Connect
                    </Dialog.Title>
                      <Button
                        variant="ghost"
                        size="sm"
                      onClick={() => setIsContactModalOpen(false)}
                        className="text-zinc-400 hover:text-zinc-100"
                    >
                      <X size={20} />
                      </Button>
                  </div>
                  
                  <div className="space-y-6">
                      <p className="text-zinc-300">
                      Ready to collaborate on something amazing? Let's discuss your project.
                    </p>
                    
                    <div className="space-y-4">
                        <Button 
                          className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 group justify-between"
                          onClick={() => window.open('mailto:imrozeshan@gmail.com')}
                        >
                          <div className="flex items-center">
                            <Mail size={18} className="mr-3" />
                        <span>Email Me</span>
                          </div>
                          <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant="outline" 
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 justify-center"
                            onClick={() => window.open('https://github.com/Yok4ai', '_blank')}
                          >
                            <Github size={18} className="mr-2" />
                            GitHub
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 justify-center"
                            onClick={() => window.open('https://www.linkedin.com/in/imroz-eshan/', '_blank')}
                          >
                            <Linkedin size={18} className="mr-2" />
                            LinkedIn
                          </Button>
                      </div>
                    </div>
                    
                      <div className="text-center">
                        <Badge variant="secondary" className="bg-zinc-800/50 text-zinc-400">
                      Usually respond within 24 hours
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Portfolio;