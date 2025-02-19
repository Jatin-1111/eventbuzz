"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, School, BookOpen, Calendar, Trophy } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    year: '',
    event: ''
  });

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
    { value: 'tug-of-war', label: 'Tug of War' },
    { value: 'cricket', label: 'Cricket' },
    { value: 'football', label: 'Football' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const InputWrapper = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-5xl bg-[var(--surface)] p-8 rounded-2xl shadow-lg border border-[var(--accent-primary)] border-opacity-20"
      >
        <div className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3 font-['Plus_Jakarta_Sans']">
            Event<span className="text-[var(--accent-primary)]">Buzz</span>
          </h1>
          <p className="text-[var(--text-secondary)]">Register for your favorite events</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
          {/* Name and Email row */}
          <div className="flex gap-6">
            <InputWrapper>
              <div className="relative">
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
            </InputWrapper>

            <InputWrapper>
              <div className="relative">
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
            </InputWrapper>
          </div>

          {/* Phone and College row */}
          <div className="flex gap-6">
            <InputWrapper>
              <div className="relative">
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
            </InputWrapper>

            <InputWrapper>
              <div className="relative">
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
            </InputWrapper>
          </div>

          {/* Course and Year row */}
          <div className="flex gap-6">
            <InputWrapper>
              <div className="relative">
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
            </InputWrapper>

            <InputWrapper>
              <div className="relative">
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
            </InputWrapper>
          </div>

          {/* Event selection row */}
          <InputWrapper>
            <div className="relative">
              <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
              <select
                className="w-full pl-12 pr-4 py-3 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] appearance-none cursor-pointer"
                value={formData.event}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                required
              >
                <option value="">Select Event</option>
                {eventOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </InputWrapper>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[var(--accent-primary)] text-[var(--background)] rounded-lg font-semibold transition-colors duration-200 hover:opacity-90"
            type="submit"
          >
            Register Now
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;