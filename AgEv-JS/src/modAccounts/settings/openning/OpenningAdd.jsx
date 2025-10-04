import OpenningForm from "./OpenningForm";

const JournalVoucherAdd = ({ refetch }) => {
  const defaultValues = {
    branchId: "",
    accountId: "",
    amount: "",
    dr: "",
    cr: "",
    particulars: "",
    drTrType: "",
  };
  return (
    <OpenningForm
      defaultValues={defaultValues}
      action={refetch}
      btnText="Save"
      path="/voucher/create/opening"
    />
  );
};

export default JournalVoucherAdd;
