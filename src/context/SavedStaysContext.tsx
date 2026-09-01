'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTIES_DATA, Property } from '@/lib/mock-data';

interface SavedStaysContextType {
  savedIds: string[];
  toggleSave: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
  savedProperties: Property[];
  clearAllSaved: () => void;
}

const SavedStaysContext = createContext<SavedStaysContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'staysetu_saved_properties_v1';

export function SavedStaysProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSavedIds(JSON.parse(stored));
      } else {
        // Initial fallback to first 2 properties for immediate demo preview
        const initial = [PROPERTIES_DATA[0].id, PROPERTIES_DATA[1].id];
        setSavedIds(initial);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      }
    } catch (err) {
      console.error('Error loading saved properties:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleSave = (propertyId: string) => {
    setSavedIds(prev => {
      const next = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Error saving property to localStorage:', err);
      }
      return next;
    });
  };

  const isSaved = (propertyId: string) => savedIds.includes(propertyId);

  const savedProperties = PROPERTIES_DATA.filter(p => savedIds.includes(p.id));

  const clearAllSaved = () => {
    setSavedIds([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <SavedStaysContext.Provider
      value={{ savedIds, toggleSave, isSaved, savedProperties, clearAllSaved }}
    >
      {children}
    </SavedStaysContext.Provider>
  );
}

export function useSavedStays() {
  const context = useContext(SavedStaysContext);
  if (!context) {
    throw new Error('useSavedStays must be used within a SavedStaysProvider');
  }
  return context;
}
