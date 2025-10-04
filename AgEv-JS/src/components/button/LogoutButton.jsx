import React, { useState } from "react";
import { AiOutlineExport } from "react-icons/ai";
import { useGlobalContext } from "../../hooks/context";
import DialogBody from "./DialogBody";

const LogoutButton = () => {
  const value = useGlobalContext();
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
        className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow"
        onClick={() => {
          openModal();
        }}
      >
        <AiOutlineExport size={30} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={value.signOut}
        bodyText="Are you sure you want to exit?"
      />
    </>
  );
};

export default LogoutButton;
