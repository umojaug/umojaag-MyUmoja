import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const DepartmentAuditTestList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "hrDepartmentAuditTestt",
    "/auditDepartmentalInvestigation/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Departmental Audit Test"
        // btn="Save"
        // path="/audit/settings/DepartmentAuditTest/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Audit Test Department" />
          <ListHeader label="Test Area" />
          <ListHeader label="Audit Test" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.testId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol
                label=" Audit Test Department:"
                value={item.departmentName}
              />
              <ListCol label=" Test Area:" value={item.testArea} />
              <ListCol label="Audit Test:" value={item.testSteps} />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/audit/settings/departmentAuditTest/edit/${item.testId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/auditDepartmentalInvestigation/delete/${item.testId}`}
                /> */}
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

export default DepartmentAuditTestList;
