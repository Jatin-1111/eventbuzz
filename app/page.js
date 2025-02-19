"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, Clock, Calendar, MapPin, Users, Star, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/80 backdrop-blur-md border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white">
              Event<span className="text-cyan-500">Buzz</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#events" className="text-cyan-100 hover:text-cyan-500 transition-colors">Events</a>
            <a href="#register" className="text-cyan-100 hover:text-cyan-500 transition-colors">Register</a>
            <a href="#feedback" className="text-cyan-100 hover:text-cyan-500 transition-colors">Feedback</a>
            <a href="#contact" className="text-cyan-100 hover:text-cyan-500 transition-colors">Contact Us</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cyan-100 hover:text-cyan-500"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-cyan-500/10"
            >
              <div className="py-2 space-y-1">
                <a href="#events" className="block px-4 py-2 text-cyan-100 hover:text-cyan-500">Events</a>
                <a href="#register" className="block px-4 py-2 text-cyan-100 hover:text-cyan-500">Register</a>
                <a href="#feedback" className="block px-4 py-2 text-cyan-100 hover:text-cyan-500">Feedback</a>
                <a href="#contact" className="block px-4 py-2 text-cyan-100 hover:text-cyan-500">Contact Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Modified Hero Component
const Hero = ({}) => (
  <div className="min-h-screen bg-[#0A192F] flex items-center justify-center relative overflow-hidden pt-16">
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center z-10 px-4"
    >
      <p className="text-xl md:text-2xl text-cyan-100 mb-12">
        Where Innovation Meets Celebration
      </p>
      <Countdown timeLeft={timeLeft} />
    </motion.div>
  </div>
);

// Rest of the components remain the same (Countdown, EventsSection, AboutSection, FAQ)
// ... [Previous implementation of other components remains unchanged]

// Modified Main Component
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const targetDate = new Date('2025-02-19T00:00:00');
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // if (loading) return <Preloader />;

  return (
    <main className="relative">
      <Navbar />
      {/* <Hero timeLeft={timeLeft} Countdown={Countdown} /> */}
      {/* <EventsSection /> */}
      {/* <AboutSection /> */}
      {/* <FAQ /> */}
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-2 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 z-50"
          >
            <ArrowUpCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Home;