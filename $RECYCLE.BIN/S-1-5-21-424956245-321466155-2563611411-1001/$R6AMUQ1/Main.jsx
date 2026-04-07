"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Sidebar from "@/app/components/Sidebar/Sidebar";
import Link from "next/link";
import React, { useState } from "react";
import withAuth from "@/app/utils/withAuth";
import IntegrationDetail from "./IntegrationDetail";

const Main = () => {
 
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

 const handleCategoryClick = (category) => {
   setSelectedCategory(category);
 };
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChains, setSelectedChains] = useState([]);

  return (
    <>
      <Navbar />
      <Sidebar>
        <div className="flex h-[94vh] flex-col justify-between">
          <div className="ml-10 mr-5 pt-10">
            <div className="mt-5">
              <div className="flex justify-between">
                <h2 className="catax-bold text-xl">Integration / Exchange</h2>
              </div>
              <div className="mt-2 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <input
                  className="h-8 w-80 rounded-lg border px-5 "
                  placeholder="Search by name"
                  onChange={handleSearchChange}
                />
                <div className="mr-[4.6rem] flex flex-wrap gap-3">
                 
                  <button
                    className="mb-3 rounded-md bg-[#a64d79] px-3 py-1 text-xs font-bold text-white"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </button>
                  
                  <button
                    className="mb-3 rounded-md bg-[#a64d79] px-3 py-1 text-sm font-bold text-white"
                    onClick={() => handleCategoryClick("Exchange")}
                  >
                    Exchange
                  </button>
                  <button
                    className="mb-3 rounded-md bg-[#a64d79] px-3 py-1 text-sm font-bold text-white"
                    onClick={() => handleCategoryClick("Chain")}
                  >
                    Chains
                  </button>
                  <button
                    className="mb-3 rounded-md bg-[#a64d79] px-3 py-1 text-sm font-bold text-white"
                    onClick={() => handleCategoryClick("Wallet")}
                  >
                    Wallet
                  </button>
                  <button
                    className="mb-3 rounded-md bg-[#a64d79] px-3 py-1 text-sm font-bold text-white"
                    onClick={() => handleCategoryClick("DeFi")}
                  >
                    DeFi
                  </button>
                  <button
                    className="mb-3 rounded-md bg-[#a64d79] px-3 py-1 text-sm font-bold text-white"
                    onClick={() => handleCategoryClick("NFT")}
                  >
                    NFT
                  </button>
                  <Link
                    href="/integrations/new"
                    className="mb-3 rounded-md bg-[#a64d79] px-3 py-1 text-sm font-bold text-white"
                  >
                    {" "}
                    Auth{" "}
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="mt-5 flex flex-wrap gap-5">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.integration_name}
                  imgSrc={integration.integration_logo}
                  onClick={() => openModal(integration)}
                  name={integration.integration_name}
                />
              ))}
            </div> */}
          </div>
          {/* <Footer /> */}
          {/* {isModalOpen && (
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
                    <div className="mx-5 mt-2 flex gap-5">
                      {selectedIntegration.is_upload_allowed && (
                        <>
                          <button
                            className="mb-2 rounded-md bg-[#a64d79] px-5 py-2 text-sm font-bold text-white "
                            onClick={openUploadModal}
                          >
                            Upload CSV
                          </button>

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
                      <div className="flex flex-col items-center justify-center">
                        <div
                          className="absolute "
                          // onClick={() => setIsUploadModalOpen(false)}
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
          )} */}
          <IntegrationDetail selectedCategory={selectedCategory} />
        </div>
      </Sidebar>
    </>
  );
};

export default withAuth(Main);
