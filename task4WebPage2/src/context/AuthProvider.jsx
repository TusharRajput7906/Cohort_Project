import React, { useState, createContext, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Initialize localStorage if not exists
    if (!localStorage.getItem('employees')) {
      setLocalStorage();
    }
    
    const {employees} = getLocalStorage();
    setUserData(employees);
  }, []);

  return (
    <div>
      <AuthContext.Provider value={[userData,setUserData]}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
