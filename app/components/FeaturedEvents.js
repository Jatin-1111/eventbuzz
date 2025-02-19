'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import motion components to avoid SSR issues
const MotionDiv = dynamic(
    () => import('framer-motion').then((mod) => mod.motion.div),
    { ssr: false }
);

const FeaturedEvents = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const autoplayRef = useRef(null);
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    const events = [
        {
            id: 1,
            title: "Tech Summit 2024",
            description: "Join industry leaders for a day of innovation and networking",
            date: "March 25, 2024",
            time: "9:00 AM - 5:00 PM",
            location: "Main Auditorium",
            image: "/tech.jpg",
            category: "Technology"
        },
        {
            id: 2,
            title: "Cultural Festival",
            description: "Experience diverse performances and cultural exhibitions",
            date: "April 2, 2024",
            time: "11:00 AM - 8:00 PM",
            location: "University Plaza",
            image: "/api/placeholder/800/400",
            category: "Culture"
        },
        {
            id: 3,
            title: "Research Symposium",
            description: "Showcase of groundbreaking research and innovations",
            date: "April 15, 2024",
            time: "10:00 AM - 4:00 PM",
            location: "Research Center",
            image: "/api/placeholder/800/400",
            category: "Academic"
        },
        {
            id: 4,
            title: "Sports Tournament",
            description: "Annual inter-university sports competition",
            date: "May 1, 2024",
            time: "8:00 AM - 6:00 PM",
            location: "Sports Complex",
            image: "/api/placeholder/800/400",
            category: "Sports"
        }
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!inView) {
            stopAutoplay();
            return;
        }

        if (isAutoplay && isMounted) {
            startAutoplay();
        }
        return () => stopAutoplay();
    }, [isAutoplay, inView, isMounted]);

    const startAutoplay = () => {
        stopAutoplay();
        autoplayRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 5000);
    };

    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
        }
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
        setIsAutoplay(false);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        setIsAutoplay(false);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className="w-full bg-[var(--background)] py-16" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Featured Events
                    </h2>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full" />
                </div>

                <div className="relative">
                    <div className="relative overflow-hidden rounded-xl">
                        <AnimatePresence mode="wait">
                            <MotionDiv
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <div className="aspect-w-2 aspect-h-1 relative h-[600px]">
                                    <Image
                                        src={events[currentIndex].image}
                                        alt={events[currentIndex].title}
                                        fill
                                        priority
                                        className="object-cover rounded-t-xl"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="inline-block px-3 py-1 bg-[var(--accent-primary)] text-[var(--background)] rounded-full text-sm font-semibold mb-4">
                                        {events[currentIndex].category}
                                    </div>
                                    <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                                        {events[currentIndex].title}
                                    </h3>
                                    <p className="text-[var(--text-secondary)] mb-4 max-w-2xl">
                                        {events[currentIndex].description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 text-[var(--text-secondary)]">
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 mr-2 text-[var(--accent-primary)]" />
                                            {events[currentIndex].date}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 mr-2 text-[var(--accent-primary)]" />
                                            {events[currentIndex].time}
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 mr-2 text-[var(--accent-primary)]" />
                                            {events[currentIndex].location}
                                        </div>
                                    </div>
                                </div>
                            </MotionDiv>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[var(--surface)]/80 backdrop-blur-sm text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[var(--surface)]/80 backdrop-blur-sm text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {events.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsAutoplay(false);
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'w-6 bg-[var(--accent-primary)]'
                                    : 'bg-[var(--text-secondary)]/50 hover:bg-[var(--text-secondary)]'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedEvents;