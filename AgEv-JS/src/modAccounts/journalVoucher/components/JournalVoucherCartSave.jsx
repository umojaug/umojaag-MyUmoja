import React, { useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import { useForm } from "react-hook-form";

const JournalVoucherCartSave = ({ journals, balance, emptyCart }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/accountGl/journalCreate",
        formData: journals,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        emptyCart();
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
    }
  };

  return (
    journals.length > 0 &&
    balance === 0 && (
      <div className="my-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SaveButton btnText="Save" disabled={submitting} />
        </form>
      </div>
    )
  );
};

export default JournalVoucherCartSave;
