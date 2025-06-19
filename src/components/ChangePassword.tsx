import { useState } from 'react';
import { changePassword } from '../services/api';

export default function ChangePassword() {
  const [password, setPassword] = useState('');

  const handleChange = async () => {
    const result = await changePassword(password);
    alert(result.message);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Change Wi-Fi Password</h2>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        className="border px-2 py-1 mr-2"
      />
      <button onClick={handleChange} className="bg-blue-600 text-white px-4 py-1 rounded">
        Change
      </button>
    </div>
  );
}
