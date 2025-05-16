import React, { useState } from 'react';
import bg from '../assets/Images/bg.png';
import pizza from '../assets/Images/piza.png';
import '../Pages/styles.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords don’t match!');
      return;
    }
// console.log(firstName,SecondName)
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
           SecondName: lastName,
          gender,
          mobileNumber,
          email,
          password,
          passwordConfirm: confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registered! Redirecting to login...');
        setFirstName('');
        setLastName('');
        setGender('');
        setMobileNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
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
          <h2 className="text-3xl font-bold text-white mb-4">Create your account 🌮</h2>
          <h5 className="text-lg font-semibold text-white mb-6">Register to get started ✈</h5>

          {message && (
            <p className={`mb-4 text-sm ${message.includes('Error') || message.includes('wrong') ? 'text-red-500' : 'text-green-400'}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* First and Last Name */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm text-white mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border border-white rounded-lg"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm text-white mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border border-white rounded-lg"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm text-white mb-1">Gender</label>
              <div className="flex items-center gap-4 text-white">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={() => setGender('Male')}
                    className="accent-blue-500"
                    required
                  />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={() => setGender('Female')}
                    className="accent-pink-500"
                    required
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm text-white mb-1">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                className="w-full px-4 py-2 border border-white rounded-lg"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-white mb-1">Email Address</label>
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

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-white mb-1">Password</label>
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

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm text-white mb-1">Confirm Password</label>
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-white text-center mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-blue-300 hover:underline">Login here</a>
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img src={pizza} alt="Register" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Register;
