
"use client"
import Footer from "@/app/components/Footer/Footer";
import IntegrationCard from "@/app/components/IntegrationCard";
import Navbar from "@/app/components/Navbar/Navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import withAuth from "@/app/utils/withAuth";


const IntegrationDetail = ({ selectedCategory }) => {
  const navigate = useRouter();
  const workspace_id = localStorage.getItem("workspace_id");
  const [integrations, setIntegrations] = useState([]);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddApiModal, setIsAddApiModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountName, setAccountName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [apiTokenName, setApiTokenName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTransition, setModalTransition] = useState("");
  const [files, setFiles] = useState({});
  const [dataFields, setDataFields] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [uploadedFilesData, setUploadedFilesData] = useState([]);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [integrationModalLogo, setIntegrationModalLogo] = useState([]);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
    setIsAddApiModal(false);
  };
  const openApiModal = () => {
    setIsAddApiModal(true);
    setIsUploadModalOpen(false);
  };

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = selectedCategory
      ? integration.integration_category
          .map((c) => c.toLowerCase())
          .includes(selectedCategory.toLowerCase())
      : true;
    const matchesSearchTerm = integration.integration_name
      .toLowerCase()
      .includes(searchTerm);
    return matchesCategory && matchesSearchTerm;
  });

  // Implement handler functions for each category button

  const openModal = (integration) => {
    console.log(integration, "openModal");
    setSelectedIntegration(integration);
    setIsModalOpen(true);
    setModalTransition("transition-slide-in");
  };
  setFiles({});
  setDataFields([]);
  setUploadedFilesData([]);
  setUploadProgress(0);
  setShowDownloadButton(false);
  
  const closeModal = () => {
    setAccountName("");
    setWalletAddress("");
    setIsUploadModalOpen(false);
    setIsAddApiModal(false);
    setModalTransition("transition-slide-out");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://user.catax.me/account/supported-integrations",
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setIntegrations(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      toast.error("No file selected");
      return;
    }

    if (!accountName) {
      toast.error("Please provide a name for the account");
      return;
    }

    let currentAccountId = accountId;

    if (!currentAccountId) {
      const accountCreationOptions = {
        method: "POST",
        url: "https://user.catax.me/account/add-account",
        headers: { "Content-Type": "application/json" },
        data: {
          user_id: "6566d566d5ed37a275ecb31f",
          integration_id: selectedIntegration._id,
          user_account_name: accountName,
          start_date: null,
          end_date: null,
          wallet_address: walletAddress || null,
          workspace_id: workspace_id,
        },
      };

      try {
        const accountResponse = await axios.request(accountCreationOptions);
        currentAccountId = accountResponse.data.account_id;
        setAccountId(currentAccountId);
        toast.success("Account is created");
      } catch (error) {
        console.error("Error creating account:", error);
        toast.error("Error creating account");
        return;
      }
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const uploadResponse = await axios.post(
        "https://user.catax.me/account/upload-data",
        formData,
        {
          params: { user_account_id: currentAccountId },
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      toast.success("File uploaded successfully");
      setIsUploadModalOpen(false);
      console.log("Upload response:", uploadResponse.data);
      closeModal();
    } catch (uploadError) {
      console.error("Error uploading file:", uploadError);
      toast.error("Error uploading file");
    }
  };

  const addApiKey = async () => {
    let currentAccountId = accountId;

    if (!currentAccountId) {
      try {
        const accountCreationResponse = await createAccount();
        currentAccountId = accountCreationResponse.account_id;
        setAccountId(currentAccountId);
      } catch (error) {
        console.error("Error creating account:", error);
        toast.error("Error creating account");
        return;
      }
    }

    const options = {
      method: "POST",
      url: "https://user.catax.me/account/add-api-key",
      headers: { "Content-Type": "application/json" },
      data: {
        user_account_id: currentAccountId,
        api_token_name: apiTokenName,
        api_key: apiKey,
        api_secret: apiSecret,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("API Key added:", response.data);
      toast.success("API Key added successfully");
      setIsAddApiModal(false);
      setApiTokenName("");
      setApiKey("");
      setApiSecret("");
      closeModal();
    } catch (error) {
      console.error("Error adding API Key:", error);
      toast.error("Error adding API Key");
    }
  };

  const createAccount = async () => {
    if (!accountName) {
      toast.error("Please provide a name for the account");
      return;
    }

    const options = {
      method: "POST",
      url: "https://user.catax.me/account/add-account",
      headers: { "Content-Type": "application/json" },
      data: {
        user_id: "6566d566d5ed37a275ecb31f",
        integration_id: selectedIntegration._id,
        user_account_name: accountName,
        start_date: null,
        end_date: null,
        wallet_address: walletAddress || null,
        workspace_id: workspace_id,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("Account created:", response.data);
      toast.success("Account is created");
      setAccountName("");
      setWalletAddress("");
      closeModal();
      return response.data;
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Error creating account");
      throw error;
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleWalletAccount = () => {
    if (!accountName) {
      toast.error("Please provide a name for the account");
      return;
    }
    if (walletAddress) {
      setIsLoading(true);
      const options = {
        method: "POST",
        url: "https://user.catax.me/account/add-wallet",
        headers: { "Content-Type": "application/json" },
        data: {
          user_id: "6566d566d5ed37a275ecb31f",
          integration_id: selectedIntegration._id,
          user_account_name: accountName,
          start_date: null,
          end_date: null,
          wallet_address: walletAddress,
          workspace_id: workspace_id,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setSelectedChains(response.data.options);
          if (response.data.options) {
            openWalletModal();
            setIntegrationModalLogo(response.data.options);
          }
          console.log(response.data);

          setUserId(response.data.user_id);
          setAccountName(response.data.account_name);
          setWalletAddress(response.data.wallet_address);
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const [selectedChains, setSelectedChains] = useState([]);

  const handleCheckboxChange = (chainId, checked) => {
    setSelectedChains((prevSelectedChains) => {
      return prevSelectedChains.map((chain) => {
        if (chain.id === chainId) {
          return { ...chain, option: checked };
        } else {
          return chain;
        }
      });
    });
  };

  const handleBanaloClick = () => {
    const dataChecked = selectedChains.filter((item) => {
      return item.option === true;
    });
    const updatedOptionsToSend = dataChecked.map((item) => {
      return { chain_id: item.id, chain_name: item.name, option: item.option };
    });

    const options = {
      method: "POST",
      url: "https://user.catax.me/account/choose_chains",
      headers: { "Content-Type": "application/json" },
      data: updatedOptionsToSend,
      params: {
        user_id: userId,
        acc_name: accountName,
        wallet_addr: walletAddress,
        workspace_id: workspace_id,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Accounts Created Successfully");
        navigate.push("/accounts/wallets");
        closeWalletModal();
        closeModal();
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="flex h-[94vh] flex-col justify-between">
      <div className="mt-5 flex flex-wrap gap-5 px-9">
        {filteredIntegrations.map((integration) => (
          <IntegrationCard
            key={integration.integration_name}
            imgSrc={integration.integration_logo}
            onClick={() => openModal(integration)}
            name={integration.integration_name}
          />
        ))}
      </div>

      <Footer />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 opacity-75"
            onClick={closeModal}
          ></div>
          <div
            className={`z-10 ml-auto h-[90vh] w-1/2 rounded-md bg-white ${modalTransition}`}
          >
            {isLoading ? (
              <div className="relative flex h-full w-full flex-col items-center justify-center">
                <div
                  class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
                Fetching Accounts
              </div>
            ) : (
              <div>
                <h2 className="rounded-t-md bg-gray-200 p-5 font-bold shadow-sm">
                  Integration Data
                </h2>
                <p className="p-5 text-xl font-semibold text-gray-900">
                  {selectedIntegration.integration_name}
                </p>
                <div className="ml-5 flex items-center gap-10">
                  <Image
                    src={selectedIntegration.integration_logo}
                    width={100}
                    height={100}
                    alt={selectedIntegration.integration_name}
                  />
                  <p className="w-[50%] text-[12px]">
                    {selectedIntegration.integration_summary}
                  </p>
                </div>
                {/* <section className="mx-5 mt-2 flex flex-col pb-4">
                              <div className="mb-2 h-fit w-fit font-sans text-sm font-normal">
                                <label className="name-textfield">
                                  Name<span className="ml-1 text-red-500">*</span>
                                </label>
                              </div>
                              <div className="flex items-start">
                                <div className="mr-1 flex w-full flex-col items-start justify-start font-sans">
                                  <div className="relative mb-3 w-full">
                                    <input
                                      type="text"
                                      placeholder="Name"
                                      value={accountName}
                                      onChange={(e) => setAccountName(e.target.value)}
                                      className="border-grey-200 focus:border-grey-500 active:border-grey-500 disabled:border-grey-100 disabled:bg-grey-100 disabled:text-grey-300 null null h-[40px] w-full rounded-lg border p-2 text-sm shadow-[0px_3px_6px_-2px_rgba(59,_59,_95,_0.08)] outline-none focus:shadow-[0px_0px_4px_4px_rgba(59,_59,_95,_0.08)]"
                                    />
                                  </div>
                                </div> 
                              </div>
                              <div className="mb-2 h-fit w-fit font-sans text-sm font-normal">
                                <label className="name-textfield">
                                  Wallet Address
                                  <span className="ml-1 text-red-500">*</span>
                                </label>
                              </div>
                              <div className="flex items-start">
                                <div className="mr-1 flex w-full flex-col items-start justify-start font-sans">
                                  <div className="relative w-full">
                                    <input
                                      type="text"
                                      placeholder="Address"
                                      value={walletAddress}
                                      onChange={(e) =>
                                        setWalletAddress(e.target.value)
                                      }
                                      className="border-grey-200 focus:border-grey-500 active:border-grey-500 disabled:border-grey-100 disabled:bg-grey-100 disabled:text-grey-300 null null h-[40px] w-full rounded-lg border p-2 text-sm shadow-[0px_3px_6px_-2px_rgba(59,_59,_95,_0.08)] outline-none focus:shadow-[0px_0px_4px_4px_rgba(59,_59,_95,_0.08)]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </section> */}

                <div className="mx-5 mt-2 flex gap-5">
                  {selectedIntegration.is_upload_allowed && (
                    <>
                      <button
                        className="mb-2 rounded-md bg-[#a64d79] px-5 py-2 text-sm font-bold text-white "
                        onClick={openUploadModal}
                      >
                        Upload CSV
                      </button>
                    </>
                  )}
                  {selectedIntegration.is_integration_api_allowed && (
                    <button
                      className="mb-2 rounded-md bg-[#a64d79] px-5 py-2 text-sm font-bold text-white "
                      onClick={openApiModal}
                    >
                      Add API
                    </button>
                  )}
                </div>
                <div className="mx-5 mt-2">
                  {!accountId && (
                    <button
                      onClick={handleWalletAccount}
                      className="mb-2 rounded-md bg-[#a64d79] px-5 py-2 text-sm font-bold text-white "
                    >
                      Create
                    </button>
                  )}
                </div>

                {isUploadModalOpen && (
                  <div className="flex flex-col items-center justify-center ">
                    <div
                      className="absolute "
                      onClick={() => setIsUploadModalOpen(false)}
                    ></div>
                    <div className="flex  h-[90px] w-[80%] cursor-pointer items-center justify-center gap-6 rounded-[2px]  border-[1px] border-[#cbd5e1] bg-[#FFF5FB]">
                      <h2>Upload File</h2>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
                    </div>
                    <button
                      className="mt-3 rounded-md bg-blue-500 px-5 py-2 text-white"
                      onClick={uploadFile}
                    >
                      Import CSV
                    </button>
                  </div>
                )}

                {isWalletModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                      className="absolute inset-0 bg-black/50 opacity-75"
                      onClick={closeWalletModal}
                    ></div>
                    <div className="z-10 rounded-md bg-white p-5">
                      <h2>Transactions Found in Other Accounts</h2>
                      {integrationModalLogo.length > 0 && (
                        <div className="mx-5 mt-2">
                          {integrationModalLogo.map((option) => (
                            <label
                              key={option.id}
                              className="flex cursor-pointer items-center gap-3"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    option.id,
                                    e.target.checked,
                                  )
                                }
                              />
                              <Image
                                src={option.chain_logo}
                                width={50}
                                height={50}
                                alt={option.name}
                                className="rounded-md"
                              />
                              <div>
                                <p className="text-sm font-semibold">
                                  {option.name}
                                </p>
                              </div>
                            </label>
                          ))}
                          <div className="mx-5 mt-2">
                            <button
                              onClick={handleBanaloClick}
                              className="mb-2 rounded-md bg-[#a64d79] px-5 py-2 text-sm font-bold text-white "
                            >
                              Banalo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isAddApiModal && (
                  <div className=" flex items-center justify-center">
                    <div
                      className="absolute   opacity-75"
                      onClick={() => setIsAddApiModal(false)}
                    ></div>
                    <div className="z-10 rounded-md bg-[#FFF5FB] p-5">
                      <h2>Api Details</h2>
                      {selectedIntegration.api_token_name && (
                        <input
                          type="text"
                          placeholder="Token Name"
                          value={apiTokenName}
                          onChange={(e) => setApiTokenName(e.target.value)}
                          className="border-grey-200 focus:border-grey-500 active:border-grey-500 disabled:border-grey-100 disabled:bg-grey-100 disabled:text-grey-300 null null my-2 h-[40px] w-full rounded-lg border p-2 text-sm shadow-[0px_3px_6px_-2px_rgba(59,_59,_95,_0.08)] outline-none focus:shadow-[0px_0px_4px_4px_rgba(59,_59,_95,_0.08)]"
                        />
                      )}
                      {selectedIntegration.api_secret && (
                        <input
                          type="text"
                          placeholder="Api Key *"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="border-grey-200 focus:border-grey-500 active:border-grey-500 disabled:border-grey-100 disabled:bg-grey-100 disabled:text-grey-300 null null my-2 h-[40px] w-full rounded-lg border p-2 text-sm shadow-[0px_3px_6px_-2px_rgba(59,_59,_95,_0.08)] outline-none focus:shadow-[0px_0px_4px_4px_rgba(59,_59,_95,_0.08)]"
                        />
                      )}
                      {selectedIntegration.api_key && (
                        <input
                          type="text"
                          placeholder="Api Secret *"
                          value={apiSecret}
                          onChange={(e) => setApiSecret(e.target.value)}
                          className="border-grey-200 focus:border-grey-500 active:border-grey-500 disabled:border-grey-100 disabled:bg-grey-100 disabled:text-grey-300 null null my-2 h-[40px] w-full rounded-lg border p-2 text-sm shadow-[0px_3px_6px_-2px_rgba(59,_59,_95,_0.08)] outline-none focus:shadow-[0px_0px_4px_4px_rgba(59,_59,_95,_0.08)]"
                        />
                      )}
                      <button
                        className="mt-3 rounded-md bg-blue-500 px-5 py-2 text-white"
                        onClick={addApiKey}
                      >
                        Submit Api Key
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationDetail;
