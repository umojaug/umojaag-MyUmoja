import React, { useState } from "react";
import { useGlobalContext } from "../../hooks/context";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonPassword from "../../components/ButtonPassword";
import TopHeader from "../../components/TopHeader";
import SaveButton from "../../components/button/SaveButton";

const schema = yup.object({
  password: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "Password is too short, at least 8 characters"),
});

const MyPasswordReset = ({ defaultValues, path }) => {
  const value = useGlobalContext();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { password } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/userprofile/reset",
        formData: formData,
      });
      if (status === 204) {
        toast.success("Successfully Reseted! Please login again");
        value.signOut();
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
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Reset Your Password" />

      <h3 className="mb-3">
        Strong passwords include numbers, Letters and punctuation marks.
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <h6>Enter new password</h6>
          <ButtonPassword control={control} />
          {password && <div className="text-danger">{password.message}</div>}
        </div>
        <div className="from-cols mt-4">
          <SaveButton btnText="Reset" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default MyPasswordReset;
