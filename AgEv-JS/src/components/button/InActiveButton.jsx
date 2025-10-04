import React, { Fragment, useState } from "react";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";

import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const InActiveButton = ({ path, action }) => {
  const { mutateAsync } = usePostData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully deleted!");
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
        className="btn-danger w-12 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <AiOutlinePauseCircle size={24} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to InActive?"
      />
    </>
  );
};

export default InActiveButton;
