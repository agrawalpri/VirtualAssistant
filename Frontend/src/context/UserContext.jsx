import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const UserDataContext = createContext();
function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // <-- stop loading no matter what
    }
  };
  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      // setUserData(null);
      console.log(error);
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);
  const value = {
    serverUrl,
    userData,
    setUserData,
    isLoading,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
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
