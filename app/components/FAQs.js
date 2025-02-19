'use client';
import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I create a new event?",
            answer: "Creating an event is simple! Navigate to the 'Create Event' option in the Events menu. Fill in your event details including title, date, location, and description. You can also add custom fields, registration options, and promotional materials."
        },
        {
            question: "Can I manage attendee registrations?",
            answer: "Yes, you have full control over attendee management. Track registrations, send automated confirmations, manage waitlists, and export attendance lists. You can also set up custom registration forms and collect specific information from attendees."
        },
        {
            question: "What analytics are available for my events?",
            answer: "EventBuzz provides comprehensive analytics including attendance rates, engagement metrics, feedback scores, and registration patterns. Access detailed reports to track event performance and make data-driven decisions for future events."
        },
        {
            question: "Is there support for virtual events?",
            answer: "Absolutely! EventBuzz fully supports virtual and hybrid events. Integrate with popular video conferencing platforms, manage virtual attendee engagement, and track online participation just as easily as in-person events."
        }
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full bg-[var(--background)] pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[var(--text-secondary)] text-base">
                        Find answers to common questions about EventBuzz
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="border border-[var(--accent-primary)] border-opacity-20 rounded-lg overflow-hidden"
                        >
                            <motion.button
                                className="w-full p-6 flex justify-between items-center bg-[var(--surface)] text-left"
                                onClick={() => toggleQuestion(index)}
                                whileHover={{ backgroundColor: 'rgba(100, 255, 218, 0.05)' }}
                            >
                                <span className="text-lg font-semibold text-[var(--text-primary)]">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-[var(--accent-primary)]" />
                                </motion.div>
                            </motion.button>
                            
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-[var(--surface)] bg-opacity-50"
                                    >
                                        <div className="p-6 pt-0">
                                            <p className="text-[var(--text-secondary)]">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Link */}
                <motion.div 
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-[var(--text-secondary)] mb-4">
                        Didn't find what you're looking for?
                    </p>
                    <Link href="/contact">
                        <motion.button
                            className="inline-flex items-center px-6 py-3 bg-[var(--surface)] text-[var(--text-primary)] rounded-lg border border-[var(--accent-primary)] border-opacity-20"
                            whileHover={{ 
                                scale: 1.02,
                                backgroundColor: 'rgba(100, 255, 218, 0.05)'
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <MessageCircle className="w-5 h-5 mr-2 text-[var(--accent-primary)]" />
                            Contact Support
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQSection;