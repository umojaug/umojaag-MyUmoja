import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";
import DialogBody from "./DialogBody";

const ConfirmActionButton = ({
  icon: Icon = AiOutlineCheck,
  iconSize = 24,
  btnText = "",
  btnDesc = "Are you sure?",
  successMsg = "Action successful!",
  path,
  action,
  tooltip = "",
  btnClass = "btn-success w-12 h-10",
}) => {
  const { mutateAsync } = usePostData();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success(successMsg);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response: " + error.response.data);
      } else if (error.request) {
        toast.error("Request: " + error.message);
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      closeModal();
      action();
    }
  };

  return (
    <>
      <button
        className={btnClass}
        onClick={openModal}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={tooltip || btnText}
      >
        {Icon && <Icon size={iconSize} />}
        {btnText && <span className="ml-2">{btnText}</span>}
      </button>

      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText={btnDesc}
      />
    </>
  );
};

export default ConfirmActionButton;
