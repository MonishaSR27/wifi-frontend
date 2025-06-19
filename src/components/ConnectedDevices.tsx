import { useEffect, useState } from 'react';
import { getConnectedDevices } from '../services/api';

export default function ConnectedDevices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getConnectedDevices().then((data) => setDevices(data));
  }, []);

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Connected Devices</h2>
      <ul>
        {devices.map((device: any, index) => (
          <li key={index} className="mb-1">
            {device.name} - {device.ip}
          </li>
        ))}
      </ul>
    </div>
  );
}
