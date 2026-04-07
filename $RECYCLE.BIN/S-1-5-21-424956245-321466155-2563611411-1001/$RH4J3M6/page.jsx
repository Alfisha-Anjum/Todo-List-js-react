"use client";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { LuFileCheck } from "react-icons/lu";
import { TbDeviceMobile } from "react-icons/tb";
import { RiComputerLine } from "react-icons/ri";

// import CampaignStatus from "../../components/CampaignStatus";
import { useRouter } from "next/navigation";
import CampaignStatus from "../../../../components/CampaignStatus";

function page() {
  const router = useRouter();
 const breadcrumbsProps = {
   path: "/user/principal-management/data-principal/consent/campaign/campaignDetail/connect",
   skip: "/user/principal-management",
 };

 
  const handleCampaignDetails = () => {
    router.push(
      "/user/principal-management/data-principal/consent/campaign/campaignDetail",
    );
  };

  return (
    <div className="pt-12">
      <div className="flex items-center justify-between gap-4 px-4 py-4 pr-8">
        <div className="flex flex-col gap-1">
          <Header
            title="Campaign Details"
            breadcrumbsProps={breadcrumbsProps}
          />
          <p className="w-[82%] text-xs">
            Set up your sub-organization, customize branding, and configure
            communication channels for unified operations.
          </p>
        </div>

        <div className="flex gap-4 pt-3">
          <Link href="/user/data-management/data-source/add-data-source">
            <div className="h-[105px] w-[232px] bg-white p-3">
              <span className="text-base text-[#002fa7]">
                Consent Requests{" "}
              </span>
              <p className="text-center text-[28px]">786</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="h-0.5 w-full bg-[#FAFAFA] sm:border-t sm:border-[#D7D7D7]"></div>

      <div className="my-6 flex w-full">
        <div className="w-[50%]">
          <h1>hii</h1>
        </div>

        <CampaignStatus />
      </div>
      {/* 
      <div className="mt-20 flex h-full w-full items-center justify-center">
        <div className="flex h-[293px] w-[305px] items-center justify-center rounded-full bg-[#d9d9d9]">
          <h1 className="text-lg font-semibold text-gray-600">
            No Data Available
          </h1>
        </div>
      </div> */}
    </div>
  );
}

export default page;
