"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { auth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth';

// Add these states


const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '', // Changed from name to username to match schema
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const validateForm = (data, isLoginMode) => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = 'Please provide a valid email';
    }

    // Password validation
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (!isLoginMode) {
      // Additional password validation for registration
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(data.password)) {
        errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }

    // Registration-specific validations
    if (!isLoginMode) {
      if (!data.username || data.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }

      if (!data.phone || data.phone.replace(/\D/g, '').length !== 10) {
        errors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const errors = validateForm(formData, isLogin);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Firebase Login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );

        toast.success('Welcome back!');
        router.push('/');
      } else {
        // Firebase Registration
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password
        );

        // Update profile with additional info
        await updateProfile(userCredential.user, {
          displayName: formData.username,
          phoneNumber: formData.phone.replace(/[^\d]/g, '') // Strip formatting
        });

        toast.success('Account created successfully!');
        router.push('/');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      let errorMessage = 'An unexpected error occurred';

      // Handle Firebase specific errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
      }

      toast.error(errorMessage);
      setFormErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  // Add Firebase auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && router.pathname === '/login') {
        router.push('/');
      } else if (!user && router.pathname !== '/login') {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

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
                  <motion.div className="relative" variants={inputVariants}>
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-[var(--input-background)] border ${formErrors.username ? 'border-red-500' : 'border-[var(--elevated)]'
                        } rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]`}
                      required
                      minLength={3}
                      maxLength={30}
                    />
                    {formErrors.username && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>
                    )}
                  </motion.div>

                  <motion.div className="relative" variants={inputVariants}>
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 bg-[var(--input-background)] border ${formErrors.phone ? 'border-red-500' : 'border-[var(--elevated)]'
                        } rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                    )}
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
                className={`w-full pl-10 pr-4 py-3 bg-[var(--input-background)] border 
    ${formErrors.email ? 'border-red-500' : 'border-[var(--elevated)]'}
    rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]`}
                required
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </motion.div>

            <motion.div className="relative" variants={inputVariants}>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 bg-[var(--input-background)] border ${formErrors.password ? 'border-red-500' : 'border-[var(--elevated)]'
                  } rounded-lg focus:outline-none focus:border-[var(--accent-primary)] text-[var(--text-primary)] placeholder-[var(--text-disabled)]`}
                required
                minLength={8}
              />
              {!isLogin && (
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Password must be at least 8 characters long with 1 uppercase, 1 lowercase, and 1 number
                </p>
              )}
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
              )}
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
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] 
    text-[var(--background)] font-semibold rounded-lg transition-opacity duration-200
    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
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