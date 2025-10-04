import React, { useState } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import EditButton from "../../../components/button/EditButton";
import TaskButton from "../../../components/button/TaskButton";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const AuditBranchReportList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "hrAuditBranchDepartmentAuditReport",
    "/AuditBranchReport/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Report "
        // btn="Save"
        // path="/hr/settings/documents/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Year" />
          <ListHeader label="Reporting Quarter" />
          <ListHeader label="Month Of Audit" />
          <ListHeader label="Department Name" />
          <ListHeader label="Branch Name" />
          <ListHeader label="Region Name" />
          <ListHeader label="Branch Overview" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.categoryId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="Year:" value={item.year} />
              <ListCol
                label="Reporting Quarter:"
                value={item.reportingQuarter}
              />
              <ListCol label="Month Of Audit:" value={item.monthOfAudit} />
              <ListCol label="Department Name:" value={item.departmentName} />
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Region:" value={item.regionName} />
              <ListCol label="Region:" value={item.branchOverview} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/audit/reporting/branch/details/${item.reportId}`}
                />
                <EditButton
                  path={`/audit/reporting/branch/edit/${item.reportId}`}
                  btnColor="btn-gray"
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditBranchReportList;
