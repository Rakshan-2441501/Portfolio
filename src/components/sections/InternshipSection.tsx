"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const internshipDetails = [
    {
        role: "Java Fullstack Developer",
        company: "CubenSquare",
        duration: "3 Months",
        context: "Internship",
        description: "Developed end-to-end full-stack solutions utilizing Java technologies and modern frontend frameworks. Streamlined database schemas and improved application performance.",
        tags: ["Java", "Spring Boot", "MySQL", "React"]
    },
    {
        role: "Mobile App Developer",
        company: "Christ Online",
        duration: "3 Months",
        context: "Christ Deemed to be University",
        description: "Built scalable, cross-platform mobile experiences for university stakeholders. Integrated Firebase backends for real-time data syncs affecting students and faculty.",
        tags: ["Flutter", "Firebase", "Dart", "UX"]
    },
];

export default function InternshipSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Abstract background shapes that move on scroll
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

    return (
        <section
            id="experience"
            ref={containerRef}
            className="min-h-screen py-32 px-6 md:px-20 bg-background text-foreground relative overflow-hidden"
        >
            {/* Background Abstract Animations */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-center">
                <motion.svg width="600" height="600" viewBox="0 0 600 600" style={{ y: y1, rotate: rotate1 }} className="absolute -left-32 opacity-30">
                    <circle cx="300" cy="300" r="280" stroke="white" strokeWidth="1" fill="none" strokeDasharray="10 20" />
                    <circle cx="300" cy="300" r="200" stroke="white" strokeWidth="0.5" fill="none" />
                </motion.svg>
                <motion.svg width="800" height="800" viewBox="0 0 800 800" style={{ y: y2, rotate: rotate2 }} className="absolute -right-64 opacity-20">
                    <rect x="100" y="100" width="600" height="600" stroke="white" strokeWidth="1" fill="none" transform="rotate(45 400 400)" />
                    <line x1="0" y1="400" x2="800" y2="400" stroke="white" strokeWidth="0.5" />
                    <line x1="400" y1="0" x2="400" y2="800" stroke="white" strokeWidth="0.5" />
                </motion.svg>
            </div>

            <div className="mb-32">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">
                    Experience
                </h2>
                <div className="w-full h-[1px] bg-neutral-800" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col w-full relative z-10">
                {internshipDetails.map((item, index) => (
                    <InternshipRow key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

function InternshipRow({ item, index }: { item: typeof internshipDetails[0], index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for floating tech stack
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150, mass: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            if (isHovered && rowRef.current) {
                const rect = rowRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => window.removeEventListener("mousemove", updateMousePosition);
    }, [isHovered, mouseX, mouseY]);

    return (
        <motion.div
            ref={rowRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative flex flex-col md:flex-row items-baseline justify-between border-b border-neutral-800 py-16 md:py-24 cursor-none w-full hover:px-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
        >
            {/* Background hover fill that swipes in */}
            <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -z-10" />

            <div className="flex flex-col md:w-2/3">
                <div className="font-mono text-sm tracking-widest text-neutral-500 mb-6 group-hover:text-black/50 transition-colors duration-500">
                    {item.duration} — {item.context}
                </div>

                <h3 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white group-hover:text-black transition-colors duration-500 mix-blend-difference">
                    {item.company}
                </h3>

                <p className="text-2xl md:text-4xl font-light tracking-tight mt-4 text-neutral-400 group-hover:text-black/70 transition-colors duration-500">
                    {item.role}
                </p>

                <p className="mt-8 text-sm md:text-base text-neutral-500 font-light leading-relaxed max-w-xl group-hover:text-black/80 transition-colors duration-500 opacity-60 group-hover:opacity-100">
                    {item.description}
                </p>
            </div>

            {/* Static Arrow that animates on hover */}
            <div className="mt-12 md:mt-0 flex items-end justify-end md:w-1/3">
                <div className="w-16 h-16 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-black group-hover:rotate-45 transition-all duration-700 text-white group-hover:text-black">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </div>
            </div>

            {/* Floating Tech Stack attached to cursor */}
            <motion.div
                className="pointer-events-none absolute left-0 top-0 z-50 flex flex-col gap-2"
                style={{
                    x: smoothX,
                    y: smoothY,
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Offset the floating tags so they don't block the cursor */}
                <div className="translate-x-6 translate-y-6 flex flex-col gap-2">
                    {item.tags.map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            className="bg-black text-white px-4 py-2 text-xs font-mono tracking-widest whitespace-nowrap shadow-xl"
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
