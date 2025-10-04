/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { AiOutlineForm } from "react-icons/ai";
import AuditTrackerFraudModelFrom from "./AuditTrackerFraudModelFrom";

const AuditTrackerFraudModelEdit = ({ id }) => {
  let [isOpen, setIsOpen] = useState(false);
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", `/auditTrackerFraud/details/${id}`);

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
                <AuditTrackerFraudModelFrom
                  closeModal={closeModal}
                  defaultValues={{
                    reportId: list.data.reportId,
                    status: list.data.status,
                    comments: list.data.comments,
                  }}
                  titleText="Edit Fraud Tracker"
                  path="/auditTrackerFraud/Update"
                  returnPath="/audit/others/trackerissue/list"
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuditTrackerFraudModelEdit;
