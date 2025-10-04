import React from "react";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import GroupVisitBmForm from "./GroupVisitBmForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const GroupVisitBmEdit = ({ id }) => {
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
      title="Edit Group Visit"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      {list.data.isSubmit === 1 && (
        <GroupVisitBmForm
          defaultValues={{
            verificationId: list.data.verificationId,
            workToBeDone: list.data.workToBeDone,
            status: list.data.status,
            number: list.data.number,
            findings: list.data.findings,
            takenSteps: list.data.takenSteps,
            bmComments: list.data.bmComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allVerifyLoanApplication/updateCommentsByBm"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default GroupVisitBmEdit;
