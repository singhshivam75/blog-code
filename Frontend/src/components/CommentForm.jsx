import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const CommentForm = ({ onSubmit, loading }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white rounded-2xl"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="💬 Share your thoughts..."
        className="w-full p-3 text-sm transition border shadow-sm resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition bg-blue-600 shadow rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Post Comment
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
