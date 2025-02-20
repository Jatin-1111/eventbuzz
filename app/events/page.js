'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Trophy, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { cn } from "@/lib/utils";

const EventCard = ({ event, activeTab }) => {
    const getCategoryColor = (category) => {
        switch (category) {
            case 'technical': return 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30';
            case 'cultural': return 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30';
            case 'sports': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
            default: return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="bg-gray-900 h-full border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="w-full h-48 bg-gray-800 relative overflow-hidden">
                    <img
                        src={event.image || "/api/placeholder/400/320"}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <CardHeader className="pb-4 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1">
                            <CardTitle className="text-lg sm:text-xl font-bold text-gray-100">
                                {event.title}
                            </CardTitle>
                            <Badge className={getCategoryColor(event.category)}>
                                {event.category?.charAt(0).toUpperCase() + event.category?.slice(1) || 'Event'}
                            </Badge>
                        </div>
                        <Trophy className="w-6 h-6 text-gray-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <CardDescription className="text-gray-400">
                            {event.description}
                        </CardDescription>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span>{event.time || 'TBA'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Users className="w-4 h-4" />
                                <span>{event.capacity || 'Unlimited'}</span>
                            </div>
                        </div>

                        <Separator className="bg-gray-800" />

                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full flex items-center justify-center"
                                    >
                                        <InfoIcon className="w-4 h-4 mr-2" />
                                        Details
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-xl font-semibold">
                                                {event.title}
                                            </DialogTitle>
                                            <Badge
                                                variant="secondary"
                                                className={`${getCategoryColor(event.category)} ml-2`}
                                            >
                                                {event.category}
                                            </Badge>
                                        </div>
                                    </DialogHeader>
                                    <div className="mt-6 space-y-6">
                                        <div className="text-[var(--text-secondary)]">
                                            {event.description}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-lg bg-[var(--elevated)] border border-[var(--accent-primary)] border-opacity-10">
                                                <div className="flex items-center mb-2 text-[var(--text-primary)]">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <h4 className="font-medium">Date & Time</h4>
                                                </div>
                                                <p className="text-[var(--text-secondary)]">
                                                    {new Date(event.date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                    <br />
                                                    {event.time}
                                                </p>
                                            </div>

                                            <div className="p-4 rounded-lg bg-[var(--elevated)] border border-[var(--accent-primary)] border-opacity-10">
                                                <div className="flex items-center mb-2 text-[var(--text-primary)]">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    <h4 className="font-medium">Location</h4>
                                                </div>
                                                <p className="text-[var(--text-secondary)]">
                                                    {event.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button
                                className={cn(
                                    "w-full",
                                    activeTab === 'past' && "bg-gray-600 hover:bg-gray-500 cursor-not-allowed",
                                    activeTab === 'registered' && "bg-green-600 hover:bg-green-500",
                                    activeTab === 'upcoming' && "bg-[var(--accent-primary)] hover:opacity-90"
                                )}
                                disabled={activeTab === 'past'}
                                asChild={activeTab !== 'past'}
                            >
                                {activeTab === 'past' ? (
                                    <span>Event Ended</span>
                                ) : (
                                    <Link href={'/register'}>
                                        {activeTab === 'registered' ? 'Registered' : 'Register Now'}
                                    </Link>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const Loading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-800 rounded-lg h-96 animate-pulse" />
        ))}
    </div>
);

const NoEvents = ({ activeTab }) => (
    <div className="col-span-full text-center py-12">
        <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-200 mb-2">
                No {activeTab} events found
            </h3>
            <p className="text-gray-400">
                {activeTab === 'live' && "There are no upcoming events at the moment."}
                {activeTab === 'past' && "No past events to display."}
                {activeTab === 'registered' && "You haven't registered for any events yet."}
            </p>
        </div>
    </div>
);

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('live');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState({
        live: [],
        past: [],
        registered: []
    });

    // Sample data for demonstration
    const sampleEvents = {
        live: [
            {
                id: 1,
                title: "Hackathon 2025",
                category: "technical",
                date: "2025-03-15",
                time: "09:00 AM - 09:00 PM",
                location: "Innovation Hub",
                description: "24-hour coding challenge to build innovative solutions for real-world problems.",
                capacity: "200 participants",
                image: "https://res.cloudinary.com/dgzxsc49b/image/upload/v1740029111/uploaded_images/hjztm751noteeqhyqd2h.jpg"
            },
            {
                id: 2,
                title: "Cultural Night",
                category: "cultural",
                date: "2025-03-20",
                time: "06:00 PM - 10:00 PM",
                location: "Main Auditorium",
                description: "A night of music, dance, and theatrical performances showcasing diverse talents.",
                capacity: "500 attendees",
                image: "https://res.cloudinary.com/dgzxsc49b/image/upload/v1740029109/uploaded_images/ww8z3hkioogsipzzqqb3.jpg"
            },
            {
                id: 3,
                title: "Sports Tournament",
                category: "sports",
                date: "2025-03-25",
                time: "08:00 AM - 06:00 PM",
                location: "Sports Complex",
                description: "Inter-college sports competition featuring multiple sporting events.",
                capacity: "300 participants",
                image: "https://res.cloudinary.com/dgzxsc49b/image/upload/v1740029112/uploaded_images/diejyni8x9ml0p2drhqr.jpg",
            }
        ],
        past: [
            {
                id: 4,
                title: "Tech Summit 2024",
                category: "technical",
                date: "2024-12-15",
                time: "10:00 AM - 05:00 PM",
                location: "Conference Hall",
                description: "Annual technology conference featuring industry experts and innovative showcases.",
                capacity: "400 attendees",
                image: "https://res.cloudinary.com/dgzxsc49b/image/upload/v1740029114/uploaded_images/tancqmkl0v03u6v7gxno.jpg"
            }
        ],
        registered: [
            {
                id: 5,
                title: "Design Workshop",
                category: "technical",
                date: "2025-04-01",
                time: "02:00 PM - 05:00 PM",
                location: "Design Studio",
                description: "Hands-on workshop on UI/UX design principles and tools.",
                capacity: "50 participants",
                image: "https://res.cloudinary.com/dgzxsc49b/image/upload/v1740029113/uploaded_images/ep6fwswvdx9jgcqafak2.jpg"
            }
        ]
    };

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                // Simulate API call with sample data
                await new Promise(resolve => setTimeout(resolve, 1000));
                setEvents(sampleEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Campus Events</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover and participate in various events happening around the campus
                    </p>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} className="mb-8">
                    <TabsList className="flex justify-center bg-gray-900 p-1 rounded-lg">
                        <TabsTrigger
                            value="live"
                            onClick={() => setActiveTab('live')}
                            className="flex-1"
                        >
                            Live Events
                        </TabsTrigger>
                        <TabsTrigger
                            value="registered"
                            onClick={() => setActiveTab('registered')}
                            className="flex-1"
                        >
                            Registered
                        </TabsTrigger>
                        <TabsTrigger
                            value="past"
                            onClick={() => setActiveTab('past')}
                            className="flex-1"
                        >
                            Past Events
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <div className="text-center p-8 bg-red-900/20 rounded-lg">
                            <p className="text-red-400">Failed to load events: {error}</p>
                            <Button
                                onClick={() => setActiveTab(activeTab)}
                                className="mt-4"
                                variant="destructive"
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EventsPage;