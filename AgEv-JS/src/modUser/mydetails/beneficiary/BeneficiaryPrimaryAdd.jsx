import { useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import BeneficiaryPrimaryFrom from "./BeneficiaryPrimaryFrom";
// import { FaClover } from "react-icons/fa6";
import { AiOutlinePlusCircle } from "react-icons/ai";

const BeneficiaryPrimaryAdd = () => {
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
        <AiOutlinePlusCircle size={24} />
      </button>
      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4">
              <DialogPanel className="w-auto max-w-sm md:max-w-screen-md space-y-4 border bg-white rounded-lg p-5">
                <BeneficiaryPrimaryFrom
                  defaultValues={{
                    beneficiaryId: "",
                    slNo: "",
                    name: "",
                    relationship: "",
                    receivedBenefitPercentage: "",
                    dob: "",
                    idNumber: "",
                    beneficiaryContactNumber: "",
                    beneficiaryEmail: "",
                    beneficiaryAddress: "",
                  }}
                  closeModal={closeModal}
                  path="BeneficiaryPrimary/create"
                  btnText="Save"
                  titleText="Beneficiary Add"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BeneficiaryPrimaryAdd;
