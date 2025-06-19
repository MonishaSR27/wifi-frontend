import { useState } from "react";
import axios from "axios";

function WiFiManager() {
  const [newPassword, setNewPassword] = useState("");
  const [devices, setDevices] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const changePassword = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/change-password", {
        password: newPassword,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error changing password");
    }
  };

  const rebootRouter = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/reboot");
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error rebooting router");
    }
  };

  const fetchDevices = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/devices");
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

        {/* Status Message */}
        {message && (
          <p className="text-center text-green-600 font-medium border-t pt-4">{message}</p>
        )}
      </div>
    </div>
  );
}

export default WiFiManager;
