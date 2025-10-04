import React, { useState } from "react";
import { AiOutlineCloudSync } from "react-icons/ai";
import { useDeleteData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const ResetButton = ({ path, action }) => {
  const { mutateAsync } = useDeleteData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully reset!");
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
        className="btn-umojayellow w-12 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <AiOutlineCloudSync size={24} />
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to reset password for this staff?"
      />
    </>
  );
};

export default ResetButton;
