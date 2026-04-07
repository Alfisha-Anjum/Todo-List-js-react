"use client";

import React, { useState } from "react";
import Select from "react-select";
import { customStyles } from "@/utils/selectCustomStyles";

const CreateStep2 = () => {
  const [type, setType] = useState([]);
  const typeOptions = ["Type 1", "Type 2", "Type 3", "Type 4", "Type 5"];

  const handleType = (typeOptions) => {
    setType(typeOptions);
  };

  const formattedTypeOptions = typeOptions.map((type) => ({
    value: type,
    label: type,
  }));
  return (
    <div className="flex w-full max-w-lg flex-col px-3 pb-2 pt-8">
      <h1 className="text-[28px]">Legal & Technical</h1>
      <p className="mb-8 text-xs">
        Lorem ipsum dolor sit amet consectetur. Tellus a quis aliquet eros.
      </p>
      <div className="mt-3 px-1 pb-6">
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-[#000000]">
            Field 01
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Field Name"
            className="mt-2 w-full rounded-sm border border-[#CBD5E1] p-2 placeholder:text-xs"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block font-medium text-[#000000]"
          >
            Field Description
          </label>
          <textarea
            id="description"
            placeholder="Decription"
            className="mt-2 h-[95px] w-full resize-none rounded-sm border border-[#CBD5E1] p-2 placeholder:text-xs"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-base font-normal">Field 03</label>
          <Select
            id="type"
            options={formattedTypeOptions}
            value={type}
            onChange={handleType}
            placeholder="Select Type"
            styles={customStyles}
            isMulti
            className="mt-2 border placeholder:text-xs focus:outline-none"
          />
        </div>
        <div className="pb-5">
          <label className="text-base font-normal">Field 04</label>
          <Select
            id="type"
            options={formattedTypeOptions}
            value={type}
            onChange={handleType}
            placeholder="Select Type"
            styles={customStyles}
            isMulti
            className="mt-2 border placeholder:text-xs focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateStep2;
