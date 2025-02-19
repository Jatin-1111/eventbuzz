"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Instagram, Linkedin, Users, Trophy, Target, Heart, Lightbulb, Globe, Calendar } from 'lucide-react';

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

const InfoCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--elevated)] hover:border-[var(--accent-primary)]"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 bg-[var(--input-background)] rounded-lg border border-[var(--elevated)]">
        <Icon className="w-6 h-6 text-[var(--accent-primary)]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
        <div className="text-[var(--text-secondary)]">{children}</div>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ number, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    className="bg-[var(--surface)] rounded-xl p-6 text-center border border-[var(--elevated)] hover:border-[var(--accent-primary)]"
  >
    <h3 className="text-3xl font-bold text-[var(--accent-primary)] mb-2">{number}</h3>
    <p className="text-[var(--text-secondary)]">{label}</p>
  </motion.div>
);

const CoreValue = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className="bg-[var(--surface)] rounded-xl p-6 border border-[var(--elevated)] hover:border-[var(--accent-primary)]"
  >
    <Icon className="w-8 h-8 text-[var(--accent-primary)] mb-4" />
    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{title}</h3>
    <p className="text-[var(--text-secondary)]">{description}</p>
  </motion.div>
);

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Hitesh Garg",
      branch: "Information Technology",
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
      branch: "Information Technology",
      college: "University Institute of Engineering",
      phone: "+1234567892",
      instagram: "https://instagram.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson"
    },
    {
      name: "Rakshak",
      branch: "ECE",
      college: "University Institute of Engineering",
      phone: "+1234567893",
      instagram: "https://instagram.com/sarahwilliams",
      linkedin: "https://linkedin.com/in/sarahwilliams"
    }
  ];

  const coreValues = [
    {
      icon: Users,
      title: "Community-Centric",
      description: "Building stronger campus connections through seamless event experiences."
    },
    {
      icon: Lightbulb,
      title: "Innovation-Driven",
      description: "Continuously evolving our platform to meet the dynamic needs of university events."
    },
    {
      icon: Heart,
      title: "User-Focused",
      description: "Creating intuitive solutions that make event management effortless and enjoyable."
    }
  ];

  return (
    <main className="bg-[var(--background)] min-h-screen pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/10 to-transparent" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">About EventBuzz</h1>
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          />
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            EventBuzz emerged from a vision to revolutionize how universities handle events, creating a more connected and engaged campus community.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="bg-[var(--surface)] rounded-xl p-8 border border-[var(--elevated)] mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Our Mission</h2>
          <p className="text-[var(--text-secondary)] mb-4">
            At EventBuzz, we&apos;re dedicated to creating a seamless and dynamic ecosystem where academic seminars, cultural festivals, and campus activities thrive. Our platform bridges the gap between event organizers and participants, making campus life more vibrant and connected.
          </p>
          <p className="text-[var(--text-secondary)]">
            We believe that well-organized events are the cornerstone of a rich university experience, fostering learning, cultural exchange, and community building.
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <CoreValue key={index} {...value} />
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="500+" label="Events Managed" />
            <StatCard number="50,000+" label="Active Users" />
            <StatCard number="25+" label="Partner Universities" />
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] text-center mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InfoCard icon={Calendar} title="Comprehensive Event Management">
              <ul className="space-y-2">
                <li>Streamlined planning and execution</li>
                <li>Real-time updates and notifications</li>
                <li>Automated scheduling and resource allocation</li>
              </ul>
            </InfoCard>
            <InfoCard icon={Users} title="Community Engagement">
              <ul className="space-y-2">
                <li>Interactive participant forums</li>
                <li>Feedback and rating systems</li>
                <li>Social networking features</li>
              </ul>
            </InfoCard>
            <InfoCard icon={Globe} title="Academic Integration">
              <ul className="space-y-2">
                <li>Seamless calendar synchronization</li>
                <li>Department-specific event organization</li>
                <li>Academic credit tracking for participation</li>
              </ul>
            </InfoCard>
            <InfoCard icon={Target} title="Analytics and Insights">
              <ul className="space-y-2">
                <li>Attendance tracking and reporting</li>
                <li>Engagement metrics</li>
                <li>Performance analytics</li>
              </ul>
            </InfoCard>
          </div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Meet Our Team</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Our dedicated team of organizers works tirelessly to make EventBuzz a memorable experience for all participants.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;