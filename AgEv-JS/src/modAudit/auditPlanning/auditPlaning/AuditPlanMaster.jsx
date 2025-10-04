import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import AuditStatusButton from "../../../components/button/AuditStatusButton";
import { format } from "date-fns";
import TopHeader from "../../../components/TopHeader";

const AuditPlanMaster = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/AuditPlan/materList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <>
      <TopHeader
        title="Audit Planning"
        path={`/audit/planning/details/${data.planMasterId}/add/`}
        btn="Save"
      />
      {/* <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
        Audit Planning
      </div> */}
      <div className="grid grid-cols-1 gap-1">
        <div className="">Audit Year : {data.auditYear}</div>
        <div className="">Created By : {data.createdBy}</div>

        {data.createDate !== "1980-12-31T00:00:00" ? (
          <div className="">
            Created Date :{format(new Date(data.createdDate), "dd/MMM/yyyy")}
          </div>
        ) : (
          <div className="">Created Date :</div>
        )}
        <div className="">
          Status :{" "}
          <span
            className={
              data.status === "Approved"
                ? "text-success font-bold"
                : "text-danger font-bold"
            }
          >
            {data.status}
          </span>
        </div>

        {data.status === "Approved" ? (
          <div className="grid grid-cols-1 gap-1">
            <div className="">Approved by : {data.approvedBy}</div>
            <div className="">
              Approved Date :{" "}
              {format(new Date(data.approvedDate), "dd/MMM/yyyy")}
            </div>
          </div>
        ) : (
          // <AuditStatusButton
          //   action={refetch}
          //   path={`/auditplan/statusupdate/${data.auditMasterId}`}
          // />
          <></>
        )}
      </div>
    </>
  );
};
export default AuditPlanMaster;
