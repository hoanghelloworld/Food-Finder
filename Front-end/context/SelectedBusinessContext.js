import React, { createContext, useState } from 'react';

export const SelectedBusinessContext = createContext();

export const SelectedBusinessProvider = ({ children }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <SelectedBusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
      {children}
    </SelectedBusinessContext.Provider>
  );
};