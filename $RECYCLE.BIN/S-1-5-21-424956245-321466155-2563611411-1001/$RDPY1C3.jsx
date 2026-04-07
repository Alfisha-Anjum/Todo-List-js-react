"use client";
import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { BsFiletypeXlsx } from "react-icons/bs";

const FileImport = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await handleFileUpload(selectedFile);
    }
  };

  const handleFileUpload = async (fileToUpload) => {
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', fileToUpload);

    try {
      await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          // Instead of calculating progress, we'll simulate it
          const total = progressEvent.total;
          const loaded = progressEvent.loaded;

          // Simulating custom progress updates
          if (loaded <= total * 0.3) {
            setProgress(30);
          } else if (loaded <= total * 0.5) {
            setProgress(50);
          } else {
            setProgress(100);
          }
        },
      });

      alert('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('File upload failed.');
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-[#F8F8F8] shadow-lg w-full max-w-lg h-auto">
        <div className="flex flex-col bg-[#F8F8F8] w-full max-w-lg pt-6 pb-5 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-[#000000]">Import File</h1>
            <button
              onClick={closeModal}
              className="text-red-600 hover:bg-red-100 rounded-full p-2"
            >
              <IoClose size={24} />
            </button>
          </div>
          <div className="border w-full mt-2"></div>
          <div className="flex items-center justify-center w-full pt-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile) {
                  setFile(droppedFile);
                  handleFileUpload(droppedFile);
                }
              }}
            >
              <div className="flex flex-col items-center justify-center pt-14 pb-14">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-lg font-semibold text-black">
                  Drag and Drop file to upload
                </p>
                <p>or</p>
                <button
                  type="button"
                  className="border-2 bg-primary text-white text-sm font-semibold py-2 mt-2 px-3 flex items-center"
                  onClick={() => document.getElementById('dropzone-file').click()}
                >
                  Browse File
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Supported file: CSV, xlsx up to 50 MB
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {file && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
              <BsFiletypeXlsx className='flex text-green-600  '/>
                <p>{file.name}</p>
                
              </div>
              {uploading ? (
                <div className="flex items-center">
                  <p className="text-red-500">x</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-600"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          )}
          {uploading && (
            <div className="w-full bg-gray-200 rounded mt-5 ">
              <div
                className="bg-primary text-xs font-medium text-white text-center p-1 leading-none rounded"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}
          {!uploading && progress === 100 && (
            <button className='bg-primary text-white mt-5 py-2'   onClick={closeModal}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileImport;
