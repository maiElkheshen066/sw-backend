import React, { useState } from 'react';
import loginimg from '../assets/Images/login img.png'; // Ensure this image exists
import '../Pages/styles.css';
import bg from '../assets/Images/bg.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token',data.data.token.token)
        setMessage('Successful login, redirecting to home...');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          window.location.href = '/'; // Changed to '/' to match AppRoutes
        }, 2000);
      } else {
        setMessage(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Fetch error:', error); // Log for debugging
      setMessage('Error connecting to server! Check the console for details.');
    }
  };

  return (
    <div
      className="pt-[6rem] flex justify-center items-center min-h-screen p-5"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(90deg, #16423CFF, #2D645EFF, #26544EFF, #336C65FF)',
        }}
      >
        {/* Form Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <i className="fas fa-cubes text-4xl text-orange-500 mr-3"></i>
            <span className="text-3xl font-bold text-white">Welcome to your restaurant 🎉</span>
          </div>

          <h5 className="text-lg font-semibold text-white mb-6 tracking-wide">
            Sign into your account
          </h5>

          {message && (
            <p className={message.includes('Error') || message.includes('Invalid') ? 'text-red-500' : 'text-green-500'}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
            >
              Login
            </button>
          </form>

          <a href="#!" className="text-sm text-blue-500 hover:underline mb-4 block text-right">
            Forgot password?
          </a>

          <p className="text-sm text-white text-center mb-6">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>

          <div className="flex text-xs text-gray-300 space-x-4 justify-center">
            <a href="#!" className="hover:underline">
              Terms of Use
            </a>
            <a href="#!" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img src={loginimg} alt="login form" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Login;