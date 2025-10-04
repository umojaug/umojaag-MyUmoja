import React from "react";
import { format } from "date-fns";
import TopHeader from "../../../components/TopHeader";

const VisitView = ({ data, path }) => {
  return (
    <>
      <TopHeader title={data.visitType} btn="Return" path={path} />

      <div className="grid grid-cols-1 place-content-start">
        <h2>
          <span className="font-bold">Visited Branch: </span> {data.branchName}
        </h2>
        <h2>
          <span className="font-bold">Branch Opening Date: </span>
          {format(new Date(data.startDate), "dd-MMM-yyyy")}
        </h2>
        <h2>
          <span className="font-bold">Branch Manager: </span>
          {data.branchManagerName}-{data.bmDesignation}
        </h2>
        <h2>
          <span className="font-bold">Supervisor: </span> {data.managerName} -
          {data.managerDesignation}
        </h2>
        <h2>
          <span className="font-bold">Visited By: </span> {data.employeePin} -
          {data.employeeName}
        </h2>
        <h2>
          <span className="font-bold">Designation: </span>{" "}
          {data.designationName}
        </h2>
        <h2>
          <span className="font-bold">Visit Start Date: </span>
          {format(new Date(data.visitDate), "dd-MMM-yyyy")}
        </h2>
        <h2>
          <span className="font-bold">Entry Time: </span>
          {format(new Date(data.entryTime), "hh:mm aa")}
        </h2>
        <h2>
          <span className="font-bold">Visit End Date: </span>
          {format(new Date(data.visitEndDate), "dd-MMM-yyyy")}
        </h2>
        <h2>
          <span className="font-bold">Exit Time : </span>
          {format(new Date(data.exitTime), "hh:mm aa")}
        </h2>
      </div>
    </>
  );
};

export default VisitView;
