import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

import { useGetData } from "../../../hooks/dataApi";
import CashRequisitionListPDF from "./CashRequisitionListPDF";

const CashRequisitionList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "AccountCashRequisitionListReports",
    "/AccountCashRequisitionListReports"
  );

  // const { title, fromDate, toDate, tableList } = list?.data;

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between items-center border w-40 h-8 rounded">
        <PDFDownloadLink
          document={<CashRequisitionListPDF list={list} />}
          fileName="cashRequisition-list.pdf"
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
          <p className="text-lg">
            {list.data.fromDate} To {list.data.toDate}
          </p>
        </div>
      </div>
      <div className="my-2">
        <div className="list-wrapper">
          <div className="md:grid grid-cols-6 list-header">
            <div className="flex justify-start">
              <span className="font-semibold break-all">EntryBy</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Particulars</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Amount</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Approved</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">ApprovedBy</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Approved Date</span>
            </div>
          </div>
          {list.data.tableList.length > 0 &&
            list.data.tableList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-6 list-body"
              >
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    EntryBy:
                  </span>
                  <span className="break-words">{item.entryBy}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Particulars:
                  </span>
                  <span className="break-words">{item.particulars}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Amount:
                  </span>
                  <span className="break-words">{item.amount}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Approved:
                  </span>
                  <span className="break-words">{item.approved}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    ApprovedBy:
                  </span>
                  <span className="break-words">{item.approvedBy}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Approved Date:
                  </span>
                  <span className="break-words">{item.approvedDate}</span>
                </div>
              </div>
            ))}
          <div className="md:grid grid-cols-3 list-header">
            <div className="flex justify-start">
              <span className="font-semibold break-all">{list.data.total}</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">
                {list.data.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashRequisitionList;
