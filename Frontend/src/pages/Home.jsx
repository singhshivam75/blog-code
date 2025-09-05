import React from 'react';
import HeroSection from '../components/HeroSection';
import BlogList from '../features/blogs/BlogList';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <section id="blog">
        <BlogList />
      </section>
    </div>
  );
};

export default Home;