"use client"
import React from "react";
import HeroSection from "./components/Home/Herosection";
import FAQSection from "./components/Home/FAQs";
import FeaturedEvents from "./components/Home/FeaturedEvents";
import Calendar from "./components/Home/Calendar";

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