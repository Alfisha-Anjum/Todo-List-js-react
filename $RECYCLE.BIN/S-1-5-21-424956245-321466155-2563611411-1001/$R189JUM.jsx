"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Control = ({ data }) => {
  const pathname = usePathname();

  const handleArrowClick = (title) => {
    if (title !== "Resources") return;
    if (pathname === "/designer") setOpenEdit(true);
    else setOpenRequest(true);
  };

  return (


    <div
      //   style={{ borderTopColor: item?.primaryColor || "#C7CFE2" }}
      className="border-t-[15px] border-[#C7CFE2] border-r border-b border-l h-[159px] p-4 flex flex-col hover:shadow-md cursor-pointer "
    >
      {/* Title + Count */}
      <div className="mb-3 flex items-center gap-3">
        <h3 className="text-[16px] text-[#204156]">
          Control
        </h3>
        <span className="flex h-[22px] w-[24px] items-center justify-center  bg-[#4793ce] px-2 py-1 text-xs text-[#47687D]">
          {data.length}
        </span>
      </div>

      {/* Icon */}
      <div className="mt-3 flex gap-1">
        {data.map((image, i) => (
          <div key={i} className="">
            <img
              src={image?.control_icon || "/icon.png"}
              height={1000}
              width={1000}
              alt={data?.control_name || "icon"}
              className="h-8 w-8"
            /></div>))}

      </div>

      {/* Category */}
      <p className="text-sm text-gray-500 mt-2">
        {data.control_category}
      </p>

      {/* Button */}
      <div className="mt-auto flex justify-end">
        <button
          // onClick={() => handleArrowClick(item?.title)}
          // style={{ backgroundColor: item?.primaryColor || "#4793ce" }}
          className="h-[32px] w-[32px] rounded-full p-2 text-white bg-[#4793ce]"
          aria-label="Open"
        >
          <FaArrowRight size={16} />
        </button>
      </div>


    </div>
  );
};

export default Control;
