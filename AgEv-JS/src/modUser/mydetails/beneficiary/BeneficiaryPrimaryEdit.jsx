/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { AiOutlineForm } from "react-icons/ai";
import BeneficiaryPrimaryFrom from "./BeneficiaryPrimaryFrom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const BeneficiaryPrimaryEdit = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", `/BeneficiaryPrimary/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="btn-success w-10 h-10" onClick={() => openModal()}>
        <AiOutlineForm size={24} />
      </button>
      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => closeModal()}
          className="relative z-50 transition duration-300 ease-in data-[closed]:opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-1/2 max-w-sm md:max-w-screen-md space-y-4 border bg-white rounded-lg">
                <BeneficiaryPrimaryFrom
                  closeModal={closeModal}
                  defaultValues={{
                    beneficiaryId: list.data.beneficiaryId,
                    slNo: list.data.slNo,
                    name: list.data.name,
                    relationship: list.data.relationship,
                    receivedBenefitPercentage:
                      list.data.receivedBenefitPercentage,
                    dob: list.data.dob,
                    idNumber: list.data.idNumber,
                    beneficiaryContactNumber:
                      list.data.beneficiaryContactNumber,
                    beneficiaryEmail: list.data.beneficiaryEmail,
                    beneficiaryAddress: list.data.beneficiaryAddress,
                  }}
                  titleText="Beneficiary Edit"
                  path="/BeneficiaryPrimary/Update"
                  returnPath="/my/details"
                  btnText="Update"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BeneficiaryPrimaryEdit;
