import React from 'react';
import BlogImage from '../assets/blog.png';

const HeroSection = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-24 bg-gradient-to-br from-white to-blue-50">
      <div className="w-full md:w-1/2 text-center md:text-left mt-12 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          Fuel Your Mind with <span className="text-blue-600">Fresh Ideas</span>
        </h1>
        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-gray-800">Insight Blog</span>, your creative corner for tech insights, reflections, and tutorials that ignite curiosity and action.
        </p>
        <a
          href="#blog"
          className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Explore Latest Posts
        </a>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={BlogImage}
          alt="Blog Illustration"
          className="rounded-xl shadow-xl max-w-[85%] h-auto transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default HeroSection;
