import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import VoucherTable from "../components/VoucherTable";

const VoucherFind = ({ dataForm }) => {
  console.log(
    "dataForm",
    `/voucher/find/${dataForm.branchId}/${dataForm.voucherType}/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "vouchers",
    `/voucher/find/${dataForm.branchId}/${dataForm.voucherType}/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="mt-4">
      <VoucherTable data={data} refetch={refetch} viewType="voucherList" />
    </div>
  );
};

export default VoucherFind;
