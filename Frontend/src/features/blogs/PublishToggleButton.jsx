import React, { useState } from 'react';
import { togglePublishStatus } from "../../api/blogService";
import { toast } from 'react-toastify';

const PublishToggleButton = ({ blogId, initialStatus, onStatusChange }) => {
  const [isPublished, setIsPublished] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const res = await togglePublishStatus(blogId);
      setIsPublished(res.blog.isPublished);
      toast.success(res.message);

      if (onStatusChange) onStatusChange(res.blog.isPublished);
    } catch (error) {
      toast.error("Failed to toggle publish status", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white font-semibold transition duration-200 ${isPublished
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-red-500 hover:bg-red-600'
          } ${loading && 'opacity-50 cursor-not-allowed'}`}
      >
        {loading ? 'Processing...' : isPublished ? 'Publish' : 'Unpublish'}
      </button>
    </>
  );
};

export default PublishToggleButton;
