import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";
import DialogBody from "./DialogBody";

const AcceptButton = ({ path, action }) => {
  const { mutateAsync } = usePostData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully Accepted!");
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
        className="btn-success w-12 h-10"
        onClick={() => {
          openModal();
        }}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Accept"
      >
        <AiOutlineCheck size={24} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure you want to Accept?"
      />
    </>
  );
};

export default AcceptButton;
