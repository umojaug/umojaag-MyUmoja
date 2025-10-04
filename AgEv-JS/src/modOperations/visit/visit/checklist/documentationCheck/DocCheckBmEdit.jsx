import React from "react";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import DocCheckBmForm from "./DocCheckBmForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const DocCheckBmEdit = ({ id }) => {
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
      title="Edit	Documentation Check"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      {list.data.isSubmit === 1 && (
        <DocCheckBmForm
          defaultValues={{
            docCheckId: list.data.docCheckId,
            workToBeDone: list.data.workToBeDone,
            status: list.data.status,
            identifiedMajor: list.data.identifiedMajor,
            takenSteps: list.data.takenSteps,
            bmComments: list.data.bmComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allDocCheck/updateByBm"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default DocCheckBmEdit;
