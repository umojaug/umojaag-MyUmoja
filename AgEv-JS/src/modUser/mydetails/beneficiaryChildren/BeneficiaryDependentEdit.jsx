import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { AiOutlineForm } from "react-icons/ai";
import BeneficiaryDependentFrom from "./BeneficiaryDependentFrom";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";

const BeneficiaryDependentEdit = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", `/BeneficiaryDependent/details/${id}`);

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
                <BeneficiaryDependentFrom
                  closeModal={closeModal}
                  defaultValues={{
                    childDependentId: list.data.childDependentId,
                    // beneficiaryId: list.data.beneficiaryId,
                    childFullName: list.data.childFullName,
                    dateOfBirth: list.data.dateOfBirth,
                    idNumber: list.data.idNumber,
                    childAddress: list.data.childAddress,
                    guardianFullName: list.data.guardianFullName,
                    guardianContact: list.data.guardianContact,
                    guardianAddress: list.data.guardianAddress,
                    guardianDesignation: list.data.guardianDesignation,
                    guardianEmail: list.data.guardianEmail,
                  }}
                  titleText="Beneficiary Children Add"
                  path="/BeneficiaryDependent/Update"
                  btnText="Update"
                  returnPath="/my/details/beneficiary/primary/child"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BeneficiaryDependentEdit;
