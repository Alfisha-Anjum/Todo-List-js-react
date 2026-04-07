"use client";

import { apiCall } from "@/hooks/apiCall";
import { useEffect, useState } from "react";
// import { FiFilter } from "react-icons/fi";
import FilterNotice from "../../component/FilterNotice";
import NoticeTemplate from "../../component/NoticeTemplate";
import TemplateCard from "./TemplateCard";

const Page = ({filterVisible, noticeVisible}) => {
  const [templatesData, setTemplatesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedUsage, setSelectedUsage] = useState(""); 
  const [category, setCategory] = useState([]);
  const [singleTemplateData, setSingleTemplateData] = useState("");
   const [selectedChannel, setSelectedChannel] = useState(""); 
   const [dataElementCount, setDataElementCount] = useState(0);
   const [consentPurposeCount, setConsentPurposeCount] = useState(0);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await apiCall("/notice/get-templates")
      setTemplatesData(response);
      console.log("Fetched Templates:", response);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryValues = Array.isArray(category)
    ? category.map((item) => item.label)
    : [];
  const filteredTemplates = templatesData.filter((template) => {
    return (
      (!selectedType || template.notice_type === selectedType) &&
      (!selectedUsage ||
        template.notice_usage.includes(selectedUsage.toLowerCase())) &&
      (!selectedCategoryValues.length ||
        template.notice_category.some((category) =>
          selectedCategoryValues.includes(category),
        )) &&
      (!selectedChannel ||
        template.filters.notice_channel === selectedChannel) &&
      (!dataElementCount ||
        template.filters.data_element_count >= dataElementCount) &&
      (!consentPurposeCount ||
        template.filters.consent_purpose_count >= consentPurposeCount)
    );
  });

  return (
    <div className="">
      <div className="mt-[115px] flex justify-between gap-6">
        <div
          className="p-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.notice_id}
              templateData={template}
              handleNoticeToggle={handleNoticeToggle}
            />
          ))}
        </div>
        {filterVisible && (
          <FilterNotice
            onClose={() => setFilterVisible(false)}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedUsage={selectedUsage}
            setSelectedUsage={setSelectedUsage}
            setCategory={setCategory}
            category={category}
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
            dataElementCount={dataElementCount}
            setDataElementCount={setDataElementCount}
            consentPurposeCount={consentPurposeCount}
            setConsentPurposeCount={setConsentPurposeCount}
          />
        )}
        {noticeVisible && (
          <NoticeTemplate
            noticeVisible={noticeVisible}
            setNoticeVisible={setNoticeVisible}
            templateData={singleTemplateData}
            onClose={() => setNoticeVisible(false)}
            singleTemplateData={singleTemplateData}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
