import React, { useEffect, useState } from "react";
import { getAllBlogs, togglePublishStatus } from "../api/blogService";

function BlogDetails() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs().then(data => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const handleToggle = async (id) => {
    await togglePublishStatus(id);
    setBlogs(prev => prev.map(blog => blog._id === id ? { ...blog, published: !blog.published } : blog));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <button onClick={() => handleToggle(blog._id)}>
            {blog.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default BlogDetails;
