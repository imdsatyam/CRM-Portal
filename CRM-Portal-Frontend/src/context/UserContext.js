// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername, userImage, setUserImage }}>
      {children}
    </UserContext.Provider>
  );
};
