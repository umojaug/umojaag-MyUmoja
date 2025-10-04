import React from "react";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";

const SaccoStatementDetails = ({ data }) => {
  let sumDeposit = 0;
  let sumWithdraw = 0;
  let balance = 0;

  if (data.length > 0) {
    sumDeposit = data
      .map((item) => item.deposit)
      .reduce((sum, val) => sum + val, 0);
    sumWithdraw = data
      .map((item) => item.withdraw)
      .reduce((sum, val) => sum + val, 0);
  }

  balance = sumDeposit - sumWithdraw;

  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-5 list-header">
        <ListHeader label="Date" />
        <ListHeader label="Particulars" />
        <ListHeader label="Deposit" className="flex justify-end" />
        <ListHeader label="Withdraw" className="flex justify-end" />
        <ListHeader label="Balance" className="flex justify-end" />
      </div>

      {data.map((item) => (
        <div
          key={item.sl}
          className="grid grid-cols-1 md:grid-cols-5 list-body"
        >
          <ListCol
            label="Date : "
            value={format(new Date(item.workDate), "dd/MMM/yyyy")}
          />
          <ListCol label="Particulars" value={item.particulars} />
          <ListCol
            label="Deposit : "
            value={item.deposit.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
          <ListCol
            label="Withdraw"
            value={item.withdraw.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
        </div>
      ))}
      <div className="list-footer font-bold">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <span className="hidden col-span-2 md:block pr-5 text-left">
            Total {data.length} Transactions
          </span>
          <ListCol
            label="Total Deposit :  "
            value={sumDeposit.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
          <ListCol
            label="Total Withdraw :  "
            value={sumWithdraw.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
          <ListCol
            label="Balance :  "
            value={
              balance >= 0
                ? balance.toLocaleString("en-US")
                : "(" + (balance * -1).toLocaleString("en-US") + ")"
            }
            className="flex justify-start md:justify-end"
          />
        </div>
      </div>
    </div>
  );
};

export default SaccoStatementDetails;
