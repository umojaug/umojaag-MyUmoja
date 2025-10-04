import React, { useState } from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import { useDownloadFile } from "../../../hooks/useDownloadFile";

const LedgerList = () => {
  const downloadFile = useDownloadFile();
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ledger", "/acLedgerSetup/list");

  const handleDownloadExcel = () => {
    const filename = `LedgerReport_${new Date()
      .toLocaleDateString()
      .replace(/\//g, "-")}_${new Date()
      .toLocaleTimeString()
      .replace(/:/g, "-")}.xlsx`;
    downloadFile("/AcLedger/ExportToExcel", filename, "GET");
  };
  const handleDownloadPDF = () => {
    downloadFile("/AcLedger/ExportToPDF", "ledger-data.pdf", "GET");
  };

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list?.data
    ? list.data
        .filter((item) => {
          if (query === "") {
            return item;
          } else if (
            item.mainName?.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            item.ledgerName?.toLowerCase().indexOf(query.toLowerCase()) !==
              -1 ||
            item.subGroupName?.toLowerCase().indexOf(query.toLowerCase()) !==
              -1 ||
            item.groupName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
          ) {
            return item;
          } else return null;
        })
        .map(
          ({
            ledgerId,
            mainName,
            branchName,
            groupName,
            subGroupName,
            ledgerName,
            ledgerCode,
            displayAt,
            voucherType,
            accountType,
            classificationName,
          }) => ({
            ledgerId,
            mainName,
            branchName,
            groupName,
            subGroupName,
            ledgerName,
            ledgerCode,
            displayAt,
            voucherType,
            accountType,
            classificationName,
          })
        )
    : [];

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ledger" btn="Save" path={"/ac/settings/ledger/add"} />
      <SearchHeader
        action={setQuery}
        placeholder="Main Name / Group Name / Sub Group Name / Ledger Name / Branch Name"
      />

      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <ListHeader label="Main Name" />
          <ListHeader label="Group Name" />
          <ListHeader label="Sub Group Name" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Ledger Code" />
          <ListHeader label="Display At" />
          <ListHeader label="Voucher Type" />
          <ListHeader label="Account Type" />
          <ListHeader label="Classification" />
          <ListHeader label="Branch Name" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.ledgerId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol label="Main Name : " value={item.mainName} />
              <ListCol label="Group Name : " value={item.groupName} />
              <ListCol label="Sub Group Name : " value={item.subGroupName} />
              <ListCol label="Ledger Name : " value={item.ledgerName} />
              <ListCol label="Ledger Code : " value={item.ledgerCode} />
              <ListCol label="Display At : " value={item.displayAt} />
              <ListCol label="Voucher Type : " value={item.voucherType} />
              <ListCol label="Account Type : " value={item.accountType} />
              <ListCol
                label="classificationName : "
                value={item.classificationName}
              />
              <ListCol label="Branch Name : " value={item.branchName} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/ac/settings/ledger/edit/${item.ledgerId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/acledger/delete/${item.ledgerId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerList;
