"use client"
import React from "react";
import HeroSection from "./components/Herosection";
import FAQSection from "./components/FAQs";
import FeaturedEvents from "./components/FeaturedEvents";
import Calendar from "./components/Calendar";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <Calendar />
      <FeaturedEvents />
      <FAQSection />
    </div>
  )
}

export default Home;