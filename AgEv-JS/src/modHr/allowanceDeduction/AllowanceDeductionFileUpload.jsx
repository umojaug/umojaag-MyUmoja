import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { usePostData } from "../../hooks/dataApi";
import TopHeader from "../../components/TopHeader";
import PrintHeader from "../../components/PrintHeader";
import SaveButton from "../../components/button/SaveButton";
import InputFile from "../../components/InputFile";

const AllowanceDeductionFileUpload = () => {
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
        path: "/allowanceDeductions/empAllDed/upload",
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
      BranchName: "Bugiri Branch",
      EmployeePin: "UMJ001",
      EmployeeName: "Namaganda Lydia",
      AllowanceDeductionName: "Sacco Loan Re-Payment Deduction",
      Amount: "209090",
      Particulars: "",
    },
    {
      BranchName: "Head Office",
      EmployeePin: "UMJ006",
      EmployeeName: "Komugisha Grace",
      AllowanceDeductionName: "Sacco Loan Re-Payment Deduction",
      Amount: "1034992",
      Particulars: "",
    },
  ];

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between">
        <TopHeader title="Allowance Deduction File Upload" />
        <div className="flex items-center">
          <p>See Demo from here</p>
          <PrintHeader
            fileName="empAllDedTmpDemo.csv"
            data={demoData}
          />
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

export default AllowanceDeductionFileUpload;
