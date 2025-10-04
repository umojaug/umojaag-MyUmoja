import React from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import EditButton from "../../../../../components/button/EditButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";

const AmBranchPerformanceList = ({ id, isSubmit }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("amBranchPerformancelist", `/amBranchPerformance/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader
        title="5.Branch Performance List: "
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/am/performance/visit/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="LO Name" />
          <ListHeader label="Number of Groups" />
          <ListHeader label="Number of Borrowers" />
          <ListHeader label="Overdue Number" />
          <ListHeader label="Overdue Amount" />
          <ListHeader label="Number of Admission" />
          <ListHeader label="Security return/adjustment number" />
          <ListHeader label="Remarks" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsAmBranchPerformanceId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Lo Name:" value={item.loName} />
              <ListCol label="Number of Group:" value={item.numberOfGroup} />
              <ListCol
                label="Number of Borrower:"
                value={item.numberOfBorrower}
              />
              <ListCol label="Overdue Number:" value={item.overdueNumber} />
              <ListCol label="Overdue Amount:" value={item.overdueAmount} />
              <ListCol
                label="Number of Admission:"
                value={item.numberOfAdmission}
              />
              <ListCol
                label="Security return/adjustment number:"
                value={item.securityReturn}
              />
              <ListCol label="Remarks:" value={item.remarks} />

              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/am/performance/visit/edit/${item.opsAmBranchPerformanceId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/amBranchPerformance/delete/${item.opsAmBranchPerformanceId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default AmBranchPerformanceList;
