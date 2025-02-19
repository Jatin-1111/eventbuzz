"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Menu, X, User, MessageSquare, MessageCircle } from 'lucide-react';
import InquireModal from '../components/feedback';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--elevated)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-[var(--text-primary)]">
              Event<span className="text-[var(--accent-primary)]">Buzz</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <a href="#events" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Events</a>
            <a href="#register" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Register</a>
            <a href="#feedback" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Feedback</a>
            <a href="#contact" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Contact Us</a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[var(--elevated)]"
            >
              <div className="py-2 space-y-1">
                <a href="#events" className="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">Events</a>
                <a href="#register" className="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">Register</a>
                <a href="#feedback" className="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">Feedback</a>
                <a href="#contact" className="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">Contact Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const SocialIcon = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="p-3 bg-[var(--input-background)] rounded-lg border border-[var(--elevated)] hover:border-[var(--accent-primary)] transition-colors"
    aria-label={label}
  >
    <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
  </motion.a>
);

const InfoCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="bg-[var(--surface)] backdrop-blur-sm rounded-lg p-6 border border-[var(--elevated)] hover:border-[var(--accent-primary)] transition-all duration-300"
  >
    <h3 className="text-xl text-[var(--text-primary)] font-semibold mb-4 flex items-center gap-2">
      <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
      {title}
    </h3>
    <div className="space-y-3 text-[var(--text-secondary)]">
      {children}
    </div>
  </motion.div>
);

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
    },
  },
};

const inputVariants = {
  initial: { 
    opacity: 0, 
    x: -20 
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const formContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const inputClasses = "w-full bg-[var(--input-background)] backdrop-blur-sm rounded-lg border border-[var(--elevated)] p-3 text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors";

  return (
    <>
      <main className="bg-[var(--background)] min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/10 to-transparent" />

        <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.div className="text-center mb-12">
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Contact Us
              </motion.h1>
              <motion.div
                className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.form
                variants={formContainerVariants}
                initial="initial"
                animate="animate"
                onSubmit={handleSubmit}
                className="bg-[var(--surface)] backdrop-blur-sm rounded-xl p-6 border border-[var(--elevated)] space-y-4"
              >
                <motion.div variants={inputVariants}>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className={`${inputClasses} pl-10`}
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants}>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className={`${inputClasses} pl-10`}
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants}>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className={`${inputClasses} pl-10`}
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={inputVariants}>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-4 text-[var(--text-secondary)]" size={20} />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      className={`${inputClasses} pl-10`}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--background)] font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                  type="submit"
                >
                  Send Message
                </motion.button>
              </motion.form>

              <div className="space-y-6">
                <InfoCard icon={Mail} title="Contact Information">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
                    contact@eventbuzz.com
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--accent-primary)]" />
                    +91 12345 67890
                  </p>
                </InfoCard>

                <InfoCard icon={MapPin} title="Visit Us">
                  <p className="leading-relaxed">
                    University Institute of Engineering and Technology,<br />
                    Panjab University,<br />
                    Sector 25, Chandigarh - 160014
                  </p>
                </InfoCard>

                <div className="flex justify-center space-x-4">
                  <SocialIcon icon={Instagram} href="#" label="Instagram" />
                  <SocialIcon icon={Facebook} href="#" label="Facebook" />
                  <SocialIcon icon={Youtube} href="#" label="Youtube" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <InquireModal />
      </main>
    </>
  );
};

export default ContactPage;