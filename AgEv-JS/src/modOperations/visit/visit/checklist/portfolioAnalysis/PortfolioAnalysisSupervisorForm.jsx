import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../../../components/button/SaveButton";
import Label from "../../../../../components/Label";
import TextArea from "../../../../../components/TextArea";

const schema = yup.object({
  allAnalysisId: yup.string(),
  supervisorComments: yup.string().required("Required.").max(500),
  supervisorRemarks: yup.string().required("Required.").max(500),
});

const PortfolioAnalysisSupervisorForm = ({
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
    // reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { supervisorComments, supervisorRemarks } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });

      // if (status === 201) {
      //   toast.success("Saved successfully!");
      //   reset();
      // }
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
      <input type="hidden" {...register("allAnalysisId")} />
      <Label
        label="No of Borrower MicroLoan"
        value={defaultValues.borrowerMicroLoan}
      />
      <Label label="No of Borrower SBL" value={defaultValues.borrowerSbl} />
      <Label label="No of Borrower Total" value={defaultValues.borrowerTotal} />
      <Label
        label="Loan outstanding with interest MicroLoan"
        value={defaultValues.loiMicroLoan}
      />
      <Label
        label="Loan outstanding with interest Sbl"
        value={defaultValues.loiSbl}
      />
      <Label
        label="Loan outstanding with interest Total"
        value={defaultValues.loiTotal}
      />
      <Label label="Borrower Target" value={defaultValues.borrowerTarget} />
      <Label
        label="Shortage no of borrower"
        value={defaultValues.shortageNoOfBorrower}
      />
      <Label label="Overdue No" value={defaultValues.overdueNo} />
      <Label label="Overdue Amount" value={defaultValues.overdueAmount} />
      <Label
        label="Overdue Increase/Decrease No"
        value={defaultValues.overdueInDeNo}
      />
      <Label
        label="Overdue Increase/Decrease Amount"
        value={defaultValues.overdueInDeAmount}
      />
      <Label label="Comments of BM" value={defaultValues.bmComments} />
      <div className="form-col">
        <TextArea
          control={control}
          name="supervisorComments"
          label="Follow up comments by the supervisor"
          areaHeight="h-14"
          errorMessage={supervisorComments?.message}
          isAutoFocus={true}
        />
        <TextArea
          control={control}
          name="supervisorRemarks"
          label="Remarks by the supervisor"
          areaHeight="h-14"
          errorMessage={supervisorRemarks?.message}
          isAutoFocus={true}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default PortfolioAnalysisSupervisorForm;
