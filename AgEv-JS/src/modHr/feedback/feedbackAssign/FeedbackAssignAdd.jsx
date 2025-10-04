import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import FeedbackAssignForm from "./FeedbackAssignForm";
import { useParams } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";

const FeedbackAssignAdd = () => {
  const { id } = useParams();
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
        className="btn-header btn-animation text-primary"
        onClick={() => openModal()}
      >
        <AiOutlinePlusCircle size={36} />
      </button>
      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className=" max-w-sm md:max-w-screen-md space-y-4 border bg-white rounded-lg">
                <FeedbackAssignForm
                  closeModal={closeModal}
                  defaultValues={{
                    assignId: "",
                    feedbackId: id,
                    pinName: "",
                  }}
                  path="feedbackAssign/create"
                  btnText="Save"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FeedbackAssignAdd;
