import TopHeader from "../../../components/TopHeader";
import VoucherMappingForm from "./VoucherMappingForm";

const VoucherMappingAdd = () => {
  const defaultValues = {
    voucherMappingId: "",
    transactionType: "",
    loanProductId: "",
    ledgerId: "",
    type: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Auto Voucher Mapping"
        btn="Return"
        path="/ac/settings/VoucherMapping/list"
      />
      <VoucherMappingForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/VoucherMapping/create"
        returnPath="/ac/settings/VoucherMapping/list"
      />
    </div>
  );
};

export default VoucherMappingAdd;
