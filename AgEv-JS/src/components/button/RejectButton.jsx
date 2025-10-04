import React, { useState } from "react";
import { useDeleteData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import DialogBody from "./DialogBody";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import TextArea from "../TextArea";

const RejectButton = ({ path, action }) => {
  const { mutateAsync } = useDeleteData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("Successfully Approved!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      closeModal();
      action();
    }
  };

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
        className="btn-danger w-full h-full"
        onClick={() => {
          openModal();
        }}
      >
        Reject
      </button>

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
                  {/* {bodyText} */}
                </h3>

                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                {/* <input type="hidden" {...register("evaluationId")} /> */}
                <div className="px-0 pt-2 pb-0 mb-4 grid gap-2">
                  <h3 className="text-xl text-gray-800 text-center font-medium">
                    Are you sure you want to reject? This item will be reject
                    immediately. You can't undo this action.
                  </h3>
                  <TextArea
                    control={control}
                    name="rejectRemarks"
                    label="Please Write Reject Remarks"
                    // errorMessage={rejectRemarks?.message}
                    isAutoFocus={true}
                  />
                  <div className="flex items-center justify-center">
                    <button
                      className="w-full btn-danger"
                      type="submit"
                      // disabled={submitting}
                    >
                      Reject
                    </button>
                  </div>
                </div>
                {/* </form> */}
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
    </>
  );
};

export default RejectButton;
