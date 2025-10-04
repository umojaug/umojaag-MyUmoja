import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/button/SaveButton";

const schema = yup.object({
  othersBillId: yup.string().max(50),
  travelId: yup.string().required("Required").max(50),

  daAllowance: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  hotelRent: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  miscellaneous: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const OthersBillForm = ({
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
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { daAllowance, hotelRent, miscellaneous } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();

    data.append("othersBillId", defaultValues.othersBillId);
    data.append("travelId", defaultValues.travelId);
    data.append("daAllowance", formData.daAllowance);
    data.append("hotelRent", formData.hotelRent);
    data.append("miscellaneous", formData.miscellaneous);

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
      <input type="hidden" {...register("othersBillId")} />

      <div className="form-col">
        <Input
          name="daAllowance"
          label="DA/Monitoring allowance"
          type="number"
          register={register}
          errorMessage={daAllowance?.message}
        />

        <Input
          name="hotelRent"
          label="Accommodation Cost"
          type="number"
          register={register}
          errorMessage={hotelRent?.message}
        />

        <Input
          name="miscellaneous"
          label="Miscellaneous"
          type="number"
          register={register}
          errorMessage={miscellaneous?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default OthersBillForm;
