import React from "react";
import { motion as Motion } from "framer-motion";
import bgImage from "../assets/heroSection-bg.png";

const HeroSection1 = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-4xl px-8 text-center text-white ">
        {/* Heading */}
        <Motion.h1
          className="py-4 mb-4 text-4xl font-bold md:text-8xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Welcome to My Blog
        </Motion.h1>

        {/* Paragraph */}
        <Motion.p
          className="mb-6 text-lg md:text-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Discover amazing stories, tutorials, and insights crafted for you.
        </Motion.p>

        {/* Button */}
        <Motion.button
          className="py-4 py-5 font-semibold text-white bg-blue-600 rounded-full shadow-lg cursor-pointer md:text-xl px-15 hover:bg-blue-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Explore Blogs
        </Motion.button>
      </div>
    </div>
  );
};

export default HeroSection1;
