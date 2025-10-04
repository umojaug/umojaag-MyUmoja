import React from "react";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import BorrowerVisitSupervisorForm from "./BorrowerVisitSupervisorForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const BorrowerVisitSupervisorEdit = ({ id }) => {
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
      title="Edit Overdue & Bad debt borrowers Visit"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      {list.data.isSubmit === 1 && (
        <BorrowerVisitSupervisorForm
          defaultValues={{
            obdBorrowerId: list.data.obdBorrowerId,
            groupName: list.data.groupName,
            borrowerName: list.data.borrowerName,
            overdueAmount: list.data.overdueAmount,
            loanBalance: list.data.loanBalance,
            collectedAmount: list.data.collectedAmount,
            takenAction: list.data.takenAction,
            bmComments: list.data.bmComments,
            supervisorComments: list.data.supervisorComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allObdBorrowerVisit/updateBySupervisor"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default BorrowerVisitSupervisorEdit;
