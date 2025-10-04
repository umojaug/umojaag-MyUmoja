import React from "react";
import EditButton from "../../../../../components/button/EditButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";

const DailyReportList = ({ id, isSubmit }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrDepartment", `/bmDailyReport/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader title="4. Daily report" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Admission Number" />
          <ListHeader label="Disbursement Number" />
          <ListHeader label="Disbursement Amount" />
          <ListHeader label="Security Number" />
          <ListHeader label="Security Amount" />
          <ListHeader label="Overdue Number" />
          <ListHeader label="Borrower Position Number" />
          <ListHeader label="Borrower Position Amount" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsBmDailyReportId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Admission Number:" value={item.admissionNumber} />
              <ListCol
                label="Disbursement Number:"
                value={item.disbursementNumber}
              />
              <ListCol
                label="Disbursement Amount:"
                value={item.disbursementAmount}
              />
              <ListCol label="Security Number:" value={item.securityNumber} />
              <ListCol label="Security Amount:" value={item.securityAmount} />
              <ListCol label="Overdue Number:" value={item.overdueNumber} />
              <ListCol
                label="Borrower Position Number:"
                value={item.borrowerPositionNumber}
              />
              <ListCol
                label="Borrower Position Amount:"
                value={item.borrowerPositionAmount}
              />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/bm/report/visit/edit/${item.opsBmDailyReportId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default DailyReportList;
