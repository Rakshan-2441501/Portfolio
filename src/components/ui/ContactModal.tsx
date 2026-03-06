"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, CornerDownLeft, Check } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const steps = [
    { id: "welcome", label: "Let's build something extraordinary.", type: "info" },
    { id: "name", label: "Hi there. What's your name?", type: "text", placeholder: "Type your name..." },
    { id: "email", label: "Nice to meet you. What's your email?", type: "email", placeholder: "Hello@example.com..." },
    { id: "contact", label: "And your contact number?", type: "tel", placeholder: "+1 (234) 567-890..." },
    { id: "message", label: "Tell me about your vision...", type: "textarea", placeholder: "I have this idea..." },
    { id: "review", label: "Ready to send?", type: "review" }
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ name: "", email: "", contact: "", message: "" });
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [step, isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Enter" && !e.shiftKey) {
                if (steps[step].type !== "textarea" && steps[step].type !== "review" && steps[step].type !== "info") {
                    e.preventDefault();
                    handleNext();
                } else if (steps[step].type === "info") {
                    e.preventDefault();
                    handleNext();
                }
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            setTimeout(() => {
                setStep(0);
                setFormState("idle");
                setFormData({ name: "", email: "", contact: "", message: "" });
            }, 500);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose, step, formData]);

    const handleNext = () => {
        const currentStep = steps[step];
        if (currentStep.id === 'name' && formData.name.trim() === '') return;
        if (currentStep.id === 'email' && (!formData.email.includes('@') || formData.email.trim() === '')) return;

        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        setFormState("submitting");

        // -------------
        // ⭐ IMPORTANT: Paste your actual Google Apps Script Web App URL below 
        // to link the form dynamically!
        // -------------
        const scriptURL = "https://script.google.com/macros/s/AKfycbw_PHlWI7CNPP-1zY60DObEVafOrYQCxwb3WuvuZzJ2j9mnlZCUGnvEah90sWykrnOL/exec";

        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('date', new Date().toISOString());
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('contact', formData.contact);
            formDataToSubmit.append('message', formData.message);

            await fetch(scriptURL, {
                method: 'POST',
                body: formDataToSubmit,
                mode: 'no-cors' // Prevent CORS errors, Google returns opaque blocks
            });

            setFormState("success");
            setTimeout(() => onClose(), 2500);
        } catch (error) {
            console.error("Error submitting form", error);
            setFormState("error");
            setTimeout(() => setFormState("idle"), 3000);
        }
    };

    const currentStep = steps[step];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center isolation-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-black/95 backdrop-blur-[200px]"
                        onClick={onClose}
                    />

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: step / (steps.length - 1) }}
                        className="absolute top-0 left-0 h-1 bg-white z-50 origin-left transition-transform duration-500 ease-out"
                        style={{ width: "100%" }}
                    />

                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 md:top-12 md:right-12 z-50 p-4 rounded-full border border-neutral-800 hover:border-white hover:bg-white hover:text-black transition-colors mix-blend-difference group"
                    >
                        <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300 text-white group-hover:text-black" />
                    </button>

                    <div className="relative w-full max-w-5xl px-6 md:px-12 flex flex-col justify-center pointer-events-auto h-[100dvh]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full flex justify-center flex-col"
                            >
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight text-white/90">
                                    {currentStep.label}
                                </h2>

                                <div className="mt-12 md:mt-16 w-full">
                                    {currentStep.type === "info" && (
                                        <button
                                            onClick={handleNext}
                                            className="group flex items-center gap-4 text-xl md:text-3xl font-light tracking-tight text-neutral-400 hover:text-white transition-colors"
                                        >
                                            Start
                                            <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform duration-500" />
                                        </button>
                                    )}

                                    {(currentStep.type === "text" || currentStep.type === "email" || currentStep.type === "tel") && (
                                        <div className="relative flex flex-col group">
                                            <input
                                                ref={inputRef as any}
                                                type={currentStep.type}
                                                name={currentStep.id}
                                                value={(formData as any)[currentStep.id]}
                                                onChange={handleChange}
                                                placeholder={currentStep.placeholder}
                                                className="w-full bg-transparent border-none outline-none font-light text-3xl md:text-5xl lg:text-6xl text-white placeholder-neutral-800 tracking-tighter"
                                                autoComplete="off"
                                            />
                                            <div className="absolute -bottom-8 left-0 w-full h-[1px] bg-neutral-800 scale-x-100 origin-left" />
                                            <div className="absolute -bottom-8 left-0 w-full h-[2px] bg-white scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                                        </div>
                                    )}

                                    {currentStep.type === "textarea" && (
                                        <div className="relative flex flex-col group w-full h-full">
                                            <textarea
                                                ref={inputRef as any}
                                                name={currentStep.id}
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder={currentStep.placeholder}
                                                className="w-full bg-transparent border-none outline-none font-light text-2xl md:text-4xl lg:text-5xl text-white placeholder-neutral-800 tracking-tighter min-h-[250px] resize-none leading-relaxed"
                                            />
                                            <div className="absolute -bottom-8 left-0 w-full h-[1px] bg-neutral-800 scale-x-100 origin-left" />
                                            <div className="absolute -bottom-8 left-0 w-full h-[2px] bg-white scale-x-0 group-focus-within:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                                        </div>
                                    )}

                                    {currentStep.type === "review" && (
                                        <div className="flex flex-col gap-8 text-neutral-400 font-mono text-sm tracking-widest uppercase">
                                            <div className="bg-neutral-900/50 p-8 border border-neutral-800 rounded-2xl flex flex-col gap-6 w-full max-w-3xl">
                                                <div>
                                                    <span className="block text-neutral-600 mb-2">Name</span>
                                                    <span className="text-white text-lg tracking-tight font-sans">{formData.name}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-neutral-600 mb-2">Email</span>
                                                    <span className="text-white text-lg tracking-tight font-sans">{formData.email}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-neutral-600 mb-2">Contact</span>
                                                    <span className="text-white text-lg tracking-tight font-sans">{formData.contact}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-neutral-600 mb-2">Message</span>
                                                    <span className="text-white text-lg tracking-tight font-sans leading-relaxed">{formData.message}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleSubmit}
                                                disabled={formState !== "idle"}
                                                className="w-full md:w-auto self-start mt-4 px-12 py-6 bg-white text-black font-bold tracking-wider hover:bg-neutral-200 transition-colors rounded-full flex gap-4 items-center justify-center overflow-hidden relative group"
                                            >
                                                <AnimatePresence mode="wait">
                                                    {formState === "idle" && (
                                                        <motion.div key="idle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-4">
                                                            Shoot into the wire <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                                        </motion.div>
                                                    )}
                                                    {formState === "submitting" && (
                                                        <motion.div key="submitting" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-4">
                                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                            Sending...
                                                        </motion.div>
                                                    )}
                                                    {formState === "success" && (
                                                        <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-4 text-green-600">
                                                            <Check className="w-5 h-5" /> Sent Successfully
                                                        </motion.div>
                                                    )}
                                                    {formState === "error" && (
                                                        <motion.div key="error" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex items-center gap-4 text-red-600">
                                                            <X className="w-5 h-5" /> Error sending
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Footer */}
                        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 flex justify-between items-end border-t border-neutral-800 pt-8 mt-12">
                            <div className="flex gap-4">
                                {step > 0 && (
                                    <button onClick={handlePrev} className="text-neutral-500 font-mono text-xs tracking-widest uppercase hover:text-white transition-colors">
                                        [ Previous ]
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-neutral-600 font-mono text-xs tracking-widest hidden md:inline-block">
                                    0{step + 1} / 0{steps.length}
                                </span>
                                {(currentStep.type === "text" || currentStep.type === "email" || currentStep.type === "tel" || currentStep.type === "textarea") && (
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-3 px-6 py-3 bg-neutral-900 rounded-full border border-neutral-800 text-white hover:bg-white hover:text-black transition-all font-mono text-xs tracking-widest uppercase group shrink-0"
                                    >
                                        Next <CornerDownLeft className="w-3 h-3 group-hover:animate-bounce" />
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
