import React from "react";
import JournalVoucherForm from "./JournalVoucherForm";

const JournalVoucherAdd = ({ refetch }) => {
  const defaultValues = {
    journalId: "",
    amount: "",
    dr: "",
    cr: "",
    particulars: "",
    drTrType: "",
  };
  return (
    <JournalVoucherForm
      defaultValues={defaultValues}
      action={refetch}
      btnText="Save"
      path="/voucher/create/journal"
    />
  );
};

export default JournalVoucherAdd;
