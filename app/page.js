"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

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

// Countdown Component
const Countdown = ({ timeLeft }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
    {Object.entries(timeLeft).map(([unit, value]) => (
      <div key={unit} className="bg-[#1A0F2E]/80 p-6 rounded-lg backdrop-blur-sm border border-cyan-500/20">
        <div className="text-4xl md:text-5xl font-bold text-cyan-500 mb-2">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-cyan-100 text-sm md:text-base capitalize">
          {unit}
        </div>
      </div>
    ))}
  </div>
);

// Hero Component
const Hero = ({ timeLeft }) => (
  <div className="min-h-screen bg-[#0A192F] flex items-center justify-center relative overflow-hidden pt-16">
    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center z-10 px-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        The Next Big Event
      </h1>
      <p className="text-xl md:text-2xl text-cyan-100 mb-12">
        Where Innovation Meets Celebration
      </p>
      <Countdown timeLeft={timeLeft} />
    </motion.div>
  </div>
);

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-cyan-500/10 last:border-none"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        {isOpen ? 
          <ChevronUp className="w-5 h-5 text-cyan-500" /> : 
          <ChevronDown className="w-5 h-5 text-cyan-500" />
        }
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-cyan-100">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// FAQ Section Component
const FAQ = () => {
  const faqs = [
    {
      question: "When and where is the event taking place?",
      answer: "The event will take place next month at the Central Convention Center. Specific dates and times will be announced soon."
    },
    {
      question: "How can I register for the event?",
      answer: "Registration is simple! Just click on the 'Register' link in the navigation menu and fill out the registration form. Early bird discounts are available."
    },
    {
      question: "What's included in the ticket price?",
      answer: "Your ticket includes full access to all keynote sessions, workshops, networking events, lunch, and refreshments throughout the day."
    },
    {
      question: "Is there a dress code?",
      answer: "We recommend business casual attire. The venue is fully air-conditioned for your comfort."
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer: "Yes, refunds are available up to 14 days before the event. After that, you can transfer your ticket to someone else."
    }
  ];

  return (
    <section id="faq" className="bg-[#0A192F] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-cyan-100 text-lg">
            Got questions? We&apos;ve got answers!
          </p>
        </motion.div>
        
        <div className="bg-[#1A0F2E]/80 rounded-lg backdrop-blur-sm border border-cyan-500/20 p-6">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Component
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle countdown timer
  useEffect(() => {
    // Set target date to 1 month from now
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1);

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

  return (
    <main className="relative">
      <Navbar />
      <Hero timeLeft={timeLeft} />
      <FAQ />

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