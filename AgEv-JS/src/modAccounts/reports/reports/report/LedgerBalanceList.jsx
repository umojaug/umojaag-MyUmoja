import React from "react";
import Error from "../../../../components/Error";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../components/Loading";
import TopHeader from "../../../../components/TopHeader";
import { useGetData } from "../../../../hooks/dataApi";

const LedgerBalanceList = ({ dataForm }) => {
  // const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "acLedgerBalance",
    `/acLedgerBalance/ledgerBalance/${dataForm.groupId}/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error?.message} />;

  const data = list.data;
  // .filter((item) => {
  //   if (query === "") {
  //     return item;
  //   } else if (
  //     item.ledgerName.toLowerCase().indexOf(query.toLowerCase()) !== -1
  //   ) {
  //     return item;
  //   } else return null;
  // })
  // .map(({ groupName, ledgerName, particulars, dr, cr }) => ({
  //   groupName,
  //   ledgerName,
  //   particulars,
  //   dr,
  //   cr,
  // }));

  let sumDeposit = 0;
  let sumWithdraw = 0;
  let balance = 0;

  if (data.length > 0) {
    sumDeposit = data.map((item) => item.dr).reduce((sum, val) => sum + val, 0);
    sumWithdraw = data
      .map((item) => item.cr)
      .reduce((sum, val) => sum + val, 0);
  }

  balance = sumDeposit - sumWithdraw;

  return (
    <>
      <TopHeader title={data[0].groupName} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Ledger Name" />
          <ListHeader label="Debit Amount" />
          <ListHeader label="Credit Amount" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.glId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Ledger Name :" value={item.ledgerName} />
              <ListCol label="Voucher Number :" value={item.voucherNumber} />
              <ListCol label="Debit Amount:" value={item.dr} />
              <ListCol label="Credit Amount :" value={item.cr} />

              <div className="flex justify-end space-x-2"></div>
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-3"></div>
          <div className="flex justify-evenly">
            <span className="font-semibold">
              Total Translation {data.length}
            </span>
            <span className="font-semibold">
              Total Debit: {sumDeposit.toLocaleString("en-US")}
            </span>
            <span className="font-semibold">
              Total Credit:{sumWithdraw.toLocaleString("en-US")}
            </span>
          </div>
          <div>
            <span className="font-semibold">
              Total balance:{balance.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LedgerBalanceList;
