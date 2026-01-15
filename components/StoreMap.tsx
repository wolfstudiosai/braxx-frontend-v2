"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface StoreMapProps {
  locations: StoreLocation[];
}

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path fill="#e2ff4a" stroke="#000" stroke-width="2" d="M16 2C9.373 2 4 7.373 4 14c0 8 12 24 12 24s12-16 12-24c0-6.627-5.373-12-12-12z"/>
      <circle cx="16" cy="14" r="5" fill="#000"/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40]
});

const StoreMap: React.FC<StoreMapProps> = ({ locations }) => {
  // Calculate center point between all locations
  const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
  const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#e2ff4a]"></div>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Authorized Dealer</span>
              </div>
              <h3 className="text-lg font-black text-black tracking-tight uppercase mb-2">
                {location.name}
              </h3>
              <p className="text-sm text-gray-600 font-medium">{location.address}</p>
              <p className="text-sm text-gray-600 font-medium">{location.city}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-bold text-black bg-[#e2ff4a] px-3 py-1.5 rounded-full hover:bg-black hover:text-[#e2ff4a] transition-colors"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default StoreMap;
