import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import EditButton from "../../../../../components/button/EditButton";
import DeleteButton from "../../../../../components/button/DeleteButton";

function LoanVerificationList({ id, isSubmit }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/bmLoanVerification/list/${id}`);
  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader
        title="2. Today’s loan verification: "
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/bm/loan/visit/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Type Of Loan" />
          <ListHeader label="Group Name" />
          <ListHeader label="Borrower’s Name" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsBmLoanVerificationId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Type Of Loan: " value={item.typeOfLoan} />
              <ListCol label="Group Name: " value={item.groupName} />
              <ListCol label="Borrower's Name: " value={item.borrowerName} />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/bm/loan/visit/edit/${item.opsBmLoanVerificationId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/bmLoanVerification/delete/${item.opsBmLoanVerificationId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default LoanVerificationList;
