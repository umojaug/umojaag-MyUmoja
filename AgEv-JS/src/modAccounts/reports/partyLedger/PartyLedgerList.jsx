import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

import { useGetData } from "../../../hooks/dataApi";
import PartyLedgerPDF from "./PartyLedgerPDF";

const PartyLedgerList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "AccountsPartyLedgerListReports",
    "/AccountsPartyLedgerListReports"
  );

  // const { title, fromDate, toDate, tableList } = list?.data;

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between items-center border w-40 h-8 rounded">
        <PDFDownloadLink
          document={<PartyLedgerPDF list={list} />}
          fileName="partyLedger-list.pdf"
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
              <span className="font-semibold break-all">Vno</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Date</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Pariticulars</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Type</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Dr</span>
            </div>
            <div className="flex justify-start">
              <span className="font-semibold break-all">Cr</span>
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
                    Vno:
                  </span>
                  <span className="break-words">{item.vno}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Date:
                  </span>
                  <span className="break-words">{item.date}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Pariticulars:
                  </span>
                  <span className="break-words">{item.particulars}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Type:
                  </span>
                  <span className="break-words">{item.type}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Dr:
                  </span>
                  <span className="break-words">{item.dr}</span>
                </div>
                <div>
                  <span className="inline-block md:hidden font-semibold">
                    Cr:
                  </span>
                  <span className="break-words">{item.cr}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PartyLedgerList;
