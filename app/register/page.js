"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, School, BookOpen, Calendar, Trophy, X, IndianRupee } from 'lucide-react';
import { EventSelectionModal, EventSummary } from '../components/Events/EventSelectionModal';
import { useRegistration } from '../components/hooks/useRegistration';


const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const formItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    year: '',
    selectedEvents: []
  });

  const [totalCost, setTotalCost] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const { register, isLoading } = useRegistration();

  const courseOptions = [
    { value: 'biotech', label: 'B.Tech in Biotechnology' },
    { value: 'mech', label: 'B.Tech in Mechanical' },
    { value: 'it', label: 'B.Tech in Information Technology' },
    { value: 'cse', label: 'B.Tech in Computer Science' },
    { value: 'ece', label: 'B.Tech in Electronics' },
    { value: 'other', label: 'Other' }
  ];

  const yearOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' },
    { value: 'other', label: 'Other' }
  ];

  const eventOptions = [
    {
      value: 'tug-of-war',
      label: 'Tug of War',
      price: 100,
      description: 'Team-based strength competition',
      category: 'Sports'
    },
    {
      value: 'cricket',
      label: 'Cricket',
      price: 200,
      description: 'T20 format cricket tournament',
      category: 'Sports'
    },
    {
      value: 'football',
      label: 'Football',
      price: 150,
      description: '5-a-side football tournament',
      category: 'Sports'
    },
    {
      value: 'hackathon',
      label: 'Hackathon',
      price: 300,
      description: '24-hour coding competition',
      category: 'Technical'
    },
    {
      value: 'dance',
      label: 'Dance Competition',
      price: 120,
      description: 'Solo & group dance performances',
      category: 'Cultural'
    }
  ];

  useEffect(() => {
    const newTotal = selectedEvents.reduce((sum, event) => sum + event.price, 0);
    setTotalCost(newTotal);
  }, [selectedEvents]);

  const handleEventsSelect = (eventValue) => {
    const updatedEvents = selectedEvents.filter(event => event.value !== eventValue);
    setSelectedEvents(updatedEvents);
    setFormData(prev => ({
      ...prev,
      selectedEvents: updatedEvents.map(event => event.value)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (selectedEvents.length === 0) {
      toast.error('Please select at least one event');
      return;
    }

    try {
      await register({
        ...formData,
        selectedEvents: selectedEvents
      });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-[var(--surface)] p-8 rounded-2xl shadow-lg border border-[var(--accent-primary)] border-opacity-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={formItemVariants} className="text-center mb-8 mt-4">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3 font-['Plus_Jakarta_Sans']">
              Event<span className="text-[var(--accent-primary)]">Buzz</span>
            </h1>
            <p className="text-[var(--text-secondary)]">Register for your favorite events</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
            {/* Name and Email row */}
            <motion.div variants={formItemVariants} className="flex gap-6">
              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Phone and College row */}
            <motion.div variants={formItemVariants} className="flex gap-6">
              <div className="relative w-full">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="relative w-full">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="College Name"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Course and Year row */}
            <motion.div variants={formItemVariants} className="flex gap-6">
              <div className="relative w-full">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <select
                  className="w-full pl-12 pr-4 py-3 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] appearance-none cursor-pointer"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  required
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative w-full">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <select
                  className="w-full pl-12 pr-4 py-3 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] appearance-none cursor-pointer"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Event Selection */}
            <motion.div variants={formItemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Select Events
              </label>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full p-3 text-left bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] hover:bg-[var(--elevated)]/80 transition-colors"
              >
                {selectedEvents.length === 0
                  ? 'Click to select events'
                  : `${selectedEvents.length} events selected`}
              </button>

              <EventSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onEventsSelect={handleEventsSelect}
                selectedEvents={selectedEvents}
              />

              {selectedEvents.length > 0 && (
                <EventSummary selectedEvents={selectedEvents} />
              )}
            </motion.div>

            {/* Selected Events Summary */}
            {/* Selected Events Summary */}
            <AnimatePresence>
              {selectedEvents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[var(--elevated)] rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[var(--text-primary)] font-medium">Selected Events</h4>
                    <div className="flex items-center text-[var(--accent-primary)] font-semibold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{totalCost}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedEvents.map((event) => (
                      <div key={event.value} className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">{event.label}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updatedEvents = selectedEvents.filter(e => e.value !== event.value);
                            setSelectedEvents(updatedEvents);
                            setFormData(prev => ({
                              ...prev,
                              selectedEvents: updatedEvents.map(e => e.value)
                            }));
                          }}
                          className="text-[var(--text-secondary)] hover:text-[var(--status-error)]"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={selectedEvents.length === 0}
              className="w-full py-3 bg-[var(--accent-primary)] text-[var(--background)] rounded-lg font-semibold transition-colors duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              Register Now
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;