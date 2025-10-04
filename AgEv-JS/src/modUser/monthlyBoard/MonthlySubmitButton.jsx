import { useState } from "react";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "../../components/button/DialogBody";

const MonthlySubmitButton = ({ path }) => {
  const { mutateAsync } = usePostData();
  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({
        path: path,
      });
      if (status === 204) {
        toast.success("Submitted Successfully!");
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
        className="btn-danger w-12 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <IoPaperPlaneOutline size={24} />
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText="Are you sure, you want to submit?"
      />
    </>
  );
};

export default MonthlySubmitButton;
