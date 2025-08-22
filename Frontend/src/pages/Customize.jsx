import React, { useContext, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg.jpg";
import image7 from "../assets/images7.jpeg";
import Card from "../components/Card";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
function Customize() {
  const {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(UserDataContext);
  // const [frontendImage, setFrontendImage]=useState(null);
  const InputImage = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center  flex-col p-[20px] ">
      <MdKeyboardBackspace
        className="absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[20px] "
        onClick={() => navigate("/")}
      />
      <h1 className="text-white text-[30px] text-center mb-[40px] ">
        Select Your <span className="text-blue-300">Assistant Image</span>
      </h1>
      <div className="w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div
          className={`w-[50px] h-[100px] lg:w-[140px] lg:h-[220px]  bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover: shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white  flex items-center justify-center ${
            selectedImage == "input"
              ? "border-4 border-white shadow-2xl shadow-blue-950"
              : null
          }`}
          onClick={() => {
            InputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <LuImagePlus className="text-white w-[35px] h-[35-px] " />
          )}
          {frontendImage && (
            <img src={frontendImage} className="h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={InputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectedImage && (
        <button
          className=" mt-5 min-w-[80px] h-[35px] bg-white rounded-full text-black font-semibold text-[18px] cursor-pointer hover:bg-blue-400 transition-all duration-300"
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;
