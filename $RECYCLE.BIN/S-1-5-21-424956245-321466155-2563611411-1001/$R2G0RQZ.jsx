"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Select from "react-select";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "@/components/Button";
import { MdOutlineCheckBox } from "react-icons/md";

import { MdCheckBoxOutlineBlank } from "react-icons/md";

const typeOptions = ["Type 1", "Type 2", "Type 3", "Type 4", "Type 5"];

const tagOptions = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

const createOptions = (options) => {
  return options.map((option) => ({
    label: option,
    value: option.toLowerCase().replace(/\s+/g, "-"),
  }));
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0px",
    padding: "2px 0px",
    border: "1px",
    borderColor: state.isFocused ? "#1d478e" : "#ced4da",
    boxShadow: state.isFocused ? "0 0 0 1px #1d478e" : null,
    "&:hover": {
      borderColor: state.isFocused ? "#1d478e" : "#ced4da",
      borderWidth: "1px",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
    color: "#a8a8a8",
  }),
};

const Page = () => {
  const formattedTypeOptions = createOptions(typeOptions);

  const formattedTagOptions = createOptions(tagOptions);

  const [type, setType] = useState([]);
  const [tag, setTag] = useState([]);

  const handleType = (typeOptions) => {
    setType(typeOptions);
  };

  const handleTag = (tagOptions) => {
    setTag(tagOptions);
  };

  const breadcrumbsProps = {
    path: "/user/notice/our-notice/find-template",
    skip: "/user/notice",
  };

  const [checked, setChecked] = useState({
    legacy: false,
    new: false,
  });

  const handleCheckboxClick = (checkbox) => {
    setChecked((prev) => ({
      ...prev,
      [checkbox]: !prev[checkbox],
    }));
  };

  return (
    <div className="pt-6">
      <div className="px-6 pt-10">
        <Header title="Find Template" breadcrumbsProps={breadcrumbsProps} />
      </div>
      <div className="flex pt-5">
        <div className="fixed h-[100vh] w-[20%] bg-[#F4F4F4] px-6 pt-12">
          <div>
            <label className="text-base font-normal">Notice ID</label>
            <input
              type="text"
              placeholder="123456789"
              className="mt-2 h-10 w-full border border-[#D2E1FB] p-2 outline-none placeholder:text-xs"
            />
          </div>
          <div className="mt-3">
            <label className="text-base font-normal">Notice Usage</label>
            <div className="mt-2 flex gap-10">
              <h1
                onClick={() => handleCheckboxClick("legacy")}
                className="cursor-pointer text-sm"
              >
                {checked.legacy ? (
                  <MdOutlineCheckBox
                    size={24}
                    className="mr-2 inline-block text-primary"
                  />
                ) : (
                  <MdCheckBoxOutlineBlank
                    size={24}
                    className="mr-2 inline-block text-[#C7CFE2]"
                  />
                )}
                Legacy
              </h1>

              {/* New checkbox */}
              <h1
                onClick={() => handleCheckboxClick("new")}
                className="cursor-pointer text-xs"
              >
                {checked.new ? (
                  <MdOutlineCheckBox
                    size={24}
                    className="mr-2 inline-block text-primary"
                  />
                ) : (
                  <MdCheckBoxOutlineBlank
                    size={24}
                    className="mr-2 inline-block text-[#C7CFE2]"
                  />
                )}
                New
              </h1>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-base font-normal">Notice Name</label>
            <input
              type="text"
              placeholder="Enter Notice Name"
              className="mt-2 h-10 w-full border border-[#D2E1FB] p-2 placeholder:text-xs"
            />
          </div>
          <div className="mt-3">
            <label className="text-base font-normal">Description</label>
            <textarea
              placeholder="Write Description"
              className="mt-2 h-48 w-full border border-[#D2E1FB] p-2 placeholder:text-xs"
            ></textarea>
          </div>
          <div className="mt-2">
            <label className="text-base font-normal">Type</label>
            <Select
              id="type"
              options={formattedTypeOptions}
              value={type}
              onChange={handleType}
              placeholder="Select Type"
              styles={customStyles}
              isMulti
              className="border placeholder:text-xs focus:outline-none"
            />
          </div>

          <div className="mt-3">
            <label className="text-base font-normal">Tags</label>
            <Select
              id="tag"
              options={formattedTagOptions}
              value={tag}
              onChange={handleTag}
              placeholder="Select Tag"
              styles={customStyles}
              isMulti
              className="border placeholder:text-xs focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full border-t border-[#D2E1FB]">
          <h1>dfhfh</h1>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 z-0 mt-10 flex h-[58px] w-full items-center justify-end gap-3 border-t-[1px] bg-[#fafafa] px-10 py-4 shadow-xl">
        <Link href="/user/notice/our-notice">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary">
            <FaArrowLeft />
            <p>Back</p>
          </button>
        </Link>

        <Link href="/user/principal-management/">
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-3 py-1.5 text-[12px]"
          >
            Publish
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
