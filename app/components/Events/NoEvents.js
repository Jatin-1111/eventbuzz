import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const NoEvents = ({ activeTab }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-3 text-center py-20"
        >
            <Calendar className="w-16 h-16 text-[var(--text-secondary)] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                No Events Found
            </h3>
            <p className="text-[var(--text-secondary)]">
                {activeTab === 'registered'
                    ? "You haven't registered for any events yet"
                    : "No events available at the moment"}
            </p>
        </motion.div>
    );
};

export default NoEvents;