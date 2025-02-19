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
    const [error, setError] = useState(null);
    const [events, setEvents] = useState({
        live: [],
        past: [],
        registered: []
    });

    // Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/events?type=${activeTab}`);

                // Check if response is ok before trying to parse JSON
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Try to parse the response as JSON
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Response was not JSON");
                }

                const data = await response.json();

                // Validate the data structure
                if (!Array.isArray(data)) {
                    throw new TypeError("Expected array of events");
                }

                setEvents(prev => ({
                    ...prev,
                    [activeTab]: data
                }));
            } catch (error) {
                console.error('Error fetching events:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [activeTab]);

    // Error component
    const ErrorMessage = () => (
        <div className="text-center p-8 bg-red-50 rounded-lg">
            <p className="text-red-600">
                Failed to load events. {error}
            </p>
            <button
                onClick={() => setActiveTab(activeTab)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Try Again
            </button>
        </div>
    );

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

                {/* Content Area */}
                <div className="mt-8">
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <ErrorMessage />
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
        </div>
    );
};

export default EventsPage;