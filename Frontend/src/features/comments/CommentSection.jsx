import { useEffect, useState } from "react";
import { MessageSquare, X } from "lucide-react";

import {
  getCommentsByBlogId,
  createComment,
  getCommentCount,
} from "../../api/commentService";
import Comment from "../../components/Comment";
import CommentForm from "../../components/CommentForm";
import LoginPopup from "../../components/LoginPopup";
import { useAuth } from "../../context/AuthContext";

const CommentSection = ({ blogId, blogAuthorId }) => {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [reload, setReload] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { isAuthenticated } = useAuth();

  const fetchCommentCount = async () => {
    try {
      const count = await getCommentCount(blogId);
      setCommentsCount(count);
    } catch (err) {
      console.error("Error fetching comment count:", err);
    }
  };

  useEffect(() => {
    fetchCommentCount();
  }, [blogId]);

  useEffect(() => {
    if (showComments) {
      const fetchComments = async () => {
        try {
          const data = await getCommentsByBlogId(blogId);
          setComments(data);
        } catch (err) {
          console.error("Failed to load comments", err);
        }
      };

      fetchComments();
    }
  }, [blogId, reload, showComments]);

  const handleCommentSubmit = async (content) => {
    if (!isAuthenticated) {
      setShowPopup(true);
      return;
    }

    try {
      await createComment(blogId, content);
      setReload(!reload);
      await fetchCommentCount(); 
    } catch (err) {
      console.error("Failed to submit comment", err);
    }
  };

  const handleDeleteComment = async (deletedId) => {
    setComments((prev) => prev.filter((c) => c._id !== deletedId));
    await fetchCommentCount(); 
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="mt-12">
      <h3 className="flex items-center mb-6 text-2xl font-semibold">
        Comments
        <span className="flex items-center ml-3 text-sm font-medium text-gray-600">
          <MessageSquare className="w-4 h-4 mr-1 text-gray-500" />
          {commentsCount}
        </span>
      </h3>

      {/* Comment Form - always visible */}
      <CommentForm onSubmit={handleCommentSubmit} />

      {/* Show/Hide Button */}
      <button
        onClick={toggleComments}
        className="flex items-center gap-2 px-4 py-2 mt-6 text-sm font-medium transition bg-gray-100 border border-gray-300 rounded-full shadow-sm hover:bg-gray-200"
      >
        {showComments ? (
          <>
            <X className="w-4 h-4" />
            Hide Comments
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4" />
            See Comments
          </>
        )}
      </button>

      {/* Comments List */}
      {showComments && (
        <div className="mt-8 space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm italic text-center text-gray-500">
              No comments yet — be the first to share your thoughts.
            </p>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                blogAuthorId={blogAuthorId}
                onDelete={handleDeleteComment}
              />
            ))
          )}
        </div>
      )}

      {/* Popup if user not logged in */}
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default CommentSection;
