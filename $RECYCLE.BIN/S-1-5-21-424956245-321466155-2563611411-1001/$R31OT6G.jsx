"use client";

import React from "react";
import Image from "next/image"; 
import { IoMdAdd } from "react-icons/io";
import { MdOutlineWatchLater } from "react-icons/md";
import CountryFlag from "@/components/Country.json";

export const Card = ({
  name,
  type,
  logo,
  country,
  checked,
  onCheckChange,
  pthName,
  pending,
  setAddConfirm,
}) => {
  const countryData = CountryFlag.find(
    (countryFlag) => countryFlag.name.toLowerCase() === country?.toLowerCase()
  );
  console.log(countryData?.flag, "dklsjo");
  return (
    <div className="relative bg-white shadow-md p-4 2xl:w-72 h-32 flex flex-col items-start justify-between cursor-pointer transition-transform transform hover:scale-105">
      {/* Icon in the top-right corner */}
      {pthName && (
        <div className="absolute top-3 right-3">
          {!pending ? (
            <IoMdAdd
              className="text-[#142F5F] w-5 h-5 cursor-pointer"
              onClick={() => setAddConfirm && setAddConfirm(true)}
            />
          ) : (
            <MdOutlineWatchLater className="text-red-500 w-5 h-5" />
          )}
        </div>
      )}

      {/* Logo and Name */}
      <div className="flex space-x-2">
        <Image
          src={!logo ? "/pngegg.png" : logo}
          alt={`${name} logo`}
          width={32}
          height={32}
          objectFit="cover"
          objectPosition="center"
          className="rounded-full border h-10 w-10"
        />
        <span>
          <h3 className="font-semibold w-44 truncate ...">{name}</h3>
          <p className="text-xs text-gray-500">{type}</p>
        </span>
      </div>

      {/* Type and Country */}
      <span className="flex gap-2 items-center justify-end w-full">
        {countryData ? (
          <Image
            src={countryData.image}
            alt={`${country} flag`}
            width={25}
            height={25}
            objectFit="cover"
            objectPosition="center"
            className=""
          />
        ) : (
          <span className="text-xs text-gray-500">No Flag</span>
        )}
      </span>
    </div>
  );
};

export default Card;
