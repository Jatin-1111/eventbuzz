"use client"
import React from 'react'

export default function Goonj() {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">About Goonj</h1>
          <p className="text-lg mb-6">
            Goonj is UIET's premier techno-cultural fest, bringing together innovation, creativity, and tradition in a spectacular celebration of talent and technology. Join us for an unforgettable experience of cultural harmony and technical excellence.
          </p>
        </div>
  
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Quick Links</h2>
          <ul className="space-y-3 text-center">
            {['About Us', 'Events', 'Info', 'Register', 'Star Night', 'Contact Us'].map((link) => (
              <li key={link}>
                <a href="#" className="text-blue-400 hover:underline text-lg">{link}</a>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="text-lg">📞 +91 78892 31615</p>
          <p className="text-lg">✉️ contact@goonjuiet.com</p>
          <p className="text-lg">📍 UIET, Panjab University, Chandigarh</p>
        </div>
      </div>
    );
  }
  