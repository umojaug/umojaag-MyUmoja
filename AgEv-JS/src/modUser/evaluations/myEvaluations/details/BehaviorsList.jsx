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
  evaBehaviorsId: yup.string().max(50),
  ambitiousAnswer1: yup.string().required("Required.").max(2500),
  ambitiousAnswer2: yup.string().required("Required.").max(2500),
  consistentAnswer1: yup.string().required("Required.").max(2500),
  consistentAnswer2: yup.string().required("Required.").max(2500),
  positiveAnswer1: yup.string().required("Required.").max(2500),
  positiveAnswer2: yup.string().required("Required.").max(2500),
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
      ambitiousAnswer1: defaultValues.ambitiousAnswer1,
      ambitiousAnswer2: defaultValues.ambitiousAnswer2,
      consistentAnswer1: defaultValues.consistentAnswer1,
      consistentAnswer2: defaultValues.consistentAnswer2,
      positiveAnswer1: defaultValues.positiveAnswer1,
      positiveAnswer2: defaultValues.positiveAnswer2,
    },
    resolver: yupResolver(schema),
  });
  const {
    ambitiousAnswer1,
    ambitiousAnswer2,
    consistentAnswer1,
    consistentAnswer2,
    positiveAnswer1,
    positiveAnswer2,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaBehaviorsId", formData.evaBehaviorsId);
    data.append("ambitiousAnswer1", formData.ambitiousAnswer1);
    data.append("ambitiousAnswer2", formData.ambitiousAnswer2);
    data.append("consistentAnswer1", formData.consistentAnswer1);
    data.append("consistentAnswer2", formData.consistentAnswer2);
    data.append("positiveAnswer1", formData.positiveAnswer1);
    data.append("positiveAnswer2", formData.positiveAnswer2);
    try {
      const { status } = await mutateAsync({
        path: "/evabehaviors/update",
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
        path="/my/evaluation/list"
      />
      <p className="text-sm text-justify">
        In section 1 we have reviewed your performance and what you have
        achieved. Now in section 2 we are going to review how you have achieved
        i.e. your behavior. Our behaviors in the workplace are very important
        and we should place just as much value in positive behaviors as we do in
        hitting our targets. Please use the space provided below, to tell us how
        you think you have lived our values this year:
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaBehaviorsId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Be Consistent – Do the simple tasks right every day, every time
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-end w-full">
              <TextArea
                control={control}
                name="consistentAnswer1"
                label="Tell us about a situation where you have shown consistency?"
                errorMessage={consistentAnswer1?.message}
                areaHeight="h-16"
              />
              <TextArea
                control={control}
                name="consistentAnswer2"
                label="Tell us about a situation where you have not lived this value and what you have learnt from it.  How can you improve?"
                errorMessage={consistentAnswer2?.message}
                areaHeight="h-16"
              />
            </div>
          </div>
          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Be Ambitious – Strive to innovate, grow and improve in all that
              you do
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-end w-full">
              <TextArea
                control={control}
                name="ambitiousAnswer1"
                label="Tell us about a situation where you have shown ambition?"
                errorMessage={ambitiousAnswer1?.message}
                areaHeight="h-16"
                isAutoFocus={true}
              />
              <TextArea
                control={control}
                name="ambitiousAnswer2"
                label="Tell us about a situation where you have not lived this value and what you have learnt from it.  How can you improve?"
                errorMessage={ambitiousAnswer2?.message}
                areaHeight="h-16"
              />
            </div>
          </div>
          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Be Positive - Stay upbeat and keep a fun attitude
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-end w-full">
              <TextArea
                control={control}
                name="positiveAnswer1"
                label="Tell us about a situation where you have shown
          positivity?"
                errorMessage={positiveAnswer1?.message}
                areaHeight="h-16"
              />
              <TextArea
                control={control}
                name="positiveAnswer2"
                label="Tell us about a situation where you have not lived this
          value and what you have learnt from it. How can you improve?"
                errorMessage={positiveAnswer2?.message}
                areaHeight="h-16"
              />
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

export default BehaviorsList;
