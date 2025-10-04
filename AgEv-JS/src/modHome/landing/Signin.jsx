import React from "react";
import { useState } from "react";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonPassword from "../../components/ButtonPassword";
import { useGlobalContext } from "../../hooks/context";
import { LuLogIn } from "react-icons/lu";
//import jwt_decode from "jwt-decode";

const schema = yup.object().shape({
  phoneNumber: yup.string().max(20).required("Required"),
  password: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "Password is too short, at least 8 characters"),
});

const Signin = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const value = useGlobalContext();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "25",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { phoneNumber, password } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/login",
        formData: formData,
      });

      if (
        status === 200 &&
        data.result.isSuccess === true &&
        !data.isProduction
      ) {
        reset();
        //var decoded = jwt_decode(data.accessToken);
        console.log("Login response:", data.result);
        value.setUser(data.result.accessToken);
        value.setRole(data.result.role);
        value.setModules(data.result.modules);
        value.setMenus(data.result.menus);
        value.setSubmenus(data.result.subMenus);
        value.setCompany(data.result.company);

        // navigate(from);
        navigate(
          data.result.role === "Grapes Admin" ? "/grapes" : "/dashboard"
        );
      } else if (status === 200 && data.isProduction) {
        sessionStorage.setItem("barcodeImageUrl", data.result.barcodeImageUrl);
        sessionStorage.setItem("setupCode", data.result.setupCode);

        toast.success(
          "Enter the 6-digit code from your authenticator app to continue."
        );

        setTimeout(() => {
          navigate("/verify-2fa", {
            state: {
              phoneNumber: data.result.phoneNumber,
              userUniqueKey: data.result.userUniqueKey,
              password: data.result.password,
            },
          });
        }, 300);
      } else {
        toast.error(data.result.message);
      }
    } catch (error) {
      if (error.response.data === "Password Expired") {
        localStorage.setItem("phoneNumber", formData.phoneNumber);
        navigate("/reset-password");
      }
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
    <div className="mt-0 text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Phone number with country code"
            {...register("phoneNumber")}
            autoFocus={true}
          />
          {phoneNumber && (
            <div className="text-danger">{phoneNumber.message}</div>
          )}
        </div>
        <div className="mb-3">
          <ButtonPassword control={control} />
          {password && <div className="text-danger">{password.message}</div>}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            className="w-full btn-umojayellow"
            type="submit"
            disabled={submitting}
          >
            Log in <LuLogIn size={20} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
