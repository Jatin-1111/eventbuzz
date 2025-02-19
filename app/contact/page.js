"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

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

// Social Icon Component
const SocialIcon = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 bg-[#1A0F2E]/80 rounded-lg border border-cyan-500/20 hover:bg-[#1A0F2E] transition-colors"
    aria-label={label}
  >
    <Icon className="w-6 h-6 text-cyan-500" />
  </motion.a>
);

// Info Card Component
const InfoCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="bg-[#1A0F2E]/80 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 hover:bg-[#1A0F2E] transition-all duration-300"
  >
    <h3 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
      <Icon className="w-5 h-5 text-cyan-500" />
      {title}
    </h3>
    <div className="space-y-3 text-cyan-100">
      {children}
    </div>
  </motion.div>
);

// Main Contact Page Component
const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formState);
  };

  const inputClasses = "w-full bg-[#1A0F2E]/80 backdrop-blur-sm rounded-lg border border-cyan-500/20 p-3 text-white placeholder:text-cyan-100/50 focus:outline-none focus:border-cyan-500/50 transition-colors";

  return (
    <>
      <main className="bg-[#0A192F] min-h-screen">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div className="text-center mb-12">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Contact Us
              </motion.h1>
              <motion.div
                className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Contact Form */}
              <motion.form
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onSubmit={handleSubmit}
                className="bg-[#1A0F2E]/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={inputClasses}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={inputClasses}
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className={inputClasses}
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className={inputClasses}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-semibold py-3 rounded-lg hover:brightness-110 transition-all"
                  type="submit"
                >
                  Send Message
                </motion.button>
              </motion.form>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Communication Section */}
                <InfoCard icon={Mail} title="Contact Information">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-500" />
                    contact@eventbuzz.com
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-500" />
                    +91 98765 43210
                  </p>
                </InfoCard>

                {/* Visit Us Section */}
                <InfoCard icon={MapPin} title="Visit Us">
                  <p className="leading-relaxed">
                    University Institute of Engineering and Technology,<br />
                    Panjab University,<br />
                    Sector 25, Chandigarh - 160014
                  </p>
                </InfoCard>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;