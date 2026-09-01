'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Property, College } from '@/lib/mock-data';
import { MapPin, Navigation, Star, Search } from 'lucide-react';

interface MapViewProps {
  properties: Property[];
  selectedCollege?: College;
  customCoordinates?: [number, number];
  onLocationSelect?: (lat: number, lng: number, addressName?: string) => void;
  activePropertyId?: string;
  onSelectProperty?: (id: string) => void;
  className?: string;
  interactivePicker?: boolean;
  radiusMeters?: number;
}

export const MapView: React.FC<MapViewProps> = ({
  properties,
  selectedCollege,
  customCoordinates,
  onLocationSelect,
  activePropertyId,
  onSelectProperty,
  className = '',
  interactivePicker = true,
  radiusMeters = 1000,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);

  useEffect(() => {
    setIsClient(true);
    import('leaflet').then((leafletModule) => {
      setL(leafletModule.default || leafletModule);
    });
  }, []);

  const defaultCenter: [number, number] = customCoordinates
    ? customCoordinates
    : selectedCollege
    ? [selectedCollege.latitude, selectedCollege.longitude]
    : properties[0]
    ? [properties[0].latitude, properties[0].longitude]
    : [28.6366, 77.4611]; // ABES Ghaziabad default

  if (!isClient || !L) {
    return (
      <div className={`w-full h-full min-h-[420px] bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400 p-6 ${className}`}>
        <MapPin className="w-8 h-8 text-brand-600 animate-bounce mb-2" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loading Interactive Map...</span>
        <span className="text-xs text-slate-500">Distance radius & verified stay pins loading</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-card ${className}`}>
      <LeafletMapContainer
        L={L}
        center={defaultCenter}
        properties={properties}
        selectedCollege={selectedCollege}
        customCoordinates={customCoordinates}
        onLocationSelect={onLocationSelect}
        activePropertyId={activePropertyId}
        onSelectProperty={onSelectProperty}
        interactivePicker={interactivePicker}
        radiusMeters={radiusMeters}
      />
    </div>
  );
};

interface LeafletContainerInnerProps extends MapViewProps {
  L: typeof import('leaflet');
  center: [number, number];
}

const LeafletMapContainer: React.FC<LeafletContainerInnerProps> = ({
  L,
  center,
  properties,
  selectedCollege,
  customCoordinates,
  onLocationSelect,
  activePropertyId,
  onSelectProperty,
  interactivePicker,
  radiusMeters = 1000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const circleRef = useRef<import('leaflet').Circle | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
    }).setView(center, 14);
    mapRef.current = map;

    // Standard high quality OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Click on map to select custom location
    map.on('click', (e: import('leaflet').LeafletMouseEvent) => {
      if (!interactivePicker) return;
      const { lat, lng } = e.latlng;
      if (onLocationSelect) {
        onLocationSelect(lat, lng, `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      }
    });

    // Trigger Leaflet resize calculation to prevent cut-off map tiles
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [L, center, interactivePicker, onLocationSelect]);

  // Pan map when center changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(center, 14, { duration: 1 });
    }
  }, [center]);

  // Render distance radius circle & property markers
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Remove old property markers & circles
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    // Draw Campus Distance Radius Circle around selected college / location
    const activeLoc = customCoordinates || (selectedCollege ? [selectedCollege.latitude, selectedCollege.longitude] as [number, number] : null);
    if (activeLoc) {
      circleRef.current = L.circle(activeLoc, {
        color: '#1d4ed8',
        fillColor: '#3b82f6',
        fillOpacity: 0.12,
        radius: radiusMeters, // Radius in meters
        weight: 2,
        dashArray: '6, 6',
      }).addTo(map);

      // College Anchor Pin
      const pinTitle = selectedCollege ? selectedCollege.name : '📍 Selected Location';
      const locIcon = L.divIcon({
        className: 'college-marker-container',
        html: `
          <div style="background: #1d4ed8; color: white; border: 2.5px solid white; font-weight: 800; font-size: 12px; padding: 6px 14px; border-radius: 9999px; box-shadow: 0 4px 12px rgba(29, 78, 216, 0.4); white-space: nowrap;">
            🎓 ${pinTitle.split('—')[0].trim()}
          </div>
        `,
        iconSize: [200, 36],
        iconAnchor: [100, 18],
      });

      L.marker(activeLoc, { icon: locIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
            <strong style="color: #1d4ed8; font-size: 14px;">🎓 ${pinTitle}</strong>
            <p style="margin: 4px 0 0 0; color: #475569; font-size: 12px;">Center anchor for distance calculations</p>
            <div style="margin-top: 6px; font-size: 11px; font-weight: 700; color: #059669; background: #ecfdf5; padding: 4px 8px; border-radius: 6px;">
              🎯 ${(radiusMeters / 1000).toFixed(1)} km Campus Radius Circle
            </div>
          </div>
        `);
    }

    // Property Pins
    properties.forEach((prop) => {
      const isActive = prop.id === activePropertyId;

      const propIcon = L.divIcon({
        className: 'property-marker-container',
        html: `
          <div style="
            background: ${isActive ? '#1d4ed8' : 'white'};
            color: ${isActive ? 'white' : '#0f172a'};
            border: 2px solid ${isActive ? '#1e40af' : '#cbd5e1'};
            font-weight: 800;
            font-size: 12px;
            padding: 5px 10px;
            border-radius: 10px;
            box-shadow: ${isActive ? '0 6px 16px rgba(29, 78, 216, 0.4)' : '0 4px 12px rgba(15, 23, 42, 0.12)'};
            transform: ${isActive ? 'scale(1.15)' : 'scale(1)'};
            transition: all 0.2s ease;
            white-space: nowrap;
          ">
            ₹${(prop.minRent / 1000).toFixed(1)}k • ${prop.type}
          </div>
        `,
        iconSize: [95, 30],
        iconAnchor: [47, 15],
      });

      const marker = L.marker([prop.latitude, prop.longitude], { icon: propIcon }).addTo(map);

      marker.on('click', () => {
        if (onSelectProperty) onSelectProperty(prop.id);
      });

      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 13px; max-width: 220px; padding: 2px;">
          <strong style="color: #0f172a; font-size: 14px; display: block; margin-bottom: 2px;">${prop.name}</strong>
          <div style="margin: 4px 0; color: #1d4ed8; font-weight: 800; font-size: 15px;">₹${prop.minRent.toLocaleString('en-IN')}<span style="font-size: 11px; color: #64748b; font-weight: 500;">/month</span></div>
          <div style="color: #475569; font-size: 12px; margin-bottom: 8px;">${prop.genderPreference} • ${prop.locality}</div>
          <a href="/stay/${prop.slug}" style="display: block; background: #1d4ed8; color: white; text-align: center; padding: 6px 10px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 12px;">View Details</a>
        </div>
      `);
    });
  }, [L, properties, selectedCollege, customCoordinates, activePropertyId, onSelectProperty, radiusMeters]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {interactivePicker && (
        <div className="absolute top-3 left-3 z-[400] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-800 dark:text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm pointer-events-none flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
          <span>📍 Distance Radius: {(radiusMeters / 1000).toFixed(1)} km circle</span>
        </div>
      )}
    </div>
  );
};
