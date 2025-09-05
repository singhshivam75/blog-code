import { useEffect, useState } from 'react';
import { getLikesCount, toggleLike, getLikedUsers } from '../../api/likeService';
import LoginPopup from '../../components/LoginPopup';
import { Users } from "lucide-react";

const LikeButton = ({ blogId }) => {
  const [likes, setLikes] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fetchLikes = async () => {
    try {
      const count = await getLikesCount(blogId);
      setLikes(count);
    } catch (err) {
      console.error('Error fetching likes count:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await getLikedUsers(blogId);
      setLikedUsers(users);
    } catch (err) {
      setShowPopup(true);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [blogId]);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleLike(blogId);
      await fetchLikes();
    } catch (err) {
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShowUsers = async () => {
    if (!showUsers) {
      await fetchUsers();
    }
    setShowUsers(!showUsers);
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`gap-2 px-4 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        ❤️ Like
      </button>
      <span className="ml-3 font-medium text-gray-700">{likes} {likes === 1 ? 'like' : 'likes'}</span>

      <button
        onClick={handleShowUsers}
        className="inline-flex items-center gap-1 ml-4 text-sm text-blue-600 transition hover:text-blue-800"
      >
        <Users className="w-4 h-4" />
        {showUsers ? "Hide" : "View"} users
      </button>

      {showUsers && (
        <div className="p-3 mt-3 border rounded-lg shadow-sm bg-gray-50">
          <ul className="space-y-1 text-sm text-gray-700">
            {likedUsers.length === 0 ? (
              <li className="italic text-gray-500">
                No users have liked this blog yet.
              </li>
            ) : (
              likedUsers.map((u) => (
                <li key={u._id} className="flex gap-2">
                  <span className="font-medium">{u.username}</span>
                  <span className="text-gray-500">({u.email})</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default LikeButton;
