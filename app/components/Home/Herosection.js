'use client';
import React, { useRef } from 'react';
import { Calendar, Users, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    // Transform values for different parallax layers
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
    const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

    const features = [
        {
            icon: <Calendar />,
            title: "Smart Scheduling",
            description: "AI-powered event planning that adapts to your campus rhythm"
        },
        {
            icon: <Users />,
            title: "Social Hub",
            description: "Create meaningful connections through shared interests and events"
        },
        {
            icon: <BookOpen />,
            title: "Knowledge Exchange",
            description: "Discover and share academic opportunities seamlessly"
        }
    ];

    return (
        <div ref={targetRef} className="relative w-full min-h-screen overflow-hidden bg-[var(--background)] pb-10">
            {/* Parallax Background Layers */}
            <div className="absolute inset-0 w-full h-full">
                {/* Background Layer - Slowest moving */}
                <motion.div 
                    style={{ y: backgroundY }}
                    className="absolute inset-0 w-full h-[120%]"
                >
                    <div className="absolute top-10 -left-20 w-[800px] h-[800px] bg-[var(--accent-primary)] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
                    <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-[var(--accent-secondary)] rounded-full mix-blend-screen filter blur-3xl opacity-15" />
                </motion.div>

                {/* Midground Layer */}
                <motion.div 
                    style={{ y: midgroundY }}
                    className="absolute inset-0 w-full h-[120%]"
                >
                    <div className="absolute top-60 left-1/4 w-[500px] h-[500px] bg-[var(--accent-highlight)] rounded-full mix-blend-screen filter blur-2xl opacity-15" />
                    <div className="absolute -bottom-20 right-1/4 w-[700px] h-[700px] bg-[var(--accent-primary)] rounded-full mix-blend-screen filter blur-3xl opacity-10" />
                </motion.div>

                {/* Foreground Layer - Fastest moving */}
                <motion.div 
                    style={{ y: foregroundY }}
                    className="absolute inset-0 w-full h-[120%]"
                >
                    <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-[var(--accent-secondary)] rounded-full mix-blend-screen filter blur-xl opacity-20" />
                    <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[var(--accent-highlight)] rounded-full mix-blend-screen filter blur-2xl opacity-15" />
                </motion.div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
            </div>

            {/* Content */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
                    {/* Left column - Text content */}
                    <div className="space-y-8 lg:pr-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--accent-primary)] border-opacity-20"
                            >
                                <Sparkles className="w-4 h-4 text-[var(--accent-primary)] mr-2" />
                                <span className="text-sm text-[var(--text-secondary)]">Revolutionizing Campus Events</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-5xl md:text-7xl font-bold text-[var(--text-primary)] leading-tight"
                            >
                                Your Campus
                                <span className="text-[var(--accent-primary)]"> Lives Here</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-xl text-[var(--text-secondary)] max-w-xl"
                            >
                                Experience a new era of campus event management where community, technology, and engagement converge.
                            </motion.p>
                        </div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center justify-center px-8 py-4 bg-[var(--accent-primary)] text-[var(--background)] rounded-xl font-semibold"
                            >
                                Start Exploring
                                <motion.div
                                    className="ml-2"
                                    whileHover={{ x: 5 }}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center px-8 py-4 border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] rounded-xl font-semibold hover:bg-[var(--surface)]"
                            >
                                Watch Demo
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right column - Feature cards */}
                    <div className="relative lg:pl-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                className="relative mb-6 last:mb-0"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="p-6 bg-[var(--surface)] rounded-xl border border-[var(--accent-primary)] border-opacity-20 backdrop-blur-sm"
                                >
                                    <motion.div
                                        className="flex items-center mb-4 text-[var(--accent-primary)]"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {feature.icon}
                                        <h3 className="ml-4 text-xl font-semibold text-[var(--text-primary)]">
                                            {feature.title}
                                        </h3>
                                    </motion.div>
                                    <p className="text-[var(--text-secondary)]">{feature.description}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;