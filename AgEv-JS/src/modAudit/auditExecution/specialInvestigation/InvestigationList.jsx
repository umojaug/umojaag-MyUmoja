import React from "react";
import { format } from "date-fns";
// import CloseButton from "../../../components/button/CloseButton";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";

const InvestigationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/auditSpInvestigation/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Ongoing Special Investigation"
        btn="Save"
        path="/audit/excution/special/investigation/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Title" />
          <ListHeader label="Branch" />
          <ListHeader label="Department Name" />
          <ListHeader label="Investigation Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.investigationId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Title:" value={item.title} />
              <ListCol label="Branch" value={item.branchName} />
              <ListCol label="Department Name:" value={item.departmentName} />
              <ListCol
                label="Investigation Date:"
                value={format(new Date(item.investigationDate), "dd/MMM/yyyy")}
              />
              <div className="flex justify-end space-x-2">
                {item.status !== "Audit Close" && (
                  <>
                    <TaskButton
                      path={`/audit/excution/special/investigation/details/${item.investigationId}`}
                    />
                    <EditButton
                      path={`/audit/excution/special/investigation/edit/${item.investigationId}`}
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/auditSpInvestigation/delete/${item.investigationId}`}
                    />
                    {/* <CloseButton
                      action={() => {
                        refetch();
                      }}
                      path={`/spInvestigation/statusupdate/${item.investigationId}`}
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

export default InvestigationList;
