import React, { useEffect, useRef, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { UserLocationContext } from '@/context/UserLocationContext';
import 'leaflet/dist/leaflet.css';

const OSMMapView = ({ businessList }) => {
  const { userLocation } = useContext(UserLocationContext);
  const mapRef = useRef();
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    if (mapRef.current && userLocation && userLocation.lat && userLocation.lng) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation]);

  const userIcon = new L.Icon({
    iconUrl: '/user.png',
    iconSize: [40, 50], // size of icon
  });
5050
  const businessIcon = new L.Icon({
    iconUrl: '/gps.png',
    iconSize: [30, 30], // size of icon
  });

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);

    if (userLocation && userLocation.lat && userLocation.lng) {
      const origin = `${userLocation.lat},${userLocation.lng}`;
      const destination = `${business.lat},${business.lng}`;
      const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

      window.open(googleMapsURL, '_blank');
    }
  };

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
        <Marker
          key={index}
          position={[business.lat, business.lng]}
          icon={businessIcon}
          eventHandlers={{
            click: () => handleBusinessClick(business),
          }}
        >
          <Popup>{business.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OSMMapView;
