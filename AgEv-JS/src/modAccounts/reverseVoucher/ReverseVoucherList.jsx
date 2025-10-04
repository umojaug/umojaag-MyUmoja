import React from "react";
// import { HashLoading } from "../../components/Loading";
// import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
//import { useGetData } from "../../hooks/dataApi";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import DeleteButton from "../../components/button/DeleteButton";

const ReverseVoucherList = () => {
  // const {
  //   data: list,
  //   error,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGetData("reverseVoucher", "/ac/reverseVoucher/list");

  const data = [
    {
      reverseVoucherAddId: "111",
      transactionDate: "11/01/2022",
      vno: "bcd",
      subHeadName: "11",
      transactionType: "Dhaka",
      dr: "453",
      cr: "25863",
      particulars: "Dhaka",
      voucherType: "Dhaka",
    },
  ];

  // if (isLoading) return <HashLoading />;

  // if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Reverse Voucher"
        btn="Save"
        path="/ac/reverseVoucher/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Transaction Date" />
          <ListHeader label="Vno" />
          <ListHeader label="Sub Head Name" />
          <ListHeader label="Transaction Type" />
          <ListHeader label="Particulars" />
          <ListHeader label="Voucher Type" />
          <ListHeader label="DR" className="flex justify-end" />
          <ListHeader label="CR" className="flex justify-end" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.reverseVoucherAddId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Transaction Date:" value={item.transactionDate} />
              <ListCol label="Vno::" value={item.vno} />
              <ListCol label="Sub Head Name:" value={item.subHeadName} />
              <ListCol
                label="Transaction Type::"
                value={item.transactionType}
              />

              <ListCol label="Particulars:" value={item.particulars} />
              <ListCol label="Voucher Type:" value={item.voucherType} />
              <ListCol
                label="DR:"
                value={item.dr}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="CR:"
                value={item.cr}
                className="flex justify-start md:justify-end"
              />
              <div className="flex justify-end space-x-2">
                <DeleteButton
                  // action={refetch}
                  path={`/receiveVoucher/delete/${item.receiveVoucherId}`}
                />
              </div>
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReverseVoucherList;
