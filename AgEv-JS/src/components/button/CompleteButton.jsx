import React, { Fragment, useState } from "react";
import { useDeleteData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const CompleteButton = ({ path }) => {
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteData();
  const returnPath = "/evaluation/first/Review/list";

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully Completed!");
        navigate(returnPath);
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
      <div
        className="btn-umojayellow w-full h-10"
        onClick={() => {
          openModal();
        }}
      >
        Completed
      </div>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText=" Are you sure you want to complete? This item will be complete immediately. You can't undo this action."
      />
    </>
  );
};

export default CompleteButton;
