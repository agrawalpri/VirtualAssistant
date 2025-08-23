import React, { useState } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdKeyboardBackspace } from "react-icons/md";
function Customize2() {
  const navigate = useNavigate();
  const { userData, setUserData, backendImage, selectedImage, serverUrl } =
    useContext(UserDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.AssistantName || ""
  );
  const [loading, setLoading] = useState(false);
  const handleUpdateAssistant = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );
      setLoading(false);
      console.log(result.data);
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center  flex-col p-[20px] relative">
      <MdKeyboardBackspace
        className="absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[20px] "
        onClick={() => navigate("/customize")}
      />
      <h1 className="text-white text-[30px] text-center mb-[40px]">
        Enter Your <span className="text-blue-300">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg. Siphra"
        className="w-full max-w-[500px]  h-[50px] outline-none border-2 border-white background-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className=" mt-5 min-w-[250px] h-[35px] bg-white rounded-full text-black font-semibold text-[18px] hover:bg-blue-400 transition-all duration-300"
          disabled={loading}
          onClick={() => {
            // setLoading(true);
            handleUpdateAssistant();
          }}
        >
          {!loading ? "Create Your Assistant" : "Loading..."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
