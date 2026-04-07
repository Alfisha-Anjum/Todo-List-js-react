"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

const CreatePersona = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[#F8F8F8] shadow-lg w-full max-w-lg h-auto ">
        <div className="flex flex-col bg-[#F8F8F8] w-full max-w-lg pt-6 pb-2 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-[#000000]"> Add Create Persona</h1>
            <button
              onClick={closeModal}
              className="text-red-600 hover:bg-red-100 rounded-full p-2"
            >
              <IoClose size={24} />
            </button>
          </div>
          <div className="border w-full mt-2"></div>
          <div className="mt-3 px-1 pb-6">
            <div>
              <h1 className="font-medium text-[#000000]">Choose Avatar</h1>
              <div className="flex justify-between  mt-3">
                {Array(8).fill().map((_, index) => (
                  <div key={index} className="w-12 h-12 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="mb-4 mt-10">
              <label htmlFor="title" className="block font-medium text-[#000000]">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="border p-2 mt-2 rounded-sm bg-[#F3F3F3] border-[#CBD5E1] w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium text-[#000000]">Description</label>
              <textarea
                id="description"
                placeholder="Type text..."
                className="border p-2 mt-2 rounded-sm bg-[#F3F3F3] border-[#CBD5E1] w-full"
                required
              />
            </div>
            <div className="mt-10">
              <button
                onClick={closeModal}
                type="submit"
                className="w-full bg-[#132F5F] text-white text-lg py-2 px-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePersona;
