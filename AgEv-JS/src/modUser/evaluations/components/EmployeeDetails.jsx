import React from "react";
import { format } from "date-fns";
import { selectOptions } from "../../../data/selectOptions";

const EmployeeDetails = ({ data }) => {
  return (
    <>
      <h1 className="text-2xl lg:text-3xl font-bold lg:text-semibold text-gray-800 text-center">
        {data.evaluationTypeName}
      </h1>
      <div className="grid grid-cols-1 place-content-start">
        <h2>
          <span className="font-bold">Employee Name:</span> {data.employeePin}-
          {data.employeeName}
        </h2>
        <h2>
          <span className="font-bold">Job Title:</span> {data.designationName}
        </h2>
        <h2>
          <span className="font-bold">Performance Review Period :</span>{" "}
          {format(new Date(data.startDate), "dd-MMM-yyyy")} to{" "}
          {format(new Date(data.endDate), "dd-MMM-yyyy")}
        </h2>
        {/* <h2>
          <span className="font-bold">Performance Review Date:</span>{" "}
          {format(new Date(data.entryDate), "dd-MMM-yyyy")}
        </h2> */}
        <h2>
          <span className="font-bold">Line Manager :</span> {data.managerName}
        </h2>
        {data.evaluationTypeName === "Annual Performance Review" && (
          <h2>
            <span className="font-bold">Total Rating :</span>{" "}
            {selectOptions.evaluationRating
              .filter((x) => x.key === data.totalRating.toString())
              .map((y) => y.value)}
          </h2>
        )}
      </div>
    </>
  );
};

export default EmployeeDetails;
