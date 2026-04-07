import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { GoEye } from "react-icons/go";
import { AiOutlineFilePdf } from "react-icons/ai";

type AgreementCardProps = {
  logo: string,
  companyName: string,
  agreementId: string,
  category: string,
  dpId: string,
  data: string,
  status: string,
  dateTime: string,
  pdfUrl: string,
};

const AgreementCard: React.FC<AgreementCardProps> = ({
  logo,
  companyName,
  agreementId,
  category,
  dpId,
  data,
  status,
  dateTime,
  pdfUrl,
}) => {
  const formattedDate = dayjs(dateTime).format("MMM D, YYYY h:mm A");

  return (
    <div className="agreement-card">
      <div className="card-header">
        <Image src={logo} alt={`${companyName} logo`} width={50} height={50} />
        <div className="company-details">
          <h3>{companyName}</h3>
          <p>{category}</p>
        </div>
      </div>
      <div className="card-info">
        <p>Agreement ID: {agreementId}</p>
        <p>Data: {data}</p>
        <p>
          Status:{" "}
          <span
            className={status === "Active" ? "active-status" : "pending-status"}
          >
            {status}
          </span>
        </p>
        <p>Date: {formattedDate}</p>
      </div>
      <div className="card-actions">
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          <AiOutlineFilePdf size={20} /> View PDF
        </a>
        <button>
          <GoEye size={20} /> View Details
        </button>
      </div>
    </div>
  );
};


export default AgreementCard;