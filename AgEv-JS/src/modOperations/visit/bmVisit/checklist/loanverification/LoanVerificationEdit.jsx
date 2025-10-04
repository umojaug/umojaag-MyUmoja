import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import LoanVerificationForm from "./LoanVerificationForm";

const LoanVerificationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("bmLoanVerification", `/bmLoanVerification/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Today’s OD follow up information "
        btn="Return"
        path={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
      <LoanVerificationForm
        defaultValues={{
          opsBmLoanVerificationId: list.data.opsBmLoanVerificationId,
          bmVisitId: list.data.bmVisitId,
          typeOfLoan: list.data.typeOfLoan,
          groupName: list.data.groupName,
          borrowerName: list.data.borrowerName,
        }}
        action={refetch}
        btnText="Update"
        path="/bmLoanVerification/update"
        returnPath={`/ops/bm/loan/preview/${id}`}
      />
    </div>
  );
};

export default LoanVerificationEdit;
