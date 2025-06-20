import { useState } from "react";
import axios from "axios";

function WiFiManager() {
  const [newPassword, setNewPassword] = useState("");
  const [devices, setDevices] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const API = "https://wifi-backend-4rpz.onrender.com"; // Your deployed backend URL

  const changePassword = async () => {
    setStatus("loading");
    try {
      const res = await axios.post(`${API}/change_password`, {
        password: newPassword,
      });
      setMessage(res.data.message);
      setStatus("success");
    } catch (err) {
      setMessage("Error changing password");
      setStatus("error");
    }
  };

  const rebootRouter = async () => {
    setStatus("loading");
    try {
      const res = await axios.post(`${API}/reboot`);
      setMessage(res.data.message);
      setStatus("success");
    } catch (err) {
      setMessage("Error rebooting router");
      setStatus("error");
    }
  };

  const fetchDevices = async () => {
    try {
      const res = await axios.get(`${API}/devices`);
      setDevices(res.data.devices);
    } catch (err) {
      setMessage("Error fetching devices");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 font-sans">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">📶 Wi-Fi Management</h1>

        {/* Change Password */}
        <div>
          <h3 className="text-lg font-semibold mb-2">🔑 Change Password</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={changePassword}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Change
            </button>
          </div>
        </div>

        {/* Reboot */}
        <div>
          <h3 className="text-lg font-semibold mb-2">♻️ Reboot Router</h3>
          <button
            onClick={rebootRouter}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Reboot
          </button>
        </div>

        {/* Connected Devices */}
        <div>
          <h3 className="text-lg font-semibold mb-2">🖥️ Connected Devices</h3>
          <button
            onClick={fetchDevices}
            className="mb-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Refresh
          </button>
          <ul className="list-disc list-inside space-y-1">
            {devices.length > 0 ? (
              devices.map((device, idx) => (
                <li key={idx}>
                  {device.name || "Device"} — {device.ip}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No devices found</li>
            )}
          </ul>
        </div>

        {/* Status Feedback */}
        {status === "loading" && (
          <div className="text-center">
            <p className="text-blue-500 font-medium">Processing...</p>
            <img src="/spinner.gif" alt="Loading" className="w-12 mx-auto mt-2" />
          </div>
        )}
        {status === "success" && (
          <div className="text-center">
            <p className="text-green-600 font-medium">{message}</p>
            <img src="/success.png" alt="Success" className="w-20 mx-auto mt-2" />
          </div>
        )}
        {status === "error" && (
          <div className="text-center text-red-500 font-medium">
            ❌ {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default WiFiManager;
