import {
  Dialog,
  DialogBackdrop,
  Transition,
  DialogPanel,
} from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SelectFromDb } from "../SelectList";
import { AiOutlineCheck } from "react-icons/ai";

const schema = yup.object({
  bankId: yup.string().required("Required"),
});
const ReceivedSelectButton = ({ path, action }) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { bankId } = errors;
  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("bankId", formData.bankId);
    try {
      const { status } = await mutateAsync({ path: path, formData: data });
      if (status === 204) {
        reset({
          bankId: "",
        });
        toast.success("Successfully Received!");
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
      setSubmitting(false);
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
        className="btn-success w-12 h-10"
        onClick={() => {
          openModal();
        }}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Accept"
      >
        <AiOutlineCheck size={24} />
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
                  Are you sure you want to Received?
                </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-col">
                    <SelectFromDb
                      control={control}
                      label="Select Bank"
                      path="/acLedger/SelectByBankCash"
                      name="bankId"
                      errorMessage={bankId}
                    />
                  </div>
                  <div className="flex space-x-2 mt-4 justify-center">
                    <button className="w-24 btn-danger" disabled={submitting}>
                      Yes
                    </button>
                    <button
                      type="button"
                      className="w-24 btn-success"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReceivedSelectButton;
