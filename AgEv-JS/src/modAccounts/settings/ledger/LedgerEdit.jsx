import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import LedgerForm from "./LedgerForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const LedgerEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ledgerDetails", `/acLedgerSetup/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Ledger"
        btn="Return"
        path="/ac/settings/ledger/list"
      />
      <LedgerForm
        defaultValues={{
          ledgerId: list.data.ledgerId,
          ledgerName: list.data.ledgerName,
          displayAt: list.data.displayAt,
          subGroupId: list.data.subGroupId,
          voucherType: list.data.voucherType,
          accountType: list.data.accountType,
          branchId: list.data.branchId,
          classificationName: list.data.classificationName,
        }}
        action={refetch}
        btnText="Update"
        path="/acLedgerSetup/update"
        returnPath="/ac/settings/ledger/list"
      />
    </div>
  );
};

export default LedgerEdit;
