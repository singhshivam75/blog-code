import { useNavigate, useLocation } from "react-router-dom";


export default function AuthRequiredPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/login", { state: { from: location.pathname || "/" } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 text-center shadow-lg bg-white/90 backdrop-blur-md rounded-2xl">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 6a.75.75 0 1 0-1.5 0v5a.75.75 0 0 0 1.5 0V8.25ZM12 16.5a.998.998 0 1 0 0 1.996.998.998 0 0 0 0-1.996Z" clipRule="evenodd" />
          </svg>
        </div>


        <h1 className="text-2xl font-semibold text-gray-900">Login Required</h1>
        <p className="mt-2 text-gray-600">
          You are not eligible to perform this task. Please login first to continue.
        </p>

        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 mt-6 font-medium text-white bg-gray-900 shadow-sm rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Go to Login
        </button>

        {location.pathname && (
          <p className="mt-3 text-xs text-gray-500">
            After login, you'll be redirected back to <span className="font-medium">{location.pathname}</span>.
          </p>
        )}
      </div>
    </div>
  );
}