import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, deleteBlogById } from "../../api/blogService";
import { getCurrentUser } from '../auth/authService';
import { toast } from 'react-toastify';

const DeleteBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.blog);
      } catch {
        setError('Unable to load blog.');
      }
    };
    fetchBlog();
  }, [id]);

  const currentUser = getCurrentUser();

  const authorId = blog.author?._id?.toString();
  const currentUserId = (currentUser?._id || currentUser?.id)?.toString();

  if (authorId && currentUserId && authorId !== currentUserId) {
    return (
      <div className="mt-32 text-lg font-semibold text-center text-red-600">
        You do not have permission to delete this blog.
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    setLoading(true);
    
    try {
      await deleteBlogById(id);
      console.log("blog deleted");
      
      toast.success('Blog deleted');
      setTimeout(() => navigate('/my-blogs'), 1500);
    } catch (err) {
      alert('Failed to delete blog: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="mt-32 text-lg font-semibold text-center text-red-600">{error}</div>
    );

  if (!blog)
    return (
      <div className="mt-32 text-lg italic text-center text-gray-500">Loading blog...</div>
    );

  return (
    <div className="max-w-3xl px-6 py-16 mx-auto text-center">
      <h2 className="mb-6 text-3xl font-bold">Delete Blog</h2>
      <p className="mb-6">Are you sure you want to delete the blog titled:</p>
      <p className="mb-8 text-lg font-semibold">"{blog.title}"</p>
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`bg-red-600 text-white px-6 py-2 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
          }`}
      >
        {loading ? 'Deleting...' : 'Yes, Delete'}
      </button>
      <button
        onClick={() => navigate(`/blog/${id}`)}
        disabled={loading}
        className="px-6 py-2 ml-4 transition border border-gray-300 rounded hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteBlog;
