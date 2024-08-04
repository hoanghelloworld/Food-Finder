"use client";

import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [userLocation, setUserLocation] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState([]);

  useEffect(() => {
    console.log('window.innerHeight', window.innerHeight);
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <html lang="en">
      <body className={[raleway.className]}>
        <Provider>
          <SelectedBusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
            <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
              {children}
            </UserLocationContext.Provider>
          </SelectedBusinessContext.Provider>
        </Provider>
      </body>
    </html>
  );
}