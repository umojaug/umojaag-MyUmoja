import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  phoneNumber: yup.string().max(20).required("Required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // phoneNumber: "8801765263343",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/forgetpassword",
        formData: formData,
      });
      if (status === 200 && data.isSuccess === true) {
        // action();
        reset();
        navigate("/reset-password/" + data.accessToken);
      } else {
        toast.error(data.message);
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
    <div className="max-w-full px-2 sm:px-8 lg:px-[120px] grid grid-cols-1 md:grid-cols-2">
      <div className="text-white grid">
        <p className="uppercase tracking-loose">
          Sorry that password won't work!
        </p>
        <h1 className="font-bold text-2xl lg:text-4xl my-4 text-umojayellow">
          Are you sure you forget your password?
        </h1>
        <p className="leading-normal mb-4 text-md break-words">
          Reset password in two quick steps
        </p>
        <div className="mt-0 text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Phone number with country code"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <div className="text-danger">{errors.phoneNumber.message}</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full btn-umojayellow"
                type="submit"
                disabled={submitting}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="grid place-content-center mt-2">
          <Link
            to="/"
            className="px-4 py-2 text-white rounded-lg hover:text-umojayellow tracking-wider cursor-pointer font-semibold text-sm"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
