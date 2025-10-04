import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

import { useGetData } from "../../../hooks/dataApi";
import DebitorListPDF from "./DebitorListPDF";

const DebitorList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("AccountDebitorListReports", "/AccountDebitorListReports");

  // const { title, fromDate, toDate, tableList } = list?.data;

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between items-center border w-40 h-8 rounded">
        <PDFDownloadLink
          document={<DebitorListPDF list={list} />}
          fileName="debitor-list.pdf"
          className="px-2 border-r cursor-pointer"
        >
          PDF
        </PDFDownloadLink>
        <button className="px-2 border-r">Excel</button>
        <button className="px-2">Print</button>
      </div>
      <div className="py-2 flex justify-end border-b-2 border-gray-500">
        <div>
          <h2 className="text-2xl">{list.data.title}</h2>
        </div>
      </div>
      <div className="my-2">
        <div className="list-wrapper">
          <div className="md:grid grid-cols-4 list-header">
            <div className="flex justify-start">
              <span className="font-semibold break-all">Party Name</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Total Credit</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Total Deposit</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Total Balance</span>
            </div>
          </div>
          {list.data.tableList.length > 0 &&
            list.data.tableList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 list-body"
              >
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Party Name:
                  </span>
                  <span className="break-words">{item.partyName}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Total Credit:
                  </span>
                  <span className="break-words">{item.totalCredit}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Total Deposit:
                  </span>
                  <span className="break-words">{item.totalDeposit}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Total Balance:
                  </span>
                  <span className="break-words">{item.totalBalance}</span>
                </div>
              </div>
            ))}
          <div className="md:grid grid-cols-4 list-header">
            <div className="flex justify-start">
              <span className="font-semibold break-all">{list.data.total}</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">
                {list.data.totalCreditB}
              </span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">
                {list.data.totalDepositB}
              </span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">
                {list.data.totalBalanceB}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitorList;
