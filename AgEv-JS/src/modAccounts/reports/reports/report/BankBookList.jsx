import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import PrintHeader from "../../../../components/PrintHeader";
import { format } from "date-fns";
import PdfButton from "../../../../components/button/PdfButton";

const BankBookList = ({ dataForm }) => {
  // const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "AcBankBook",
    `/acBankBook/new/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const filteredData = list.data;

  // .filter((item) => {
  //   if (query === "") {
  //     return true;
  //   } else {
  //     return item.ledgerName.toLowerCase().includes(query.toLowerCase());
  //   }
  // });

  const dataWithIndividualBalance = filteredData.map((item) => {
    const balance = item.dr - item.cr;
    return {
      ...item,
      balance,
    };
  });

  const totalDebit = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.dr;
  }, 0);

  const totalCredit = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.cr;
  }, 0);

  const totalBalance = dataWithIndividualBalance.reduce((acc, item) => {
    return acc + item.balance;
  }, 0);

  return (
    <>
      <div className="flex justify-end">
        <PrintHeader
          fileName="ledgerReport.csv"
          data={dataWithIndividualBalance.map(
            ({ workDate, ledgerName, dr, cr, balance, voucherNumber }) => ({
              workDate: format(new Date(workDate), "dd/MMM/yyyy"), // Formatting workDate
              ledgerName,
              dr,
              cr,
              balance,
              voucherNumber,
            })
          )}
          headers={[
            { label: "Date", key: "workDate" },
            { label: "Ledger Name", key: "ledgerName" },
            { label: "Debit Amount", key: "dr" },
            { label: "Credit Amount", key: "cr" },
            { label: "Balance", key: "balance" },
            { label: "Voucher Number", key: "voucherNumber" },
          ]}
        />

        <PdfButton
          path={`/acReportPdf/bankBook/${dataForm.fromDate}/${dataForm.tillDate}`}
          filename="bankbook.pdf"
        />
      </div>

      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Date " />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Voucher Number" />
          <ListHeader className="text-right" label="Deposit Amount" />
          <ListHeader className="text-right" label="Withdraw Amount" />
          <ListHeader className="text-right" label="Balance" />
          <ListHeader className="text-right" label="" />
        </div>
        {dataWithIndividualBalance.length > 0 &&
          dataWithIndividualBalance.map((item) => (
            <div
              key={item.glId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol
                label="Date : "
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Ledger Name :" value={item.ledgerName} />
              <ListCol label="Voucher Number :" value={item.voucherNumber} />
              <ListCol
                className="text-right"
                label="Debit Amount:"
                value={item.dr.toLocaleString("en-US")}
              />
              <ListCol
                className="text-right"
                label="Credit Amount:"
                value={item.cr.toLocaleString("en-US")}
              />
              <ListCol
                className="text-right"
                label="Balance:"
                value={item.balance.toLocaleString("en-US")}
              />

              <div className="flex justify-end space-x-2">
                {item.voucherNumber != "" && (
                  <PdfButton
                    path={`/AcReportPdf/Voucher/${item.voucherNumber}`}
                  />
                )}
              </div>
            </div>
          ))}

        <div className="list-footer font-bold">
          <div className="grid grid-cols-1 md:grid-cols-7">
            <div className="md:col-span-3 flex items-center">
              <ListCol
                label="Transactions :  "
                value={`Total ${filteredData.length} Transactions`}
              />
            </div>

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
              label="Total Balance :  "
              value={totalBalance.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BankBookList;
