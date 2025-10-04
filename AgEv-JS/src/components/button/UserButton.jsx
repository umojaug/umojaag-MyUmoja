import React, {  useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";

import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const UserButton = ({ action }) => {
  const { mutateAsync } = usePostData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({
        path: "/user/createall",
      });
      if (status === 201) {
        toast.success("Successfully processed!");
        action();
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
        className="btn-umojablue w-24 md:w-72 h-10 flex align-middle space-x-2"
        onClick={() => {
          openModal();
        }}
      >
        <span>
          <AiOutlineUser size={24} />
        </span>
        <div className="hidden md:block">User Process</div>
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to process user login?"
      />
    </>
  );
};

export default UserButton;
