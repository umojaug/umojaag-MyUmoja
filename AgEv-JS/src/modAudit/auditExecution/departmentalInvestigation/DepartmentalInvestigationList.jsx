import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";
import TopHeader from "../../../components/TopHeader";
import { format } from "date-fns";
import TaskButton from "../../../components/button/TaskButton";

const DepartmentalInvestigationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/AuditDpInvestigation/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Ongoing Departmental Audits"
        btn=""
        path="/audit/excution/departmental/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Title" />
          <ListHeader label="Department Name" />
          <ListHeader label="Audit Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.dpInvestigationId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Title:" value={item.title} />
              <ListCol label="Department Name:" value={item.departmentName} />
              <ListCol
                label="Investigation Date:"
                value={format(new Date(item.investigationDate), "dd/MMM/yyyy")}
              />
              <div className="flex justify-end space-x-2">
                {item.status !== "Audit Close" && (
                  <>
                    <TaskButton
                      path={`/audit/excution/departmental/details/${item.dpInvestigationId}`}
                    />
                    <EditButton
                      path={`/audit/excution/departmental/edit/${item.dpInvestigationId}`}
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/AuditDpInvestigation/delete/${item.dpInvestigationId}`}
                    />
                    {/* <CloseButton
                      action={() => {
                        refetch();
                      }}
                      path={`/auditDpInvestigation/statusupdate/${item.dpInvestigationId}`}
                    /> */}
                  </>
                )}
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL: {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentalInvestigationList;
