import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const BranchInfo = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "auditExcutionUnitdetails",
    `/auditExcutionUnit/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <>
      <div className="grid grid-cols-1 place-content-start p-3">
        <p>
          <span className="font-semibold"> Branch Name: {/* */}</span>
          {list.data.auName}
        </p>
        <p>
          <span className="font-semibold">
            Name of Division / Region/ District: {/* */}
          </span>
          {list.data.divisionName}/ {list.data.regionName}/ {list.data.areaName}
        </p>
        <p>
          <span className="font-semibold"> Branch Start Date: {/* */}</span>

          {list.data.startDate !== "1980-12-31T00:00:00"
            ? format(new Date(list.data.startDate), "dd/MMM/yyyy")
            : ""}
        </p>

        <p>
          <span className="font-semibold"> Branch Manager: {/* */}</span>
          {list.data.bmName}
        </p>
        <p>
          <span className="font-semibold">
            Branch Manager Joining Date: {/* */}
          </span>
          {list.data.joiningDate !== "1980-12-31T00:00:00"
            ? format(new Date(list.data.joiningDate), "dd/MMM/yyyy")
            : ""}
        </p>
        <p>
          <span className="font-semibold"> Area Manager: {/* */}</span>
          {list.data.amName}
        </p>
        <p>
          <span className="font-semibold"> Regional Manager: {/* */}</span>
          {list.data.rmName}
        </p>
        <p>
          <span className="font-semibold"> Audit Start Date: {/* */}</span>
          {list.data.auditStartDate !== "1980-12-31T00:00:00"
            ? format(new Date(list.data.auditStartDate), "dd/MMM/yyyy")
            : ""}
        </p>
        <p>
          <span className="font-semibold"> Audit End Date: {/* */}</span>
          {list.data.auditEndDate !== "1980-12-31T00:00:00"
            ? format(new Date(list.data.auditEndDate), "dd/MMM/yyyy")
            : ""}
        </p>
        <p>
          <span className="font-semibold">
            Branch audit notification, with dates for entry and exit meetings:{" "}
            {/* */}
          </span>
          {list.data.auditNotification}
        </p>
        <p>
          <span className="font-semibold">Audit objectives: {/* */}</span>
          {list.data.auditObjectives}
        </p>
      </div>
    </>
  );
};

export default BranchInfo;
