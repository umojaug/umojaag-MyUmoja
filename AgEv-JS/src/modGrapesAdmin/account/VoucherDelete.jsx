import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import VoucherFrom from "./VoucherFrom";
import { IoMdClose } from "react-icons/io";

const VoucherDelete = () => {
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
          <IoMdClose size={24} />
        </div>
        <span className="submenu-button-name">Voucher Number</span>
      </button>
      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-sm md:max-w-screen-sm space-y-4 border bg-white rounded-lg p-5">
                <VoucherFrom
                  defaultValues={{
                    voucherNumber: "0",
                  }}
                  closeModal={closeModal}
                  path="Voucher/Delete"
                  titleText="Delete Voucher"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default VoucherDelete;
