import React, { Fragment, useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { usePostData } from "../../hooks/dataApi";

import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const CloseButton = ({ path, action }) => {
  const { mutateAsync } = usePostData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully Close");
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
        className="btn bg-slate-600 w-12 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <HiLockClosed size={24} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to Close?"
      />
    </>
  );
};

export default CloseButton;
