"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { apiCall } from "@/utils/api_call";
import Cookies from "js-cookie";

const Page = () => {
  const { control_id } = useParams();
  const [control, setControl] = useState(null);
  const token = Cookies.get("access_token");

  useEffect(() => {
    if (control_id) fetchControl();
  }, [control_id]);

  const fetchControl = async () => {
    try {
      const res = await apiCall(`/org-admin/view-controls/${control_id}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setControl(res);
    } catch (err) {
      console.error("Error fetching control:", err);
    }
  };

  if (!control) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{control.control_name}</h2>
      <p>
        <strong>Category:</strong> {control.control_category}
      </p>
      <p>
        <strong>Priority:</strong> {control.priority}
      </p>
      <p>
        <strong>Description:</strong> {control.control_description}
      </p>
      <p>
        <strong>Requirements:</strong> {control.control_requirements}
      </p>
      <p>
        <strong>Disclosure Impact:</strong> {control.control_disclosure_impact}
      </p>
      <p>
        <strong>Hiding Impact:</strong> {control.control_hiding_impact}
      </p>
      <p>
        <strong>Is Active:</strong> {control.is_active ? "Yes" : "No"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(control.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default Page;
