import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import VoucherTable from "../../components/VoucherTable";
import OpenningAdd from "./OpenningAdd";

const OpenningList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("voucherlistpayment", "/voucher/list/journal");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="card w-full max-w-screen-xl">
      <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
        Add Opening Voucher
      </h1>
      <OpenningAdd refetch={refetch} />
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Opening Voucher List
        </h1>
      </div>
      <VoucherTable data={data} refetch={refetch} />
    </div>
  );
};

export default OpenningList;
