import React from "react";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import DeleteButton from "../../components/button/DeleteButton";
import PdfButton from "../../components/button/PdfButton";
import ExpenseVoucherEditModal from "./ExpenseVoucherEditModal";
import ReceiveVoucherEditModal from "./ReceiveVoucherEditModal";
import PaymentVoucherEditModal from "./PaymentVoucherEditModal";
import JournalVoucherEditModal from "./JournalVoucherEditModal";
// import FundTransferEditModal from "./FundTransferEditModal";
// import { useGlobalContext } from "../../hooks/context";
// import TransferVoucherEditModal from "./TransferVoucherEditModal";

function VoucherTable({
  data,
  refetch,
  showEditButton = false,
  viewType = "default",
}) {
  // const value = useGlobalContext();
  let sumDeposit = 0;
  let sumWithdraw = 0;

  if (data.length > 0) {
    sumDeposit = data.map((item) => item.dr).reduce((sum, val) => sum + val, 0);
    sumWithdraw = data
      .map((item) => item.cr)
      .reduce((sum, val) => sum + val, 0);
  }
  const firstItem = data[0];
  return (
    <div className="list-wrapper">
      {viewType !== "default" &&
        viewType !== "voucherList" &&
        firstItem !== undefined && (
          <div className="flex gap-2 justify-end p-2">
            <PdfButton
              path={`/pdfReport/voucher/voucherPrintPdf/${firstItem.voucherId}`}
            />
            {showEditButton && (
              <>
                {firstItem.voucherTypeId === "Expense" && (
                  <ExpenseVoucherEditModal
                    path="/voucher/update"
                    action={refetch}
                    editData={data}
                    voucherId={firstItem.voucherId}
                  />
                )}
                {firstItem.voucherTypeId === "Receive" && (
                  <ReceiveVoucherEditModal
                    path="/voucher/update"
                    action={refetch}
                    editData={data}
                    voucherId={firstItem.voucherId}
                  />
                )}
                {firstItem.voucherTypeId === "Payment" && (
                  <PaymentVoucherEditModal
                    path="/voucher/update"
                    action={refetch}
                    editData={data}
                    voucherId={firstItem.voucherId}
                  />
                )}
                {firstItem.voucherTypeId === "Journal" && (
                  <JournalVoucherEditModal
                    ppath="/voucher/update"
                    action={refetch}
                    editData={data}
                    voucherId={firstItem.voucherId}
                  />
                )}
                {/* {firstItem.voucherTypeId === "Transfer" && <TransferVoucherEditModal path="" action={refetch} editData={data} transId={firstItem.transId} />}
                  {firstItem.voucherTypeId === "Fund" && <FundTransferEditModal path="" action={refetch} editData={data} transId={firstItem.transId} selectPath={value.role === "Branch Manager" ? '/acLedger/selectFundByHead' : '/acLedger/SelectBankByBranch'} />} */}
              </>
            )}
            <DeleteButton
              action={refetch}
              path={`/voucher/delete/${firstItem.voucherId}`}
            />
          </div>
        )}
      <div className="md:grid grid-cols-8 list-header">
        <ListHeader label="Date" />
        <ListHeader label="Branch Name" />
        <ListHeader label="Voucher No" />
        <ListHeader label="Account Name" />
        <ListHeader label="Description" />
        <ListHeader
          label={`Debit (${import.meta.env.VITE_CURRENCY})`}
          className="flex justify-end"
        />
        <ListHeader
          label={`Credit (${import.meta.env.VITE_CURRENCY})`}
          className="flex justify-end"
        />
        <ListHeader label="" />
      </div>
      {data.length > 0 &&
        data.map((item, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-8 list-body">
            <ListCol
              label="Date : "
              value={format(new Date(item.workDate), "dd/MMM/yyyy")}
            />
            <ListCol label="Branch Name: " value={item.branchName} />
            <ListCol
              label="Voucher Number : "
              value={
                item.oldVoucherNo
                  ? `${item.voucherNo}, ${item.oldVoucherNo}`
                  : item.voucherNo
              }
            />
            <ListCol label="Account Name : " value={item.accountName} />
            <ListCol label="Description : " value={item.particulars} />
            {/* <ListCol
                label="Status : "
                value={item.isReverse === true ? "Reverse" : ""}
              /> */}

            <ListCol
              label="Debit : "
              value={item.dr.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Credit : "
              value={item.cr.toLocaleString("en-US")}
              className="flex justify-start md:justify-end"
            />
            <div className="flex justify-end space-x-2">
              {(viewType === "default" || viewType === "voucherList") && (
                <>
                  <PdfButton
                    path={`/pdfReport/voucher/voucherPrintPdf/${item.voucherId}`}
                  />
                  {viewType === "default" && (
                    <DeleteButton
                      action={refetch}
                      path={`/voucher/delete/${item.voucherId}`}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        ))}

      <div className="list-footer font-bold grid grid-cols-1 md:grid-cols-8">
        <div className="md:col-span-5 flex items-center">
          <span>Total Transactions: {data.length}</span>
        </div>
        <div className="md:col-span-1 flex justify-end">
          <span> {sumDeposit.toLocaleString("en-US")}</span>
        </div>
        <div className="md:col-span-1 flex justify-end">
          <span> {sumWithdraw.toLocaleString("en-US")}</span>
        </div>
      </div>
    </div>
  );
}

export default VoucherTable;
