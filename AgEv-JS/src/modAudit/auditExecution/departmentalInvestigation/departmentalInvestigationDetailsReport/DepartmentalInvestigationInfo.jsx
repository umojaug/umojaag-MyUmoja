import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { format } from "date-fns";
import TopHeader from "../../../../components/TopHeader";

const DepartmentalInvestigationInfo = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "hrDepartment",
    "/AuditDpInvestigation/DepartmentalInvestigationInfo/" + id
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <>
      <TopHeader
        title="Departmental audit Checklist"
        btn="Return"
        path={`/audit/excution/departmental/list`}
      />
      <div className="grid grid-cols-1 gap-1">
        <div className="">
          <span className="font-bold">Department:</span> {data.departmentName}
        </div>

        {data.investigationDate !== "1980-12-31T00:00:00" ? (
          <div className="">
            <span className="font-bold">Date:</span>{" "}
            {format(new Date(data.investigationDate), "dd/MMM/yyyy")}
          </div>
        ) : (
          <div className="">Investigation Date</div>
        )}
      </div>
    </>
  );
};
export default DepartmentalInvestigationInfo;
