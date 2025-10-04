import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import DatePicker from "../../../../components/DatePicker";
import Input from "../../../../components/Input";
import moment from "moment";
// import { useNavigate } from "react-router-dom";
import SaveButton from "../../../../components/button/SaveButton";
import TopHeader from "../../../../components/TopHeader";

const schema = yup.object({
  evaPersonalDevId: yup.string().max(50),
  developmentNeedOne: yup.string().required("Required.").max(2500),
  supportByOne: yup.string().required("Required.").max(50),
  timelineOne: yup.date().required("Required."),
  reviewDateOne: yup.date().required("Required."),
  developmentNeedTwo: yup.string().required("Required.").max(2500),
  supportByTwo: yup.string().required("Required.").max(50),
  timelineTwo: yup.date().required("Required."),
  reviewDateTwo: yup.date().required("Required."),
  developmentNeedThree: yup.string().required("Required.").max(2500),
  supportByThree: yup.string().required("Required.").max(50),
  timelineThree: yup.date().required("Required."),
  reviewDateThree: yup.date().required("Required."),
});

const PersonalDevList = ({ defaultValues, action }) => {
  // const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evaPersonalDevId: defaultValues.evaPersonalDevId,
      developmentNeedOne: defaultValues.developmentNeedOne,
      supportByOne: defaultValues.supportByOne,
      timelineOne:
        defaultValues.timelineOne !== "1980-12-31T00:00:00"
          ? new Date(defaultValues.timelineOne)
          : "",
      reviewDateOne:
        defaultValues.reviewDateOne !== "1980-12-31T00:00:00"
          ? new Date(defaultValues.reviewDateOne)
          : "",
      developmentNeedTwo: defaultValues.developmentNeedTwo,
      supportByTwo: defaultValues.supportByTwo,
      timelineTwo:
        defaultValues.timelineTwo !== "1980-12-31T00:00:00"
          ? new Date(defaultValues.timelineTwo)
          : "",
      reviewDateTwo:
        defaultValues.reviewDateTwo !== "1980-12-31T00:00:00"
          ? new Date(defaultValues.reviewDateTwo)
          : "",
      developmentNeedThree: defaultValues.developmentNeedThree,
      supportByThree: defaultValues.supportByThree,
      timelineThree:
        defaultValues.timelineThree !== "1980-12-31T00:00:00"
          ? new Date(defaultValues.timelineThree)
          : "",
      reviewDateThree:
        defaultValues.reviewDateThree !== "1980-12-31T00:00:00"
          ? new Date(defaultValues.reviewDateThree)
          : "",
    },
    resolver: yupResolver(schema),
  });
  const {
    developmentNeedOne,
    supportByOne,
    timelineOne,
    reviewDateOne,
    developmentNeedTwo,
    supportByTwo,
    timelineTwo,
    reviewDateTwo,
    developmentNeedThree,
    supportByThree,
    timelineThree,
    reviewDateThree,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaPersonalDevId", formData.evaPersonalDevId);
    data.append("developmentNeedOne", formData.developmentNeedOne);
    data.append("supportByOne", formData.supportByOne);
    data.append(
      "timelineOne",
      moment.utc(formData.timelineOne).local().format("YYYY-MM-DD")
    );
    data.append(
      "reviewDateOne",
      moment.utc(formData.reviewDateOne).local().format("YYYY-MM-DD")
    );
    data.append("developmentNeedTwo", formData.developmentNeedTwo);
    data.append("supportByTwo", formData.supportByTwo);
    data.append(
      "timelineTwo",
      moment.utc(formData.timelineTwo).local().format("YYYY-MM-DD")
    );
    data.append(
      "reviewDateTwo",
      moment.utc(formData.reviewDateTwo).local().format("YYYY-MM-DD")
    );
    data.append("developmentNeedThree", formData.developmentNeedThree);
    data.append("supportByThree", formData.supportByThree);
    data.append(
      "timelineThree",
      moment.utc(formData.timelineThree).local().format("YYYY-MM-DD")
    );
    data.append(
      "reviewDateThree",
      moment.utc(formData.reviewDateThree).local().format("YYYY-MM-DD")
    );
    data.append(
      "submitDate",
      moment.utc(new Date()).local().format("YYYY-MM-DD")
    );
    try {
      const { status } = await mutateAsync({
        path: "/evapersonaldev/update",
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
      action(6);
      setSubmitting(false);
      //navigate(`/evaluation/application/preview/${defaultValues.evaluationId}`);
    }
  };

  return (
    <div className="card w-full max-w-screen-xl gap-1">
      <TopHeader
        title="Personal Development Roadmap"
        btn="Return"
        path="/my/evaluation/list"
      />
      <p className="text-sm text-justify">
        In the table below please list you top 3 development areas that will
        help improve your performance over the coming year and push you towards
        reaching your goals:
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaPersonalDevId")} />
        <input type="hidden" {...register("evaluationId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Personal Development One
          </h1>
          <TextArea
            control={control}
            name="developmentNeedOne"
            label="Development Need"
            errorMessage={developmentNeedOne?.message}
            areaHeight="h-16"
            isAutoFocus={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-1">
            <Input
              name="supportByOne"
              label="Who will support you?"
              type="text"
              register={register}
              errorMessage={supportByOne?.message}
            />
            <Controller
              control={control}
              name="timelineOne"
              render={({ field }) => (
                <DatePicker
                  label="Timeline to complete?"
                  field={field}
                  errorMessage={timelineOne?.message}
                  isRow={false}
                />
              )}
            />
            <Controller
              control={control}
              name="reviewDateOne"
              render={({ field }) => (
                <DatePicker
                  label="Date to review progress?"
                  field={field}
                  errorMessage={reviewDateOne?.message}
                  isRow={false}
                />
              )}
            />
          </div>
          <h1 className="text-md font-bold text-gray-700 capitalize">
            Personal Development Two
          </h1>
          <TextArea
            control={control}
            name="developmentNeedTwo"
            label="Development Need"
            errorMessage={developmentNeedTwo?.message}
            areaHeight="h-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-1">
            <Input
              name="supportByTwo"
              label="Who will support you?"
              type="text"
              register={register}
              errorMessage={supportByTwo?.message}
            />
            <Controller
              control={control}
              name="timelineTwo"
              render={({ field }) => (
                <DatePicker
                  label="Timeline to complete?"
                  field={field}
                  errorMessage={timelineTwo?.message}
                  isRow={false}
                />
              )}
            />
            <Controller
              control={control}
              name="reviewDateTwo"
              render={({ field }) => (
                <DatePicker
                  label="Date to review progress?"
                  field={field}
                  errorMessage={reviewDateTwo?.message}
                  isRow={false}
                />
              )}
            />
          </div>
          <h1 className="text-md font-bold text-gray-700 capitalize">
            Personal Development Three
          </h1>
          <TextArea
            control={control}
            name="developmentNeedThree"
            label="Development Need"
            errorMessage={developmentNeedThree?.message}
            areaHeight="h-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-1">
            <Input
              name="supportByThree"
              label="Who will support you?"
              type="text"
              register={register}
              errorMessage={supportByThree?.message}
            />
            <Controller
              control={control}
              name="timelineThree"
              render={({ field }) => (
                <DatePicker
                  label="Timeline to complete?"
                  field={field}
                  errorMessage={timelineThree?.message}
                  isRow={false}
                />
              )}
            />
            <Controller
              control={control}
              name="reviewDateThree"
              render={({ field }) => (
                <DatePicker
                  label="Date to review progress?"
                  field={field}
                  errorMessage={reviewDateThree?.message}
                  isRow={false}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 w-full gap-x-5">
            <SaveButton btnText="Update & Preview" disabled={submitting} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDevList;
