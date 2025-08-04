import React, { useState } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

function Customize2() {
  const { userData } = useContext(UserDataContext);
  const [assitantName, setAssistantName] = useState(
    userData?.assitantName || ""
  );
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center  flex-col p-[20px]">
      <h1 className="text-white text-[30px] text-center mb-[40px]">
        Enter Your <span className="text-blue-300">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg. Siphra"
        className="w-full max-w-[500px]  h-[50px] outline-none border-2 border-white background-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assitantName}
      />
      {assitantName && (
        <button
          className=" mt-5 min-w-[250px] h-[35px] bg-white rounded-full text-black font-semibold text-[18px] hover:bg-blue-400 transition-all duration-300"
          onClick={() => navigate("/customize2")}
        >
          Create Your Assistant
        </button>
      )}
    </div>
  );
}

export default Customize2;
