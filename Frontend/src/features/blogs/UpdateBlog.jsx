import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlogById } from "../../api/blogService";
import { getCurrentUser } from "../../api/authService";
import { toast } from "react-toastify";
import PublishToggleButton from "./publishToggleButton";
import { Loader2, Upload } from "lucide-react";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.blog);
        setFormData({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
        setPreviewImage(`http://localhost:8050${data.blog.image}`);
      } catch {
        setError("Unable to load blog.");
      }
    };
    fetchBlog();
  }, [id]);

  const currentUser = getCurrentUser();

  if (blog && currentUser?._id !== blog.author?._id) {
    return (
      <div className="mt-32 text-lg font-semibold text-center text-red-600">
        You do not have permission to edit this blog.
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);

      if (formData.image && typeof formData.image !== "string") {
        payload.append("image", formData.image);
      }

      await updateBlogById(id, payload);
      navigate(`/blog/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div className="mt-32 text-lg font-semibold text-center text-red-600">
        {error}
      </div>
    );

  if (!blog)
    return (
      <div className="flex items-center justify-center mt-32 text-gray-500">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
        Loading blog...
      </div>
    );

  return (
    <div className="max-w-5xl px-10 py-16 mx-auto">
      <div className="p-10 bg-white border border-gray-100 shadow-xl rounded-2xl">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          Update Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter your blog title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Write your blog content here..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Update Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {formData.image && typeof formData.image !== "string"
                    ? formData.image.name
                    : "Click to upload or drag & drop"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="object-cover w-full h-56 rounded-lg shadow-md"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <PublishToggleButton
              blogId={blog._id}
              initialStatus={blog.isPublished}
            />
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-md transition 
                ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
