import React from "react";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import GroupVisitForm from "./GroupVisitForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const GroupVisitEdit = ({id}) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allVerifyLoanApplication",
    `/allVerifyLoanApplication/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Group Visit & Verification Of Loan Application"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <GroupVisitForm
        defaultValues={{
          verificationId: list.data.verificationId,
          workToBeDone: list.data.workToBeDone,
          status: list.data.status,
          number: list.data.number,
          findings: list.data.findings,
          takenSteps: list.data.takenSteps,
        }}
        action={refetch}
        btnText="Update"
        path="/allVerifyLoanApplication/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default GroupVisitEdit;
