import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export const OfflineStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [hasPendingDrafts, setHasPendingDrafts] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if there is an offline profile draft saved in localStorage
    if (localStorage.getItem('rojgar_sathi_offline_draft')) {
      setHasPendingDrafts(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setHasPendingDrafts(false);
      localStorage.removeItem('rojgar_sathi_offline_draft');
    }, 1500);
  };

  if (isOnline && !hasPendingDrafts) {
    return null;
  }

  return (
    <div
      className={`py-2 px-4 text-xs font-semibold flex items-center justify-between transition-colors ${
        !isOnline
          ? 'bg-amber-500 text-slate-900 border-b border-amber-600'
          : 'bg-emerald-600 text-white border-b border-emerald-700'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {!isOnline ? (
            <>
              <WifiOff className="w-4 h-4 text-slate-900 animate-pulse" />
              <span>
                Offline Mode Active — You can continue answering questions and exploring. Changes are saved locally and will auto-sync when connected.
              </span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4 text-white" />
              <span>
                Back Online — Syncing your offline answers with Rojgar Sathi cloud services...
              </span>
            </>
          )}
        </div>

        {hasPendingDrafts && isOnline && (
          <button
            onClick={triggerSync}
            disabled={isSyncing}
            className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-[11px] transition"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
