"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter
// import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Page = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router
  // const [passwordShow, setPasswordShow] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch token from localStorage or query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryToken = urlParams.get("token");

    if (queryToken) {
      console.log("Token from query:", queryToken);
      localStorage.setItem("token", queryToken);
      setToken(queryToken);
      setVerify(true);
    } else {
      const storedToken = localStorage.getItem("token");
      const storedVerify = localStorage.getItem("verify");

      console.log("Stored token:", storedToken);
      console.log("Stored verify:", storedVerify);

      if (!storedToken || storedVerify !== "true") {
        toast.error("Session expired. Please log in again.");
        return;
      }

      setToken(storedToken);
      setVerify(true);
    }
  }, []);

  // Handle password reset
  const resetMasterPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token. Please log in again.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

   try {
     // Use the apiCall utility function
     const response = await apiCall("/reset-password", {
       method: "POST",
       data: {
         token, // Use the token from the state
         new_password: password,
       },
     });

     console.log("Response:", response);
     toast.success(response.message || "Password reset successfully!");
     localStorage.clear(); // Clear storage after successful reset
     setVerify(false);

     // Redirect to login page
     router.push("/login");
   }
    catch (error) {
     console.error("Error response:", error.response?.data || error.message);

     // Handle error messages safely
     const errorMessage = Array.isArray(error.response?.data?.detail)
       ? error.response.data.detail.map((item) => item.msg).join(", ")
       : "An error occurred. Please try again.";

     toast.error(errorMessage);
   } finally {
     setLoading(false);
   }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative h-screen w-screen bg-gradient-to-l from-[#132F5F] via-[#2B5EB9] to-[#132F5F]">
      <div className="absolute right-1 h-[50%] mt-20 blur-3xl rounded-l-[35%] bg-[#2D61C0]"></div>

      <div className="flex justify-center h-screen">
        <div className="flex justify-center items-center z-20 w-full sm:w-1/2 flex-col">
          <div className=" h-[449px] rounded-lg  w-[90%] sm:w-[437px] flex flex-col border bg-white">
            <form className="px-7 sm:px-[42px] mt-7">
              <h2 className="text-xl sm:text-[28px] font-semibold text-[#252525]">
                Reset Master Password
              </h2>
              <p className="text-[#787878] mt-[10px] font-normal text-xs sm:text-sm">
                Update your master password to maintain account security.
              </p>

              <div className="flex flex-col mt-8 gap-2">
                <label htmlFor="password" className="text-base font-normal">
                  Create Master Password
                </label>
                <div className="border border-[#D9D9D9] flex items-center w-full p-2 focus-within:border-borderPrimary">
                  <input
                    className="outline-none placeholder:text-xs w-full"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* {passwordShow ? (
                    <IoIosEye
                      size={20}
                      className="text-icon"
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  ) : (
                    <IoIosEyeOff
                      size={20}
                      className="text-icon"
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  )} */}
                </div>
              </div>

              <div className="flex flex-col mt-5 gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-base font-normal"
                >
                  Confirm Master Password
                </label>
                <div className="border border-[#D9D9D9] flex items-center w-full p-2 focus-within:border-borderPrimary">
                  <input
                    className="outline-none placeholder:text-xs w-full placeholder:text-[#D9D9D9]"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-type Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {/* {passwordShow ? (
                    <IoIosEye
                      size={20}
                      className="text-icon"
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  ) : (
                    <IoIosEyeOff
                      size={20}
                      className="text-icon"
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  )} */}
                </div>
              </div>

              <div className="flex flex-col mt-10">
                {loading ? (
                  <div className="bg-[#142F5F] py-2 text-white border flex justify-center items-center">
                    <span className="buttonLoader"></span>
                  </div>
                ) : (
                  <button
                    onClick={resetMasterPassword}
                    className="bg-[#142F5F] text-lg text-white py-2"
                  >
                    Set Password
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
