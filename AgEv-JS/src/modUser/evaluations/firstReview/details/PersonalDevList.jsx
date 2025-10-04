import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import SaveButton from "../../../../components/button/SaveButton";
import { useNavigate } from "react-router-dom";
import Reject from "../../components/Reject";
import TopHeader from "../../../../components/TopHeader";
import { ListHeader, ListCol } from "../../../../components/ListColWithHeader";
import { format } from "date-fns";
import { SelectFromDb } from "../../../../components/SelectList";

const schema = yup.object({
  evaPersonalDevId: yup.string().max(50),
  managerCommentDev: yup.string().required("Required.").max(2500),
  secondManagerId: yup.string().required("Required.").max(50),
});

const PersonalDevList = ({ defaultValues }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const returnPath = "/evaluation/first/Review/list";
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evaPersonalDevId: defaultValues.evaPersonalDevId,
      managerCommentDev: defaultValues.managerCommentDev,
    },
    resolver: yupResolver(schema),
  });
  const { managerCommentDev, secondManagerId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaPersonalDevId", formData.evaPersonalDevId);
    data.append("evaluationId", defaultValues.evaluationId);
    data.append("managerCommentDev", formData.managerCommentDev);
    data.append("secondManagerId", formData.secondManagerId);
    try {
      const { status } = await mutateAsync({
        path: "/evaPersonalDev/updateapp",
        formData: data,
      });
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
      setSubmitting(false);
    }
  };

  return (
    <div className="card w-full max-w-screen-xl gap-1">
      <TopHeader btn="Return" path="/evaluation/first/Review/list" />
      <p className="text-sm text-justify leading-6">
        In the table below you will see your team members top 3 development
        areas according to their feedback that they feel will help them improve
        their performance over the coming year. Please review these and if you
        are not in agreement with them or need the employee to correct any point
        please click reject and guide the employee on what to correct. Otherwise
        you can add you comments as Manager into the Manager comments box and by
        clicking on{" "}
        <span className="bg-umojayellow py-1 px-2 rounded-xl">complete</span>{" "}
        you are outlining that you are in agreement with their 3 development
        areas.
      </p>

      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Development Need" />
          <ListHeader label="Who will support you?" />
          <ListHeader label="Timeline to complete?" />
          <ListHeader label="Date to review progress?" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 list-body">
          <ListCol
            label="Development Need:"
            value={defaultValues.developmentNeedOne}
          />
          <ListCol
            label="Who will support you?"
            value={defaultValues.supportByOne}
          />
          {defaultValues.timelineOne !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Timeline to complete?"
              value={format(new Date(defaultValues.timelineOne), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
          {defaultValues.reviewDateOne !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Date to review progress?"
              value={format(
                new Date(defaultValues.reviewDateOne),
                "dd-MMM-yyyy"
              )}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 list-body">
          <ListCol
            label="Development Need:"
            value={defaultValues.developmentNeedTwo}
          />
          <ListCol
            label="Who will support you?"
            value={defaultValues.supportByTwo}
          />
          {defaultValues.timelineTwo !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Timeline to complete?"
              value={format(new Date(defaultValues.timelineTwo), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
          {defaultValues.reviewDateTwo !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Date to review progress?"
              value={format(
                new Date(defaultValues.reviewDateTwo),
                "dd-MMM-yyyy"
              )}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 list-body">
          <ListCol
            label="Development Need:"
            value={defaultValues.developmentNeedThree}
          />
          <ListCol
            label="Who will support you?"
            value={defaultValues.supportByThree}
          />
          {defaultValues.timelineThree !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Timeline to complete?"
              value={format(
                new Date(defaultValues.timelineThree),
                "dd-MMM-yyyy"
              )}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
          {defaultValues.reviewDateThree !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Date to review progress?"
              value={format(
                new Date(defaultValues.reviewDateThree),
                "dd-MMM-yyyy"
              )}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaPersonalDevId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <h2 className="font-semibold">Manager Comment</h2>
          <TextArea
            control={control}
            name="managerCommentDev"
            label=""
            errorMessage={managerCommentDev?.message}
            areaHeight="h-16"
            isAutoFocus={true}
          />
          <SelectFromDb
            control={control}
            label="Select 2nd Manager"
            path="/employees/selectSecondManager"
            name="secondManagerId"
            errorMessage={secondManagerId?.message}
          />

          <SaveButton btnText="Complete" disabled={submitting} />
        </div>
      </form>
      <Reject id={defaultValues.evaluationId} />
    </div>
  );
};

export default PersonalDevList;
