'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Shield, Calendar, ChevronDown, LogIn } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const MotionLink = motion(Link);

const Header = ({ isAuthenticated = false, userRole = 'user' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const { scrollY } = useScroll();
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // Check if user has admin role (you can store this in Firebase custom claims or user profile)
            setIsAdmin(currentUser?.email === "admin@example.com"); // Modify this according to your admin logic
        });

        return () => unsubscribe();
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsAtTop(latest < 50);
    });

    // Define navigation items based on authentication state and role
    const getNavItems = () => {
        const publicItems = [
            {
                name: 'Events',
                icon: Calendar,
                href: '/events',
            },
            {
                name: 'About',
                href: '/about',
            },
            {
                name: 'Contact',
                href: '/contact',
            },
        ];

        const authenticatedItems = [
            {
                name: 'Events',
                icon: Calendar,
                dropdownItems: ['All Events', 'My Events', 'Live Events'],
                href: '/events',
            },
            {
                name: 'About',
                href: '/about',
            },
            {
                name: 'Contact',
                href: '/contact',
            },
        ];

        const adminItems = [
            ...authenticatedItems,
            {
                name: 'Dashboard',
                icon: Shield,
                dropdownItems: ['Overview', 'Analytics', 'Reports'],
                href: '/dashboard',
            },
            {
                name: 'Admin',
                icon: Shield,
                dropdownItems: ['User Management', 'Event Management', 'Settings'],
                href: '/admin',
            },
        ];

        if (!isAuthenticated) return publicItems;
        return userRole === 'admin' ? adminItems : authenticatedItems;
    };

    const navItems = getNavItems();

    const AuthButtons = () => {
        const handleLogout = async () => {
            try {
                await signOut(auth);
                router.push('/login');
                toast.success('Logged out successfully');
            } catch (error) {
                toast.error('Logout failed');
            }
        };

        if (!user) {
            return (
                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                        </motion.div>
                    </Link>
                </div>
            );
        }

        return (
            <div className="relative">
                <motion.div
                    className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                    onMouseEnter={() => setActiveDropdown('profile')}
                >
                    <User className="w-5 h-5" />
                    <span>{user.displayName || 'Profile'}</span>
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
                <DropdownMenu
                    items={[
                        { label: 'Profile', href: '/profile' },
                        { label: 'Settings', href: '/settings' },
                        { label: 'Logout', onClick: handleLogout }
                    ]}
                    isOpen={activeDropdown === 'profile'}
                    onClose={() => setActiveDropdown(null)}
                />
            </div>
        );
    };

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
                        item.onClick ? (
                            <motion.button
                                key={index}
                                onClick={item.onClick}
                                className="w-full text-left block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--elevated)] transition-colors duration-200"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ x: 5 }}
                            >
                                {item.label}
                            </motion.button>
                        ) : (
                            <Link key={index} href={item.href}>
                                <motion.a
                                    className="block px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--elevated)] transition-colors duration-200"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                >
                                    {item.label}
                                </motion.a>
                            </Link>
                        )
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (!isMounted) {
        return null;
    }

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 }
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed w-full z-50 ${isAtTop ? 'bg-transparent' : 'bg-[var(--background)]/95 backdrop-blur-md'} transition-colors duration-300`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4 md:py-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold text-[var(--text-primary)] mr-8 font-['Plus_Jakarta_Sans']"
                        >
                            Event<span className="text-[var(--accent-primary)]">Buzz</span>
                            {userRole === 'admin' && isAuthenticated && (
                                <motion.span
                                    className="ml-2 text-xs bg-[var(--accent-primary)] text-[var(--background)] px-2 py-1 rounded-full font-normal"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Admin
                                </motion.span>
                            )}
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <div key={item.name} className="relative">
                                <Link href={item.href} className="group">
                                    <div
                                        className="flex items-center space-x-1 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] cursor-pointer"
                                        onMouseEnter={() => item.dropdownItems && setActiveDropdown(item.name)}
                                    >
                                        {item.icon && <item.icon className="w-4 h-4" />}
                                        <span>{item.name}</span>
                                        {item.dropdownItems && <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </Link>
                                {item.dropdownItems && (
                                    <DropdownMenu
                                        items={item.dropdownItems}
                                        isOpen={activeDropdown === item.name}
                                        onClose={() => setActiveDropdown(null)}
                                    />
                                )}
                            </div>
                        ))}
                        <AuthButtons />
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
                                    <Link href={item.href}>
                                        <div className="flex items-center justify-between text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                                            <div className="flex items-center space-x-2">
                                                {item.icon && <item.icon className="w-4 h-4" />}
                                                <span>{item.name}</span>
                                            </div>
                                            {item.dropdownItems && (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </Link>
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
                            <div className="pt-4 border-t border-[var(--accent-primary)] border-opacity-20">
                                <AuthButtons />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;