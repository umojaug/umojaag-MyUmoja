import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import SaveButton from "../../../../components/button/SaveButton";
import { SelectFromOptionsWithKey } from "../../../../components/SelectList";
import { selectOptions } from "../../../../data/selectOptions";
import Reject from "../../components/Reject";
import TopHeader from "../../../../components/TopHeader";

const schema = yup.object({
  evaObjectivesId: yup.string().max(50),
  managerCommentOne: yup.string().required("Required.").max(2500),
  ratingOne: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  managerCommentTwo: yup.string().required("Required.").max(2500),
  ratingTwo: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  managerCommentThree: yup.string().required("Required.").max(2500),
  ratingThree: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  managerCommentFour: yup.string().required("Required.").max(2500),
  ratingFour: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const ObjectivesList = ({ defaultValues, action }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evaObjectivesId: defaultValues.evaObjectivesId,
      objectiveDetailsOne: defaultValues.objectiveDetailsOne,
      employeeCommentOne: defaultValues.employeeCommentOne,
      objectiveDetailsTwo: defaultValues.objectiveDetailsTwo,
      employeeCommentTwo: defaultValues.employeeCommentTwo,
      objectiveDetailsThree: defaultValues.objectiveDetailsThree,
      employeeCommentThree: defaultValues.employeeCommentThree,
      objectiveDetailsFour: defaultValues.objectiveDetailsFour,
      employeeCommentFour: defaultValues.employeeCommentFour,
      managerCommentOne: defaultValues.managerCommentOne,
      ratingOne: defaultValues.ratingOne,
      managerCommentTwo: defaultValues.managerCommentTwo,
      ratingTwo: defaultValues.ratingTwo,
      managerCommentThree: defaultValues.managerCommentThree,
      ratingThree: defaultValues.ratingThree,
      managerCommentFour: defaultValues.managerCommentFour,
      ratingFour: defaultValues.ratingFour,
    },
    resolver: yupResolver(schema),
  });
  const {
    managerCommentOne,
    ratingOne,
    managerCommentTwo,
    ratingTwo,
    managerCommentThree,
    ratingThree,
    managerCommentFour,
    ratingFour,
  } = errors;
  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaObjectivesId", formData.evaObjectivesId);
    data.append("managerCommentOne", formData.managerCommentOne);
    data.append("ratingOne", formData.ratingOne);
    data.append("managerCommentTwo", formData.managerCommentTwo);
    data.append("ratingTwo", formData.ratingTwo);
    data.append("managerCommentThree", formData.managerCommentThree);
    data.append("ratingThree", formData.ratingThree);
    data.append("managerCommentFour", formData.managerCommentFour);
    data.append("ratingFour", formData.ratingFour);
    try {
      const { status } = await mutateAsync({
        path: "/evaobjectives/updateapp",
        formData: data,
      });
      if (status === 204) {
        toast.success("Update successful!");
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
      action(2);
      setSubmitting(false);
    }
  };

  return (
    <div className="card w-full max-w-screen-xl gap-1">
      <TopHeader
        title="Performance Objectives"
        btn="Return"
        path="/evaluation/first/Review/list"
      />
      <p className="text-sm text-justify">
        In the section below you will see your team members objectives and their
        comments on how they have performed against each objective. Please read
        carefully through their comments. If they have not provided detailed
        comments or if they have missed any information please click the reject
        button and speak to your team member to guide them on how to rectify any
        issues. If they have completed it correctly please go ahead and add your
        feedback on their performance into the Manager comments boxes. When
        selecting your performance rating for each objective the meaning of each
        rating is as follows:
        <br />1 = requires development. This means the employee has regularly
        failed to meet their target, they are not performing at the level
        expected and they need performance improvement support and development.{" "}
        <br />2 = Good performance. This means the employee is meeting
        performance expectations. <br />3 = Consistently Strong Performance.
        This means that the employee is always meeting performance expectations
        and often exceeds expectations. <br />4 = Exceptional Performance. This
        means that the employee is always above and beyond expected performance
        levels. They are always meeting and exceeding their targets and going
        above and beyond what is needed. They go the extra mile every time.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaObjectivesId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Objective One
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
            <div className="grid grid-cols-1 place-items-start text-justify w-full">
              <h2 className="font-semibold">Objective Details</h2>
              <p className="text-sm">{defaultValues.objectiveDetailsOne}</p>
              <h2 className="font-semibold">Employee Comment</h2>
              <p className="text-sm">{defaultValues.employeeCommentOne}</p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="managerCommentOne"
                label=""
                errorMessage={managerCommentOne?.message}
                areaHeight="h-44"
                isAutoFocus={true}
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="ratingOne"
                errorMessage={ratingOne?.message}
              />
            </div>
          </div>

          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Objective Two
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
            <div className="grid grid-cols-1 place-items-start text-justify w-full">
              <h2 className="font-semibold">Objective Details</h2>
              <p className="text-sm">{defaultValues.objectiveDetailsTwo}</p>
              <h2 className="font-semibold">Employee Comment</h2>
              <p className="text-sm">{defaultValues.employeeCommentTwo}</p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="managerCommentTwo"
                label=""
                errorMessage={managerCommentTwo?.message}
                areaHeight="h-44"
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="ratingTwo"
                errorMessage={ratingTwo?.message}
              />
            </div>
          </div>
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Objective Three
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
            <div className="grid grid-cols-1 place-items-start text-justify w-full">
              <h2 className="font-semibold">Objective Details</h2>
              <p className="text-sm">{defaultValues.objectiveDetailsThree}</p>
              <h2 className="font-semibold">Employee Comment</h2>
              <p className="text-sm">{defaultValues.employeeCommentThree}</p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="managerCommentThree"
                label=""
                errorMessage={managerCommentThree?.message}
                areaHeight="h-44"
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="ratingThree"
                errorMessage={ratingThree?.message}
              />
            </div>
          </div>
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Objective Four
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
            <div className="grid grid-cols-1 place-items-start text-justify w-full">
              <h2 className="font-semibold">Objective Details</h2>
              <p className="text-sm">{defaultValues.objectiveDetailsFour}</p>
              <h2 className="font-semibold">Employee Comment</h2>
              <p className="text-sm">{defaultValues.employeeCommentFour}</p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="managerCommentFour"
                label=""
                errorMessage={managerCommentFour?.message}
                areaHeight="h-44"
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="ratingFour"
                errorMessage={ratingFour?.message}
              />
            </div>
          </div>

          <SaveButton btnText="Update & Next" disabled={submitting} />
        </div>
      </form>
      <Reject id={defaultValues.evaluationId} />
    </div>
  );
};

export default ObjectivesList;
