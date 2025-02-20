'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, IndianRupee } from 'lucide-react';

const EventSelectionModal = ({ isOpen, onClose, onEventsSelect, selectedEvents }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All Events' },
        { id: 'technical', label: 'Technical', icon: '💻' },
        { id: 'sports', label: 'Sports', icon: '⚽' },
        { id: 'cultural', label: 'Cultural', icon: '🎭' },
        { id: 'workshops', label: 'Workshops', icon: '🛠️' },
    ];

    const events = [
        {
            id: 1,
            name: 'Hackathon',
            category: 'technical',
            price: 299,
            description: '24-hour coding competition'
        },
        {
            id: 2,
            name: 'Cricket Tournament',
            category: 'sports',
            price: 499,
            description: 'T20 format cricket tournament'
        },
        // Add more events...
    ];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleEvent = (event) => {
        const isSelected = selectedEvents.some(e => e.id === event.id);
        if (isSelected) {
            onEventsSelect(selectedEvents.filter(e => e.id !== event.id));
        } else {
            onEventsSelect([...selectedEvents, event]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-[var(--surface)] rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl"
                    >
                        <div className="p-4 border-b border-[var(--elevated)]">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Select Events</h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-[var(--elevated)] rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-[var(--text-secondary)]" />
                                </button>
                            </div>

                            <div className="mt-4 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-2 bg-[var(--elevated)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-3 py-1.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors ${selectedCategory === category.id
                                                ? 'bg-[var(--accent-primary)] text-[var(--background)]'
                                                : 'bg-[var(--elevated)] text-[var(--text-primary)]'
                                            }`}
                                    >
                                        <span>{category.icon}</span>
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-[60vh] p-4 space-y-3">
                            {filteredEvents.map(event => (
                                <motion.button
                                    key={event.id}
                                    onClick={() => toggleEvent(event)}
                                    className={`w-full p-3 rounded-lg border text-left transition-all ${selectedEvents.some(e => e.id === event.id)
                                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                                            : 'border-[var(--elevated)] bg-[var(--elevated)]'
                                        }`}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-[var(--text-primary)]">{event.name}</h3>
                                            <p className="text-sm text-[var(--text-secondary)]">{event.description}</p>
                                        </div>
                                        <div className="flex items-center text-[var(--accent-primary)]">
                                            <IndianRupee className="w-4 h-4" />
                                            <span>{event.price}</span>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <div className="p-4 border-t border-[var(--elevated)]">
                            <button
                                onClick={onClose}
                                className="w-full py-2 bg-[var(--accent-primary)] text-[var(--background)] rounded-lg font-medium"
                            >
                                Confirm Selection ({selectedEvents.length} events)
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const EventSummary = ({ selectedEvents }) => {
    const totalPrice = selectedEvents.reduce((sum, event) => sum + event.price, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-[var(--elevated)] border border-[var(--accent-primary)]/20"
        >
            <div className="flex justify-between items-center mb-3">
                <span className="text-[var(--text-primary)]">Selected Events:</span>
                <span className="px-2 py-1 rounded-md bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)] text-sm">
                    {selectedEvents.length} events
                </span>
            </div>

            <div className="space-y-2">
                {selectedEvents.map(event => (
                    <div key={event.id} className="flex justify-between items-center text-sm">
                        <span className="text-[var(--text-secondary)]">{event.name}</span>
                        <div className="flex items-center text-[var(--text-primary)]">
                            <IndianRupee className="w-3 h-3" />
                            <span>{event.price}</span>
                        </div>
                    </div>
                ))}

                <div className="my-2 h-px bg-[var(--accent-primary)]/20" />

                <div className="flex justify-between items-center font-medium">
                    <span className="text-[var(--text-primary)]">Total Amount:</span>
                    <div className="flex items-center text-[var(--accent-primary)]">
                        <IndianRupee className="w-4 h-4" />
                        <span>{totalPrice}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export { EventSelectionModal, EventSummary };