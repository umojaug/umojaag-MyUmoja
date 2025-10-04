import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { format } from "date-fns";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";

const BranchExcutionList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditExcutionUnit", "/auditExcutionUnit/listbybranch");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ongoing Branch Audits" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Branch Name" />
          <ListHeader label="Branch opening date" />
          <ListHeader label="Audit start Date" />
          <ListHeader label="Audit end Date" />
          <ListHeader label="Period under Audit From" />
          <ListHeader label="Period under Audit Till" />
          <ListHeader label="Last audit period" />
          <ListHeader label="Audit Execution Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.excutionId}
              className="grid grid-cols-1 gap-2 list-body"
            >
              <div className="grid grid-cols-1 md:grid-cols-9">
                <ListCol label="Branch Name:" value={item.auName} />

                <ListCol
                  label="Branch opening Date:"
                  value={format(new Date(item.startDate), "dd/MMM/yyyy")}
                />
                {item.auditStartDate !== "1980-12-31T00:00:00" ? (
                  <ListCol
                    label="Audit start Date:"
                    value={format(new Date(item.auditStartDate), "dd/MMM/yyyy")}
                  />
                ) : (
                  <ListCol label="Audit start Date:" value="" />
                )}

                {item.auditEndDate !== "1980-12-31T00:00:00" ? (
                  <ListCol
                    label="Audit end Date:"
                    value={format(new Date(item.auditEndDate), "dd/MMM/yyyy")}
                  />
                ) : (
                  <ListCol label="Audit end Date:" value="" />
                )}
                {item.periodUnderAuditFrom !== "1980-12-31T00:00:00" ? (
                  <ListCol
                    label="Period under Audit From:"
                    value={format(
                      new Date(item.periodUnderAuditFrom),
                      "dd/MMM/yyyy"
                    )}
                  />
                ) : (
                  <ListCol label="Period under Audit From:" value="" />
                )}

                {item.periodUnderAuditTill !== "1980-12-31T00:00:00" ? (
                  <ListCol
                    label="Period under Audit Till:"
                    value={format(
                      new Date(item.periodUnderAuditTill),
                      "dd/MMM/yyyy"
                    )}
                  />
                ) : (
                  <ListCol label="Period under Audit Till:" value="" />
                )}

                {/* {item.lastAuditPeriod !== "1980-12-31T00:00:00" ? (
                  <ListCol
                    label="Last audit period:"
                    value={format(
                      new Date(item.lastAuditPeriod),
                      "dd/MMM/yyyy"
                    )}
                  />
                ) : (
                  <ListCol label="Last audit period:" value="" />
                )} */}
                <ListCol
                  llabel="Last audit period:"
                  value={item.lastAuditPeriod}
                />
                <ListCol
                  label="Audit Execution Status:"
                  value={item.auditObjectives}
                />

                <div className="flex justify-end space-x-2">
                  <TaskButton
                    path={`/audit/excution/branch/checklist/${item.excutionId}`}
                  />
                  <EditButton
                    path={`/audit/excution/branch/edit/${item.excutionId}`}
                  />

                  <DeleteButton
                    action={refetch}
                    path={`/auditExcutionUnit/delete/${item.excutionId}`}
                  />
                </div>
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

export default BranchExcutionList;
