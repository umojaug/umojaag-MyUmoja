import React from "react";
import BmCheckForm from "./BmCheckForm";
import { useGetData } from "../../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import GlobalModalForm from "../../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const BmCheckEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allBmEffectiveness", `/allBmEffectiveness/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit All Bm Effectiveness"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <BmCheckForm
        defaultValues={{
          allBmEffectId: list.data.allBmEffectId,
          allVisitId: list.data.allVisitId,
          strength: list.data.strength,
          weakness: list.data.weakness,
          actionTaken: list.data.actionTaken,
        }}
        action={refetch}
        btnText="Update"
        path="/allBmEffectiveness/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default BmCheckEdit;
