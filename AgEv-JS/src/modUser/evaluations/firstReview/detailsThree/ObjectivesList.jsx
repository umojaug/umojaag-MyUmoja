import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import SaveButton from "../../../../components/button/SaveButton";
// import { SelectFromOptionsWithKey } from "../../../../components/SelectList";
// import { selectOptions } from "../../../../data/selectOptions";
import Reject from "../../components/Reject";
import TopHeader from "../../../../components/TopHeader";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../../components/SelectList";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  evaObjectivesId: yup.string().max(50),
  evaluationId: yup.string().max(50),
  secondManagerId: yup.string().required("Required.").max(50),
  managerCommentOne: yup.string().required("Required.").max(2500),
});

const ObjectivesList = ({ defaultValues, action }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evaObjectivesId: defaultValues.evaObjectivesId,
      evaluationId: defaultValues.evaluationId,
      objectiveDetailsOne: defaultValues.objectiveDetailsOne,
      employeeCommentOne: defaultValues.employeeCommentOne,
      managerCommentOne: defaultValues.managerCommentOne,
      // objectiveDetailsTwo: defaultValues.objectiveDetailsTwo,
      // employeeCommentTwo: defaultValues.employeeCommentTwo,
      // objectiveDetailsThree: defaultValues.objectiveDetailsThree,
      // employeeCommentThree: defaultValues.employeeCommentThree,
      // objectiveDetailsFour: defaultValues.objectiveDetailsFour,
      // employeeCommentFour: defaultValues.employeeCommentFour,
      // ratingOne: defaultValues.ratingOne,
      // managerCommentTwo: defaultValues.managerCommentTwo,
      // ratingTwo: defaultValues.ratingTwo,
      // managerCommentThree: defaultValues.managerCommentThree,
      // ratingThree: defaultValues.ratingThree,
      // managerCommentFour: defaultValues.managerCommentFour,
      // ratingFour: defaultValues.ratingFour,
    },
    resolver: yupResolver(schema),
  });
  const { managerCommentOne, probationReview, secondManagerId } = errors;
  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaObjectivesId", formData.evaObjectivesId);
    data.append("evaluationId", defaultValues.evaluationId);
    data.append("secondManagerId", formData.secondManagerId);
    data.append("managerCommentOne", formData.managerCommentOne);
    data.append("probationReview", formData.probationReview);

    try {
      const { status } = await mutateAsync({
        path: "/evaobjectivesThree/updateapp",
        formData: data,
      });
      if (status === 204) {
        toast.success("Update successful!");
        navigate("/evaluation/first/Review/list");
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
          <div className="pt-5 pb-10 grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
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

              <SelectFromOptions
                register={register}
                options={[
                  "Pass (keep it up)",
                  "Needs to serious improve",
                  "Fail",
                ]}
                label="Probation Review Outcome"
                name="probationReview"
                errorMessage={probationReview?.message}
              />
              <SelectFromDb
                control={control}
                label="Select 2nd Manager"
                path="/employees/selectSecondManager"
                name="secondManagerId"
                errorMessage={secondManagerId?.message}
              />
            </div>
          </div>

          <SaveButton btnText="Complete" disabled={submitting} />
        </div>
      </form>
      <Reject id={defaultValues.evaluationId} />
    </div>
  );
};

export default ObjectivesList;
