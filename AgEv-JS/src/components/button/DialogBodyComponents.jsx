import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";

const DialogBodyComponents = ({ closeModal, isOpen, children }) => {
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
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogBodyComponents;
