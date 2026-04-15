import flagsData from '../data/flags.json';

const Config = () => {
  const now = new Date();

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Configuration:</h1>
      <div className="space-y-4 max-w-2xl">
        {flagsData.flags.map((flag) => {
          const isExpired = now > new Date(flag.expires);
          const isActive = isExpired || flag.enabled;

          return (
            <div
              key={flag.name}
              className="bg-neutral-900 rounded-lg p-4 border border-neutral-800"
            >
              <div className="flex items-center justify-between mb-2">
                <code className="text-blue-400 font-mono text-sm">{flag.name}</code>
                <span
                  className={`text-sm font-semibold ${isActive ? 'text-green-400' : 'text-red-400'}`}
                >
                  {String(isActive)}
                </span>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Config;
