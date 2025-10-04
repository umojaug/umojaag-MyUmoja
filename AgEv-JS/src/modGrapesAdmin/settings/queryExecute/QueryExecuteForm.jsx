import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import TextArea from "../../../components/TextArea";

const schema = yup.object({
  queryId: yup.string(),
  query: yup.string().required("Required"),
});

function QueryExecuteForm({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) {
  //   const { t } = useTranslation(["components"]);
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { query } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("queryId", formData.queryId);
    data.append("query", formData.query);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("SavedSuccessfully");
        reset();
        // navigate(returnPath);
      }
      if (status === 204) {
        toast.success("UpdateSuccessful");
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("queryId")} />
        <div className="form-col">
          <TextArea
            control={control}
            name="query"
            label="Write your Query"
            areaHeight="h-80"
            errorMessage={query?.message}
            isAutoFocus={true}
          />
        </div>
        <div className="from-cols mt-4">
          <SaveButton btnText={btnText} disabled={submitting} />
        </div>
      </form>
    </div>
  );
}

export default QueryExecuteForm;
