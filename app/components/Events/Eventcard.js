import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EventCard = ({ event, activeTab }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-[var(--surface)] rounded-xl overflow-hidden border border-[var(--elevated)] hover:border-[var(--accent-primary)] transition-all duration-300"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={event.image || '/placeholder-event.jpg'}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--accent-primary)] text-[var(--background)] rounded-full text-sm">
                        {event.category}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                    {event.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                    {event.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-[var(--text-secondary)]">
                        <Calendar className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
                        {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-[var(--text-secondary)]">
                        <Clock className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
                        {event.time}
                    </div>
                    <div className="flex items-center text-[var(--text-secondary)]">
                        <MapPin className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
                        {event.location}
                    </div>
                    <div className="flex items-center text-[var(--text-secondary)]">
                        <Users className="w-4 h-4 mr-2 text-[var(--accent-primary)]" />
                        {event.attendees} attendees
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <Link href={`/events/${event.id}`}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 text-[var(--accent-primary)]"
                        >
                            <span>View Details</span>
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    </Link>
                    {activeTab === 'live' && !event.isRegistered && (
                        <Link href={`/register`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-[var(--accent-primary)] text-[var(--background)] rounded-lg"
                            >
                                Register
                            </motion.button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;