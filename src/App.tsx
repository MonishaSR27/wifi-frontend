import ChangePassword from './components/ChangePassword';
import RebootRouter from './components/RebootRouter';
import ConnectedDevices from './components/ConnectedDevices';

export default function App() {
  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Wi-Fi Management Tool</h1>
      <ChangePassword />
      <RebootRouter />
      <ConnectedDevices />
    </div>
  );
}
