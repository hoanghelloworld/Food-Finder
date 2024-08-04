import React, { createContext, useContext, useState } from 'react';

const LabelContext = createContext();

export const useLabel = () => useContext(LabelContext);

export const LabelProvider = ({ children }) => {
  const [label, setLabel] = useState(null);

  return (
    <LabelContext.Provider value={{ label, setLabel }}>
      {children}
    </LabelContext.Provider>
  );
};