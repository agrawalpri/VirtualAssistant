import React, { createContext } from "react";
import { useState } from "react";
export const UserDataContext = createContext();
function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);

  const value = {
    serverUrl,
  };
  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
}

export default UserContext;
