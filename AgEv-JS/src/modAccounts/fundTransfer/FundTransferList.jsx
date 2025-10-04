import React, { useState } from "react";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import TextButton from "../../components/button/TextButton";
import { format } from "date-fns";
import DeleteButton from "../../components/button/DeleteButton";
import PdfButton from "../../components/button/PdfButton";
import AcceptButton from "../../components/button/AcceptButton";
import SearchHeader from "../../components/SearchHeader";
import ExcelButton from "../../components/button/ExcelButton";
import TopHeader from "../../components/TopHeader";

const FundTransferList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("fundTransferList", "/FundTransfer/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.toBranch.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.fromBranch.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.transactionNo.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(({ transactionNo, transferDate, fromBranch, toBranch, amount }) => ({
      transactionNo,
      transferDate,
      fromBranch,
      toBranch,
      amount,
    }));

  return (
    <div className="card w-full max-w-screen-xl">
     <TopHeader
        title="Fund Transfer List"
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
          filename="FundTransferList.xlsx"
        />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          {/* <ListHeader label="SL" /> */}
          <ListHeader label="Transaction No" />
          <ListHeader label="Transaction Date" />
          <ListHeader label="From Branch" />
          <ListHeader label="To Branch" />
          <ListHeader label="Amount" />
        </div>
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-5 list-body">
              {/* <ListCol label="SL : " value={item.sl} /> */}
              <ListCol label="Transaction No : " value={item.transactionNo} />
              <ListCol
                label="Transaction Date : "
                value={format(new Date(item.transferDate), "dd/MMM/yyyy")}
              />
              <ListCol label="From Branch : " value={item.fromBranch} />
              <ListCol label="To Branch : " value={item.toBranch} />
              <ListCol label="Amount : " value={item.amount || 0} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FundTransferList;
