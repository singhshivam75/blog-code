import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../api/blogService";
import { Loader2, Upload } from "lucide-react";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (image) data.append("image", image);

      await createBlog(data);
      navigate("/blog");
    } catch (err) {
      toast.alert(
        "Failed to create blog: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl px-6 py-16 mx-auto">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-gray-900">
        
        Create a New Blog
      </h2>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6 bg-white shadow-xl rounded-2xl"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter your blog title..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Upload Image (Optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <span className="text-sm text-gray-600">
                {image ? image.name : "Click to upload or drag & drop"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {image && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="object-cover w-full rounded-lg shadow-md max-h-60"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Content
          </label>
          <textarea
            name="description"
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2 font-medium text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
