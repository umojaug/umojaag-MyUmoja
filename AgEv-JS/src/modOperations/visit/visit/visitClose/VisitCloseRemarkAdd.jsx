import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import SaveButton from "../../../../components/button/SaveButton";

const schema = yup.object({
  allVisitId: yup.string().max(50),
  closeRemarks: yup.string().max(50).required("Required"),
});

const VisitCloseRemark = ({ allVisitId, action, returnPath }) => {
  // const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const { mutateAsync, reset } = usePostData();

  // const { allVisitId } = item;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { closeRemarks: "" },
    resolver: yupResolver(schema),
  });
  const { closeRemarks } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("allVisitId", allVisitId);
    data.append("closeRemarks", formData.closeRemarks);

    try {
      const { status } = await mutateAsync({
        path: `/allVisit/visitClose`,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        // navigate(returnPath);
      }
      if (status === 204) {
        toast.success("Visit Closed Successfully!");
        // navigate(returnPath);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("allVisitId")} />
        <div className="pb-4">
          <h4 className="text-2xl">Are you sure for close the visit? </h4>
          <p className="text-base">
            Before close visit, check all branch manager comments , supervisor
            comments and remarks.
          </p>
        </div>

        <div className="form-col">
          <TextArea
            control={control}
            name="closeRemarks"
            label="Please Write a Reason"
            errorMessage={closeRemarks?.message}
          />
          {/* )} */}
        </div>

        <div className="from-cols mt-4">
          <SaveButton btnText="Submit" disabled={submitting} />
        </div>
      </form>
    </>
  );
};

export default VisitCloseRemark;
