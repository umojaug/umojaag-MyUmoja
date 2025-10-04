import React from "react";
import { TiDelete } from "react-icons/ti";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const JournalVoucherCartList = ({
  journals,
  balance,
  emptyCart,
  deleteFromCart,
}) => {
  return (
    <>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Ledger Name" />
          <ListHeader label="Particulars" />
          <ListHeader label="Dr" className="flex justify-end" />
          <ListHeader label="Cr" className="flex justify-end" />
          <ListHeader label="" />
          <div className="flex justify-end">
            <button
              className="bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-500"
              onClick={emptyCart}
            >
              Remove All
            </button>
          </div>
        </div>

        {journals.length > 0 &&
          journals.map((cartItem, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 md:grid-cols-6 list-body">
                <ListCol
                  label="Account Code & Name : "
                  value={cartItem.ledgerNameCode}
                />
                <ListCol
                  label="Voucher Number : "
                  value={cartItem.particulars}
                />
                <ListCol
                  className="flex justify-start md:justify-end"
                  label="Debit : "
                  value={cartItem.dr.toLocaleString("en-US")}
                />
                <ListCol
                  className="flex justify-start md:justify-end"
                  label="Credit : "
                  value={cartItem.cr.toLocaleString("en-US")}
                />
                <ListCol />
                <div className="flex justify-start md:justify-end">
                  <button
                    className="break-words cursor-pointer transition delay-100 text-2xl"
                    onClick={() => deleteFromCart(cartItem.ledgerNameCode)}
                  >
                    <TiDelete size={40} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">Balance : {balance}</span>
        </div>
      </div>
    </>
  );
};

export default JournalVoucherCartList;
