import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authService';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser({ email, password });

      if (data.token) {
        login(data.token);
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: data.data.id,
          name: data.data.username,
          email: data.data.email,
        })
      );

      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
            disabled={loading}
            className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4 text-sm text-center">
            <p className="text-gray-700">
              Don't have an account?
              <Link to="/signup" className="font-semibold text-blue-700 transition hover:underline hover:text-blue-900">Sign up here</Link>
              {/* <a
                href="/signup"
                className="font-semibold text-blue-700 transition hover:underline hover:text-blue-900"
              >
                Sign up here
              </a> */}
            </p>
          </div>

        </form>
      </div>
    </>
  );
};


export default Login;
