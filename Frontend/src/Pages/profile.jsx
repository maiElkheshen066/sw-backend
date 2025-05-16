import React, { useState, useEffect } from "react";
import bg from "../assets/Images/bg.png";
import "../Pages/styles.css";

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    secondName: "",
    email: "",
    role: "",
    gender: "",
    mobileNumber: "",
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    role: "",
    gender: "",
    mobileNumber: "",
  });
  const [message, setMessage] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to view your profile.");
      return;
    }

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.firstName && data.email) {
          setUser({
            firstName: data.firstName,
            secondName: data.SecondName,
            email: data.email,
            role: data.role,
            gender: data.gender,
            mobileNumber: data.mobileNumber,
            createdAt: data.createdAt||"",
          });
          setFormData({
            firstName: data.firstName,
            secondName: data.SecondName,
            email: data.email,
            role: data.role,
            gender: data.gender,
            mobileNumber: data.mobileNumber,
          });
        } else {
          setMessage("Failed to load profile.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Error connecting to server.");
      });

    // Fetch reservations placeholder
    setReservations([]);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in.");
      return;
    }

fetch("http://localhost:5000/api/profile", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(formData),
})
.then(async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update profile");
  }
  return data;
})
.then((data) => {
  setUser(formData);
  setIsEditing(false);
  setMessage("Profile updated!");
})
.catch((error) => {
  console.error("Error:", error);
  setMessage(error.message || "Error connecting to server.");
});

  };

  return (
    <div
      className="pt-[6rem] flex justify-center items-center min-h-screen p-5"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-col rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full p-10"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          background:
            "linear-gradient(90deg, #16423CFF, #2D645EFF, #26544EFF, #336C65FF)",
        }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">Your Profile 🍽️</h2>
        <h5 className="text-lg font-semibold text-white mb-6">
          Manage your details
        </h5>

        {message && (
          <p
            className={
              message.includes("Error") || message.includes("Failed")
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {message}
          </p>
        )}

        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border border-white rounded-lg"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                Second Name
              </label>
              <input
                type="text"
                name="secondName"
                className="w-full px-4 py-2 border border-white rounded-lg"
                value={formData.secondName}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                Role
              </label>
              <input
                type="text"
                name="role"
                className="w-full px-4 py-2 border border-white rounded-lg"
                value={formData.role}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                className="w-full px-4 py-2 border border-white rounded-lg"
                value={formData.gender}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                className="w-full px-4 py-2 border border-white rounded-lg"
                value={formData.mobileNumber}
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
          <div className="text-white">
            <p className="mb-2">
              <strong>Full Name:</strong> {user.firstName} {user.secondName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="mb-2">
              <strong>Gender:</strong> {user.gender}
            </p>
            <p className="mb-2">
              <strong>Mobile Number:</strong> {user.mobileNumber}
            </p>
            <p className="mb-2">
              <strong>Member Since:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
<br />
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login"; // Redirect after logout
              }}
              className="mt-4 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 "
            >
              Logout
            </button>

          </div>
        )}

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Reservation History
          </h3>
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
                    <td className="p-2">
                      {new Date(r.date).toLocaleDateString()}
                    </td>
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
    </div>
  );
}

export default Profile;
