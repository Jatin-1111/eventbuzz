import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="flex justify-center items-center py-20">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full"
            />
        </div>
    );
};

export default Loading;