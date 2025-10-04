import React, { Fragment, useState } from "react";

import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import DialogBody from "../../../components/button/DialogBody";

const BillPay = ({ path, action }) => {
  const { mutateAsync } = usePostData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully Bill Paid!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      closeModal();
      action();
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="btn-success w-12 h-10"
        onClick={() => {
          openModal();
        }}
      >
        Pay
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText=" Are you sure you want Pay the Travel Bill?"
      />
    </>
  );
};

export default BillPay;
