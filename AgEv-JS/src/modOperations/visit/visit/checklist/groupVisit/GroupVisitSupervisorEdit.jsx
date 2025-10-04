import React from "react";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import GroupVisitSupervisorForm from "./GroupVisitSupervisorForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const GroupVisitSupervisorEdit = ({ id }) => {
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
      {list.data.isSubmit === 1 && (
        <GroupVisitSupervisorForm
          defaultValues={{
            verificationId: list.data.verificationId,
            workToBeDone: list.data.workToBeDone,
            status: list.data.status,
            number: list.data.number,
            findings: list.data.findings,
            takenSteps: list.data.takenSteps,
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allVerifyLoanApplication/updateCommentsByManager"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default GroupVisitSupervisorEdit;
