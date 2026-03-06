"use client";

import { motion, Variants } from "framer-motion";

export default function HeroSection() {
    const lineVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
                delay: 0.5,
            },
        },
    };

    const textVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: [0.33, 1, 0.68, 1], delay: 1.5 },
        },
    };

    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
            {/* minimal live svg animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <svg
                    width="800"
                    height="800"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.circle
                        cx="400"
                        cy="400"
                        r="300"
                        stroke="white"
                        strokeWidth="1"
                        variants={lineVariants}
                        initial="hidden"
                        animate="visible"
                        className="mix-blend-overlay"
                    />
                    <motion.path
                        d="M 100 400 Q 400 100 700 400 T 1300 400"
                        stroke="white"
                        strokeWidth="0.5"
                        fill="transparent"
                        variants={lineVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>
            </div>

            <div className="z-10 text-center flex flex-col items-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className="overflow-hidden"
                >
                    <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter text-neutral-100 mix-blend-difference mb-4">
                        A Rakshan
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                    className="flex flex-col items-center gap-2 mt-8"
                >
                    <div className="font-mono text-sm tracking-widest text-neutral-400">
                        Software developer
                    </div>
                    <div className="font-mono text-xs tracking-wider text-neutral-500">
                        Student @ christ deemed to be university
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
            >
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">Scroll</span>
                <div className="w-[1px] h-12 bg-neutral-800 overflow-hidden relative">
                    <motion.div
                        className="w-full h-full bg-white origin-top"
                        animate={{
                            y: ["-100%", "100%"],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
