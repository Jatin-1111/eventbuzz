'use client'
import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, User, Shield, Calendar } from 'lucide-react';
import Link from 'next/link';

const Header = ({ isAdmin = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsAtTop(latest < 50);
    });

    const regularNavItems = [
        { name: 'Events', icon: Calendar },
        { name: 'Dashboard', icon: null },
        { name: 'About', icon: null },
        { name: 'Profile', icon: User },
    ];

    const adminNavItems = [
        { name: 'Events', icon: Calendar },
        { name: 'Create', icon: null },
        { name: 'Dashboard', icon: null },
        { name: 'About', icon: null },
        { name: 'Admin Panel', icon: Shield },
        { name: 'Profile', icon: User },
    ];

    const navigationItems = isAdmin ? adminNavItems : regularNavItems;

    return (
        <motion.header
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed w-full z-50 ${isAtTop ? 'bg-transparent' : 'bg-[#0A192F]/95 backdrop-blur-md'} transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4 md:py-6">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href={'/'}>
                            <h1 className="text-2xl font-bold text-white mr-8 font-['Plus_Jakarta_Sans']">
                                Event<span className="text-[#64FFDA]">Buzz</span>
                                {isAdmin && (
                                    <span className="ml-2 text-xs bg-[#64FFDA] text-[#0A192F] px-2 py-1 rounded-full font-normal">
                                        Admin
                                    </span>
                                )}
                            </h1>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href="#"
                                className="flex items-center space-x-1 text-[#94A3B8] hover:text-white font-medium transition-colors duration-200 font-['Inter']"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.icon && <item.icon className="w-4 h-4" />}
                                <span>{item.name}</span>
                            </motion.a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-[#94A3B8] hover:text-white p-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                    open: { height: "auto", opacity: 1 },
                    closed: { height: 0, opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-[#112240]"
            >
                <div className="px-4 py-3 space-y-3">
                    {/* Mobile Navigation */}
                    {navigationItems.map((item, index) => (
                        <motion.a
                            key={item.name}
                            href="#"
                            className="flex items-center space-x-2 py-2 text-[#94A3B8] hover:text-white font-medium transition-colors duration-200 font-['Inter']"
                            variants={{
                                open: { opacity: 1, x: 0 },
                                closed: { opacity: 0, x: -20 }
                            }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {item.icon && <item.icon className="w-4 h-4" />}
                            <span>{item.name}</span>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </motion.header>
    );
};

export default Header;