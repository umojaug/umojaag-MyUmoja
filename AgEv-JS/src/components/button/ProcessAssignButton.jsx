import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const ProcessAssignButton = () => {
  const { mutateAsync } = usePostData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({
        path: "/MenuSubMenuAssign/process",
      });
      if (status === 204) {
        toast.success("successfully Process!");
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
      <button
        className="submenu-button group"
        onClick={() => {
          openModal();
        }}
      >
        <div className="submenu-button-icon">
          <AiOutlineLock size={24} />
        </div>
           <span className="submenu-button-name">Process Assign</span>
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure, do you want to process assign?"
      />
    </>
  );
};

export default ProcessAssignButton;
