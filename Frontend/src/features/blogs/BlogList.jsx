import { useEffect, useState } from "react";
import { getAllBlogs } from "../../api/blogService";
import BlogCard from "../../components/BlogCard";
import { Loader2, FileText } from "lucide-react";
import { toast } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchBlogs = async (pageNum = 1) => {
    try {
      const data = await getAllBlogs(pageNum, 9);
      setBlogs((prev) =>
        pageNum === 1 ? data.blogs : [...prev, ...data.blogs]
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="px-6 py-20 mx-auto max-w-7xl">
      {/* Hero / Section Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
          📝 Latest Blog Posts
        </h2>
        <p className="mt-3 text-lg text-gray-500">
          Discover insights, tips, and stories shared by our authors.
        </p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : blogs.length > 0 ? (
        <>
          {/* Blog Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Load More Button */}
          {page < totalPages && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FileText className="w-10 h-10 mb-2" />
          <p className="text-lg">No blogs found. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
