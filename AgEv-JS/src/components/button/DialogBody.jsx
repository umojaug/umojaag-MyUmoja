import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";

const DialogBody = ({ closeModal, isOpen, onSubmit, bodyText }) => {
  return (
    <Transition appear show={isOpen}>
      <Dialog
        onClose={() => closeModal()}
        className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="w-full max-w-sm md:max-w-xl space-y-4 border bg-white p-12 rounded-lg">
              <h3 className="mb-5 text-xl text-gray-800  font-medium">
                {bodyText}
              </h3>
              <div className="flex space-x-2 justify-center">
                <button className="w-24 btn-danger" onClick={onSubmit}>
                  Yes
                </button>
                <button className="w-24 btn-success" onClick={closeModal}>
                  No
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogBody;
