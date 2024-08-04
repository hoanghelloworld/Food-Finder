import React, { useEffect, useRef, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { UserLocationContext } from '@/context/UserLocationContext';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';
import 'leaflet/dist/leaflet.css';
import Markers from './Markers';

const OSMMapView = ({ businessList }) => {
  const { userLocation } = useContext(UserLocationContext);
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && userLocation && userLocation.lat && userLocation.lng) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation]);

  const userIcon = new L.Icon({
    iconUrl: '/user.png',
    iconSize: [60, 65],
  });

  return (
    <MapContainer
      center={userLocation && userLocation.lat && userLocation.lng ? [userLocation.lat, userLocation.lng] : [0, 0]}
      zoom={13}
      ref={mapRef}
      style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 0 }}
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
        <Markers key={index} business={business} />
      ))}
    </MapContainer>
  );
};

export default OSMMapView;
