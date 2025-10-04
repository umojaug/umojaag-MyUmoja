import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import Input from "../../../components/Input";
import InputFile from "../../../components/InputFile";
import DatePicker from "../../../components/DatePicker";
import moment from "moment";
import Label from "../../../components/Label";
import { SelectFromOptions } from "../../../components/SelectList";

const schema = yup.object({
  likelihoodRating: yup.string().required("Required"),
  consequenceRating: yup.string().required("Required"),
  comment: yup.string().required("Required"),
  mitigationPlan: yup.string(),
  timeline: yup.date().required("Required"),
});

const RiskRegisterDetailsFrom = ({
  defaultValues,
  closeModal,
  riskRegisterDetailsId,
  path,
}) => {
  const { mutateAsync } = usePostData();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
    likelihoodRating,
    consequenceRating,
    comment,
    mitigationPlan,
    timeline,
  } = errors;

  const likelihood = useWatch({ control, name: "likelihoodRating" });
  const consequence = useWatch({ control, name: "consequenceRating" });

  const getValue = (val) => {
    if (val === "N/A") return "N/A";
    return parseInt(val?.split(" - ")[0]) || 0;
  };

  const l = getValue(likelihood);
  const c = getValue(consequence);
  
  // Check if either rating is N/A
  const isNASelected = l === "N/A" || c === "N/A";
  const score = isNASelected ? "N/A" : l * c;

  const getLabel = (score) => {
    if (score === "N/A") return "N/A";
    if (score >= 16) return "Critical";
    if (score >= 11) return "High";
    if (score >= 5) return "Medium";
    if (score >= 1) return "Low";
    return "Not Rated";
  };

  const ratingLabel = getLabel(score);

  const onSubmit = async (formData) => {
    setSubmitting(true);
    const l = getValue(formData.likelihoodRating);
    const c = getValue(formData.consequenceRating);
    const isNASelected = l === "N/A" || c === "N/A";
    const score = isNASelected ? "N/A" : l * c;
    const label = getLabel(score);
    var data = new FormData();

    data.append("riskRegisterDetailsId", riskRegisterDetailsId);
    data.append("likelihoodRating", formData.likelihoodRating);
    data.append("consequenceRating", formData.consequenceRating);
    data.append("overallRating", label);
    data.append("riskRatingLevel", label);
    data.append("file", file);
    data.append("comment", formData.comment);
    data.append("mitigationPlan", formData.mitigationPlan);
    data.append(
      "timeline",
      moment.utc(formData.timeline).local().format("YYYY-MM-DD")
    );
    // data.append("riskParameterCheck", formData.riskParameterCheck);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        closeModal();
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
        closeModal();
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
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <SelectFromOptions
            register={register}
            options={[
              "5 - Almost certain",
              "4 - Likely",
              "3 - Probable",
              "2 - Unlikely",
              "1 - Rare",
              "N/A",
            ]}
            label="Likelihood Rating"
            name="likelihoodRating"
            errorMessage={likelihoodRating?.message}
          />

          <SelectFromOptions
            register={register}
            options={[
              "1 - Insignificant",
              "2 - Minor",
              "3 - Moderate",
              "4 - Major",
              "5 - Catastrophic",
              "N/A",
            ]}
            label="Consequence Rating"
            name="consequenceRating"
            errorMessage={consequenceRating?.message}
          />

          <Label
            label="Overall Risk Rating"
            value={score === "N/A" ? "N/A" : `${score} - ${ratingLabel}`}
          />

          <Label
            label="Risk Rating Level"
            value={score === "N/A" ? "N/A" : `${score} - ${ratingLabel}`}
          />

          <InputFile
            name="file"
            register={register}
            action={setFile}
            errorMessage={file?.message}
          />
          {/* <div className="text-xs ml-2">
            {defaultValues.fileUrl !== "" ? (
              <a href={defaultValues.fileUrl} className="btn-success w-12 h-10">
                <AiOutlineFile size={24} />
              </a>
            ) : (
              <></>
            )}
          </div> */}
          <Input
            name="comment"
            label="Comment"
            type="text"
            register={register}
            errorMessage={comment?.message}
          />
          <Input
            name="mitigationPlan"
            label="Mitigation Plan"
            type="text"
            register={register}
            errorMessage={mitigationPlan?.message}
          />
          <Controller
            control={control}
            name="timeline"
            render={({ field }) => (
              <DatePicker
                label="Timeline"
                field={field}
                errorMessage={timeline?.message}
                isRow={false}
              />
            )}
          />
          {/* <TextArea
            control={control}
            name="riskParameterCheck"
            label="Risk Parameter Check"
            type="text"
            errorMessage={riskParameterCheck?.message}
          /> */}
          <div className="flex justify-end mt-2">
            <button
              disabled={submitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiskRegisterDetailsFrom;