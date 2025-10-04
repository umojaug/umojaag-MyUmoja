import React from "react";
import { useState } from "react";
import { usePostData } from "../../hooks/dataApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGlobalContext } from "../../hooks/context";
import { GoCopy } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";

const schema = yup.object().shape({
  codeDigit: yup
    .string()
    .matches(/^\d+$/, "Only numbers are allowed")
    .max(6, "Please enter a valid 6-digit code to proceed.")
    .required("Required"),
});

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

const AuthQRVerification = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const value = useGlobalContext();
  const location = useLocation();
  const barcodeImageUrl = sessionStorage.getItem("barcodeImageUrl");
  const setupCode = sessionStorage.getItem("setupCode");
  const phoneNumber = location.state?.phoneNumber;
  const password = location.state?.password;
  const userUniqueKey = location.state?.userUniqueKey;
  const existingPhoneNumber = getCookie("userPhoneNumber");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      codeDigit: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var sendData = new FormData();
    sendData.append("codeDigit", formData.codeDigit);
    sendData.append("userUniqueKey", userUniqueKey);
    sendData.append("phoneNumber", phoneNumber);
    sendData.append("password", password);
    try {
      const { status, data } = await mutateAsync({
        path: "/Auth/TwoFactorAuthenticate",
        formData: sendData,
      });

      if (status === 200 && data.isSuccess === true) {
        reset();
        //var decoded = jwt_decode(data.accessToken);
        value.setUser(data.accessToken);
        value.setRole(data.role);
        value.setModules(data.modules);
        value.setMenus(data.menus);
        value.setSubmenus(data.subMenus);

        if (!existingPhoneNumber || existingPhoneNumber !== phoneNumber) {
          document.cookie = `userPhoneNumber=${phoneNumber}; path=/; max-age=2592000; Secure; SameSite=Strict`;
        }
        // navigate(from);
        navigate(data.role === "Grapes Admin" ? "/grapes" : "/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard
      .writeText(setupCode)
      .then(() => {
        toast.success("Setup code copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy setup code to clipboard!");
      });
  };

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <main className="flex flex-1 justify-center p-4 items-center sm:p-6">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {!existingPhoneNumber || existingPhoneNumber !== phoneNumber ? (
              <div className="flex flex-col bg-blue-800 justify-center p-6 items-center sm:p-8">
                {barcodeImageUrl && setupCode && (
                  <>
                    <h2 className="text-lg text-white font-medium mb-4 sm:mb-6 sm:text-xl">
                      Scan QR Code
                    </h2>
                    <div className="bg-white p-2 rounded-lg shadow-lg mb-4 sm:mb-6 sm:p-3">
                      <img
                        src={barcodeImageUrl}
                        alt="QR Code"
                        className="h-48 rounded w-48 object-contain sm:h-56 sm:w-56"
                      />
                    </div>
                    <div className="text-center w-full">
                      <p className="text-base text-white mb-2 sm:text-lg">
                        Or enter this code:
                      </p>
                      <div className="flex justify-center">
                        <div className="group relative">
                          <div
                            className="flex bg-black/20 rounded-lg text-lg text-white break-all cursor-pointer font-bold items-center max-w-full overflow-x-auto px-4 py-2 sm:text-2xl tracking-wider"
                            onClick={() => copyCodeToClipboard()}
                          >
                            <span>{setupCode}</span>
                            <button
                              className="p-1 rounded focus:outline-none focus:ring-1 focus:ring-white hover:bg-black/10 ml-2 transition-colors"
                              aria-label="Copy code"
                            >
                              <GoCopy />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-blue-800 hidden md:block">
                <div className="flex flex-col h-full justify-center p-8 items-center">
                  <div className="mb-6">
                    <div className="flex bg-white/20 h-20 justify-center rounded-full w-20 items-center">
                      <div className="flex bg-white/30 h-16 justify-center rounded-full w-16 items-center">
                        <div className="flex bg-white h-12 justify-center rounded-full w-12 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 text-blue-800 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-white text-xl font-bold mb-2">
                    Welcome Back!
                  </h2>
                  <p className="text-center text-white/80 mb-4">
                    We recognize this device
                  </p>
                  <div className="bg-white/40 h-1 rounded-full w-16 mb-4"></div>
                  <p className="text-center text-white/70">
                    Please check your
                    <br />
                    <span className="text-white font-semibold">
                      Google Authenticator
                    </span>{" "}
                    app
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <h2 className="text-blue-800 text-xl font-bold mb-4 sm:mb-6 sm:text-2xl">
                Verification
              </h2>
              <p className="text-gray-600 text-sm mb-4 sm:mb-6 sm:text-base">
                Please enter the 6-digit code to continue
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 sm:mb-6">
                  <label
                    className="text-gray-700 text-sm block mb-2 sm:text-base"
                    htmlFor="codeDigit"
                  >
                    Verification Code
                  </label>
                  <input
                    id="codeDigit"
                    type="number"
                    className="border border-gray-300 rounded-lg text-base w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-800 px-3 py-2 sm:px-4 sm:py-3 transition"
                    placeholder="Enter code"
                    {...register("codeDigit")}
                    autoFocus={true}
                    min={0}
                  />
                  {errors.codeDigit && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.codeDigit.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex bg-yellow-500 justify-center rounded-lg shadow-lg text-white w-full disabled:opacity-70 font-medium hover:bg-yellow-600 items-center py-2 sm:py-3 transition"
                >
                  {submitting ? (
                    <span className="inline-flex items-center">
                      <ImSpinner2 />
                      Verifying...
                    </span>
                  ) : (
                    "Verify"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthQRVerification;