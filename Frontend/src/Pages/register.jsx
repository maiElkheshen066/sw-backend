import React, { useState } from 'react';
import bg from '../assets/Images/bg.png'; // Background image
import pizaa from '../assets/Images/piza.png'; // Pizza image
import '../Pages/styles.css'; // Your styles

function Register() {
  // Store what the user types
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // For success or error

  // When the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page from refreshing
    setMessage(''); // Clear old messages

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords don’t match!');
      return;
    }

    // Send data to the API
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:name, email, password ,passwordConfirm: confirmPassword}),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registered! Redirecting to login...');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000); // Wait 2 seconds, then go to login
      } else {
        setMessage(data.message || 'Something went wrong!');
      }
    } catch (error) {
      setMessage('Error connecting to server!');
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
          <h2 className="text-3xl font-bold text-white mb-6">Create your account 🌮</h2>
          <h5 className="text-lg font-semibold text-white mb-6">Register to get started ✈</h5>

          {/* Show message (success or error) */}
          {message && (
            <p className={message.includes('Error') || message.includes('wrong') ? 'text-red-500' : 'text-green-500'}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-white rounded-lg"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-white rounded-lg"
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
                className="w-full px-4 py-2 border border-white rounded-lg"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-2 border border-white rounded-lg"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-white text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:underline">
              Login here
            </a>
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img src={pizaa} alt="register form" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Register;