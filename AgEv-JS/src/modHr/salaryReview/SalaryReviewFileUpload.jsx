import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { usePostData } from "../../hooks/dataApi";
import TopHeader from "../../components/TopHeader";
import PrintHeader from "../../components/PrintHeader";
import SaveButton from "../../components/button/SaveButton";
import InputFile from "../../components/InputFile";

const SalaryReviewFileUpload = () => {
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const { mutateAsync } = usePostData();
  const {
    handleSubmit,
    register,
    // control,
    reset,
  } = useForm({});

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();

    data.append("file", file);

    try {
      const { status } = await mutateAsync({
        path: "/salaryReview/upload",
        formData: data,
      });

      if (status === 201) {
        toast.success("Saved successfully!");
        setFile(null);
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
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

  const demoData = [
    {
      ReviewYear: 2025,
      BranchName: "Bugiri Branch",
      EmployeePin: "UMJ00413",
      EmployeeName: "Perinah Kyosiimire",
      Amount: "209090",
      Particulars: "",
    },
    {
      ReviewYear: 2025,
      BranchName: "Head Office",
      EmployeePin: "UMJ00089",
      EmployeeName: "Kwikiriza Anabela Namara",
      Amount: "1034992",
      Particulars: "",
    },
  ];

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between">
        <TopHeader title="Salary Review File Upload" />
        <div className="flex items-center">
          <p>See Demo from here</p>
          <PrintHeader fileName="salaryReviewDemo.csv" data={demoData} />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col-3">
          <InputFile
            name="file"
            register={register}
            action={setFile}
            errorMessage={file?.message}
          />
        </div>
        <div className="from-cols mt-4">
          <SaveButton btnText="Upload" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default SalaryReviewFileUpload;
