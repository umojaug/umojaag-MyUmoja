import React from "react";
import { useParams } from "react-router-dom";
import BorrowerVisitForm from "./BorrowerVisitForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";

const BorrowerVisitAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    obdBorrowerId: 0,
    allVisitId: id,
    groupName: "",
    borrowerName: "",
    overdueAmount: 0,
    loanBalance: 0,
    collectedAmount: 0,
    takenAction: "",
  };

  return (
    <GlobalModalForm title="Add Overdue & Bad debt borrowers Visit">
      <BorrowerVisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allObdBorrowerVisit/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </GlobalModalForm>
  );
};

export default BorrowerVisitAdd;
