import React, { useState } from "react";
import Breadcrumbs from "../../components/BreadCrumb";
import { FiSearch } from "react-icons/fi";
import { MdAdd, MdOutlineArrowBack } from "react-icons/md";
import DataElement from "./DataElement";

const jsonData = [
  {
    id: 1,
    purpose: "Verify Identity",
    description: "Verify the identity of the user",
    dataElements: ["Aadhaar Card", "PAN Card", "Voter ID"],
  },
  {
    id: 2,
    purpose: "Address Proof",
    description: "Provide address proof",
    dataElements: ["Electricity Bill", "Water Bill", "Rent Agreement"],
  },
  {
    id: 3,
    purpose: "Employment Verification",
    description: "Verify employment details",
    dataElements: ["Offer Letter", "Salary Slip", "Employee ID"],
  },
  {
    id: 4,
    purpose: "Education Verification",
    description: "Verify educational qualifications",
    dataElements: [
      "Degree Certificate",
      "Marksheet",
      "School Leaving Certificate",
    ],
  },
  {
    id: 5,
    purpose: "Financial Verification",
    description: "Verify financial stability",
    dataElements: ["Bank Statement", "Income Tax Return", "Credit Report"],
  },
  {
    id: 6,
    purpose: "Medical History",
    description: "Verify medical records",
    dataElements: [
      "Health Insurance",
      "Doctor's Prescription",
      "Medical Test Reports",
    ],
  },
  {
    id: 7,
    purpose: "Criminal Record Check",
    description: "Verify any past criminal records",
    dataElements: ["Police Clearance Certificate", "Court Records", "FIR Copy"],
  },
  {
    id: 8,
    purpose: "Travel History",
    description: "Verify past travel details",
    dataElements: ["Passport", "Visa Stamps", "Flight Tickets"],
  },
  {
    id: 9,
    purpose: "Vehicle Ownership",
    description: "Verify vehicle ownership details",
    dataElements: ["RC Book", "Insurance Papers", "Pollution Certificate"],
  },
  {
    id: 10,
    purpose: "Loan Eligibility",
    description: "Verify loan eligibility",
    dataElements: ["CIBIL Score", "Salary Statement", "Existing Loan Details"],
  },
  {
    id: 11,
    purpose: "Business Verification",
    description: "Verify business ownership",
    dataElements: ["GST Registration", "Company PAN", "Trade License"],
  },
  {
    id: 12,
    purpose: "Tax Compliance",
    description: "Verify tax compliance status",
    dataElements: ["PAN Card", "GST Return", "Income Tax Return"],
  },
  {
    id: 13,
    purpose: "KYC Compliance",
    description: "Know Your Customer verification",
    dataElements: ["Aadhaar Card", "Passport", "Driving License"],
  },
  {
    id: 14,
    purpose: "Social Media Verification",
    description: "Verify social media presence",
    dataElements: ["LinkedIn Profile", "Facebook Profile", "Twitter Handle"],
  },
  {
    id: 15,
    purpose: "Insurance Verification",
    description: "Verify insurance details",
    dataElements: ["Policy Document", "Premium Receipt", "Nominee Details"],
  },
  {
    id: 16,
    purpose: "Property Ownership",
    description: "Verify property ownership details",
    dataElements: [
      "Sale Deed",
      "Property Tax Receipt",
      "Encumbrance Certificate",
    ],
  },
  {
    id: 17,
    purpose: "Legal Heir Verification",
    description: "Verify legal heir details",
    dataElements: [
      "Will Document",
      "Succession Certificate",
      "Legal Heir Certificate",
    ],
  },
  {
    id: 18,
    purpose: "Company Registration",
    description: "Verify company registration details",
    dataElements: ["CIN Certificate", "MOA & AOA", "Director PAN"],
  },
  {
    id: 19,
    purpose: "Freelancer Verification",
    description: "Verify freelancer's identity and work history",
    dataElements: ["Portfolio", "Client Testimonials", "Freelance Contracts"],
  },
  {
    id: 20,
    purpose: "Voting Eligibility",
    description: "Verify eligibility to vote",
    dataElements: ["Voter ID", "Ration Card", "Birth Certificate"],
  },
];

const breadcrumbsProps = {
  path: "/dpdpa/data-element/search",
  skip: "/dpdpa",
};

const DataElementSearch = () => {
  const [searchPurpose, setSearchPurpose] = useState("");
  const [purposeDetails, setPurposeDetails] = useState("");
  // Filtered data based on search input
  const searchData = jsonData.filter((data) =>
    searchPurpose.trim() === ""
      ? false
      : data.dataElements.some((element) =>
          element.toLowerCase().includes(searchPurpose.toLowerCase())
        )
  );

  return (
    <div>
      <div className="flex justify-between">
        <div className="p-6">
          <h1 className="text-xl font-semibold">
            <Breadcrumbs {...breadcrumbsProps} />
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
        <div className="w-64 h-[calc(100vh-60px)] shadow py-6 ">
          {!purposeDetails ? (
            <>
              <div className="flex items-center  border border-[#D6D6D6] gap-2 rounded-[8px] mx-4 ">
                <div className="relative py-1">
                  <span className="absolute left-3 top-4.5 transform -translate-y-1/2 text-[#959595]">
                    <FiSearch className="text-base" />
                  </span>
                  <input
                    type="text"
                    className="w-full h-7 placeholder:text-base bg-transparent border-none outline-none placeholder:text-[#959595] pl-9"
                    placeholder="Search"
                    onChange={(e) => setSearchPurpose(e.target.value)}
                  />
                </div>
              </div>
              <div className="h-[calc(100vh-145px)] overflow-y-auto custom-scrollbar  mt-4 ">
                {searchData.length > 0 ? (
                  searchData.map((data) => (
                    <div
                      key={data.id}
                      className="flex items-center justify-between border-b border-[#D6D6D6] py-3  px-4"
                    >
                      <div className="relative">
                        <h1
                          onClick={() => setPurposeDetails(data)}
                          className="text-sm mb-2 font-medium text-[#175FC9] cursor-pointer"
                        >
                          {data.purpose}
                        </h1>
                        <div className="flex gap-1 flex-wrap pr-3">
                          {data.dataElements.map((element, index) => (
                            <span
                              key={index}
                              className="text-xs bg-[#e0e2e5] px-3 py-1 rounded-[8px] text-gray-700"
                            >
                              {element}
                            </span>
                          ))}
                        </div>
                        <a
                          href="/dpdpa/data-element"
                          className="bg-[#175FC9] rounded-full p-0.5 cursor-pointer absolute -right-2 -bottom-1 text-white"
                        >
                          <MdAdd />
                        </a>
                      </div>
                    </div>
                  ))
                ) : searchPurpose.length > 0 ? (
                  <p className="text-sm text-gray-500 mt-4 px-4 text-center">
                    No results found
                  </p>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <div className="px-4  ">
              <button
                onClick={() => {
                  setPurposeDetails(""), setSearchPurpose("")("");
                }}
                className="flex gap-1 items-center text-[#175FC9] cursor-pointer "
              >
                <MdOutlineArrowBack /> Back
              </button>
              <div className="h-[calc(100vh-170px)]">
                <p className="text-xs text-[#175FC9]  mt-4">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dicta nisi impedit voluptate quae harum molestiae itaque
                  repudiandae eveniet odio.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {purposeDetails.dataElements.map((element, index) => (
                    <span
                      key={index}
                      className="text-xs bg-[#e0e2e5] px-3 py-1 rounded-[8px] text-gray-700"
                    >
                      {element}
                    </span>
                  ))}
                </div>
                <p className=" mt-4 text-xs text-gray-600 ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                  quas magnam est dolor et quia.
                </p>
                <p className="mt-2 text-xs text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  porro eos.
                </p>
                <p className="mt-2 text-xs text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  porro eos.
                </p>
              </div>
              <a href="/dpdpa/data-element/add-data-element">
                <button className=" bg-[#175FC9]  text-white  w-full py-2 relative bottom-2 rounded-xl cursor-pointer">
                  Use Purpose
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataElementSearch;
