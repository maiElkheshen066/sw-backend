
import React, { useState, useEffect } from 'react';
import bg from '../assets/Images/bg.png';
import pizaa from '../assets/Images/piza.png';
import '../Pages/styles.css';

function Profile() {
  const [user, setUser] = useState({ username: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [message, setMessage] = useState('');
  const [reservations, setReservations] = useState([]);

  // Fetch user data on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to view your profile.');
      return;
    }

    fetch('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username && data.email) {
          setUser({ username: data.username, email: data.email });
          setFormData({ username: data.username, email: data.email });
        } else {
          setMessage('Failed to load profile.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error connecting to server.');
      });

    // Fetch reservations (placeholder for now)
    setReservations([]); // Replace with API call when ready
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in.');
      return;
    }

    fetch('http://localhost:5000/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Profile updated successfully') {
          setUser(formData);
          setIsEditing(false);
          setMessage('Profile updated!');
        } else {
          setMessage(data.message || 'Failed to update profile.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error connecting to server.');
      });
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
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6">Your Profile 🍽️</h2>
          <h5 className="text-lg font-semibold text-white mb-6">Manage your details</h5>

          {message && (
            <p className={message.includes('Error') || message.includes('Failed') ? 'text-red-500' : 'text-green-500'}>
              {message}
            </p>
          )}

          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border border-white rounded-lg"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-white rounded-lg"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p className="text-white mb-2">
                <strong>Username:</strong> {user.username || 'Loading...'}
              </p>
              <p className="text-white mb-4">
                <strong>Email:</strong> {user.email || 'Loading...'}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Reservation History</h3>
            {reservations.length > 0 ? (
              <table className="w-full text-white">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2">Date</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Party Size</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r._id} className="bg-gray-800">
                      <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="p-2">{r.time}</td>
                      <td className="p-2">{r.partySize}</td>
                      <td className="p-2">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-white">No reservations yet.</p>
            )}
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={pizaa} alt="profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
