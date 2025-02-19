"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram, Linkedin, Users, Trophy } from 'lucide-react';

const TeamMember = ({ name, branch, college, phone, instagram, linkedin }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ 
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    }}
    transition={{ duration: 0.3 }}
    className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--elevated)] hover:border-[var(--accent-primary)] transition-all duration-300"
  >
    <div className="flex flex-col items-center">
      <motion.div 
        className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-[var(--accent-primary)]"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src="/api/placeholder/128/128" 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </motion.div>
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{name}</h3>
      <p className="text-[var(--text-secondary)] mb-1">{branch}</p>
      <p className="text-[var(--text-secondary)] mb-4">{college}</p>
      
      <div className="flex items-center gap-4 mt-2">
        <motion.a
          href={`tel:${phone}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-[var(--input-background)] rounded-lg border border-[var(--elevated)] hover:border-[var(--accent-primary)]"
        >
          <Phone size={20} className="text-[var(--accent-primary)]" />
        </motion.a>
        <motion.a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-[var(--input-background)] rounded-lg border border-[var(--elevated)] hover:border-[var(--accent-primary)]"
        >
          <Instagram size={20} className="text-[var(--accent-primary)]" />
        </motion.a>
        <motion.a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-[var(--input-background)] rounded-lg border border-[var(--elevated)] hover:border-[var(--accent-primary)]"
        >
          <Linkedin size={20} className="text-[var(--accent-primary)]" />
        </motion.a>
      </div>
    </div>
  </motion.div>
);

const EventInfo = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
    className="flex items-start gap-4 bg-[var(--surface)] rounded-lg p-6 border border-[var(--elevated)]"
  >
    <div className="p-3 bg-[var(--input-background)] rounded-lg border border-[var(--elevated)]">
      <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      <div className="text-[var(--text-secondary)]">{children}</div>
    </div>
  </motion.div>
);

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Hitesh Garg",
      branch: "Information Tecnology",
      college: "University Institute of Engineering",
      phone: "+91 82890 84124",
      instagram: "https://instagram.com/its.h1t3sh",
      linkedin: "https://linkedin.com/in/hitesh-garg"
    },
    {
      name: "Sanchi Agarwal",
      branch: "ECE",
      college: "University Institute of Engineering",
      phone: "+1234567891",
      instagram: "https://instagram.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith"
    },
    {
      name: "Jatin",
      branch: "Information Tecnology",
      college: "University Institute of Engineering",
      phone: "+1234567892",
      instagram: "https://instagram.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson"
    },
    {
      name: "Rakshak ",
      branch: "ECE",
      college: "University Institute of Engineering",
      phone: "+1234567893",
      instagram: "https://instagram.com/sarahwilliams",
      linkedin: "https://linkedin.com/in/sarahwilliams"
    }
  ];

  return (
    <main className="bg-[var(--background)] min-h-screen pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/10 to-transparent" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">About EventBuzz</h1>
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-16 max-w-3xl mx-auto">
          <motion.div 
            className="bg-[var(--surface)] rounded-xl p-8 border border-[var(--elevated)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">About the Event</h2>
            <p className="text-[var(--text-secondary)] mb-4">
              EventBuzz is an annual technical festival that brings together the brightest minds from across the country. 
              It serves as a platform for students to showcase their technical prowess, innovative ideas, and 
              entrepreneurial spirit.
            </p>
            <p className="text-[var(--text-secondary)] mb-4">
              Our event features a diverse range of activities including technical workshops, coding competitions, 
              robotics demonstrations, and project exhibitions. Participants get the opportunity to learn from industry 
              experts, compete with peers, and win exciting prizes.
            </p>
            <p className="text-[var(--text-secondary)]">
              Join us for two days of innovation, learning, and networking as we celebrate the spirit of technology 
              and engineering at EventBuzz 2025.
            </p>
          </motion.div>

          <div className="space-y-6">
            <EventInfo icon={Users} title="Expected Participation">
              <p>Over 1000+ participants from various colleges</p>
              <p>50+ colleges participating</p>
            </EventInfo>

            <EventInfo icon={Trophy} title="Highlights">
              <ul className="list-disc list-inside space-y-2">
                <li>Technical Workshops</li>
                <li>Coding Competitions</li>
                <li>Robotics Showcase</li>
                <li>Project Exhibition</li>
                <li>Cash Prizes Worth ₹1,00,000</li>
              </ul>
            </EventInfo>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Meet Our Team</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Our dedicated team of organizers works tirelessly to make EventBuzz a memorable experience for all participants.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutPage;