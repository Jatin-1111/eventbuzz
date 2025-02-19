"use client"
import React from 'react';
import { Instagram, Facebook, Youtube, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

<<<<<<< HEAD
export default function Footer() {
=======
const Footer = () => {
>>>>>>> 89a47d6de345bd85d287bc4030312e4b7ae06a5b
    return (
        <div className="bg-gray-900 text-white p-6">
            <div className="max-w-5xl mx-auto">
                {/* Stylish line above headers */}
                <div className="flex items-center justify-center mb-8">
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full" />
                </div>

                {/* Main sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-6">
                    {/* About */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <p className="text-m">
                        With a user-friendly interface and powerful tools, EventSphere ensures a hassle-free event planning experience. Let us handle the logistics while you focus on making your event unforgettable! 
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 group">
                                <ArrowRight size={16} className="text-blue-400 group-hover:transform group-hover:translate-x-1 transition-transform" />
                                <a href="#" className="text-blue-400 hover:underline text-sm">Events</a>
                            </div>
                            <div className="flex items-center space-x-2 group">
                                <ArrowRight size={16} className="text-blue-400 group-hover:transform group-hover:translate-x-1 transition-transform" />
                                <a href="#" className="text-blue-400 hover:underline text-sm">Register</a>
                            </div>
                            <div className="flex items-center space-x-2 group">
                                <ArrowRight size={16} className="text-blue-400 group-hover:transform group-hover:translate-x-1 transition-transform" />
                                <a href="#" className="text-blue-400 hover:underline text-sm">Contact Us</a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Phone size={18} className="text-blue-400" />
                                <p className="text-sm">+91 78892 31615</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail size={18} className="text-blue-400" />
                                <p className="text-sm">contact@goonjuiet.com</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={18} className="text-blue-400" />
                                <p className="text-sm">UIET, Panjab University, Chandigarh</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Line */}
                <hr className="border-gray-700 my-6" />

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mb-6">
                    <Instagram size={24} className="cursor-pointer hover:text-pink-500 transition-colors" />
                    <Youtube size={24} className="cursor-pointer hover:text-red-500 transition-colors" />
                    <Facebook size={24} className="cursor-pointer hover:text-blue-500 transition-colors" />
                </div>

                {/* Copyright */}
                <div className="text-center text-sm">
                    <p>© 2025 EventBuzz. All Rights Reserved.</p>
                    <p className="mt-1">Designed with EventBuzz Team</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;