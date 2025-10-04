import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import LoanVerificationForm from "./LoanVerificationForm";

const LoanVerificationAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsBmLoanVerificationId: 0,
    bmVisitId: id,
    typeOfLoan: "",
    groupName: "",
    borrowerName: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="2. Today’s loan verification: "
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <LoanVerificationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmLoanVerification/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default LoanVerificationAdd;
