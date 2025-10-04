import React, { useState } from "react";
import TopHeader from "../../../../components/TopHeader";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import TextArea from "../../../../components/TextArea";
import SaveButton from "../../../../components/button/SaveButton";
import { usePostData } from "../../../../hooks/dataApi";

const schema = yup.object({
  evaObjectivesId: yup.string().max(50),
  objectiveDetailsOne: yup.string().required("Required.").max(2500),
  employeeCommentOne: yup.string().required("Required.").max(2500),
  answer1: yup.string().required("Required.").max(2500),
  answer2: yup.string().required("Required.").max(2500),
  answer3: yup.string().required("Required.").max(2500),
  // employeeCommentTwo: yup.string().required("Required.").max(2500),
  // objectiveDetailsThree: yup.string().required("Required.").max(2500),
  // employeeCommentThree: yup.string().required("Required.").max(2500),
  // objectiveDetailsFour: yup.string().required("Required.").max(2500),
  // employeeCommentFour: yup.string().required("Required.").max(2500),
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
      answer1: defaultValues.answer1,
      answer2: defaultValues.answer2,
      answer3: defaultValues.answer3,
    },
    resolver: yupResolver(schema),
  });
  const { objectiveDetailsOne, employeeCommentOne, answer1, answer2, answer3 } =
    errors;
  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaObjectivesId", formData.evaObjectivesId);
    data.append("objectiveDetailsOne", formData.objectiveDetailsOne);
    data.append("employeeCommentOne", formData.employeeCommentOne);
    data.append("answer1", formData.answer1);
    data.append("answer2", formData.answer2);
    data.append("answer3", formData.answer3);

    try {
      const { status } = await mutateAsync({
        path: "/evaobjectivesThree/update",
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
        path="/my/evaluation/list"
      />
      <p className="text-sm text-justify">
        In the section below we would like you to review your past 3 months at
        work and let us know how you feel you performed against your objectives.
        Your Line Manager will then meet with you to discuss your feedback and
        to complete theirs. :
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaObjectivesId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <div className="w-full grid">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <h1 className="text-lg font-bold text-gray-700 capitalize">
                Objective
              </h1>
              <h1 className="text-lg font-bold text-gray-700 capitalize">
                Achievement and Comments
              </h1>
            </div>
            <div className="w-full grid">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
                <TextArea
                  control={control}
                  name="objectiveDetailsOne"
                  label="Objective 1 Details"
                  errorMessage={objectiveDetailsOne?.message}
                  areaHeight="h-16"
                  isAutoFocus={true}
                />
                <TextArea
                  control={control}
                  name="employeeCommentOne"
                  label="Employee Comments"
                  errorMessage={employeeCommentOne?.message}
                  areaHeight="h-16"
                />
              </div>
            </div>
          </div>
          <TopHeader
            title="Lets Reflect"
            // btn="Return"
            // path="/my/evaluation/list"
          />
          <p className="text-sm text-justify">
            In this section we would like to discuss what has gone well over the
            past 3 months, what could be improved and what support you may need
            moving forward. Please answer the following questions and review
            with your Line Manager during your probation review meeting:
          </p>
          <div className="w-full grid grid-cols-1 gap-1 place-items-start">
            <TextArea
              control={control}
              name="answer1"
              label="1.	What has gone well during your first few months as part of the Umoja team?"
              areaHeight="h-14"
              errorMessage={answer1?.message}
              isAutoFocus={true}
            />
            <TextArea
              control={control}
              name="answer2"
              label="2.	What challenges have you faced during your first few months and how have you tried to overcome these?"
              areaHeight="h-14"
              errorMessage={answer2?.message}
            />
            <TextArea
              control={control}
              name="answer3"
              label="3.	What can you do to strive to continuously improve your performance and how can the company support you?"
              areaHeight="h-14"
              errorMessage={answer3?.message}
            />
          </div>
          <div className="grid grid-cols-1 w-full gap-x-5">
            <SaveButton btnText="Update & Preview" disabled={submitting} />
          </div>
        </div>

        <div></div>
      </form>
    </div>
  );
};

export default ObjectivesList;
