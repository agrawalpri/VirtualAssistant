// import React, { useContext } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

import bg from "../assets/authBg.png"; // Assuming you have a background image
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { UserDataContext } from "../context/UserContext";

import React from "react";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setErr] = useState("");
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data);
      setLoading(false);
      navigate("/");
      // console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.error("Error during sign in:", error);
      setLoading(false);
      setErr(error.response.data.message);
    }
  };
  return (
    <div
      className=" w-full h-[120vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[550px] max-w-[500px] bg-[#00000063] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-2xl font-semi-bold mb-[30px]">
          Sign In to <span className="text-blue-700">Virtual Assistant</span>
        </h1>

        <input
          type="email"
          placeholder=" Email "
          className="w-full h-[50px] outline-none border-2 border-white background-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="w-full h-[50px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword && (
            <IoEyeSharp
              className="absolute  w-[25px] h-[25px] top-[10px] right-[20px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
          {showPassword && (
            <IoEyeOffSharp
              className="absolute  w-[25px] h-[25px] top-[10px] right-[20px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>
        {error && <p className="text-red-500">*{error}</p>}
        <button
          className="min-w-[100px] h-[45px] bg-white rounded-full text-black font-semibold text-[18px] hover:bg-blue-400 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Loading....." : "Sign In"}
        </button>
        <p className="text-white text-[14px]">
          Create a new account?
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

// export default SignUp;

export default SignIn;
