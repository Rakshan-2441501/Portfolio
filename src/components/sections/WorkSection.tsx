"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const works = [
    {
        id: 1,
        title: "Christ Online",
        category: "Mobile Application",
        description: "Cross-platform mobile application for Christ University supporting Admin, Teacher, and Student roles with timetables and campus events.",
        techStack: ["Flutter", "Firebase"],
        color: "#2563eb", // blue-600
    },
    {
        id: 2,
        title: "FoodLoop",
        category: "Mobile & Web Platform",
        description: "Sustainability-focused platform enabling restaurants to sell surplus food at 50% discount. Won 2nd place in India Gateway Program (IGP).",
        techStack: ["Flutter", "Firebase", "MySQL"],
        color: "#16a34a", // green-600
    },
    {
        id: 3,
        title: "Grocery E-Commerce",
        category: "Full-Stack Web",
        description: "Full-featured grocery e-commerce platform built during an internship at Cubensquare. Features intuitive shopping and cart management.",
        techStack: ["Java", "Maven", "MySQL"],
        color: "#ea580c", // orange-600
    },
    {
        id: 4,
        title: "AgriLink (Java)",
        category: "Cross-platform Desktop",
        description: "Aimed at helping farmers efficiently utilize agricultural waste, exchange resources, and rent farming equipment. (macOS/Windows)",
        techStack: ["Java", "MySQL"],
        color: "#65a30d", // lime-600
    },
    {
        id: 5,
        title: "AgriLink (C#)",
        category: "Windows Desktop App",
        description: "Second implementation of AgriLink enhancing system performance and usability specifically for the Windows ecosystem.",
        techStack: [".NET (C#)", "MySQL"],
        color: "#0284c7", // sky-600
    },
    {
        id: 6,
        title: "LawOrbit",
        category: "Web Platform",
        description: "Legal case management platform streamlining communication for four roles: Admin, Lawyer, Client, and Clerk.",
        techStack: ["Web Tech", "DB Sync"],
        color: "#4f46e5", // indigo-600
    },
    {
        id: 7,
        title: "Online Banking",
        category: "Backend Simulation",
        description: "Banking simulation system replicating core functionalities like secure account management, balance checking, and fund transfers.",
        techStack: ["JavaCore"],
        color: "#059669", // emerald-600
    },
    {
        id: 8,
        title: "Healthcare System",
        category: "Web Application",
        description: "Platform for patients to consult doctors online and track health records seamlessly, integrated with a dummy hospital DB.",
        techStack: ["HTML/JS/PHP", "MySQL"],
        color: "#e11d48", // rose-600
    },
    {
        id: 9,
        title: "School Management",
        category: "Desktop Application",
        description: "System helping teachers manage student attendance, grading, and timetables efficiently.",
        techStack: ["C++"],
        color: "#9333ea", // purple-600
    },
    {
        id: 10,
        title: "Blossoms 2025–26",
        category: "Event Platform",
        description: "Official platform for an inter-department cultural festival at Christ University, tracking various competitions.",
        techStack: ["Web Tech"],
        color: "#c026d3", // fuchsia-600
        image: "/projects/blossoms.png",
        video: "/projects/blossoms.mov"
    },
    {
        id: 11,
        title: "InBlooms 2025–26",
        category: "Event Platform",
        description: "University-wide event platform supporting registrations and integrated payment gateway for multiple campuses.",
        techStack: ["Payments", "Web Tech"],
        color: "#db2777", // pink-600
        image: "/projects/inblooms.png",
        video: "/projects/inblooms.mov"
    },
    {
        id: 12,
        title: "InnoWave 2025–26",
        category: "Event Platform",
        description: "Flagship event site for Christ Incubation Center allowing incubatees to showcase startups and manage panel discussions.",
        techStack: ["Web Tech"],
        color: "#0d9488", // teal-600
    },
];

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
                {works.map((work, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            key={work.id}
                            className={`flex flex-col group cursor-pointer ${!isEven ? "md:mt-64" : ""
                                }`}
                            style={{ y: isEven ? y1 : y2 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div
                                className="w-full aspect-[4/5] relative overflow-hidden mb-8 bg-neutral-900 flex items-center justify-center isolation-auto border border-neutral-800/50 group-hover:border-neutral-700 transition-colors duration-500"
                            >
                                {/* Optional video or image */}
                                {"video" in work ? (
                                    <video
                                        src={(work as any).video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute w-full h-[115%] -top-[10%] left-0 object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    />
                                ) : "image" in work ? (
                                    <img
                                        src={(work as any).image}
                                        alt={work.title}
                                        className="absolute w-full h-[115%] -top-[10%] left-0 object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    />
                                ) : (
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 400 500"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="opacity-40 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    >
                                        <rect width="400" height="500" fill={work.color} opacity="0.05" />
                                        <motion.circle
                                            cx="200"
                                            cy="250"
                                            r="120"
                                            stroke={work.color}
                                            strokeWidth="1"
                                            fill="transparent"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                        />
                                        <motion.circle
                                            cx="200"
                                            cy="250"
                                            r="60"
                                            stroke={work.color}
                                            strokeWidth="0.5"
                                            fill="transparent"
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, delay: 0.4 }}
                                        />
                                        <line x1="0" y1="0" x2="400" y2="500" stroke={work.color} strokeWidth="0.5" opacity="0.3" />
                                        <line x1="400" y1="0" x2="0" y2="500" stroke={work.color} strokeWidth="0.5" opacity="0.3" />
                                    </svg>
                                )}

                                <div className="absolute top-6 right-6 flex flex-col gap-2 items-end z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {work.techStack.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-mono rounded-full border border-neutral-800">
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
                })}
            </div>
            {/* Added extra padding bottom to ensure scroll works out since the elements have huge y transforms */}
            <div className="h-40 md:h-96 w-full"></div>
        </section>
    );
}
