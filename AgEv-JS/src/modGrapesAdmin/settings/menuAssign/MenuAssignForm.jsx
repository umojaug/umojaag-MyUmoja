import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromDb } from "../../../components/SelectList";
import { Select2FromDb } from "../../../components/Select2FromDB";

const schema = yup.object({
  userId: yup.string().required("Required."),
  menuId: yup.number().required("Required."),
});

const MenuAssignForm = ({ defaultValues, action, btnText, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    // register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { userId, menuId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-col">
        <Select2FromDb
          control={control}
          name="userId"
          label="Select User"
          path="/usercreate/select"
          errorMessage={userId?.message}
          isAutoFocus={true}
        />
        <Select2FromDb
          control={control}
          name="menuId"
          label="Select menu"
          path="/adMenu/select"
          errorMessage={menuId?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default MenuAssignForm;
