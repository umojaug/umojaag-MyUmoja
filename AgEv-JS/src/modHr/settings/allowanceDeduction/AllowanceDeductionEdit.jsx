import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import AllowanceDeductionForm from "./AllowanceDeductionForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const AllowanceDeductionEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "settingAllowanceDeduction",
    `/allowancedeductions/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Allowance / Deduction"
        btn="Return"
        path="/hr/settings/allowance-deduction/list"
      />
      <AllowanceDeductionForm
        defaultValues={{
          allowanceDeductionId: list.data.allowanceDeductionId,
          allowanceDeductionName: list.data.allowanceDeductionName,
          allowanceDeductionType: list.data.allowanceDeductionType,
        }}
        action={refetch}
        btnText="Update"
        path="/allowancedeductions/update"
        returnPath="/hr/settings/allowance-deduction/list"
      />
    </div>
  );
};

export default AllowanceDeductionEdit;
