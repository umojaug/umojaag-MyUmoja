import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";

const InvestigationInfo = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "hrDepartment",
    "/auditSpInvestigation/investigationInfo/" + id
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="">
      <TopHeader
        title="Ongoing Special Investigation Details"
        btn="Save"
        path={`/audit/excution/special/investigation/details/add/${id}`}
      />
      <div className="grid grid-cols-1 gap-1">
        <div className="">
          <span className="font-bold">Branch:</span> {data.branchName}
        </div>
        <div className="">
          <span className="font-bold">Department:</span> {data.departmentName}
        </div>

        {data.investigationDate !== "1980-12-31T00:00:00" ? (
          <div className="">
            <span className="font-bold">Date:</span>{" "}
            {format(new Date(data.investigationDate), "dd/MMM/yyyy")}
          </div>
        ) : (
          <div className=""> Investigation Date</div>
        )}
      </div>
    </div>
  );
};
export default InvestigationInfo;
