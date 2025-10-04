import FundTransferForm from "../FundTransferForm";
import TopHeader from "../../../components/TopHeader";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import VoucherTable from "../../components/VoucherTable";

const FundTransferByBranch = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("voucherlistpayment", "/voucher/list/fund");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Fund Transfer to Branch"
        btn="Return"
        path="/ac/fund/transfer"
      />
      <FundTransferForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        selectPath="/acLedger/SelectBankByBranch"
        path="/voucher/create/fund"
        label="Select Bank"
      />
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Fund Transfer Branch List
        </h1>
      </div>
      <VoucherTable data={data} refetch={refetch} />
    </div>
  );
};

export default FundTransferByBranch;
