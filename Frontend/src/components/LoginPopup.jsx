import React from "react";
import { useNavigate } from "react-router-dom";
import { HiExclamationCircle } from "react-icons/hi";

export default function LoginPopup({ onClose }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    if (onClose) onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "popup-backdrop" && onClose) {
      onClose();
    }
  };

  return (
    <div
      id="popup-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="relative bg-white shadow-2xl rounded-2xl w-96 animate-fadeIn">

        <div className="w-full max-w-md p-8 text-center shadow-lg bg-white/90 backdrop-blur-md rounded-2xl">

          <button
            type="button"
            onClick={onClose}
            className="absolute text-2xl font-bold text-gray-500 cursor-pointer top-2 right-3 hover:text-red-500"
          >
            ×
          </button>

          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <HiExclamationCircle className="w-6 h-6 text-red-600" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">Login Required</h1>
          <p className="mt-2 text-gray-600">
            You are not eligible to perform this task. Please login first to continue.
          </p>

          <div className="flex justify-center">

            <button
              onClick={handleLogin}
              className="w-full px-4 py-3 mt-6 font-medium text-white bg-gray-900 shadow-sm cursor-pointer rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
