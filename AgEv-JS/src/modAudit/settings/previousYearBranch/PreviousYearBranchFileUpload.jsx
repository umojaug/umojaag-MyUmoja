import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { usePostData } from "../../../hooks/dataApi";
import TopHeader from "../../../components/TopHeader";
import PrintHeader from "../../../components/PrintHeader";
import SaveButton from "../../../components/button/SaveButton";
import InputFile from "../../../components/InputFile";

const PreviousYearBranchFileUpload = () => {
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    // control,
    reset,
  } = useForm({});

  const onSubmit = async () => {
    setSubmitting(true);

    var data = new FormData();

    data.append("file", file);

    try {
      const { status } = await mutateAsync({
        path: "/previousYear/file/Upload",
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

  const data = [
    {
      YearName: "2024",
      AuName: "Bugiri",
      PortfolioValue: "100",
      Par: "209090",
      NumOfBorrower: "10",
    },
    {
      YearName: "2023",
      AuName: "Bugiri",
      PortfolioValue: "100",
      Par: "209090",
      NumOfBorrower: "10",
    },
  ];

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="File Upload"
        btn="Return"
        path="/audit/settings/previousdata/list"
      />
      <div className="flex justify-end">
        <div className="flex items-center">
          <p>See Demo from here</p>
          <PrintHeader title="" fileName="previusyearbranch.csv" data={data} />
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

export default PreviousYearBranchFileUpload;
