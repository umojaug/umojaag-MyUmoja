import { useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";
import TextArea from "../TextArea";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DialogBody from "./DialogBody";

const schema = yup.object({
  // remarks: yup.string().required("Required."),
});

const RejectRemarkButton = ({ path, action, noted }) => {
  const [remarksError, setRemarksError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  // const { remarks } = errors;
  const onSubmit = async (formData) => {
    if (noted && !formData.remarks) {
      setRemarksError("Remarks is required.");
      return;
    }
    try {
      setSubmitting(true);
      if (noted) {
        var data = new FormData();
        data.append("remarks", formData.remarks);
        const { status } = await mutateAsync({ path, formData: data });
        if (status === 204) {
          toast.success("Successfully Rejected!");
        }
      } else {
        const { status } = await mutateAsync({ path });
        if (status === 204) {
          toast.success("Successfully Rejected!");
        }
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
      setSubmitting(false);
      setRemarksError("");
      action();
      closeModal();
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
        className="btn-danger w-12 h-10"
        onClick={openModal}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Accept"
      >
        <AiOutlineCloseCircle size={24} />
      </button>
      {noted ? (
        <>
          <Transition appear show={isOpen}>
            <Dialog onClose={closeModal} className="relative z-50">
              <DialogBackdrop className="fixed inset-0 bg-black/60" />
              <div className="fixed inset-0 w-screen overflow-y-auto p-4">
                <div className="flex min-h-full items-center justify-center">
                  <DialogPanel className="w-full max-w-sm md:max-w-xl space-y-4 border bg-white p-12 rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <TextArea
                        control={control}
                        name="remarks"
                        label="Please Write Reject Remarks"
                        isAutoFocus={true}
                        errorMessage={remarksError}
                      />

                      <div className="flex space-x-2 justify-center pt-4">
                        <button
                          className="w-full btn-danger"
                          type="submit"
                          disabled={submitting}
                        >
                          Reject
                        </button>
                      </div>
                    </form>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <>
          <DialogBody
            closeModal={closeModal}
            isOpen={isOpen}
            onSubmit={onSubmit}
            bodyText="Are you sure you want to Reject?"
          />
        </>
      )}
    </>
  );
};

export default RejectRemarkButton;
