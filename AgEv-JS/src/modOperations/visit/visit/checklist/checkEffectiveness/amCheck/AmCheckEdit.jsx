import React from "react";
import AmCheckForm from "./AmCheckForm";
import { useGetData } from "../../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import GlobalModalForm from "../../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const AmCheckEdit = ({id}) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allAmEffectiveness", `/allAmEffectiveness/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit All Am Effectiveness:"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <AmCheckForm
        defaultValues={{
          allAmEffectId: list.data.allAmEffectId,
          allVisitId: list.data.allVisitId,
          strength: list.data.strength,
          weakness: list.data.weakness,
          actionTaken: list.data.actionTaken,
        }}
        action={refetch}
        btnText="Update"
        path="/allAmEffectiveness/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default AmCheckEdit;
