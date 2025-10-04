import React from "react";
import DepartmentalInvestigationInfo from "./DepartmentalInvestigationInfo";
import DepartmentalInvestigationDetailsList from "./DepartmentalInvestigationDetailsList";
import { useParams } from "react-router-dom";

const DepartmentalInvestigationDetails = () => {
  const { id } = useParams();
  return (
    <div className="card w-full max-w-screen-xl">
      <DepartmentalInvestigationInfo id={id} />
      <DepartmentalInvestigationDetailsList id={id} />
    </div>
  );
};

export default DepartmentalInvestigationDetails;
