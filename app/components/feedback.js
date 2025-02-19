"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Info } from 'lucide-react';

const InquireModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    subject: 'bug',
    message: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    subject: '',
    message: '',
    email: '',
  });

  const modalVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.5 } },
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    if (showSuccess) setShowSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { subject: '', message: '', email: '' };

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsModalOpen(false);
      }, 3000);

      setFormData({ subject: 'bug', message: '', email: '' });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Feedback Icon/Button */}
      <motion.div
        className="fixed top-1/2 right-0 z-50 flex items-center bg-[#112240] text-[#94A3B8] rounded-l-lg cursor-pointer overflow-hidden shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleModalToggle}
        animate={{
          width: isHovered ? '110px' : '40px',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ width: '50px', whiteSpace: 'nowrap' }}
      >
        <div className="flex items-center px-3 py-2 md:py-5">
          <MessageSquare className="text-[#64FFDA] text-lg sm:text-xl" />
          <motion.span
            className="ml-2 text-sm text-[#94A3B8]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Feedback
          </motion.span>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed top-0 right-0 w-11/12 sm:w-3/4 lg:w-1/2 h-full bg-[#0A192F] text-[#94A3B8] shadow-lg z-50 overflow-y-auto custom-scrollbar"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-4 sm:p-6 flex flex-col gap-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-3xl font-['Plus_Jakarta_Sans'] text-[#64FFDA]">
                  Feedback/Queries
                </h2>
                <button
                  className="text-[#94A3B8] hover:text-white text-lg transition-colors"
                  onClick={handleModalToggle}
                >
                  ✖
                </button>
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Subject Select Box */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#94A3B8]">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-[#112240] border border-[#1E293B] rounded-lg 
                             focus:outline-none focus:ring-1 focus:ring-[#64FFDA] hover:border-[#64FFDA]
                             text-white transition-colors"
                  >
                    <option value="bug">Report a Bug</option>
                    <option value="form-issue">Any Problem Occurred While Form Submission</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.subject && (
                    <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                      <Info className="w-4 h-4" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8]">
                    Email <span className="text-[#64FFDA] ml-1">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-[#112240] border border-[#1E293B] rounded-lg 
                             focus:outline-none focus:ring-1 focus:ring-[#64FFDA] hover:border-[#64FFDA]
                             text-white transition-colors"
                    placeholder="Your email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                      <Info className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#94A3B8]">
                    Message <span className="text-[#64FFDA] ml-1">(required)</span>
                  </label>
                  <div data-lenis-prevent>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-[#112240] border border-[#1E293B] rounded-lg 
                               focus:outline-none focus:ring-1 focus:ring-[#64FFDA] hover:border-[#64FFDA]
                               text-white transition-colors"
                      placeholder="Type your message here..."
                    />
                  </div>
                  {errors.message && (
                    <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                      <Info className="w-4 h-4" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#64FFDA] text-[#0A192F] px-4 py-2 rounded-lg 
                           hover:bg-[#4CD6B4] disabled:opacity-50 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {/* Success Message */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center bg-[#0A192F] bg-opacity-90"
                    >
                      <div className="bg-[#064E3B] bg-opacity-20 border border-[#64FFDA] text-[#64FFDA] px-4 py-3 rounded-lg" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> Submitted your response!</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleModalToggle}
        ></div>
      )}
    </>
  );
};

export default InquireModal;