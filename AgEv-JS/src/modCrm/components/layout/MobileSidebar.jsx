import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Dialog,
  Transition,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import { AiOutlineMenu } from "react-icons/ai";

const MobileSidebar = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        <AiOutlineMenu size={30} />
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none transition duration-300 ease-in data-[closed]:opacity-0"
          onClose={closeModal}
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />
          <div className="fixed inset-0 z-10 w-60 overflow-y-auto">
            <div className="flex min-h-full items-start justify-start">
              <DialogPanel
                transition
                className="w-60 max-w-sm h-screen bg-black backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <div className="" onClick={closeModal}>
                  <Sidebar />
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileSidebar;
