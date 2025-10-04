import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import PdfButton from "../../../components/button/PdfButton";
import ExcelButton from "../../../components/button/ExcelButton";

const TrialBalanceList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "AcTrialBalance",
    `/acTrialBalance/new/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const filteredData = list.data;
  const data = list.data;

  const dataWithIndividualBalance = filteredData.map((item) => {
    const balance = item.dr - item.cr;
    return {
      ...item,
      balance,
    };
  });

  const openingBalance = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.openingBalance;
  }, 0);

  const totalDebit = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.dr;
  }, 0);

  const totalCredit = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.cr;
  }, 0);

  const closingBalance = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.closingBalance;
  }, 0);

  return (
    <>
      <div className="flex justify-end">
        <PrintHeader
          fileName="TrailBalance.csv"
          data={data.map(
            ({
              ledgerCode,
              ledgerName,
              openingBalance,
              dr,
              cr,
              closingBalance,
            }) => ({
              ledgerCode,
              ledgerName,
              openingBalance,
              dr,
              cr,
              closingBalance,
            })
          )}
          headers={[
            { label: "Ledger Code", key: "ledgerCode" },
            { label: "Ledger Name", key: "ledgerName" },
            { label: "Opening Balance", key: "openingBalance" },
            { label: "Debit Amount", key: "dr" },
            { label: "Credit Amount", key: "cr" },
            { label: "Balance", key: "closingBalance" },
          ]}
        />
        <PdfButton
          path={`/acReportPdf/trialBalance/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="trailBalance.pdf"
        />
        <ExcelButton
          path={`/acTrialBalance/ExportToExcel/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="trailBalance.xlsx"
        />
      </div>

      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Ledger Code" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Opening Balance" className="flex justify-end" />
          <ListHeader label="Debit Amount" className="flex justify-end" />
          <ListHeader label="Credit Amount" className="flex justify-end" />
          <ListHeader label="Closing Balance" className="flex justify-end" />
        </div>
        {dataWithIndividualBalance.length > 0 &&
          dataWithIndividualBalance.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Ledger Code :" value={item.ledgerCode} />
              <ListCol label="Ledger Name :" value={item.ledgerName} />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Opening Balance : "
                value={item.openingBalance.toLocaleString("en-US")}
              />

              <ListCol
                className="flex justify-start md:justify-end"
                label="Debit Amount:"
                value={item.dr.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Credit Amount:"
                value={item.cr.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Closing Balance : "
                value={item.closingBalance.toLocaleString("en-US")}
              />
              <div className="flex justify-end space-x-2"></div>
            </div>
          ))}

        <div className="list-footer font-bold">
          <div className="grid grid-cols-1 md:grid-cols-6">
            <ListCol label="Balance" value="Balance" className="col-span-2" />
            <ListCol
              label="Total Opening Balance :  "
              value={openingBalance.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Total Debit :  "
              value={totalDebit.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Total Credit :  "
              value={totalCredit.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Total Closing Balance :  "
              value={closingBalance.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrialBalanceList;
