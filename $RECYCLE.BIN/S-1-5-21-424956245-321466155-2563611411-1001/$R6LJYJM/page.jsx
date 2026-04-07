
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import Stepper from "@/components/Stepper";
import GeneralInformation from "../../components/GeneralInformation"; 
import SecurityInformation from "../../components/SecurityInformation";
import CollectionMapping from "../../components/CollectionMapping"; 
import Usage from "../../components/Usage"; 
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { addNewTags, apiCall } from "@/hooks/apiCall";

const Page = ({ params }) => {
  const router = useRouter();
  const elementId = params["create"];
  const [currentId, setCurrentId] = useState(elementId); // ← new state

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // mode can be 'edit' or null

  console.log(elementId, "elementId");
  const accessToken = Cookies.get("access_token");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [tagOptions, setTagOptions] = useState([]);
  const [tags, setTags] = useState([]);
const [selectedTimeUnit, setSelectedTimeUnit] = useState("day");
  const [formData, setFormData] = useState({
    data_element_name: "",
    data_element_description: "",
    data_element_original_name: "",
    data_element_alias_name: [],
    data_element_status: "",
    classification: {
      data_element_domain: [],
      data_element_type: "",
      data_element_sensitivity: "",
      is_core_identifier: false,
      is_personal_info: false,
      tags: [],
    },
    technical_properties: {
      format_validation: "",
      is_pseudonymized: false,
      is_anonymized: false,
      is_encrypted: false,
      encryption_standard: "",
    },
    compliance: {
      legal_basis: [],
      de_consent_period: "",
      de_data_retention_period: 0,
      basis_type: "",
      cross_border_transfers: {
        countries: [],
      },
    },
    data_processor_details: [],
    usage: {
      collection_points: [],
      consent_purposes: [],
      business_processes: [],
    },
  });

 useEffect(() => {
   const stepFromUrl = parseInt(searchParams.get("step"));
   if (!isNaN(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= 4) {
     setActiveStep(stepFromUrl);
   }

   if (elementId !== "create") {
     getOneDataElement();
   }
 }, []);


  const getOneDataElement = async () => {
    try {
      const response = await apiCall(`/get-one-de/${elementId}`);
      console.log(response, "response dekadatatoday");
      setTags(response?.classification?.data_element_classification_tags || []);

      setFormData(response);
    } catch (error) {
      console.error(
        "Error fetching data element:",
        error?.response?.data || error.message,
      );
    }
  };

  const handleGeneralInfoChange = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const handleSecurityInfoChange = (classificationData) => {
    setFormData((prev) => ({
      ...prev,
      classification: {
        ...prev.classification,
        ...classificationData,
      },
    }));
  };

  const handleCollectionMappingChange = (technicalComplianceData) => {
    setFormData((prev) => ({
      ...prev,
      technical_properties: {
        ...prev.technical_properties,
        ...technicalComplianceData.technical,
      },
      compliance: {
        ...prev.compliance,
        ...technicalComplianceData.compliance,
      },
    }));
  };

  const handleUsageChange = (usageData) => {
    setFormData((prev) => ({
      ...prev,
      data_processor_details: usageData.data_processor_details,
      usage: {
        ...prev.usage,
        ...usageData.usage,
      },
    }));
  };
console.log(activeStep, "activeStep");
// console.log(formData?.step_number, "stepno")


  const handleNextStep = async (statusToUpdate) => {
    const updatedStatus =
      statusToUpdate === "published" ? "published" : "draft";

    try {
      setLoading(true);

      // Prepare the PATCH payload
      const payload = {
        data_element_name: formData.data_element_name,
        data_element_description: formData.data_element_description,
        data_element_original_name: formData.data_element_original_name,
        data_element_alias_name: formData.data_element_alias_name,
        data_element_status: updatedStatus,
        technical_properties: formData.technical_properties,
        compliance: {
          ...formData.compliance,
          de_data_retention_period:
            selectedTimeUnit === "year"
              ? formData.compliance.de_data_retention_period * 365
              : selectedTimeUnit === "month"
                ? formData.compliance.de_data_retention_period * 30
                : formData.compliance.de_data_retention_period,
        },
        usage: formData.usage,
        classification: {
          ...formData.classification,
          data_element_classification_tags: tags.length > 0 ? tags : [],
        },
      };
      console.log(payload, "payload");
      // Add new tags to system if not present
      if (tags?.length > 0) {
        const existingTagLabels = tagOptions.map((t) => t.label);
        const newTags = tags.filter((tag) => !existingTagLabels.includes(tag));
        if (newTags.length > 0) {
          await addNewTags({ newTags });
        }
      }

      // Save or update data element (draft or in-progress state)
      const url =
        elementId && elementId !== "create"
          ? `/create-de?de_id=${elementId}`
          : `/create-de`;

      const response = await apiCall(url, {
        method: "PATCH",
        data: payload,
      });
      console.log(response, "response");

      // If final step and publishing
      if (
        activeStep === 4 &&
        statusToUpdate === "published" &&
        currentId !== "create"
      ) {
        const publishUrl = `/publish-de/${currentId}`;
        await apiCall(publishUrl, {
          method: "PUT",
        });

        toast.success("Data Element published successfully");
        router.push("/user/data-management/data-inventory/data-element");
        return;
      }

      // If final step but just saving as draft
      if (activeStep === 4 && statusToUpdate === "draft") {
        toast.success("Data Element saved as draft");
        router.push("/user/data-management/data-inventory/data-element");
        return;
      }

       if (activeStep === 4 && statusToUpdate === "submit") {
         toast.success("Data Element created Successfully");
         router.push("/user/data-management/data-inventory/data-element");
         return;
       }

      // If just progressing forward through steps
    if (currentId === "create" && response?.de_id) {
      setCurrentId(response?.de_id);
   
     window.history.replaceState(
       null,
       "",
       `/user/data-management/data-inventory/data-element/create/${response?.de_id}?&step=2`,
     );

       
    }

  // if (elementId === "create" && response?.de_id && activeStep === 4) {
  //   toast.success("Data Element created successfully");
  //   router.push("/user/data-management/data-inventory/data-element");
  //   return;
  // }

      //  if (activeStep === 4 && currentId === "create" && response?.de_id) {
      //    // Immediately redirect after successful creation
      //    toast.success("Data Element created successfully");
      //    router.push("/user/data-management/data-inventory/data-element");
      //    return;
      //  }

     const nextStep = activeStep + 1;
     setActiveStep(nextStep);
     router.replace(`?&step=${nextStep}`);

    } catch (error) {
      console.error("Error during Data Element processing:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

 const handleStepClick = (step) => {
   setActiveStep(step);
   router.replace(`?&step=${step}`);
 };

 
  const breadcrumbsProps = {
    path: `/user/data-management/data-inventory/data-element/${
      currentId !== "create"
        ? formData.data_element_name || elementId
        : "create"
    }`,
    skip: "/user/data-management/data-inventory",
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="w-full bg-[#fbfcfe]">
        <div className="pb-3">
          {/* <Header
            title="Create a Data Element"
            breadcrumbsProps={breadcrumbsProps}
          /> */}
          <Header
            title={
              elementId === "create"
                ? "Create a Data Element"
                : `Edit ${formData.data_element_name || "Data Element"}`
            }
            breadcrumbsProps={breadcrumbsProps}
          />
        </div>
        <Stepper
          steps={["Step 1", "Step 2", "Step 3", "Step 4"]}
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
      </div>
      <div className="custom-scrollbar flex h-[calc(100vh-220px)] w-full justify-center overflow-auto pb-5">
        {activeStep === 1 && (
          <GeneralInformation
            onDataChange={handleGeneralInfoChange}
            initialData={formData}
          />
        )}
        {activeStep === 2 && (
          <SecurityInformation
            onDataChange={handleSecurityInfoChange}
            initialData={formData.classification}
            setTagOptions={setTagOptions}
            tagOptions={tagOptions}
            tags={tags}
            setTags={setTags}
          />
        )}
        {activeStep === 3 && (
          <CollectionMapping
            setFormData={setFormData}
            onDataChange={handleCollectionMappingChange}
            selectedTimeUnit={selectedTimeUnit}
            setSelectedTimeUnit={setSelectedTimeUnit}
            initialData={{
              technical: formData.technical_properties,
              compliance: formData.compliance,
            }}
          />
        )}
        {activeStep === 4 && (
          <Usage
            onDataChange={handleUsageChange}
            initialData={formData.usage}
          />
        )}
      </div>
      <div className="fixed bottom-0 right-0 z-0 mt-10 flex h-12 w-full items-center justify-end gap-3 border-t-[1px] bg-[#fafafa] px-5 py-4 shadow-xl">
        {activeStep === 1 && (
          <Link href="/user/data-management/data-inventory/data-element">
            <Button variant="cancel" className="px-3">
              <p>Cancel</p>
            </Button>
          </Link>
        )}

        {activeStep > 1 && (
          <button
            onClick={handlePrevStep}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary"
          >
            <FaArrowLeft />
            <p>Back</p>
          </button>
        )}

        {activeStep === 4 && (
          <>
            <Button
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1.5 text-sm"
              onClick={() => handleNextStep("draft")}
            >
              <p>Save as Draft</p>
            </Button>
            <Button
              variant="stepperPrimary"
              onClick={() => handleNextStep("published")}
              disabled={loading}
              className="text-xs"
            >
              <p>Publish</p>
            </Button>
          </>
        )}
        {/* 🟡 Show Submit only when creating new DE (mode === "edit" && currentId === "create") */}
        {/* {activeStep === 4 && (mode === "edit" || elementId === "create") && (
          <Button
            variant="stepperPrimary"
            onClick={() => handleNextStep("submit")}
            disabled={loading}
            className="text-xs"
          >
            {loading ? "Submitting..." : <p>Submit</p>}
          </Button>
        )} */}

        {activeStep < 4 && (
          <Button
            variant="stepperPrimary"
            onClick={() => handleNextStep("next")}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5"
          >
            <p>Next</p>
            <FaArrowRight className="text-[12px]" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
