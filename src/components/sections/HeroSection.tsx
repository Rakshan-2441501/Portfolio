"use client";

import { motion, Variants } from "framer-motion";

export default function HeroSection() {
    const lineVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2.5,
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

    const fadeVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1, delay: 2.2 },
        },
    };

    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background py-20 px-6">
            {/* SVG Background Animation - Animated 'R' */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 800 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="max-h-full max-w-full mix-blend-overlay"
                >
                    <motion.path
                        d="M 275 600 V 200 H 425 C 575 200 575 400 425 400 H 275 M 375 400 L 525 600"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="transparent"
                        variants={lineVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </svg>
            </div>

            {/* Content Container */}
            <div className="z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-12 mt-12 relative flex-wrap">

                {/* Left Side: Title & Info */}
                <div className="flex-1 min-w-[300px] flex flex-col items-center md:items-start text-center md:text-left">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="overflow-hidden"
                    >
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-neutral-100 mix-blend-difference mb-6">
                            A Rakshan
                        </h1>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeVariants}
                        className="flex flex-col gap-2 items-center md:items-start mt-2"
                    >
                        <div className="font-mono text-lg md:text-xl tracking-wide text-neutral-200">
                            Software Developer | Web & Mobile Applications
                        </div>
                        <div className="font-mono text-sm tracking-wider text-neutral-400 mb-4">
                            Building Scalable Web & Mobile Applications
                        </div>
                        <div className="font-mono text-xs tracking-widest text-neutral-500 uppercase mt-4">
                            BCA Student @ Christ Deemed to be University
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: About Me Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeVariants}
                    className="flex-1 min-w-[300px] flex flex-col gap-6 text-neutral-400 font-mono text-sm md:text-base leading-relaxed text-left border-l-0 md:border-l border-neutral-800 pt-8 md:pt-0 pl-0 md:pl-10"
                >
                    <p>
                        Hi, I’m Rakshan, a BCA student at Christ University passionate about building real-world software solutions. I enjoy developing mobile apps, web applications, and full-stack systems that solve practical problems.
                    </p>
                    <p>
                        My experience includes working with technologies such as React, Next.js, Flutter, Java, C++, PHP, MySQL, and MongoDB, along with modern development tools and cloud platforms. I have developed multiple projects including mobile applications, web platforms, and desktop software, focusing on usability, performance, and scalability.
                    </p>
                    <p>
                        I am always eager to explore new technologies, contribute to innovative ideas, and build impactful digital solutions.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 hidden md:flex"
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
