'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Navigation, Building, Check, X } from 'lucide-react';
import { COLLEGES_DATA, College } from '@/lib/mock-data';

interface CollegeSearchInputProps {
  selectedCollegeId: string;
  onSelectCollege: (college: College) => void;
  placeholder?: string;
  className?: string;
}

export function CollegeSearchInput({
  selectedCollegeId,
  onSelectCollege,
  placeholder = "Search college, university or location...",
  className = "",
}: CollegeSearchInputProps) {
  const selectedCollege = COLLEGES_DATA.find(c => c.id === selectedCollegeId) || COLLEGES_DATA[0];
  const [query, setQuery]           = useState(selectedCollege ? selectedCollege.name : '');
  const [isOpen, setIsOpen]         = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync query when prop changes externally
  useEffect(() => {
    if (selectedCollege && !isOpen) {
      setQuery(selectedCollege.name);
    }
  }, [selectedCollegeId, isOpen]);

  // Filter colleges by query
  const filtered = COLLEGES_DATA.filter(col => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      col.name.toLowerCase().includes(q) ||
      col.city.toLowerCase().includes(q) ||
      col.state.toLowerCase().includes(q) ||
      col.popularLocalities.some(l => l.toLowerCase().includes(q))
    );
  });

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // Reset query to selected college name if no selection made
        if (selectedCollege) {
          setQuery(selectedCollege.name);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedCollege]);

  const handleSelect = (college: College) => {
    onSelectCollege(college);
    setQuery(college.name);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter' && focusedIndex >= 0 && filtered[focusedIndex]) {
      e.preventDefault();
      handleSelect(filtered[focusedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative flex items-center">
        <MapPin className="w-5 h-5 text-brand-600 dark:text-brand-400 absolute left-4 shrink-0 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-base font-bold text-slate-900 dark:text-slate-100 pl-11 pr-9 py-3 focus:outline-none placeholder:font-normal placeholder:text-slate-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(true);
            }}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Auto-complete Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 border-b-4 border-b-slate-300 rounded-2xl shadow-elevated overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-80 overflow-y-auto">
          {/* Header notice */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {filtered.length} Colleges Available
            </span>
            <span className="text-[10px] text-slate-400">Type to search by name or city</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-6 text-center text-slate-500">
              <Building className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No college found matching "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by city like Ghaziabad, Delhi, Bengaluru...</p>
            </div>
          ) : (
            <div className="p-1 space-y-0.5">
              {filtered.map((col, idx) => {
                const isSelected = col.id === selectedCollegeId;
                const isFocused = idx === focusedIndex;

                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleSelect(col)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 font-bold border border-brand-200 dark:border-brand-800'
                        : isFocused
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {col.name.slice(0, 2).toUpperCase()}
                    </div>

                    {/* Information */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
                          {col.name}
                        </p>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 shrink-0">
                            <Check className="w-3.5 h-3.5" /> Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {col.city}, {col.state}
                      </p>
                      {/* Popular localities chips */}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {col.popularLocalities.map(loc => (
                          <span key={loc} className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
