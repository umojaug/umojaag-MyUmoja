import React from "react";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import CashAtHandForm from "./CashAtHandForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const CashAtHandEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allCashBalancedetails", `/allCashBalance/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Cash In Hand/Bank/M-Pesa Balance"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <CashAtHandForm
        defaultValues={{
          cashBalanceId: list.data.cashBalanceId,
          workToBeDone: list.data.workToBeDone,
          status: list.data.status,
          identifiedMajor: list.data.identifiedMajor,
          takenSteps: list.data.takenSteps,
        }}
        action={refetch}
        btnText="Update"
        path="/allCashBalance/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default CashAtHandEdit;
