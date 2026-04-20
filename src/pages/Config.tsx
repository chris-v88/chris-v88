import { useState } from 'react';
import flagsData from '../data/flags.json';
import { clearFlagOverrides, getFlagOverrides, setFlagOverride } from '../utils/featureFlags';
import { Button } from '../components/ui';

const Config = () => {
  const now = new Date();

  const [overrides, setOverrides] = useState(getFlagOverrides);

  const handleToggle = (name: string, checked: boolean) => {
    setFlagOverride(name, checked);
    setOverrides((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="flex flex-row space-x-4 mb-6">
        <Button className="" tone="neutral" onClick={() => (window.location.href = '/')}>
          ← Back
        </Button>
        <Button
          className=""
          tone="caution"
          onClick={() => {
            clearFlagOverrides();
            setOverrides({});
          }}
        >
          x Reset
        </Button>
      </div>
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Configuration:</h1>
      <div className="space-y-4 max-w-2xl">
        {flagsData.flags.map((flag) => {
          const isExpired = now > new Date(flag.expires);

          // use override if set, otherwise fall back to JSON value
          const effectiveValue = flag.name in overrides ? overrides[flag.name] : flag.enabled;

          const isActive = isExpired || effectiveValue;

          return (
            <div
              key={flag.name}
              className="bg-neutral-900 rounded-lg p-4 border border-neutral-800"
            >
              <div className="flex items-center justify-between mb-2">
                <code className="text-blue-400 font-mono text-sm">{flag.name}</code>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    disabled={isExpired}
                    onChange={(e) => handleToggle(flag.name, e.target.checked)}
                    className="w-4 h-4 accent-green-500"
                  />
                  <span
                    className={`text-sm font-semibold ${isActive ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {String(isActive)}
                  </span>
                </label>
              </div>
              {flag.description && <p className="text-gray-400 text-sm mb-2">{flag.description}</p>}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span>
                  configured:{' '}
                  <span className={flag.enabled ? 'text-green-500' : 'text-red-500'}>
                    {String(flag.enabled)}
                  </span>
                </span>
                <span>
                  expires:{' '}
                  <span className={isExpired ? 'text-yellow-400' : 'text-gray-400'}>
                    {flag.expires}
                  </span>
                </span>
                {isExpired && (
                  <span className="text-yellow-400 font-medium">[expired — feature forced on]</span>
                )}
                {!isExpired && flag.name in overrides && (
                  <span className="text-purple-400 font-medium">[manually overridden]</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Config;
