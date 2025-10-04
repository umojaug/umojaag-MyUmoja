import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import BranchVisitDetailsForm from "./BranchVisitDetailsForm";

import { AiOutlinePlusCircle } from "react-icons/ai";

const BranchVisitDetailsAdd = ({ branchVisitId }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <button onClick={openModal} className="btn-success w-12 h-10">
        <AiOutlinePlusCircle size={24} />
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
                {/* <BranchVisitDetailsForm
                  closeModal={closeModal}
                  branchVisitId={id}
                  path="/branchVisitDetails/create"
                  defaultValues={{
                    // branchVisitId: branchVisitId,
                    // consequenceRating: list.data.consequenceRating,
                    // overallRating: list.data.overallRating,
                    // riskRatingLevel: list.data.riskRatingLevel,
                    // mitigationPlan: list.data.mitigationPlan,
                    // timeline: list.data.timeline,
                    // comment: list.data.comment,
                    // riskParameterCheck: list.data.riskParameterCheck,
                  }}
                /> */}

                {isOpen && branchVisitId && (
                  <BranchVisitDetailsForm
                    closeModal={closeModal}
                    branchVisitId={branchVisitId}
                    path="/branchVisitDetails/create"
                    defaultValues={{
                      branchVisitId: branchVisitId,
                      topicAssessed: "",
                      findings: "",
                      ratingGiven: "",
                      ownerAssigned: "",
                      actionToBeTaken: "",
                      actionCompletionDate: "",
                    }}
                    btntext="Save"
                  />
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default BranchVisitDetailsAdd;
