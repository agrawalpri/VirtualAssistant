import React from "react";
import { LuImagePlus } from "react-icons/lu";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg.jpg";
import image7 from "../assets/images7.jpeg";
import Card from "../components/Card";
function Customize() {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center  flex-col">
      <div className="w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[15px]">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />
        <div className="w-[150px] h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover: shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white  flex items-center justify-center">
          <LuImagePlus className="text-white w-[35px] h-[35-px] " />
        </div>
      </div>
    </div>
  );
}

export default Customize;
