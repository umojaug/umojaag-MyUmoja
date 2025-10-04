import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import BranchVisitDetailsForm from "./BranchVisitDetailsForm";

import { AiOutlineForm } from "react-icons/ai";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const BranchVisitDetailsEdit = ({ branchVisitDetailsId, branchVisitId }) => {
  let [isOpen, setIsOpen] = useState(false);

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "areaOfReview",
    `/branchVisitDetails/details/${branchVisitDetailsId}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <button onClick={openModal} className="btn-success w-12 h-10">
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
              <DialogPanel
                transition
                className="w-full max-w-screen-lg rounded-xl backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <BranchVisitDetailsForm
                  closeModal={closeModal}
                  branchVisitId={branchVisitId}
                  path="/branchVisitDetails/update"
                  defaultValues={{
                    branchVisitId: list.data.branchVisitId,
                    topicAssessed: list.data.topicAssessed,
                    findings: list.data.findings,
                    ratingGiven: list.data.ratingGiven,
                    ownerAssigned: list.data.ownerAssigned,
                    actionToBeTaken: list.data.actionToBeTaken,
                    actionCompletionDate: list.data.actionCompletionDate,
                  }}
                  btntext="Update"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BranchVisitDetailsEdit;
