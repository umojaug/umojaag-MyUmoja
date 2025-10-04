import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import Input from "../../../../components/Input";
import SaveButton from "../../../../components/button/SaveButton";


const schema = yup.object({
  travelBillId: yup.string().max(50),
  travelId: yup.string().required("Required").max(50),
  startFrom: yup.string().required("Required").max(50),
  endTo: yup.string().required("Required").max(50),
  taxi: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  bus: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  train: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  motorcycle: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  others: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const BillDetailsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [submitting, setSubmitting] = useState(false);

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { startFrom, endTo, bus, train, taxi, motorcycle, others } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();

    data.append("travelId", id);
    data.append("travelBillId", formData.travelBillId);
    data.append("startFrom", formData.startFrom);
    data.append("endTo", formData.endTo);
    data.append("bus", formData.bus);
    data.append("train", formData.train);
    data.append("taxi", formData.taxi);
    data.append("others", formData.others);
    data.append("motorcycle", formData.motorcycle);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");

        reset();
        navigate(returnPath);
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
      <input type="hidden" {...register("travelId")} />

      <div className="form-col">
        <Input
          name="startFrom"
          label="From"
          type="text"
          register={register}
          errorMessage={startFrom?.message}
        />

        <Input
          name="endTo"
          label="To"
          type="text"
          register={register}
          errorMessage={endTo?.message}
        />

        <Input
          name="bus"
          label="Bus"
          type="number"
          register={register}
          errorMessage={bus?.message}
        />

        <Input
          name="taxi"
          label="Taxi"
          type="number"
          register={register}
          errorMessage={taxi?.message}
        />

        <Input
          name="train"
          label="Train"
          type="number"
          register={register}
          errorMessage={train?.message}
        />

        <Input
          name="motorcycle"
          label="Motorcycle"
          type="number"
          register={register}
          errorMessage={motorcycle?.message}
        />

        <Input
          name="others"
          label="Others"
          type="number"
          register={register}
          errorMessage={others?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BillDetailsForm;
