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
  objectiveDetailsTwo: yup.string().required("Required.").max(2500),
  employeeCommentTwo: yup.string().required("Required.").max(2500),
  objectiveDetailsThree: yup.string().required("Required.").max(2500),
  employeeCommentThree: yup.string().required("Required.").max(2500),
  objectiveDetailsFour: yup.string().required("Required.").max(2500),
  employeeCommentFour: yup.string().required("Required.").max(2500),
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
    },
    resolver: yupResolver(schema),
  });
  const {
    objectiveDetailsOne,
    employeeCommentOne,
    objectiveDetailsTwo,
    employeeCommentTwo,
    objectiveDetailsThree,
    employeeCommentThree,
    objectiveDetailsFour,
    employeeCommentFour,
  } = errors;
  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaObjectivesId", formData.evaObjectivesId);
    data.append("objectiveDetailsOne", formData.objectiveDetailsOne);
    data.append("employeeCommentOne", formData.employeeCommentOne);
    data.append("objectiveDetailsTwo", formData.objectiveDetailsTwo);
    data.append("employeeCommentTwo", formData.employeeCommentTwo);
    data.append("objectiveDetailsThree", formData.objectiveDetailsThree);
    data.append("employeeCommentThree", formData.employeeCommentThree);
    data.append("objectiveDetailsFour", formData.objectiveDetailsFour);
    data.append("employeeCommentFour", formData.employeeCommentFour);
    try {
      const { status } = await mutateAsync({
        path: "/evaobjectives/update",
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
        In the section below we would like you to reflect on your past 12 months
        at work and let us know how you feel you have performed against your
        objectives. Please add your objective details, success measures and
        comments in the boxes shown below:
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaObjectivesId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Personal Objective One
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
              <TextArea
                control={control}
                name="objectiveDetailsOne"
                label="Objective Details"
                errorMessage={objectiveDetailsOne?.message}
                areaHeight="h-16"
                isAutoFocus={true}
              />
              <TextArea
                control={control}
                name="employeeCommentOne"
                label="Employee Comment"
                errorMessage={employeeCommentOne?.message}
                areaHeight="h-16"
              />
            </div>
          </div>

          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Personal Objective Two
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
              <TextArea
                control={control}
                name="objectiveDetailsTwo"
                label="Objective Details"
                errorMessage={objectiveDetailsTwo?.message}
                areaHeight="h-16"
              />
              <TextArea
                control={control}
                name="employeeCommentTwo"
                label="Employee Comment"
                errorMessage={employeeCommentTwo?.message}
                areaHeight="h-16"
              />
            </div>
          </div>

          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Personal Objective Three
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
              <TextArea
                control={control}
                name="objectiveDetailsThree"
                label="Objective Details"
                errorMessage={objectiveDetailsThree?.message}
                areaHeight="h-16"
              />
              <TextArea
                control={control}
                name="employeeCommentThree"
                label="Employee Comment"
                errorMessage={employeeCommentThree?.message}
                areaHeight="h-16"
              />
            </div>
            <div className="w-full grid">
              <h1 className="text-lg font-bold text-gray-700 capitalize">
                Personal Objective Four
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
                <TextArea
                  control={control}
                  name="objectiveDetailsFour"
                  label="Objective Details"
                  errorMessage={objectiveDetailsFour?.message}
                  areaHeight="h-16"
                />
                <TextArea
                  control={control}
                  name="employeeCommentFour"
                  label="Employee Comment"
                  errorMessage={employeeCommentFour?.message}
                  areaHeight="h-16"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 w-full gap-x-5">
            <SaveButton btnText="Update & Next" disabled={submitting} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ObjectivesList;
