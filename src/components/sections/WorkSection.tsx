"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Work {
    id: number;
    title: string;
    category: string;
    description: string;
    techStack: string[];
    color: string;
    image?: string;
    screenshots?: string[];
    viewType?: "desktop" | "mobile";
}

const works: Work[] = [
    {
        id: 1,
        title: "Christ Online",
        category: "Mobile Application",
        description: "Cross-platform mobile application for Christ University supporting Admin, Teacher, and Student roles with timetables and campus events.",
        techStack: ["Flutter", "Firebase"],
        color: "#2563eb",
        image: "/projects/christ-online.png",
        screenshots: ["/projects/christ-online.png", "/projects/christ-online/1.png"],
        viewType: "mobile"
    },
    {
        id: 2,
        title: "FoodLoop",
        category: "Mobile & Web Platform",
        description: "Sustainability-focused platform enabling restaurants to sell surplus food at 50% discount. Won 2nd place in India Gateway Program (IGP).",
        techStack: ["Flutter", "Firebase", "MySQL"],
        color: "#16a34a",
        image: "/projects/foodloop.png",
        viewType: "mobile"
    },
    {
        id: 3,
        title: "Grocery E-Commerce",
        category: "Full-Stack Web",
        description: "Full-featured grocery e-commerce platform built during an internship at Cubensquare. Features intuitive shopping and cart management.",
        techStack: ["Java", "Maven", "MySQL"],
        color: "#ea580c",
        viewType: "desktop"
    },
    {
        id: 4,
        title: "AgriLink (Java)",
        category: "Cross-platform Desktop",
        description: "Aimed at helping farmers efficiently utilize agricultural waste, exchange resources, and rent farming equipment. (macOS/Windows)",
        techStack: ["Java", "MySQL"],
        color: "#65a30d",
        viewType: "desktop"
    },
    {
        id: 5,
        title: "AgriLink (C#)",
        category: "Windows Desktop App",
        description: "Second implementation of AgriLink enhancing system performance and usability specifically for the Windows ecosystem.",
        techStack: [".NET (C#)", "MySQL"],
        color: "#0284c7",
        viewType: "desktop"
    },
    {
        id: 6,
        title: "LawOrbit",
        category: "Web Platform",
        description: "Legal case management platform streamlining communication for four roles: Admin, Lawyer, Client, and Clerk.",
        techStack: ["Web Tech", "DB Sync"],
        color: "#4f46e5",
        image: "/projects/laworbit.png",
        viewType: "desktop",
        screenshots: [
            "/projects/laworbit.png",
            "/projects/laworbit/1.png",
            "/projects/laworbit/2.png",
            "/projects/laworbit/3.png",
            "/projects/laworbit/4.png",
            "/projects/laworbit/5.png",
            "/projects/laworbit/6.png",
            "/projects/laworbit/7.png",
            "/projects/laworbit/8.png",
        ]
    },
    {
        id: 7,
        title: "Online Banking",
        category: "Backend Simulation",
        description: "Banking simulation system replicating core functionalities like secure account management, balance checking, and fund transfers.",
        techStack: ["JavaCore"],
        color: "#059669",
        viewType: "desktop"
    },
    {
        id: 8,
        title: "Healthcare System",
        category: "Web Application",
        description: "Platform for patients to consult doctors online and track health records seamlessly, integrated with a dummy hospital DB.",
        techStack: ["HTML/JS/PHP", "MySQL"],
        color: "#e11d48",
        viewType: "desktop"
    },
    {
        id: 9,
        title: "School Management",
        category: "Desktop Application",
        description: "System helping teachers manage student attendance, grading, and timetables efficiently.",
        techStack: ["C++"],
        color: "#9333ea",
        viewType: "desktop"
    },
    {
        id: 10,
        title: "Blossoms 2025–26",
        category: "Event Platform",
        description: "Official platform for an inter-department cultural festival at Christ University, tracking various competitions.",
        techStack: ["Web Tech"],
        color: "#c026d3",
        viewType: "desktop",
        image: "/projects/blossoms.png",
        screenshots: [
            "/projects/blossoms.png",
            "/projects/blossoms/1.png",
            "/projects/blossoms/2.png",
            "/projects/blossoms/3.png"
        ]
    },
    {
        id: 11,
        title: "InBlooms 2025–26",
        category: "Event Platform",
        description: "University-wide event platform supporting registrations and integrated payment gateway for multiple campuses.",
        techStack: ["Payments", "Web Tech"],
        color: "#db2777",
        viewType: "desktop",
        image: "/projects/inblooms.png",
        screenshots: [
            "/projects/inblooms.png",
            "/projects/inblooms/1.png",
            "/projects/inblooms/2.png",
            "/projects/inblooms/3.png",
            "/projects/inblooms/4.png"
        ]
    },
    {
        id: 12,
        title: "InnoWave 2025–26",
        category: "Event Platform",
        description: "Flagship event site for Christ Incubation Center allowing incubatees to showcase startups and manage panel discussions.",
        techStack: ["Web Tech"],
        color: "#0d9488",
        viewType: "desktop"
    },
];

function WorkCard({ work, index, y }: { work: Work; index: number; y: any }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasMultipleImages = work.screenshots && work.screenshots.length > 1;
    const isMobile = work.viewType === "mobile";

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (work.screenshots) {
            setCurrentImageIndex((prev) => (prev + 1) % work.screenshots!.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (work.screenshots) {
            setCurrentImageIndex((prev) => (prev - 1 + work.screenshots!.length) % work.screenshots!.length);
        }
    };

    const isEven = index % 2 === 0;

    return (
        <motion.div
            className={`flex flex-col group cursor-pointer ${!isEven ? "md:mt-64" : ""}`}
            style={{ y }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={`w-full relative overflow-hidden mb-8 bg-neutral-900 rounded-2xl isolation-auto border border-neutral-800/50 group-hover:border-neutral-700 transition-all duration-500 shadow-2xl ${isMobile ? "aspect-[9/16] max-w-[340px] mx-auto" : "aspect-[16/10]"
                }`}>

                {/* Header / Frame */}
                {isMobile ? (
                    // Mobile Notch
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30 flex items-center justify-center gap-2">
                        <div className="w-8 h-1 bg-neutral-800 rounded-full" />
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    </div>
                ) : (
                    // Browser Bar
                    <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-800/50 backdrop-blur-md flex items-center px-4 gap-1.5 z-30 border-b border-neutral-700/30">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {work.screenshots ? (
                        <motion.img
                            key={currentImageIndex}
                            src={work.screenshots[currentImageIndex]}
                            alt={`${work.title} screenshot ${currentImageIndex + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05] ${isMobile ? "" : "pt-8 object-top"
                                }`}
                        />
                    ) : work.image ? (
                        <motion.img
                            src={work.image}
                            alt={work.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05] ${isMobile ? "" : "pt-8 object-top"
                                }`}
                        />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isMobile ? "" : "pt-8"}`}>
                            <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none" className="opacity-40 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000">
                                <rect width="400" height="500" fill={work.color} opacity="0.05" />
                                <circle cx="200" cy="250" r="120" stroke={work.color} strokeWidth="1" fill="transparent" />
                                <line x1="0" y1="0" x2="400" y2="500" stroke={work.color} strokeWidth="0.5" opacity="0.3" />
                                <line x1="400" y1="0" x2="0" y2="500" stroke={work.color} strokeWidth="0.5" opacity="0.3" />
                            </svg>
                        </div>
                    )}
                </AnimatePresence>

                {hasMultipleImages && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={prevImage} className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextImage} className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {hasMultipleImages && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-40 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {work.screenshots!.map((_, idx) => (
                            <div key={idx} className={`w-1 h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-3 bg-white" : "bg-white/30"}`} />
                        ))}
                    </div>
                )}

                <div className={`absolute right-4 flex flex-wrap justify-end gap-2 items-end z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[200px] ${isMobile ? "bottom-20" : "top-10"
                    }`}>
                    {work.techStack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-mono rounded-md border border-white/10">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>



            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">
                            {work.title}
                        </h3>
                        <p className="text-neutral-500 font-mono text-xs md:text-sm tracking-widest mt-3">
                            {work.category}
                        </p>
                    </div>
                    <a
                        href="https://github.com/Rakshan-2441501?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300 transform group-hover:rotate-45"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                </div>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-[90%] font-light">
                    {work.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function WorkSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);

    return (
        <section
            id="work"
            ref={containerRef}
            className="min-h-screen py-32 px-6 md:px-20 bg-background text-foreground"
        >
            <div className="mb-32 px-6">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">
                    Featured work
                </h2>
                <div className="w-full h-[1px] bg-neutral-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 w-full max-w-7xl mx-auto px-6">
                {works.map((work, index) => (
                    <WorkCard
                        key={work.id}
                        work={work}
                        index={index}
                        y={index % 2 === 0 ? y1 : y2}
                    />
                ))}
            </div>
            <div className="h-40 md:h-96 w-full"></div>
        </section>
    );
}

