import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
// import { format } from "date-fns";

const VoucherMappingList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrForex", "/VoucherMapping/list");



  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Voucher Mapping"
        btn="Save"
        path="/ac/settings/voucherMapping/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Mapping Category" />
          <ListHeader label="Loan Product" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Debit/Credit" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.forexId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Transaction Type:" value={item.transactionType} />
              <ListCol label="Loan Product:" value={item.productName} />
              <ListCol label="Currency:" value={item.ledgerName} />
              <ListCol label="Type:" value={item.type} />
              {/* <ListCol
                label="Date:"
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              /> */}
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ac/settings/VoucherMapping/edit/${item.voucherMappingId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/VoucherMapping/delete/${item.voucherMappingId}`}
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherMappingList;
