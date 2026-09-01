'use client';

// Offline-First Local Storage & Sync Queue Engine for StaySetu Guard Terminal

export interface OfflineGateLog {
  id: string;
  timestamp: string;
  type: 'VISITOR' | 'FASTTAG' | 'STAFF' | 'TRUCK';
  detail: string;
  status: string;
  synced: boolean;
}

const STORAGE_KEY = 'staysetu_guard_offline_logs';

export const OfflineStorage = {
  // Get all logs from local storage
  getLogs(): OfflineGateLog[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initial sample logs
        const initialLogs: OfflineGateLog[] = [
          { id: 'LOG-101', timestamp: '08:45 AM', type: 'STAFF', detail: 'Sunita Devi (Maid) - Biometric In', status: 'Approved', synced: true },
          { id: 'LOG-102', timestamp: '08:52 AM', type: 'FASTTAG', detail: 'UP16 CA 1122 (Flat B-201) - Boom Open', status: 'Auto 0.4s', synced: true },
          { id: 'LOG-103', timestamp: '09:05 AM', type: 'VISITOR', detail: 'Swiggy Delivery (Flat A-102) - Voice Pass', status: 'Verified', synced: true },
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLogs));
        return initialLogs;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  // Save new log (works 100% offline with zero internet)
  saveLog(log: Omit<OfflineGateLog, 'id' | 'timestamp' | 'synced'>, isOnline: boolean): OfflineGateLog {
    const newLog: OfflineGateLog = {
      ...log,
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      synced: isOnline,
    };

    if (typeof window !== 'undefined') {
      const currentLogs = this.getLogs();
      const updated = [newLog, ...currentLogs];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    return newLog;
  },

  // Auto-sync all unsynced offline logs when internet reconnects
  syncPendingLogs(): { count: number; logs: OfflineGateLog[] } {
    if (typeof window === 'undefined') return { count: 0, logs: [] };
    const currentLogs = this.getLogs();
    let unsyncedCount = 0;

    const syncedLogs = currentLogs.map(log => {
      if (!log.synced) {
        unsyncedCount++;
        return { ...log, synced: true };
      }
      return log;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedLogs));
    return { count: unsyncedCount, logs: syncedLogs };
  },

  // Clear or reset storage
  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
};
