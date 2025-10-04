import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromOptions } from "../../components/SelectList";
import { selectOptions } from "../../data/selectOptions";
import TopHeader from "../../components/TopHeader";

const schema = yup.object({
  empLeaveId: yup.number(),
  leaveStatus: yup.string().required("Required").max(50),
  comments: yup.string().required("Required").max(2500),
});

const LeaveComments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empLeaveId: id,
      leaveStatus: "",
      comments: "",
    },
    resolver: yupResolver(schema),
  });
  const { leaveStatus, comments } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/empleave/update",
        formData: formData,
      });
      if (status === 204) {
        toast.success("Update successful!");
        navigate("/hr/leave/recommended");
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
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Leave Application Status Update"
        btn="Return"
        path="/hr/leave/recommended"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("empLeaveId")} />
        <div className="form-col">
          <SelectFromOptions
            register={register}
            options={selectOptions.status}
            label="Status"
            name="leaveStatus"
            errorMessage={leaveStatus?.message}
          />
          <Input
            name="comments"
            label="Comments"
            type="text"
            register={register}
            errorMessage={comments?.message}
          />
        </div>
        <div className="from-cols mt-4">
          <SaveButton btnText="Update" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default LeaveComments;
