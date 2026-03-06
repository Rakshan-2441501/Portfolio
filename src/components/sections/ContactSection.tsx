"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ContactModal from "@/components/ui/ContactModal";

// 1. Magnetic Button for incredibly aesthetic interaction
function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for snappy magnetic pull
    const smoothX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const smoothY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        // Magnetic intensity
        x.set(middleX * 0.4);
        y.set(middleY * 0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: smoothX, y: smoothY }}
            className={`flex items-center justify-center border border-neutral-800 bg-neutral-900/50 backdrop-blur-md cursor-pointer ${className}`}
        >
            <div className="pointer-events-none flex flex-col items-center justify-center w-full h-full">
                {children}
            </div>
        </motion.button>
    );
}

// 2. Physical interactive SVG string measuring mouse proximity
function ElasticLine() {
    const lineRef = useRef<HTMLDivElement>(null);
    const ctrlY = useMotionValue(50);
    const smoothCtrlY = useSpring(ctrlY, { stiffness: 500, damping: 10, mass: 1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!lineRef.current) return;
        const rect = lineRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        ctrlY.set(y);
    };

    const handleMouseLeave = () => {
        // Snap back to absolute center
        ctrlY.set(50);
    };

    // Vector interpolation drawing the elastic bow
    const pathD = useMotionTemplate`M 0 50 Q 500 ${smoothCtrlY} 1000 50`;

    return (
        <div
            ref={lineRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-[100px] relative z-20 cursor-crosshair flex items-center -my-8 md:-my-4"
        >
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full stroke-neutral-800 hover:stroke-white transition-colors duration-300">
                <motion.path
                    d={pathD}
                    fill="transparent"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}

export default function ContactSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

    // Ambient cursor tracker (global background spotlight)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            id="contact"
            ref={containerRef}
            className="min-h-screen relative overflow-hidden bg-background text-foreground flex flex-col justify-end"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
            {/* Ambient Mouse Glow */}
            <motion.div
                className="fixed w-[600px] h-[600px] rounded-full blur-[150px] bg-white/5 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
                style={{ left: smoothMouseX, top: smoothMouseY }}
            />

            <motion.div style={{ y }} className="w-full h-full flex flex-col justify-end pt-32 z-10">
                <div className="flex-1 flex flex-col justify-center px-6 md:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 w-full">
                        <div className="flex flex-col gap-8 max-w-3xl pt-20">
                            <div className="flex items-center gap-6">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 64 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-[1px] bg-neutral-400"
                                />
                                <span className="font-mono text-xs md:text-sm tracking-widest text-neutral-400 uppercase">Have a vision?</span>
                            </div>
                            <h2 className="text-5xl md:text-[6rem] lg:text-[7rem] font-bold tracking-tighter leading-[0.9]">
                                Let's build something <br className="hidden lg:block" />
                                <span className="text-neutral-500 italic font-serif">Extraordinary.</span>
                            </h2>
                        </div>

                        <MagneticButton onClick={() => setIsModalOpen(true)} className="rounded-full w-40 h-40 md:w-56 md:h-56 group hover:bg-white transition-colors duration-500 hover:border-white">
                            <div className="flex flex-col items-center justify-center gap-2 text-white group-hover:text-black">
                                <span className="font-semibold text-sm md:text-lg tracking-wider">Get in touch</span>
                                <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 transform translate-y-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </MagneticButton>
                    </div>
                </div>

                <div className="mt-20">
                    {/* Interactive dropping/flipping typography wrapper */}
                    <div className="px-6 md:px-20 group relative cursor-pointer overflow-hidden border-t border-neutral-900 bg-background py-8">
                        <button onClick={() => setIsModalOpen(true)} className="block w-full relative h-[10vw]">
                            <motion.div className="absolute inset-0 flex items-center justify-center text-[8vw] md:text-[6.5vw] lg:text-[7.5vw] leading-none font-bold tracking-tighter transition-transform duration-700 group-hover:-translate-y-[150%]">
                                Rakshan.2111@gmail.com
                            </motion.div>
                            <motion.div className="absolute inset-0 flex items-center justify-center text-[8vw] md:text-[6.5vw] lg:text-[7.5vw] leading-none font-bold tracking-tighter text-neutral-500 italic font-serif transition-transform duration-700 translate-y-[150%] group-hover:translate-y-0">
                                Rakshan.2111@gmail.com
                            </motion.div>
                        </button>
                    </div>

                    <ElasticLine />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8 px-6 md:px-20 font-mono text-xs md:text-sm text-neutral-600 tracking-widest uppercase">
                        <div className="flex gap-8">
                            <a href="https://github.com/Rakshan-2441501" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                Github
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                LinkedIn
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Twitter
                            </a>
                        </div>

                        <div>
                            © {new Date().getFullYear()} A Rakshan. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </motion.div>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
