import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import TextArea from "../../../components/TextArea";


const schema = yup.object({
  reportId: yup.string().max(50),
  note: yup.string().required("Required.").max(2500),
});

const NoteAdd = ({ reportId, action }) => {
  const defaultValues = {
    reportId: reportId,
    note: "",
  };

  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { note } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("reportId", formData.reportId);
    data.append("note", formData.note);
    try {
      const { status } = await mutateAsync({
        path: "/SupervisorComments/create",
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
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
      action();
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-200 my-3 p-2 rounded-lg"
    >
      <input type="hidden" {...register("reportId")} />
      <div className="grid px-2 gap-1">
        <TextArea
          control={control}
          name="note"
          label="Add Follow Up Note"
          errorMessage={note?.message}
        />

        <div className="w-1/5 grid content-center place-self-end bg-blue-200">
          <button
            type="submit"
            className="btn-umojayellow w-full"
            disabled={submitting}
          >
            Add note
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteAdd;
