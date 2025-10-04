import React from "react";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import PaymentVoucherAdd from "./PaymentVoucherAdd";
import VoucherTable from "../components/VoucherTable";

const PaymentVoucherList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("voucherlistpayment", "/voucher/list/payment");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="card w-full max-w-screen-xl">
      <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
        Add Payment Voucher
      </h1>
      <PaymentVoucherAdd refetch={refetch} />
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Payment Voucher List
        </h1>
      </div>
      <VoucherTable data={data} refetch={refetch} />
    </div>
  );
};

export default PaymentVoucherList;
