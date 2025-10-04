import React from "react";
import JournalVoucherCartSave from "./JournalVoucherCartSave";
import JournalVoucherCartList from "./JournalVoucherCartList";
import TopHeader from "../../../components/TopHeader";
import JournalVoucherForm from "./JournalVoucherForm";
import useJournalCart from "./useJournalCart";

const JournalVoucher = () => {
  const { journals, addToCart, deleteFromCart, emptyCart, balance } =
    useJournalCart();

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Journal Voucher"
        btn="Return"
        path="/ac/journalVoucher/List"
      />

      <JournalVoucherForm addToCart={addToCart} />

      <JournalVoucherCartList
        journals={journals}
        balance={balance}
        emptyCart={emptyCart}
        deleteFromCart={deleteFromCart}
      />

      <JournalVoucherCartSave
        journals={journals}
        balance={balance}
        emptyCart={emptyCart}
      />
    </div>
  );
};

export default JournalVoucher;
