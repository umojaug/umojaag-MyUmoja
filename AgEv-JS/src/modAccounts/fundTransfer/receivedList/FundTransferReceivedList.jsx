import React, { useState } from "react";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import TopHeader from "../../../components/TopHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";
import ExcelButton from "../../../components/button/ExcelButton";
import ReceivedSelectButton from "../../../components/button/ReceivedSelectButton";

const FundTransferReceivedList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("expenseVoucher", "/FundTransfer/receiveList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.transactionNo.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        fundTransfersId,
        transactionNo,
        transferDate,
        fromBranch,
        toBranch,
        amount,
        status,
      }) => ({
        fundTransfersId,
        transactionNo,
        transferDate,
        fromBranch,
        toBranch,
        amount,
        status,
      })
    );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Fund Transfer Received List"
        btn="Return"
        path="/ac/fund/transfer"
      />
      <SearchHeader
        action={setQuery}
        placeholder="Branch Name / Transaction No"
      />
      <div className="flex justify-end mb-4">
        <ExcelButton
          className=""
          path={`/FundTransfer/ExportToExcel/`}
          filename="FundTransferReceivedList.xlsx"
        />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          {/* <ListHeader label="SL" /> */}
          <ListHeader label="Transaction No" />
          <ListHeader label="Transaction Date" />
          <ListHeader label="From Branch" />
          <ListHeader label="To Branch" />
          <ListHeader label="Amount" />
          <ListHeader label="Status" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-7 list-body">
              {/* <ListCol label="SL : " value={item.sl} /> */}
              <ListCol label="Transaction No : " value={item.transactionNo} />
              <ListCol
                label="Transaction Date : "
                value={format(new Date(item.transferDate), "dd/MMM/yyyy")}
              />
              <ListCol label="From Branch : " value={item.fromBranch} />
              <ListCol label="To Branch : " value={item.toBranch} />
              <ListCol label="Amount : " value={item.amount || 0} />
              <ListCol label="Status : " value={item.status || "Pending"} />
              <div className="flex justify-end space-x-2">
                {/* <PdfButton
                  path={`/AcReportPdf/Voucher/${item.fundTransfersId}`}
                /> */}

                {item.status !== "Received" && (
                  <ReceivedSelectButton
                    action={refetch}
                    path={`/fundTransfer/received/${item.fundTransfersId}`}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FundTransferReceivedList;
