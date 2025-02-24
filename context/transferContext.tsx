import React, { createContext, useContext, useState } from 'react';

const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
  const [recentTransfers, setRecentTransfers] = useState([]);

  const addRecentTransfer = (contact) => {
    setRecentTransfers((prev) => [contact, ...prev].slice(0, 5)); // Max 5 recent transfers
  };

  return (
    <TransferContext.Provider value={{ recentTransfers, addRecentTransfer }}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransfer = () => useContext(TransferContext);

