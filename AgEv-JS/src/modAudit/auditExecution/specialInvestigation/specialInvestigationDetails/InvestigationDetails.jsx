import React from "react";
import InvestigationInfo from "./InvestigationInfo";
import InvestigationDetailsList from "./InvestigationDetailsList";
import { useParams } from "react-router-dom";

const InvestigationDetails = () => {
  const { id } = useParams();
  return (
    <div className="card w-full max-w-screen-xl mt-2">
      <InvestigationInfo id={id} />
      <InvestigationDetailsList id={id} />
    </div>
  );
};

export default InvestigationDetails;
