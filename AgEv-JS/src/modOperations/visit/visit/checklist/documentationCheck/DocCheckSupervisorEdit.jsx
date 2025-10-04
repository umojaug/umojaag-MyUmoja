import React from "react";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import DocCheckSupervisorForm from "./DocCheckSupervisorForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const DocCheckManagerCommentsEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allCashBalance", `/allDocCheck/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Documentation Check"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      {list.data.isSubmit === 1 && (
        <DocCheckSupervisorForm
          defaultValues={{
            docCheckId: list.data.docCheckId,
            workToBeDone: list.data.workToBeDone,
            status: list.data.status,
            identifiedMajor: list.data.identifiedMajor,
            takenSteps: list.data.takenSteps,
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allDocCheck/updateBySupervisor"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default DocCheckManagerCommentsEdit;
