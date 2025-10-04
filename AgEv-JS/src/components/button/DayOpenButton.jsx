import React, { useState } from "react";
import { LuDoorOpen } from "react-icons/lu";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const DayOpenButton = () => {
  const { mutateAsync } = usePostData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({
        path: "acBusinessDay/open",
      });
      if (status === 204) {
        toast.success("Day Opened Successfully!");
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
          <LuDoorOpen size={24} />
        </div>
        <span className="submenu-button-name">Day Open</span>
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure, do you want to open the day?"
      />
    </>
  );
};

export default DayOpenButton;
