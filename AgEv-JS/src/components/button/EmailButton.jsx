import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const EmailButton = ({
  path,
  size = 24,
  bodyText = "Are you sure you want to email the payslip?",
}) => {
  const { mutateAsync } = usePostData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully send!");
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
      // action();
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
        className="transition hover:-translate-y-1"
        onClick={() => {
          openModal();
        }}
      >
        <MdOutlineMail size={size} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText={bodyText}
      />
    </>
  );
};

export default EmailButton;
