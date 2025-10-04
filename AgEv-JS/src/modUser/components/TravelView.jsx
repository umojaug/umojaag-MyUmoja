import React from "react";
import { format } from "date-fns";
import TopHeader from "../../components/TopHeader";

const TravelView = ({ data, path, title }) => {
  return (
    <>
      <TopHeader title={title} btn="Return" path={path} />

      <div className="grid grid-cols-1 place-content-start">
        <h2>
          <span className="font-bold">Bill Created By:</span> {data.employeePin}
          -{data.employeeName}
        </h2>
        <h2>
          <span className="font-bold">Job Title:</span> {data.designationName}
        </h2>
        <h2>
          <span className="font-bold">Traveling Date :</span>
          {format(new Date(data.travelingDate), "dd-MMM-yyyy")}
        </h2>

        <h2>
          <span className="font-bold">Short Description :</span> {data.remarks}
        </h2>

        <h2>
          <span className="font-bold">Checked By:</span> {data.checkerName} -
          {data.checkerDesignation}
        </h2>
        <h2>
          <span className="font-bold">Supervisor :</span> {data.managerName} -
          {data.managerDesignation}
        </h2>
      </div>
    </>
  );
};

export default TravelView;
