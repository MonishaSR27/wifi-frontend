import { rebootRouter } from '../services/api';

export default function RebootRouter() {
  const handleReboot = async () => {
    const result = await rebootRouter();
    alert(result.message);
  };

  return (
    <div className="p-4 border rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Reboot Router</h2>
      <button onClick={handleReboot} className="bg-red-600 text-white px-4 py-1 rounded">
        Reboot
      </button>
    </div>
  );
}
