import React, { useState } from "react";

const ChangePassword: React.FC = () => {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async () => {
    if (!ssid || !password) {
      alert("Please fill in both SSID and Password.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/change_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ssid, password }),
      });

      const data = await response.json();
      alert(data.message || "Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <label className="block font-semibold mb-1">SSID (Wi-Fi Name)</label>
        <input
          type="text"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        onClick={handleChange}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
