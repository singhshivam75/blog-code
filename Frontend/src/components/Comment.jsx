import { deleteComment } from "../api/commentService";
import { useAuth } from "../context/AuthContext";
import { Trash2, User } from "lucide-react";

const Comment = ({ comment, blogAuthorId, onDelete }) => {
  const { user, isAuthenticated } = useAuth();
  const currentUserId = user?._id;

  // Only show delete if user is logged in and (owner OR blog author)
  const canDelete =
    isAuthenticated &&
    (currentUserId === comment.user?._id || currentUserId === blogAuthorId);

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id);
      onDelete(comment._id);
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="flex items-start justify-between p-4 mb-3 transition bg-white border shadow-sm rounded-xl hover:shadow-md">
      {/* Left: Avatar + content */}
      <div className="flex gap-3">
        <div className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-200 rounded-full">
          <User className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-800">
              {comment.user?.username || "Anonymous"}
            </p>
            <span className="text-xs text-gray-500">
              {new Date(comment.created).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
        </div>
      </div>

      {/* Right: Delete button if allowed */}
      {canDelete && (
        <button
          onClick={handleDelete}
          className="text-gray-400 transition hover:text-red-500"
          title="Delete comment"
        >
          {comment.user?._id || blogAuthorId ? (
            <Trash2 className="w-4 h-4" />
          ) : ""}
        </button>
      )}
    </div>
  );
};

export default Comment;