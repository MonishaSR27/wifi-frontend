const BASE_URL = "https://wifi-backend-4rpz.onrender.com";

export const changePassword = async (newPassword: string) => {
  const response = await fetch(`${BASE_URL}/change_password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ new_password: newPassword }),
  });
  return await response.json();
};

export const rebootRouter = async () => {
  const response = await fetch(`${BASE_URL}/reboot`, { method: 'POST' });
  return await response.json();
};

export const getConnectedDevices = async () => {
  const response = await fetch(`${BASE_URL}/connected_devices`);
  return await response.json();
};
