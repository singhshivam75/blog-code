import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = 'http://localhost:8050/api/auth';

// Generic error handler
const handleApiErrors = (err, fallback = "Something went wrong") => {
  if (Array.isArray(err.response?.data?.errors) && err.response.data.errors.length > 0) {
    err.response.data.errors.forEach((msg) => toast.error(msg));
  } else if (err.request) {
    toast.error("No response from server. Please check your connection.");
  } else {
    toast.error(fallback);
  }
};

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return toast.error("Please enter email first");

    setLoadingOtp(true);
    try {
      await axios.post(`${API}/send-otp`, { email });
      toast.success("OTP sent to your email.");
      setOtpSent(true);
    } catch (err) {
      handleApiErrors(err, "Failed to send OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password || !otp) {
      toast.error("All fields are required.");
      return;
    }

    setLoadingSignup(true);
    try {
      await axios.post(`${API}/verify-otp`, {
        name,
        username,
        email,
        password,
        otp,
      });
      toast.success("Signup successful!");
      navigate('/login');
    } catch (err) {
      handleApiErrors(err, "Signup failed. Please try again.");
    } finally {
      setLoadingSignup(false);
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Name */}
        <div>
          <label>Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Username */}
        <div>
          <label>Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email + Send OTP */}
        <div>
          <label>Email</label>
          <div className="flex">
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-l"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loadingOtp || !email}
              className="px-4 text-white bg-blue-600 rounded-r hover:bg-blue-700"
            >
              {loadingOtp ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        </div>

        {/* OTP (Shown only after sending) */}
        {otpSent && (
          <div>
            <label>OTP</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>  
        )}

        {/* Password */}
        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loadingSignup}
          className="w-full py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
        >
          {loadingSignup ? 'Creating account...' : 'Verify & Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        <p className="text-gray-700">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:underline hover:text-blue-900"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
