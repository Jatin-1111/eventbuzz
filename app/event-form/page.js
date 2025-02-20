'use client';
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Link, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FormField = motion.div;
const FormContainer = motion.div;

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
            when: "beforeChildren"
        }
    }
};

const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 }
    }
};

const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 15
        }
    },
    exit: {
        scale: 0.8,
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

const EventForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        category: 'workshop',
        registrationLink: '',
        image: null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await fetch('/api/events', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            setSuccess(true);
            setFormData({
                title: '',
                description: '',
                date: '',
                time: '',
                location: '',
                capacity: '',
                category: 'workshop',
                registrationLink: '',
                image: null
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="py-24 bg-[var(--background)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <FormContainer
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl mx-auto p-6 bg-[var(--surface)] rounded-lg shadow-lg"
            >
                <motion.h2
                    className="text-2xl font-bold mb-6 text-[var(--text-primary)]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Create New Event
                </motion.h2>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-4 p-4 bg-[var(--status-error)]/10 rounded-md flex items-center gap-2 text-[var(--status-error)]"
                        >
                            <AlertCircle size={20} />
                            <p>{error}</p>
                        </motion.div>
                    )}

                    {success && (
                        <motion.div
                            variants={successVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="mb-4 p-4 bg-[var(--status-success)]/10 rounded-md flex items-center gap-2 text-[var(--status-success)]"
                        >
                            <Check size={20} />
                            <p>Event created successfully!</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <FormField variants={fieldVariants}>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                            Event Title
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                            placeholder="Enter event title"
                        />
                    </FormField>

                    {/* Description */}
                    <FormField variants={fieldVariants}>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                            Description
                        </label>
                        <motion.textarea
                            whileFocus={{ scale: 1.01 }}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                            placeholder="Enter event description"
                        />
                    </FormField>

                    {/* Date and Time */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        variants={fieldVariants}
                    >
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-[var(--accent-primary)]" />
                                    Date
                                </div>
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-[var(--accent-primary)]" />
                                    Time
                                </div>
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                            />
                        </div>
                    </motion.div>

                    {/* Location and Capacity */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        variants={fieldVariants}
                    >
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-[var(--accent-primary)]" />
                                    Location
                                </div>
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                                placeholder="Enter location"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-[var(--accent-primary)]" />
                                    Capacity
                                </div>
                            </label>
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                required
                                min="1"
                                className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                                placeholder="Enter capacity"
                            />
                        </div>
                    </motion.div>

                    {/* Category */}
                    <FormField variants={fieldVariants}>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                            Category
                        </label>
                        <motion.select
                            whileFocus={{ scale: 1.01 }}
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                        >
                            <option value="workshop">Workshop</option>
                            <option value="seminar">Seminar</option>
                            <option value="conference">Conference</option>
                            <option value="social">Social Event</option>
                            <option value="other">Other</option>
                        </motion.select>
                    </FormField>

                    {/* Registration Link */}
                    <FormField variants={fieldVariants}>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                            <div className="flex items-center gap-2">
                                <Link size={16} className="text-[var(--accent-primary)]" />
                                Registration Link
                            </div>
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="url"
                            name="registrationLink"
                            value={formData.registrationLink}
                            onChange={handleInputChange}
                            className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)]"
                            placeholder="Enter registration link (optional)"
                        />
                    </FormField>

                    {/* Image Upload */}
                    <FormField variants={fieldVariants}>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                            Event Image
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.01 }}
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="w-full p-2 bg-[var(--input-background)] border border-[var(--elevated)] rounded-md focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] text-[var(--text-primary)] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent-primary)] file:text-[var(--background)] hover:file:bg-[var(--accent-primary)]/90"
                        />
                    </FormField>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[var(--accent-primary)] text-[var(--background)] py-2 px-4 rounded-md hover:bg-[var(--accent-primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Creating Event...
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Create Event
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </form>
            </FormContainer>
        </motion.div>
    );
};

export default EventForm;