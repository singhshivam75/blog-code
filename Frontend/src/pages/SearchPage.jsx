import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8050/api/blog/search?query=${query}`);
        setResults(res.data.blogs);
      } catch (err) {
        console.error('Search failed:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-3xl p-6 mx-auto">
      {!query ? (
        <p className="text-gray-500">Please enter a search term above.</p>
      ) : loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        results.map((blog) => <BlogCard key={blog._id} blog={blog} />)
      )}
    </div>
  );
};

export default SearchPage;
