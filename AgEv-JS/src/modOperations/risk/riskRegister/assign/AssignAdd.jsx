/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import AssignForm from "./AssignForm";
import { MdOutlineAssignmentInd } from "react-icons/md";

const AssignAdd = ({ riskRegisterId }) => {
  let [isOpen, setIsOpen] = useState(false);

  console.log(riskRegisterId);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <button onClick={openModal} className="btn-success w-12 h-10">
        <MdOutlineAssignmentInd size={24} />
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-screen-lg rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <AssignForm
                  closeModal={closeModal}
                  riskRegisterId={riskRegisterId}
                  path="/RiskRegister/Assign"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AssignAdd;
