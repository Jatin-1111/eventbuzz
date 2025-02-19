"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Phone number formatting
    if (e.target.name === 'phone') {
      // Remove any non-digit characters
      value = value.replace(/\D/g, '');
      // Format as (XXX) XXX-XXXX
      if (value.length <= 10) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  const inputVariants = {
    initial: { 
      opacity: 0, 
      x: -20 
    },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const formContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="w-full max-w-md"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div 
          className="bg-[var(--surface)] rounded-lg shadow-xl p-8"
          layoutId="auth-container"
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={isLogin ? 'login' : 'signup'}
                className="text-3xl font-bold text-[var(--text-primary)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </motion.h1>
            </AnimatePresence>
            <motion.p 
              className="text-[var(--text-secondary)] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isLogin ? 'Please sign in to continue' : 'Sign up to get started'}
            </motion.p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            variants={formContainerVariants}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {!isLogin && (
                <>
                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-[var(--input-background)] border border-[var(--elevated)] rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]"
                      required
                    />
                  </motion.div>

                  <motion.div
                    className="relative"
                    variants={inputVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="\(\d{3}\) \d{3}-\d{4}"
                      maxLength="14"
                      className="w-full pl-10 pr-4 py-3 bg-[var(--input-background)] border border-[var(--elevated)] rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]"
                      required
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <motion.div 
              className="relative"
              variants={inputVariants}
            >
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-[var(--input-background)] border border-[var(--elevated)] rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]"
                required
              />
            </motion.div>

            <motion.div 
              className="relative"
              variants={inputVariants}
            >
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 bg-[var(--input-background)] border border-[var(--elevated)] rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]"
                required
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </motion.div>

            {isLogin && (
              <motion.div 
                className="text-right"
                variants={inputVariants}
              >
                <a href="#" className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]">
                  Forgot Password?
                </a>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--background)] font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </motion.form>

          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-[var(--text-secondary)]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <motion.button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPages;