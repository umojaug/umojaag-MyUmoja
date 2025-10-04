import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  id: yup.string().max(50).required("Required"),
  otp: yup.string().max(6).min(6).required("Required"),
  newPassword: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "Password is too short, at least 8 characters"),
  confirmPassword: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "Password is too short, at least 8 characters")
    .oneOf([yup.ref("newPassword"), null], "Password must match"),
});

export default function ResetPassword() {
  let { id } = useParams();

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
      id: id,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/resetpassword",
        formData: formData,
      });
      if (status === 200) {
        // action();
        reset();
        navigate("/");
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
        <p className="uppercase tracking-loose">May the force be with you!</p>
        <h1 className="font-bold text-2xl lg:text-4xl my-4 text-umojayellow">
          Want to reset password?
        </h1>
        <div className="mt-0 text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <div className="px-0 pt-2 pb-0 mb-4 flex flex-col">
              <div className="mb-2">
                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  {...register("otp")}
                />
                {errors.otp ? <div>{errors.otp.message}</div> : null}
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New password"
                  {...register("newPassword")}
                />
                {errors.newPassword ? (
                  <div>{errors.newPassword.message}</div>
                ) : null}
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword ? (
                  <div>{errors.confirmPassword.message}</div>
                ) : null}
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="w-full btn-umojayellow"
                  type="submit"
                  disabled={submitting}
                >
                  Set New Password
                </button>
              </div>
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
