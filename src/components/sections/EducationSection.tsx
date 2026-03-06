"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

const educationDetails = [
    {
        duration: "Currently 2nd Year",
        degree: "BCA Hons",
        institution: "Christ Deemed to be University",
        board: "University",
        description: "Pursuing Bachelor of Computer Applications with honors, focusing on modern software engineering paradigms, app development, and computer science fundamentals."
    },
    {
        duration: "11th - 12th",
        degree: "High School",
        institution: "St Michaels Academy",
        board: "ISC",
        description: "Completed higher secondary education majoring in the science stream with a strong focus on mathematics and analytical problem-solving."
    },
    {
        duration: "6th - 10th",
        degree: "Middle & High School",
        institution: "Sacred Heart International School",
        board: "ICSE",
        description: "Built a solid academic foundation while participating heavily in foundational computing and logic-building extracurriculars."
    },
    {
        duration: "4th - 5th",
        degree: "Primary School",
        institution: "Sree Chithra Thirunal",
        board: "ICSE",
        description: "Early schooling years developing reading, writing, and arithmetic skills in a rigorous ICSE environment."
    },
    {
        duration: "Pre-KG - 3rd",
        degree: "Early Education",
        institution: "Excel Global School",
        board: "IGCSE Syllabus",
        description: "Started the educational journey with an international curriculum."
    },
];

function WalkingSkeleton({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    const stepCount = 30;

    // Mathematical walking cycle
    const leg1Rot = useTransform(smoothProgress, (v: string | number) => Math.sin(Number(v) * Math.PI * stepCount) * 40);
    const leg2Rot = useTransform(smoothProgress, (v: string | number) => Math.sin(Number(v) * Math.PI * stepCount + Math.PI) * 40);
    const arm1Rot = useTransform(smoothProgress, (v: string | number) => Math.sin(Number(v) * Math.PI * stepCount + Math.PI) * 35);
    const arm2Rot = useTransform(smoothProgress, (v: string | number) => Math.sin(Number(v) * Math.PI * stepCount) * 35);
    const bodyBounce = useTransform(smoothProgress, (v: string | number) => Math.abs(Math.sin(Number(v) * Math.PI * stepCount)) * -4);

    return (
        <motion.svg
            width="50"
            height="90"
            viewBox="0 0 40 85"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ y: bodyBounce }}
            className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        >
            {/* Skull */}
            <circle cx="20" cy="14" r="7" fill="#050505" stroke="white" strokeWidth="1.5" />
            <path d="M 17 12 L 17 14 M 23 12 L 23 14" stroke="white" strokeWidth="1" />
            <path d="M 18 18 L 22 18" stroke="white" strokeWidth="1" />

            {/* Back Arm */}
            <motion.g style={{ originX: "20px", originY: "25px", rotate: arm1Rot }}>
                <line x1="20" y1="25" x2="12" y2="40" stroke="#777" />
                <circle cx="12" cy="40" r="1.5" fill="#777" stroke="none" />
            </motion.g>

            {/* Back Leg */}
            <motion.g style={{ originX: "20px", originY: "45px", rotate: leg1Rot }}>
                <line x1="20" y1="45" x2="14" y2="65" stroke="#777" />
                <line x1="14" y1="65" x2="14" y2="80" stroke="#777" />
                <path d="M 14 80 L 10 82" stroke="#777" />
            </motion.g>

            {/* Spine & Ribcage */}
            <line x1="20" y1="21" x2="20" y2="45" strokeWidth="2" />
            <line x1="15" y1="26" x2="25" y2="26" />
            <line x1="16" y1="31" x2="24" y2="31" />
            <line x1="17" y1="36" x2="23" y2="36" />
            <path d="M 15 45 Q 20 50 25 45" /> {/* Pelvis */}

            {/* Front Leg */}
            <motion.g style={{ originX: "20px", originY: "45px", rotate: leg2Rot }}>
                <line x1="20" y1="45" x2="26" y2="65" stroke="white" />
                <line x1="26" y1="65" x2="26" y2="80" stroke="white" />
                <path d="M 26 80 L 22 82" stroke="white" />
            </motion.g>

            {/* Front Arm */}
            <motion.g style={{ originX: "20px", originY: "25px", rotate: arm2Rot }}>
                <line x1="20" y1="25" x2="28" y2="40" stroke="white" />
                <circle cx="28" cy="40" r="1.5" fill="white" stroke="none" />
            </motion.g>
        </motion.svg>
    );
}

export default function EducationSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const skeletonY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="education"
            ref={containerRef}
            className="min-h-screen py-32 px-6 md:px-20 bg-background text-foreground relative"
        >
            <div className="mb-32 px-6">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4">
                    Education
                </h2>
                <div className="w-full h-[1px] bg-neutral-800" />
            </div>

            <div className="max-w-6xl mx-auto flex flex-col items-center relative pb-32">

                {/* Timeline background track */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-800 md:-translate-x-1/2" />

                {/* Timeline active track */}
                <motion.div
                    className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-white md:-translate-x-1/2 origin-top drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    style={{ height: lineHeight }}
                />

                {/* Walking skeleton icon on the track */}
                <motion.div
                    className="absolute left-[20px] md:left-1/2 top-0 -translate-x-[25px] md:-translate-x-[25px] z-10 -mt-[45px]"
                    style={{ top: skeletonY }}
                >
                    <WalkingSkeleton scrollProgress={scrollYProgress} />
                </motion.div>

                <div className="flex flex-col gap-24 md:gap-40 w-full px-6 md:px-0">
                    {educationDetails.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`relative w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:mr-auto md:pr-16 md:text-right" : "md:ml-auto md:pl-16 md:text-left"
                                    }`}
                            >
                                {/* Blip on the timeline for mobile */}
                                <div className="absolute left-[2px] top-6 w-3 h-3 rounded-full bg-neutral-900 border border-neutral-500 md:hidden -translate-x-1/2" />

                                <div className="group relative p-8 border border-neutral-800 hover:border-neutral-400 bg-neutral-900/40 backdrop-blur-md transition-colors duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                    <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">
                                        {item.institution}
                                    </h3>

                                    <div className={`flex flex-col md:flex-row gap-2 md:gap-4 mt-4 font-mono tracking-widest text-sm text-neutral-400 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                                        <span className="text-white">{item.degree}</span>
                                        <span className="hidden md:inline-block w-1 h-1 rounded-full bg-neutral-600 self-center" />
                                        <span>{item.board}</span>
                                    </div>

                                    <p className="mt-6 text-sm text-neutral-500 font-light leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className={`mt-8 inline-flex px-4 py-2 border border-neutral-700 rounded-full text-xs font-mono tracking-widest text-neutral-300 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 ${isEven ? "md:float-right" : "md:float-left"}`}>
                                        {item.duration}
                                    </div>

                                    <div className="clear-both" />

                                    {/* Connection Line to center for desktop */}
                                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-[1px] bg-neutral-800 group-hover:bg-neutral-500 transition-colors ${isEven ? "right-[-4rem]" : "left-[-4rem]"
                                        }`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            {/* Added bottom padding to ensure scroll progress can reach 1 */}
            <div className="h-64 w-full"></div>
        </section>
    );
}
