import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import TextArea from "../../../components/TextArea";
import SaveButton from "../../../components/button/SaveButton";
import { selectOptions } from "../../../data/selectOptions";
import { useState } from "react";

const schema = yup.object({
  feedbackType: yup.string().required("Required.").max(50),
  departmentId: yup.string().required("Required.").max(50),
  particulars: yup.string().required("Required.").max(4000),
  allowAnonymous: yup.string().required("Required.").max(50),
});

const MyFeedbackForm = ({
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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { feedbackType, departmentId, particulars, category, allowAnonymous } =
    errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
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

  const feedbackCategory = watch("feedbackType", defaultValues.feedbackType);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={selectOptions.feedbackType}
          label="Feedback Type"
          name="feedbackType"
          errorMessage={feedbackType?.message}
        />
        {/* <SelectFromDb
          control={control}
          label="My feedback Category"
          path={`/FeedbackCat/select/${
            feedbackCategory === "" ? "" : feedbackCategory
          }`}
          name="category"
          errorMessage={category?.message}
        /> */}
        <SelectFromDb
          control={control}
          label="My feedback Category"
          path={`/feedbackCat/select/${feedbackCategory}`}
          name="category"
          errorMessage={category?.message}
        />
        <SelectFromDb
          control={control}
          label="My feedback is for the following Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Allow Anonymous"
          name="allowAnonymous"
          errorMessage={allowAnonymous?.message}
        />
        <TextArea
          name="particulars"
          label="Particulars"
          control={control}
          errorMessage={particulars?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default MyFeedbackForm;
