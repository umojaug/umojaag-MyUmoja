import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import IncomeVoucherAdd from "./IncomeVoucherAdd";
import VoucherTable from "../components/VoucherTable";

const IncomeVoucherList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("voucherlistexpense", "/voucher/list/income");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="card w-full max-w-screen-xl">
      <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
        Add Income Voucher
      </h1>
      <IncomeVoucherAdd refetch={refetch} />
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Income Voucher List
        </h1>
      </div>
      <VoucherTable data={data} refetch={refetch} />
    </div>
  );
};

export default IncomeVoucherList;
