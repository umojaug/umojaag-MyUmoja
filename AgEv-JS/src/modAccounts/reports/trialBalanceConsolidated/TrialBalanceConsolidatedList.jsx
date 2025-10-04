import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

import { useGetData } from "../../../hooks/dataApi";
import TrialBalanceConsolidatedListPDF from "./TrialBalanceConsolidatedPDF";

const TrialBalanceConsolidatedReportsList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "AccountTrialBalanceConsolidatedListReports",
    "/AccountTrialBalanceConsolidatedListReports"
  );

  // const { title, fromDate, toDate, tableList } = list?.data;

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between items-center border w-40 h-8 rounded">
        <PDFDownloadLink
          document={<TrialBalanceConsolidatedListPDF list={list} />}
          fileName="trialBalanceConsolidated-list.pdf"
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
          <div className="md:grid grid-cols-3 list-header">
            <div className="flex justify-start">
              <span className="font-semibold break-all">Main Head</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">For The Period</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Cumulative</span>
            </div>
          </div>
          {list.data.tableList.length > 0 &&
            list.data.tableList.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 list-body"
              >
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Main Head:
                  </span>
                  <span className="break-words">{item.mainHead}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    For The Period:
                  </span>
                  <span className="break-words">{item.forThePeriod}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Cumulative:
                  </span>
                  <span className="break-words">{item.cumulative}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TrialBalanceConsolidatedReportsList;
