import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const { userData, serverUrl, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="w-full  h-[100vh]  bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center  flex-col  gap-[15px]">
      <button
        className="w-[180px] h-[45px] bg-white rounded-full text-black font-semibold text-[13px] hover:bg-blue-400 transition-all duration-300 absolute top-[20px] left-[20px] cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>
      <button
        className="w-[180px] h-[45px] bg-white rounded-full text-black font-semibold text-[13px] hover:bg-blue-400 transition-all duration-300 absolute top-[20px] right-[20px] cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </button>

      <div className=" w-[250px] h-[300px] flex justify-center items-center overflow-hidden rounded-4xl shadow-2xl shadow-blue-950">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-2xl font-semibold">
        I'm {userData.assistantName}
      </h1>
    </div>
  );
}

export default Home;
