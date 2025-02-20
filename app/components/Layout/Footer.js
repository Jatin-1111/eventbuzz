'use client'
import React from 'react';
import { Instagram, Facebook, Youtube, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <div className="bg-[var(--surface)] text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Stylish line above headers */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent w-full" />
        </div>

        {/* Main sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-6">
          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">About</h2>
            <p className="text-m">
              EventBuzz is an all-in-one platform designed to transform how universities manage and experience campus events. From academic seminars to cultural festivals, our platform connects students, faculty, and administrators in one dynamic ecosystem.
            </p>
          </div>

          {/* Quick Links - Between About and Contact Us */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Quick Links</h2>
            <div className="space-y-2 flex flex-col items-center">
              <div className="flex items-center space-x-2 group">
                <ArrowRight size={16} className="text-[var(--accent-primary)] group-hover:transform group-hover:translate-x-1 transition-transform" />
                <a href="events" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors duration-200">Events</a>
              </div>
              <div className="flex items-center space-x-2 group">
                <ArrowRight size={16} className="text-[var(--accent-primary)] group-hover:transform group-hover:translate-x-1 transition-transform" />
                <a href="register" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors duration-200">Register</a>
              </div>
              <div className="flex items-center space-x-2 group">
                <ArrowRight size={16} className="text-[var(--accent-primary)] group-hover:transform group-hover:translate-x-1 transition-transform" />
                <a href="contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm transition-colors duration-200">Contact Us</a>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Contact Us</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Phone size={18} className="text-[var(--accent-primary)]" />
                <p className="text-sm">+91 87089 28915</p>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail size={18} className="text-[var(--accent-primary)]" />
                <p className="text-sm">contact@eventBuzz.com</p>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin size={18} className="text-[var(--accent-primary)]" />
                <p className="text-sm">UIET, Panjab University, Chandigarh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-[var(--accent-primary)] border-opacity-20 my-6" />

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          <Instagram size={24} className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200" />
          <Youtube size={24} className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200" />
          <Facebook size={24} className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200" />
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>© 2025 EventBuzz. All Rights Reserved.</p>
          <p className="mt-1 text-[var(--accent-primary)]">Designed with EventBuzz Team</p>
        </div>
      </div>
    </div>
  );
}