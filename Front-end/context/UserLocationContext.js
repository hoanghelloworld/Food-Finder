import React, { createContext, useState } from 'react';

export const UserLocationContext = createContext();

export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({ lat: 21.0408453, lng: 105.7827453 });

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};