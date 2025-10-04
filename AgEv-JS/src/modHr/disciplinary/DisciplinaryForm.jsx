import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import moment from "moment";
import DatePicker from "../../components/DatePicker";
import { DataListFromDb, SelectFromOptions } from "../../components/SelectList";
import { selectOptions } from "../../data/selectOptions";
import TextArea from "../../components/TextArea";
import Input from "../../components/Input";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  letterType: yup.string().required("Required").max(50),
  issueDate: yup.date().required("Required"),
  title: yup.string().required("Required").max(50),
  particulars: yup.string().required("Required").max(4000),
});

function DisciplinaryForm({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) {
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { pinName, letterType, issueDate, title, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("letterType", formData.letterType);
    data.append("disciplinaryId", formData.disciplinaryId);
    data.append(
      "issueDate",
      moment.utc(formData.fromDate).local().format("YYYY-MM-DD")
    );
    data.append("title", formData.title);
    data.append("particulars", formData.particulars);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
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
      <input type="hidden" {...register("disciplinaryLetterId")} />
      <div className="form-col">
        <DataListFromDb
          register={register}
          label="Employee"
          path="/employees/select"
          name="pinName"
          errorMessage={pinName?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.letterType}
          label="Letter Type"
          name="letterType"
          errorMessage={letterType?.message}
        />
        <Controller
          control={control}
          name="issueDate"
          render={({ field }) => (
            <DatePicker
              label="Issue Date"
              field={field}
              errorMessage={issueDate?.message}
              isRow={false}
            />
          )}
        />
        <Input
          name="title"
          label="Subject"
          type="text"
          register={register}
          errorMessage={title?.message}
        />
        <TextArea
          name="particulars"
          label="Particulars"
          control={control}
          errorMessage={particulars?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
}

export default DisciplinaryForm;
