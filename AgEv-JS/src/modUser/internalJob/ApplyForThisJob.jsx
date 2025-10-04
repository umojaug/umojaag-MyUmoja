import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import Input from "../../components/Input";
import InputFile from "../../components/InputFile";

const schema = yup
  .object({
    jobId: yup.string(),
    fullName: yup.string().required("Required."),
    email: yup.string().required("Required."),
    phone: yup.string(),
  })
  .shape({
    fileUrl: yup
      .mixed()
      .required()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
  });

const ApplyForThisJob = ({ jobId, companyId }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const [file, setFile] = useState("");

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fullName, email, phone, fileUrl } = errors;

  const onSubmit = async (formData) => {
    var data = new FormData();
    data.append("jobId", jobId);
    data.append("companyId", companyId);
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("file", file);

    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/Jobs/ApplyJob",
        formData: data,
      });
      if (status === 201) {
        toast.success("Thank you for your application!");
        reset();
        setFile("");
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
      // action={() => {}},
      setSubmitting(false);
    }
  };
  return (
    <div className=" p-8 m-8 rounded-md shadow-lg border-2 border-umojayellow">
      <h3 className="text-2xl font-bold text-primary mb-4">
        Apply for this Job
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="fullName"
          label="Name"
          type="text"
          register={register}
          errorMessage={fullName?.message}
          isAutoFocus={true}
          showPlaceHolder={true}
          fromControl="form-controlNoBorder"
        />
        <Input
          name="phone"
          label="Phone"
          type="phone"
          register={register}
          errorMessage={phone?.message}
          showPlaceHolder={true}
          fromControl="form-controlNoBorder"
        />
        <Input
          name="email"
          label="Email"
          type="email"
          register={register}
          errorMessage={email?.message}
          showPlaceHolder={true}
          fromControl="form-controlNoBorder"
        />
        <div className="mt-6">
          <InputFile
            name="fileUrl"
            label="UPLOAD CV"
            register={register}
            action={setFile}
            errorMessage={fileUrl?.message}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 px-6 py-3 border w-full border-umojablue text-umojablue rounded hover:bg-blue-800 hover:text-white cursor-pointer "
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyForThisJob;
