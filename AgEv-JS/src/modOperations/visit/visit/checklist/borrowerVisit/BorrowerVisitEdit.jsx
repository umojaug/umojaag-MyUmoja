import React from "react";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import BorrowerVisitForm from "./BorrowerVisitForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const BorrowerVisitEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allObdBorrowerVisit", `/allObdBorrowerVisit/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Today’s OD follow up information"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <BorrowerVisitForm
        defaultValues={{
          obdBorrowerId: list.data.obdBorrowerId,
          allVisitId: list.data.allVisitId,
          groupName: list.data.groupName,
          borrowerName: list.data.borrowerName,
          overdueAmount: list.data.overdueAmount,
          loanBalance: list.data.loanBalance,
          collectedAmount: list.data.collectedAmount,
          takenAction: list.data.takenAction,
        }}
        action={refetch}
        btnText="Update"
        path="/allObdBorrowerVisit/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default BorrowerVisitEdit;
