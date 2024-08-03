"use client"
import React, { useEffect, useRef, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { UserLocationContext } from '@/context/UserLocationContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const OSMMapView = ({ businessList }) => {
  const { userLocation } = useContext(UserLocationContext);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && userLocation && userLocation.lat && userLocation.lng) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation]);

  const userIcon = new L.Icon({
    iconUrl: '/user.png',
    iconSize: [38, 50],
  });

  const businessIcon = new L.Icon({
    iconUrl: '/circle.png',
    iconSize: [20, 20],
  });

  return (
    <MapContainer
      center={userLocation && userLocation.lat && userLocation.lng ? [userLocation.lat, userLocation.lng] : [0, 0]}
      zoom={13}
      ref={mapRef}
      style={{ height: '70vh', width: '100%', position: 'absolute', zIndex: 1}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && userLocation.lat && userLocation.lng && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>VỊ TRÍ HIỆN TẠI</Popup>
        </Marker>
      )}
      {businessList.map((business, index) => (
        <Marker key={index} position={[business.lat, business.lng]} icon={businessIcon}>
          <Popup>{business.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OSMMapView;