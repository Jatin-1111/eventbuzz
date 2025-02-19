'use client';
import React, { useState, useEffect } from 'react';
import EventCard from '../components/Events/Eventcard';
import EventTabs from '../components/Events/EventTabs';
import Loading from '../components/Events/Loading';
import NoEvents from '../components/Events/NoEvents';
import { motion, AnimatePresence } from 'framer-motion';

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('live');
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState({
        live: [],
        past: [],
        registered: []
    });

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/events?type=${activeTab}`);
                const data = await response.json();
                setEvents(prev => ({
                    ...prev,
                    [activeTab]: data
                }));
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-[var(--background)] pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Campus Events
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Discover and participate in various events happening around the campus
                    </p>
                </div>

                {/* Tabs */}
                <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Events Grid */}
                {loading ? (
                    <Loading />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {events[activeTab]?.length > 0 ? (
                                events[activeTab].map((event) => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        activeTab={activeTab}
                                    />
                                ))
                            ) : (
                                <NoEvents activeTab={activeTab} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default EventsPage;