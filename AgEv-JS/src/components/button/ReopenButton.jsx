import React, { useState } from "react";
import { AiOutlineRedo } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";

const ReopenButton = ({ action, allVisitId }) => {
  const [setSubmitting] = useState(false);

  const { mutateAsync, reset } = usePostData();

  const onSubmit = async () => {
    setSubmitting(true);

    var data = new FormData();
    data.append("allVisitId", allVisitId);

    try {
      const { status } = await mutateAsync({
        path: `/allVisit/reopen`,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        // navigate(returnPath);
      }
      if (status === 204) {
        toast.success("Successfully Reopen!");
        // navigate(returnPath);
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
      action();
      setSubmitting(false);
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
      >
        <AiOutlineRedo size={24} />
      </button>
      <DialogBody
        closeModal={closeModal}
        isOpen={isOpen}
        onSubmit={onSubmit}
        bodyText=" Are you sure you want to Re-open this visit? This item will be open immediately."
      />
    </>
  );
};

export default ReopenButton;
