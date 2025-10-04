import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TopHeader from "../../../components/TopHeader";
// import OpeningBalance from "./OpeningBalance";
import PrintHeader from "../../../components/PrintHeader";
import PdfButton from "../../../components/button/PdfButton";
import { format } from "date-fns";
import ExcelButton from "../../../components/button/ExcelButton";

const LedgerList = ({ dataForm }) => {
  // const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "acLedgerReport",
    `/acLedgerReport/ledgerBook/${dataForm.searchId}/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error?.message} />;

  const data = list.data.map(
    ({
      workDate,
      ledgerCode,
      ledgerName,
      particulars,
      voucherNumber,
      dr,
      cr,
      closingBalance: balance,
    }) => ({
      workDate,
      ledgerCode,
      ledgerName,
      particulars,
      voucherNumber,
      dr,
      cr,
      balance,
    })
  );

  const ledgerName = data[0]?.ledgerName;
  const openingBalance = data[0]?.balance;
  let sumDr = 0;
  let sumCr = 0;

  if (data.length > 0) {
    sumDr = data.map((item) => item.dr).reduce((sum, val) => sum + val, 0);
    sumCr = data.map((item) => item.cr).reduce((sum, val) => sum + val, 0);
  }

  const closingBalance = openingBalance + sumDr - sumCr;

  return (
    <>
      <div className="flex justify-end">
        <PrintHeader
          fileName="ledgerReport.csv"
          data={data}
          headers={[
            { label: "Date", key: "workDate" },
            { label: "Particular", key: "ledgerName" },
            { label: "Voucher No", key: "voucherNumber" },
            { label: "Debit Amount", key: "dr" },
            { label: "Credit Amount", key: "cr" },
            { label: "Balance", key: "balance" },
          ]}
        />
        <PdfButton
          path={`/acReportPdf/ledgerbook/${dataForm.searchId}/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="ledgerReport.pdf"
        />
        <ExcelButton
          path={`/AcLedgerReport/LedgerBookExport/${dataForm.searchId}/${dataForm.fromDate}/${dataForm.tillDate}/`}
          filename={`ledgerReport_${format(
            new Date(dataForm.fromDate),
            "dd-MM-yyyy"
          )}_${format(new Date(dataForm.tillDate), "dd-MM-yyyy")}.xlsx`}
        />
      </div>
      <div className="font-bold flex justify-between text-xs">
        <div>
          {data.length > 0 ? (
            <TopHeader title={ledgerName} />
          ) : (
            <TopHeader title={"No data found for this ledger"} />
          )}
        </div>
        <div>
          <div className="grid grid-cols-2 justify-items-end">
            <span className="">Opening Balance : </span>
            <span>{openingBalance.toLocaleString("en-US")}</span>
          </div>
          <div className="grid grid-cols-2 justify-items-end">
            <span className="">Current Total Debit : </span>
            <span>{sumDr.toLocaleString("en-US")}</span>
          </div>
          <div className="grid grid-cols-2 justify-items-end">
            <span>Current Total Credit : </span>
            <span>{sumCr.toLocaleString("en-US")}</span>
          </div>
          <div className="grid grid-cols-2 justify-items-end">
            <span>Closing Balance : </span>
            <span>{closingBalance.toLocaleString("en-US")}</span>
          </div>
        </div>
      </div>
      <div className="list-wrapper">
        <div className="flex justify-end">
          {/* <OpeningBalance
            ledgerId={dataForm.searchId}
            fromDate={dataForm.fromDate}
          /> */}
        </div>
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Date" />
          <ListHeader label="Particulars" />
          <ListHeader label="Voucher No" />
          <ListHeader label="Debit Amount" className="flex justify-end" />
          <ListHeader label="Credit Amount" className="flex justify-end" />
          <ListHeader label="Balance" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-7 list-body ${
                item.particulars === "Opening Balance" ||
                item.particulars === "Closing Balance"
                  ? "font-bold"
                  : ""
              }`}
            >
              <ListCol
                label="Date :"
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particulars :" value={item.particulars} />
              <ListCol label="Voucher No :" value={item.voucherNumber} />

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
                value={item.balance.toLocaleString("en-US")}
              />
              <div className="flex justify-end space-x-2">
                {item.voucherNumber != "" && (
                  <PdfButton
                    path={`/acReportPdf/Voucher/${item.voucherNumber}`}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="font-bold grid grid-cols-1 justify-items-end text-xs">
        <div>
          <div className="grid grid-cols-2 justify-items-end">
            <span className="">Opening Balance : </span>
            <span>{openingBalance.toLocaleString("en-US")}</span>
          </div>
          <div className="grid grid-cols-2 justify-items-end">
            <span className="">Current Total Debit : </span>
            <span>{sumDr.toLocaleString("en-US")}</span>
          </div>
          <div className="grid grid-cols-2 justify-items-end">
            <span>Current Total Credit : </span>
            <span>{sumCr.toLocaleString("en-US")}</span>
          </div>
          <div className="grid grid-cols-2 justify-items-end">
            <span>Closing Balance : </span>
            <span>{closingBalance.toLocaleString("en-US")}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LedgerList;
