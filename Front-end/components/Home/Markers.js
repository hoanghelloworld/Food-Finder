import React, { useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import BusinessItem from './BusinessItem';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';
import L from 'leaflet';

function Markers({ business }) {
  const { selectedBusiness, setSelectedBusiness } = useContext(SelectedBusinessContext);

  const businessIcon = new L.Icon({});

  return (
    <Marker
      position={[business.lat, business.lng]}
      icon={businessIcon}
      eventHandlers={{
        click: () => {
          setSelectedBusiness(business);
        },
      }}
    >
      {selectedBusiness && selectedBusiness.placeId === business.placeId && (
        <Popup>
          <div className='popup-content'>
            <BusinessItem business={business} showDir={true} />
          </div>
        </Popup>
      )}
    </Marker>
  );
}

export default Markers;