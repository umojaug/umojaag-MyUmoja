import React from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import EditButton from "../../../../../components/button/EditButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";

const BankInfoList = ({ id, isSubmit }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/bmBankInfo/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader
        title="6. Bank information"
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/bm/bank/visit/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Fund Received Branch " />
          <ListHeader label="Fund Received Amount " />
          <ListHeader label="Fund Transfer Branch " />
          <ListHeader label="Fund Transfer Amount " />
          <ListHeader label="Bank Withdraw" />
          <ListHeader label="Bank Deposit " />
          <ListHeader label="Bank Balance " />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsBmBankInfoId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol
                label="Fund Received Branch:"
                value={item.fundReceivedBranch}
              />
              <ListCol
                label="Fund Received Amount:"
                value={item.fundReceivedAmount}
              />
              <ListCol
                label="Fund Transfer Branch:"
                value={item.fundTransferBranch}
              />
              <ListCol
                label="Fund Transfer Amount:"
                value={item.fundTransferAmount}
              />
              <ListCol label=" Bank Withdraw:" value={item.bankWithdraw} />
              <ListCol label="Bank Deposit:" value={item.bankDeposit} />
              <ListCol label="Bank Balance:" value={item.bankBalance} />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/bm/bank/visit/edit/${item.opsBmBankInfoId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/bmBankInfo/delete/${item.opsBmBankInfoId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default BankInfoList;
