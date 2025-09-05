import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteBlogById, getMyBlogs } from "../../api/blogService";
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../api/authService';

const AutherBlogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadBlogs(page);
  }, [page]);

  const loadBlogs = async (currentPage) => {
    try {
      const data = await getMyBlogs(currentPage, 6);

      if (currentPage === 1) {
        setBlogs(data.blogs || []);
      } else {
        setBlogs((prev) => [...prev, ...(data.blogs || [])]);
      }

      const loadedCount = (currentPage - 1) * 6 + (data.blogs?.length || 0);
      if (loadedCount >= data.total) {
        setHasMore(false);
      }

    } catch (err) {
      toast.error('Failed to fetch your blogs.', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const confirmDelete = (blog) => {
    if ((currentUser?.id || currentUser?._id)?.toString() !== blog.author?._id?.toString()) {
      toast.error('You do not have permission to delete the blog.');
      return;
    }
    setBlogToDelete(blog);
    setConfirmingDelete(true);
  };

  const performDelete = async () => {
    if (!blogToDelete) return;

    setDeletingId(blogToDelete._id);

    try {
      await deleteBlogById(blogToDelete._id);
      setBlogs((prev) => prev.filter((b) => b._id !== blogToDelete._id));
      toast.success('Blog deleted successfully.');

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete blog.');

    } finally {
      setDeletingId(null);
      setConfirmingDelete(false);
      setBlogToDelete(null);

    }
  };

  if (loading) {
    return <div className='py-10 text-lg text-center text-gray-600'>Loading your blogs...</div>
  }

  return (
    <div className='max-w-5xl px-4 py-10 mx-auto'>
      <h2 className='mb-6 text-3xl font-bold'>My blogs</h2>

      {blogs.length === 0 ? (
        <p className='text-gray-500'>You haven't written any blog yet.</p>
      ) : (
        <div className='grid gap-6 md:grid-cols-2'>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className='relative flex flex-col p-5 transition-all bg-white border shadow-sm rounded-xl hover:shadow-md'
            >
              {blog.image && (
                <img
                  src={`http://localhost:8050${blog.image}`}
                  alt={blog.title}
                  className="object-cover w-full h-48 mb-4 rounded-md"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}

              <h3 className='mb-2 text-xl font-semibold line-clamp-1'>{blog.title}</h3>
              <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                {blog.description}
              </p>
              <div className="flex items-center justify-between pt-4 pb-2 mt-auto">
                <button
                  onClick={() => navigate(`/blog/${blog._id}/edit`)}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => confirmDelete(blog)}
                  disabled={deletingId === blog._id}
                  className={`px-4 py-2 text-white rounded-md text-sm transition ${deletingId === blog._id
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                    }`}
                >
                  {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className='mt-6 text-center'>
          <button
            onClick={handleLoadMore}
            className='px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700'
          >
            Load More
          </button>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmingDelete && blogToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-xs">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Confirm Deletion</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete the blog titled "<strong>{blogToDelete.title}</strong>"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setConfirmingDelete(false);
                  setBlogToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={performDelete}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutherBlogs;
