import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    // Sample events data
    const events = [
        { date: '2025-02-20', title: 'Tech Workshops', type: 'Workshop', time: '14:00' },
        { date: '2025-02-22', title: 'Cultural Night', type: 'Cultural', time: '18:00' },
        { date: '2025-02-25', title: 'Career Fair', type: 'Career', time: '10:00' },
    ];

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getEventForDate = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.find(event => event.date === dateStr);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const dayVariants = {
        hover: { scale: 1.1, backgroundColor: '#1A2C4C' },
        tap: { scale: 0.95 }
    };

    return (
        <div className="max-w-4xl mx-auto py-20">
            {/* Calendar Heading Section */}
            < div className="text-center mb-8" >
                <h1 className="text-4xl font-bold text-white mb-3 font-['Plus_Jakarta_Sans']">
                    Event <span className="text-[#64FFDA]">Calendar</span>
                </h1>
                <p className="text-[#94A3B8] max-w-2xl mx-auto font-['Inter']">
                    Stay updated with all campus events and activities. Find workshops,
                    seminars, and social gatherings all in one place.
                </p>
            </div >
            <div className="max-w-4xl mx-auto p-6 bg-[#0A192F] rounded-xl shadow-2xl py-20">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <div className="flex space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-[#112240] text-[#64FFDA] hover:bg-[#1A2C4C]"
                            onClick={previousMonth}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-[#112240] text-[#64FFDA] hover:bg-[#1A2C4C]"
                            onClick={nextMonth}
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Week days */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-[#94A3B8] font-medium py-2">
                            {day}
                        </div>
                    ))}

                    {/* Empty cells for previous month */}
                    {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                        <div key={`empty-${index}`} className="p-2" />
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1;
                        const event = getEventForDate(day);

                        return (
                            <motion.div
                                key={day}
                                variants={dayVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => setSelectedDate(day)}
                                className={`relative p-2 rounded-lg cursor-pointer transition-colors
                ${selectedDate === day ? 'bg-[#1A2C4C]' : 'hover:bg-[#112240]'}
                ${event ? 'border border-[#64FFDA]' : ''}`}
                            >
                                <span className="text-white">{day}</span>
                                {event && (
                                    <div className="mt-1">
                                        <div className="text-xs text-[#64FFDA] truncate">{event.title}</div>
                                        <div className="text-xs text-[#94A3B8]">{event.time}</div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Selected Date Events */}
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 bg-[#112240] rounded-lg"
                    >
                        <h3 className="text-white font-medium mb-2">
                            {months[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
                        </h3>
                        {getEventForDate(selectedDate) ? (
                            <div className="space-y-2">
                                <div className="flex items-start space-x-3">
                                    <CalendarIcon className="w-4 h-4 text-[#64FFDA] mt-1" />
                                    <div>
                                        <p className="text-white font-medium">
                                            {getEventForDate(selectedDate).title}
                                        </p>
                                        <p className="text-[#94A3B8] text-sm">
                                            {getEventForDate(selectedDate).time} - {getEventForDate(selectedDate).type}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-[#94A3B8]">No events scheduled</p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Calendar;