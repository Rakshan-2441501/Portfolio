"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, HeartHandshake } from "lucide-react";

const items = [
    { type: "Leadership", event: "Blossoms", role: "Media & Web Dev Head" },
    { type: "Leadership", event: "Inblooms", role: "Web Dev" },
    { type: "Leadership", event: "Innowave", role: "Tech Wing [Organising Committee]" },
    { type: "Volunteering", event: "Techleons", role: "Volunteer [Sponsorship]" },
    { type: "Volunteering", event: "Industry Academia Concave", role: "Volunteer" },
    { type: "Volunteering", event: "ACU x CU", role: "Volunteer" },
];

const InvolvementCard = ({ item, index }: { item: any, index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth, snappy physics for the 3D tilt
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    // Physics for the ambient glow following the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const glowX = useSpring(mouseX, { stiffness: 200, damping: 25 });
    const glowY = useSpring(mouseY, { stiffness: 200, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        x.set(localX / width - 0.5);
        y.set(localY / height - 0.5);

        mouseX.set(localX);
        mouseY.set(localY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isLeadership = item.type === "leadership";

    return (
        <div style={{ perspective: 1200 }} className="shrink-0 group">
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[75vh] rounded-3xl md:rounded-[2rem] border border-neutral-800 hover:border-neutral-500 bg-neutral-900/60 backdrop-blur-2xl relative overflow-hidden transition-colors duration-500 flex flex-col justify-between p-6 md:p-12 cursor-pointer shadow-2xl`}
            >
                {/* Dynamic Mouse Spotlight */}
                <motion.div
                    style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
                    className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/10`}
                />

                {/* Card Top: Type and Icon */}
                <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
                    <div className="flex items-center gap-4 text-neutral-400 mb-6">
                        {isLeadership ? <ShieldCheck className="w-6 h-6 text-neutral-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" /> : <HeartHandshake className="w-6 h-6 text-neutral-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />}
                        <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-white/70 shadow-black drop-shadow-lg">{item.type}</span>
                    </div>
                </div>

                {/* Card Middle: Massive Event Title */}
                <div style={{ transform: "translateZ(60px)" }} className="relative z-10 flex-1 flex items-center">
                    <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-white drop-shadow-xl leading-[0.9]">
                        {item.event}
                    </h3>
                </div>

                {/* Card Bottom: Role & Number */}
                <div style={{ transform: "translateZ(80px)" }} className="relative z-10 border-t border-white/10 pt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                        <p className="text-xl md:text-3xl lg:text-4xl font-light text-neutral-300 tracking-tight leading-tight flex flex-wrap max-w-sm drop-shadow-md">
                            {item.role}
                        </p>
                    </div>

                    <div className="flex items-center justify-end">
                        <span className="text-6xl md:text-8xl font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.1)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)] md:group-hover:[-webkit-text-stroke:2px_rgba(255,255,255,0.8)] transition-all duration-500">
                            0{index + 1}
                        </span>
                    </div>
                </div>

                {/* Abstract Glass Rings */}
                <div className={`absolute -right-20 -bottom-20 w-80 h-80 border border-white/5 rounded-full group-hover:border-white/20 transition-colors duration-700 pointer-events-none`} style={{ transform: "translateZ(10px)" }} />
                <div className={`absolute -right-32 -bottom-32 w-[500px] h-[500px] border border-white/5 rounded-full group-hover:border-white/10 transition-colors duration-700 pointer-events-none`} style={{ transform: "translateZ(-20px)" }} />
            </motion.div>
        </div>
    );
}


export default function InvolvementSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);

    useEffect(() => {
        const updateRange = () => {
            if (scrollRef.current) {
                // Determine the total scrollable width minus the viewport width.
                // We add an extra offset buffer to ensure the last card is fully in view!
                setScrollRange(scrollRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.15);
            }
        };
        // Allow initial browser paints to complete before measuring width
        const timeout = setTimeout(updateRange, 150);
        window.addEventListener("resize", updateRange);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", updateRange);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 80, mass: 0.5 });
    const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

    return (
        <section id="involvement" ref={containerRef} className="relative h-[600vh] bg-background">

            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

                {/* Massive abstract background grid/noise */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20 pointer-events-none" />

                {/* Moving Parallax Typography Background */}
                <motion.div
                    style={{ x: useTransform(smoothProgress, [0, 1], ["0%", "-30%"]) }}
                    className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col pointer-events-none select-none opacity-[0.03]"
                >
                    <h2 className="text-[30vw] font-black tracking-tighter leading-[0.8] whitespace-nowrap text-white">
                        Influence.
                    </h2>
                    <h2 className="text-[30vw] font-black tracking-tighter leading-[0.8] whitespace-nowrap text-white pl-[15vw]">
                        Impact.
                    </h2>
                </motion.div>

                {/* Horizontal Scrolling Track */}
                <motion.div
                    ref={scrollRef}
                    style={{ x }}
                    className="flex items-center gap-12 md:gap-20 h-full pl-6 md:pl-24 relative z-10 w-max"
                >
                    {/* Header Card (Introduction) */}
                    <div className="shrink-0 w-[85vw] md:w-[40vw] flex flex-col gap-4 md:gap-6 mr-4 md:mr-12">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-none">
                            Leadership <br /> & Volun<span className="text-neutral-500 font-serif italic">teering</span>.
                        </h2>
                        <p className="text-neutral-400 font-light text-lg md:text-xl tracking-wide max-w-sm">
                            Scroll down to explore a horizontal timeline of my active leadership roles and volunteering experiences.
                        </p>
                    </div>

                    {items.map((item, index) => (
                        <InvolvementCard key={index} item={item} index={index} />
                    ))}

                    {/* Spacer block to ensure the last card stops exactly at the right screen edge */}
                    <div className="w-[15vw] shrink-0 pointer-events-none" />
                </motion.div>

                {/* Progress Indicator Footer */}
                <div className="absolute bottom-12 left-6 md:left-24 flex items-center gap-6 z-20 mix-blend-difference text-white">
                    <span className="font-mono text-sm tracking-widest uppercase opacity-50 hidden md:block">Scroll to view</span>
                    <div className="w-32 md:w-64 h-[2px] bg-white/20 relative overflow-hidden">
                        <motion.div
                            style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                            className="absolute inset-0 bg-white"
                        />
                    </div>
                    <span className="font-mono text-sm tracking-widest uppercase">
                        {Math.round(items.length)} roles
                    </span>
                </div>
            </div>
        </section>
    );
}
