import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/button/SaveButton";
import { SelectFromDb } from "../../../../../components/SelectList";

const schema = yup.object({
  analysisId: yup.number(),
  allVisitId: yup.string(),
  employeeId: yup.string().required("Required."),
  borrowerSbl: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  borrowerMicroLoan: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  borrowerTotal: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),

  loiMicroLoan: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  loiSbl: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  loiTotal: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  borrowerTarget: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  shortageNoOfBorrower: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  overdueNo: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  overdueAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  overdueInDeNo: yup
    .number()
    //.min(0, "Must be greater than or equal to 0")
    .typeError("Number required"),
  overdueInDeAmount: yup
    .number()
    //.min(0, "Must be greater than or equal to 0")
    .typeError("Number required"),
});

const PortfolioAnalysisForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    employeeId,
    borrowerMicroLoan,
    borrowerSbl,
    loiMicroLoan,
    loiSbl,
    borrowerTarget,
    overdueNo,
    overdueAmount,
    overdueInDeNo,
    overdueInDeAmount,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("analysisId", formData.analysisId);
    data.append("allVisitId", defaultValues.allVisitId);
    data.append("employeeId", formData.employeeId);
    data.append("borrowerSbl", formData.borrowerSbl);
    data.append("borrowerMicroLoan", formData.borrowerMicroLoan);
    data.append(
      "borrowerTotal",
      parseInt(formData.borrowerSbl) + parseInt(formData.borrowerMicroLoan)
    );
    data.append("loiMicroLoan", formData.loiMicroLoan);
    data.append("loiSbl", formData.loiSbl);
    data.append(
      "loiTotal",
      parseInt(formData.loiMicroLoan) + parseInt(formData.loiSbl)
    );
    data.append("borrowerTarget", formData.borrowerTarget);
    parseInt(formData.borrowerSbl) + parseInt(formData.borrowerMicroLoan) >=
    parseInt(formData.borrowerTarget)
      ? data.append("shortageNoOfBorrower", 0)
      : data.append(
          "shortageNoOfBorrower",
          parseInt(formData.borrowerTarget) -
            (parseInt(formData.borrowerSbl) +
              parseInt(formData.borrowerMicroLoan))
        );
    data.append("overdueNo", formData.overdueNo);
    data.append("overdueAmount", formData.overdueAmount);
    data.append("overdueInDeNo", formData.overdueInDeNo);
    data.append("overdueInDeAmount", formData.overdueInDeAmount);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });

      if (status === 201) {
        toast.success("Saved successfully!");
        navigate(returnPath);
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
        navigate(returnPath);
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
      action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("analysisId")} />
      <input type="hidden" {...register("allVisitId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Select Loan Officer"
          path={`/allPortfolioAnalysis/select/${defaultValues.allVisitId}`}
          name="employeeId"
          errorMessage={employeeId?.message}
        />

        <Input
          name="borrowerMicroLoan"
          label="No of Borrower MicroLoan"
          type="text"
          register={register}
          errorMessage={borrowerMicroLoan?.message}
        />
        <Input
          name="borrowerSbl"
          label="No of Borrower SBL"
          type="text"
          register={register}
          errorMessage={borrowerSbl?.message}
        />
        {/* <Input
          name="borrowerTotal"
          label="No of Borrower Total"
          type="text"
          register={register}
          errorMessage={borrowerTotal?.message}
        /> */}

        <Input
          name="loiMicroLoan"
          label="Loan outstanding with interest MicroLoan"
          type="text"
          register={register}
          errorMessage={loiMicroLoan?.message}
        />

        <Input
          name="loiSbl"
          label="Loan outstanding with interest Sbl"
          type="text"
          register={register}
          errorMessage={loiSbl?.message}
        />
        {/* <Input
          name="loiTotal"
          label="Loan outstanding with interest Total"
          type="text"
          register={register}
          errorMessage={loiTotal?.message}
        /> */}
        <Input
          name="borrowerTarget"
          label="Borrower Target"
          type="text"
          register={register}
          errorMessage={borrowerTarget?.message}
        />
        {/* <Input
          name="shortageNoOfBorrower"
          label="Shortage no of borrower"
          type="text"
          register={register}
          errorMessage={shortageNoOfBorrower?.message}
        /> */}
        <Input
          name="overdueNo"
          label="Overdue No"
          type="text"
          register={register}
          errorMessage={overdueNo?.message}
        />
        <Input
          name="overdueAmount"
          label="Overdue Amount"
          type="text"
          register={register}
          errorMessage={overdueAmount?.message}
        />
        <Input
          name="overdueInDeNo"
          label="Overdue Increase/Decrease No"
          type="text"
          register={register}
          errorMessage={overdueInDeNo?.message}
        />
        <Input
          name="overdueInDeAmount"
          label="Overdue Increase/Decrease Amount"
          type="text"
          register={register}
          errorMessage={overdueInDeAmount?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default PortfolioAnalysisForm;
