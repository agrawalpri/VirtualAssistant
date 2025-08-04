import React from "react";

function Card({ image }) {
  return (
    <div className=" w-[50px] h-[100px] lg:w-[140px] lg:h-[220px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover: shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white">
      <img src={image} alt="" className="h-full object-cover" />
    </div>
  );
}

export default Card;
