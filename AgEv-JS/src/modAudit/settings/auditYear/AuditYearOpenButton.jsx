import React, { useState } from "react";

import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import DialogBody from "../../../components/button/DialogBody";

const AuditYearOpenButton = ({ path, action }) => {
  const { mutateAsync } = usePostData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });

      if (status === 201) {
        toast.success("Successfully Opened");
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
        className=" btn bg-green-600 w-1/3   font-bold"
        onClick={() => {
          openModal();
        }}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="DayClose"
      >
        Year Open
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to Open a new audit year??"
      />
    </>
  );
};

export default AuditYearOpenButton;
