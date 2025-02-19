'use client'
import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Shield, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const Header = ({ isAdmin = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
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

    const navItems = [
        {
            name: 'Events',
            icon: Calendar,
            dropdownItems: ['Upcoming Events', 'Past Events', 'My Events', 'Create Event']
        },
        ...(isAdmin ? [{

            name: 'Dashboard',
            dropdownItems: ['Overview', 'Analytics', 'Reports']

        }] : []),
        { name: 'About' },
        ...(isAdmin ? [{
            name: 'Admin',
            icon: Shield,
            dropdownItems: ['User Management', 'Settings', 'Logs']
        }] : []),
    ];

    const DropdownMenu = ({ items, isOpen, onClose }) => (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 py-2 w-48 bg-[var(--surface)] rounded-lg shadow-xl border border-[var(--accent-primary)] border-opacity-20 backdrop-blur-md"
                    onMouseLeave={onClose}
                >
                    {items.map((item, index) => (
                        <motion.a
                            key={index}
                            href="#"
                            className="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--elevated)] transition-colors duration-200"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                        >
                            {item}
                        </motion.a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed w-full z-50 ${isAtTop ? 'bg-transparent' : 'bg-[var(--background)]/95 backdrop-blur-md'} transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4 md:py-6">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link href="/">
                            <h1 className="text-2xl font-bold text-[var(--text-primary)] mr-8 font-['Plus_Jakarta_Sans']">
                                Event<span className="text-[var(--accent-primary)]">Buzz</span>
                                {isAdmin && (
                                    <motion.span
                                        className="ml-2 text-xs bg-[var(--accent-primary)] text-[var(--background)] px-2 py-1 rounded-full font-normal"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        Admin
                                    </motion.span>
                                )}
                            </h1>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <div key={item.name} className="relative">
                                <motion.div
                                    className="flex items-center space-x-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    onHoverStart={() => item.dropdownItems && setActiveDropdown(item.name)}
                                >
                                    {item.icon && <item.icon className="w-4 h-4" />}
                                    <span>{item.name}</span>
                                    {item.dropdownItems && <ChevronDown className="w-4 h-4" />}
                                </motion.div>
                                {item.dropdownItems && (
                                    <DropdownMenu
                                        items={item.dropdownItems}
                                        isOpen={activeDropdown === item.name}
                                        onClose={() => setActiveDropdown(null)}
                                    />
                                )}
                            </div>
                        ))}

                        <motion.div
                            className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            whileHover={{ scale: 1.05 }}
                        >
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </motion.div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-[var(--text-secondary)]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isMenuOpen ? "close" : "open"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-[var(--surface)]"
                    >
                        <div className="px-4 py-3 space-y-3">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    className="space-y-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex items-center justify-between text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                        <div className="flex items-center space-x-2">
                                            {item.icon && <item.icon className="w-4 h-4" />}
                                            <span>{item.name}</span>
                                        </div>
                                        {item.dropdownItems && (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </div>
                                    {item.dropdownItems && (
                                        <div className="pl-6 space-y-2">
                                            {item.dropdownItems.map((dropdownItem, idx) => (
                                                <motion.a
                                                    key={idx}
                                                    href="#"
                                                    className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    {dropdownItem}
                                                </motion.a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            <motion.div
                                className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ x: 5 }}
                            >
                                <User className="w-4 h-4" />
                                <span>Profile</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;