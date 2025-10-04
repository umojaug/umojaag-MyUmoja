import React from "react";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import DocumentationForm from "./DocumentationForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const DocumentationEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allDocCheckdetails", `/allDocCheck/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit	Documentation Check"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <DocumentationForm
        defaultValues={{
          docCheckId: list.data.docCheckId,
          workToBeDone: list.data.workToBeDone,
          status: list.data.status,
          identifiedMajor: list.data.identifiedMajor,
          takenSteps: list.data.takenSteps,
        }}
        action={refetch}
        btnText="Update"
        path="/allDocCheck/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default DocumentationEdit;
