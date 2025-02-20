"use client";
import React, { useState, useEffect } from "react";
import HeroSection from "./components/Home/Herosection";
import FAQSection from "./components/Home/FAQs";
import FeaturedEvents from "./components/Home/FeaturedEvents";
import Calendar from "./components/Home/Calendar";
import Preloader from "./components/preloader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <Calendar />
      <FeaturedEvents />
      <FAQSection />
    </div>
  )
};

export default Home;