import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { usePostData } from "../../../hooks/dataApi";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  remarksId: yup.string(),
  particulars: yup.string().required("Required").max(4000),
});

function RemarksForm({
  defaultValues,
  action,
  btnText,
  // isEdit,
  path,
  returnPath,
}) {
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    // control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { particulars } = errors;

  const onSubmit = async (formData) => {
    // if (!imageUrl || imageUrl === "1vyhSgRVvN5Y7FaTX2HBLGse7i2BmkDN6") {
    //   toast.error("Image Not uploaded");
    //   return;
    // }
    setSubmitting(true);
    var data = new FormData();
    data.append("remarksId", formData.remarksId);
    data.append("particulars", formData.particulars);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        navigate(returnPath);
      }
      if (status === 204) {
        toast.success("Update successful!");
        navigate(returnPath);
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("remarksId")} />

      <div className="">
        <Input
          name="particulars"
          label="Reason"
          type="text"
          register={register}
          errorMessage={particulars?.message}
        />
      </div>

      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
}

export default RemarksForm;
