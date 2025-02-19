import React from 'react';
import { motion } from 'framer-motion';

const EventTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'live', label: 'Live Events' },
        { id: 'past', label: 'Past Events' },
        { id: 'registered', label: 'My Events' }
    ];

    return (
        <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-[var(--surface)] p-1 rounded-lg">
                {tabs.map((tab) => (
                    <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 rounded-lg ${activeTab === tab.id
                                ? 'bg-[var(--accent-primary)] text-[var(--background)]'
                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {tab.label}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default EventTabs;