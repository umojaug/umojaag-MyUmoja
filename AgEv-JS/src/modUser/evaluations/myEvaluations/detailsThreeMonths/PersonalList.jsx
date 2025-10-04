import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import SaveButton from "../../../../components/button/SaveButton";
import TopHeader from "../../../../components/TopHeader";

const schema = yup.object({
  evaPersonalId: yup.string().max(50),
  answer1: yup.string().required("Required.").max(2500),
  answer2: yup.string().required("Required.").max(2500),
  answer3: yup.string().required("Required.").max(2500),
  answer4: yup.string().required("Required.").max(2500),
  answer5: yup.string().required("Required.").max(2500),
});

const PersonalList = ({ defaultValues, action }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evaPersonalId: defaultValues.evaPersonalId,
      answer1: defaultValues.answer1,
      answer2: defaultValues.answer2,
      answer3: defaultValues.answer3,
      answer4: defaultValues.answer4,
      answer5: defaultValues.answer5,
    },
    resolver: yupResolver(schema),
  });
  const { answer1, answer2, answer3, answer4, answer5 } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaPersonalId", formData.evaPersonalId);
    data.append("answer1", formData.answer1);
    data.append("answer2", formData.answer2);
    data.append("answer3", formData.answer3);
    data.append("answer4", formData.answer4);
    data.append("answer5", formData.answer5);
    try {
      const { status } = await mutateAsync({
        path: "/evapersonal/update",
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
      action(5);
      setSubmitting(false);
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
        Your career and success is important to us and in order to progress and
        develop it is good to talk about your personal goals and hopes for the
        forthcoming year and what development areas you might have to work on in
        order to get there. Together with your Line Manager, discuss the points
        listed below:
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaPersonalId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <TextArea
            control={control}
            name="answer1"
            label="1.	What are your personal Umoja career goals?"
            areaHeight="h-14"
            errorMessage={answer1?.message}
            isAutoFocus={true}
          />
          <TextArea
            control={control}
            name="answer2"
            label="2.	What actions can you take to help yourself achieve your personal Umoja career goals?"
            areaHeight="h-14"
            errorMessage={answer2?.message}
          />
          <TextArea
            control={control}
            name="answer3"
            label="3.	How can the company or your Line Manager help you to achieve your goals?"
            areaHeight="h-14"
            errorMessage={answer3?.message}
          />
          <TextArea
            control={control}
            name="answer4"
            label="4.	Are there any behaviours or actions that you need to stop doing that might be hindering your progression?"
            areaHeight="h-14"
            errorMessage={answer4?.message}
          />
          <TextArea
            control={control}
            name="answer5"
            label="5.	What are your key strengths that you can do more of that will help you to achieve your career goals?"
            areaHeight="h-14"
            errorMessage={answer5?.message}
          />
          <div className="grid grid-cols-1 w-full gap-x-5">
            <SaveButton btnText="Update & Next" disabled={submitting} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalList;
