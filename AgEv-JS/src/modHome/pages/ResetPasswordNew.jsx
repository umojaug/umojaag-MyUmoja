import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const schema = yup.object().shape({
  phoneNumber: yup.string().max(50).required("Required"),
  oldPassword: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "Old Password is too short, at least 8 characters"),
  newPassword: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "New Password is too short, at least 8 characters"),
  confirmPassword: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "Confirm Password is too short, at least 8 characters")
    .oneOf([yup.ref("newPassword"), null], "Password must match"),
});

export default function ResetPasswordNew() {
  const savedPhoneNumber = localStorage.getItem("phoneNumber");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: savedPhoneNumber,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const togglePassword = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/resetpassword",
        formData: formData,
      });
      if (status === 200) {
        localStorage.removeItem("phoneNumber");
        toast.success(data.message);
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
        <p className="leading-normal mb-4 text-md break-words">
          A verification code has been sent to your phone
        </p>
        <div className="mt-0 text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("phoneNumber")} />
            <div className="px-0 pt-2 pb-0 mb-4 flex flex-col">
              <div className="flex justify-between form-control bg-white mb-2">
                <input
                  autoFocus
                  type={passwordVisibility.old ? 'text' : 'password'}
                  className="border-0 p-0 outline-none flex-grow"
                  placeholder="Enter Old Password"
                  {...register("oldPassword")}
                />
                {passwordVisibility.old ? (
                  <AiOutlineEyeInvisible onClick={() => togglePassword('old')} size={22} />
                ) : (
                  <AiOutlineEye onClick={() => togglePassword('old')} size={22} />
                )}
              </div>
              {errors.oldPassword ? <div>{errors.oldPassword.message}</div> : null}
              <div className="flex justify-between form-control bg-white mb-2">
                <input
                  type={passwordVisibility.new ? 'text' : 'password'}
                  className="border-0 p-0 outline-none flex-grow"
                  placeholder="New password"
                  {...register("newPassword")}
                />
                {passwordVisibility.new ? (
                  <AiOutlineEyeInvisible onClick={() => togglePassword('new')} size={22} />
                ) : (
                  <AiOutlineEye onClick={() => togglePassword('new')} size={22} />
                )}
              </div>
                {errors.newPassword ? (
                  <div>{errors.newPassword.message}</div>
                ) : null}
              <div className="flex justify-between form-control bg-white mb-2">
                <input
                  type={passwordVisibility.confirm ? 'text' : 'password'}
                  className="border-0 p-0 outline-none flex-grow"
                  placeholder="Confirm password"
                  {...register("confirmPassword")}
                />
                {passwordVisibility.confirm ? (
                  <AiOutlineEyeInvisible onClick={() => togglePassword('confirm')} size={22} />
                ) : (
                  <AiOutlineEye onClick={() => togglePassword('confirm')} size={22} />
                )}
              </div>
                {errors.confirmPassword ? (
                  <div>{errors.confirmPassword.message}</div>
                ) : null}

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
