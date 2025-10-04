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
  evaBehaviorsId: yup.string().max(50),
  ambitiousReply: yup.string().required("Required.").max(2500),
  ambitiousRating: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  consistentReply: yup.string().required("Required.").max(2500),
  consistentRating: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  positiveReply: yup.string().required("Required.").max(2500),
  positiveRating: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const BehaviorsList = ({ defaultValues, action }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evaBehaviorsId: defaultValues.evaBehaviorsId,
      evaluationId: defaultValues.evaluationId,
      ambitiousAnswer1: defaultValues.ambitiousAnswer1,
      ambitiousAnswer2: defaultValues.ambitiousAnswer2,
      consistentAnswer1: defaultValues.consistentAnswer1,
      consistentAnswer2: defaultValues.consistentAnswer2,
      positiveAnswer1: defaultValues.positiveAnswer1,
      positiveAnswer2: defaultValues.positiveAnswer2,
      ambitiousReply: defaultValues.ambitiousReply,
      ambitiousRating: defaultValues.ambitiousRating,
      consistentReply: defaultValues.consistentReply,
      consistentRating: defaultValues.consistentRating,
      positiveReply: defaultValues.positiveReply,
      positiveRating: defaultValues.positiveRating,
    },
    resolver: yupResolver(schema),
  });
  const {
    ambitiousReply,
    ambitiousRating,
    consistentReply,
    consistentRating,
    positiveReply,
    positiveRating,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaBehaviorsId", formData.evaBehaviorsId);
    data.append("ambitiousReply", formData.ambitiousReply);
    data.append("ambitiousRating", formData.ambitiousRating);
    data.append("consistentReply", formData.consistentReply);
    data.append("consistentRating", formData.consistentRating);
    data.append("positiveReply", formData.positiveReply);
    data.append("positiveRating", formData.positiveRating);
    try {
      const { status } = await mutateAsync({
        path: "/evabehaviors/updateapp",
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
      action(defaultValues.isLeadership === 1 ? 3 : 4);
      setSubmitting(false);
    }
  };

  return (
    <div className="card w-full max-w-screen-xl gap-1">
      <TopHeader
        title="Behaviors Performance"
        btn="Return"
        path="/evaluation/first/Review/list"
      />
      <p className="text-sm text-justify">
        In section 1 you have reviewed your team members performance and what
        they have achieved. Now in section 2 we are going to review how they
        have achieved i.e. their behaviors. Our behaviors in the workplace are
        very important and we should place just as much value in positive
        behaviors as we do in hitting our targets.
        <br />
        Please use the space provided below, to provide your team member with
        your feedback on their behaviours performance this year. If you notice
        they have not completed this section correctly or they need to add more
        detail before you add your comments please click reject and provide the
        employee with feedback on what they need to correct in their submission.
        When selecting your performance rating for each behaviour the meaning of
        each rating is as follows:
        <br />1 = requires development. This means the employee has regularly
        failed to meet the behaviour standards we expect, they are not
        performing at the level expected and they need performance improvement
        support and development. <br />2 = Good performance. This means the
        employee is often behaving in a way that is expected and in line with
        our value. <br />3 = Consistently Strong Performance. This means that
        the employee is always behaving in line with our value and often exceeds
        expectations. <br />4 = Exceptional Performance. This means that the
        employee is always above and beyond expectations in the way they behave
        at work. They are always living by our values in everything they do and
        they go the extra mile all the time, leading by example and encouraging
        others to also do the same.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaBehaviorsId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Be Consistent – Do the simple tasks right every day, every time
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
            <div className="grid grid-cols-1 place-items-start text-justify w-full">
              <h1 className="font-semibold">
                1. Tell us about a situation where you have shown consistency?
              </h1>
              <p className="text-sm">
                <span className="font-bold">Ans: </span>{" "}
                {defaultValues.consistentAnswer1}
              </p>

              <h1 className="font-semibold">
                2. Tell us about a situation where you have not lived this value
                and what you have learnt from it. How can you improve?
              </h1>
              <p className="text-sm">
                <span className="font-bold">Ans: </span>{" "}
                {defaultValues.consistentAnswer2}
              </p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="consistentReply"
                label=""
                errorMessage={consistentReply?.message}
                areaHeight="h-44"
                isAutoFocus={true}
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="consistentRating"
                errorMessage={consistentRating?.message}
              />
            </div>
          </div>
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Be Ambitious – Strive to innovate, grow and improve in all that you
            do
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
            <div className="grid grid-cols-1 place-items-start text-justify w-full">
              <h1 className="font-semibold">
                1. Tell us about a situation where you have shown ambition?
              </h1>
              <p className="text-sm">
                <span className="font-bold">Ans: </span>
                {defaultValues.ambitiousAnswer1}
              </p>

              <h1 className="font-semibold">
                2. Tell us about a situation where you have not lived this value
                and what you have learnt from it. How can you improve?
              </h1>
              <p className="text-sm">
                <span className="font-bold">Ans: </span>
                {defaultValues.ambitiousAnswer2}
              </p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="ambitiousReply"
                label=""
                errorMessage={ambitiousReply?.message}
                areaHeight="h-44"
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="ambitiousRating"
                errorMessage={ambitiousRating?.message}
              />
            </div>
          </div>
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Be Positive - Stay upbeat and keep a fun attitude
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start w-full">
            <div className="grid grid-cols-1 place-items-start text-justify w-full">
              <h1 className="font-semibold">
                1. Tell us about a situation where you have shown positivity?
              </h1>
              <p className="text-sm">
                <span className="font-bold">Ans: </span>{" "}
                {defaultValues.positiveAnswer1}
              </p>

              <h1 className="font-semibold">
                2. Tell us about a situation where you have not lived this value
                and what you have learnt from it. How can you improve?
              </h1>
              <p className="text-sm">
                <span className="font-bold">Ans: </span>{" "}
                {defaultValues.positiveAnswer2}
              </p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="positiveReply"
                label=""
                errorMessage={positiveReply?.message}
                areaHeight="h-44"
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="positiveRating"
                errorMessage={positiveRating?.message}
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

export default BehaviorsList;
