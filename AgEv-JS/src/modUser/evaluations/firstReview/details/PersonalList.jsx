import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import SaveButton from "../../../../components/button/SaveButton";
import Reject from "../../components/Reject";
import TopHeader from "../../../../components/TopHeader";

const schema = yup.object({
  evaPersonalId: yup.string().max(50),
  managerComment: yup.string().required("Required.").max(2500),
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
      managerComment: defaultValues.managerComment,
    },
    resolver: yupResolver(schema),
  });
  const { managerComment } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaPersonalId", formData.evaPersonalId);
    data.append("managerComment", formData.managerComment);
    try {
      const { status } = await mutateAsync({
        path: "/evapersonal/updateapp",
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
        path="/evaluation/first/Review/list"
      />
      <p className="text-sm text-justify">
        Your team members career and success is important to us and in order to
        progress and develop it is good to talk about their personal goals and
        hopes for the forthcoming year and what development areas they might
        have to work on in order to get there. Below, they have provided their
        feedback on their personal development roadmap. In the Managers Comments
        box please provide your feedback on what they have outlined and any
        support you think you can provide.
      </p>

      <div className="grid grid-cols-1 place-items-start text-justify text-sm w-full">
        <h1 className="font-semibold ">
          1. What are your personal Umoja career goals?
        </h1>
        <p>
          <span className="font-bold">Ans: </span> {defaultValues.answer1}
        </p>

        <h1 className="font-semibold">
          2. What actions can you take to help yourself achieve your personal
          career goals?
        </h1>
        <p>
          <span className="font-bold">Ans: </span> {defaultValues.answer2}
        </p>

        <h1 className="font-semibold">
          3. How can the company or your Line Manager help you to achieve your
          goals?
        </h1>
        <p>
          <span className="font-bold">Ans: </span> {defaultValues.answer3}
        </p>

        <h1 className="font-semibold">
          4. Are there any behaviours or actions that you need to stop doing
          that might be hindering your progression?
        </h1>
        <p>
          <span className="font-bold">Ans: </span> {defaultValues.answer4}
        </p>

        <h1 className="font-semibold">
          5. What are your key strengths that you can do more of that will help
          you to achieve your career goals?
        </h1>
        <p>
          <span className="font-bold">Ans: </span> {defaultValues.answer5}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaPersonalId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <h2 className="font-semibold">Manager Comment</h2>
          <TextArea
            control={control}
            name="managerComment"
            label=""
            errorMessage={managerComment?.message}
            areaHeight="h-16"
            isAutoFocus={true}
          />
          <SaveButton btnText="Update & Next" disabled={submitting} />
        </div>
      </form>
      <Reject id={defaultValues.evaluationId} />
    </div>
  );
};

export default PersonalList;
