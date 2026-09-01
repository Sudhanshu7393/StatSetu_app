'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTIES_DATA, Property } from '@/lib/mock-data';

interface CompareContextType {
  comparedIds: string[];
  toggleCompare: (propertyId: string) => void;
  isInCompare: (propertyId: string) => boolean;
  comparedProperties: Property[];
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'staysetu_compared_properties_v1';

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [comparedIds, setComparedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setComparedIds(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  const toggleCompare = (propertyId: string) => {
    setComparedIds(prev => {
      let next: string[];
      if (prev.includes(propertyId)) {
        next = prev.filter(id => id !== propertyId);
      } else {
        if (prev.length >= 3) {
          // Limit to max 3 properties at once
          next = [...prev.slice(1), propertyId];
        } else {
          next = [...prev, propertyId];
        }
      }

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const isInCompare = (propertyId: string) => comparedIds.includes(propertyId);

  const comparedProperties = PROPERTIES_DATA.filter(p => comparedIds.includes(p.id));

  const clearCompare = () => {
    setComparedIds([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <CompareContext.Provider
      value={{ comparedIds, toggleCompare, isInCompare, comparedProperties, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
