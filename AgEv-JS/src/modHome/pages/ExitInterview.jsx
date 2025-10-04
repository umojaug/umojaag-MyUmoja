import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextArea from "../../components/TextArea";
import SaveButton from "../../components/button/SaveButton";
import RadioButtons from "../../components/RadioButtons";
import Input from "../../components/Input";

const schema = yup.object().shape({
  employeeId: yup.string().max(50).required("Required"),
  betterOffer: yup.boolean(),
  salaryPackage: yup.boolean(),
  familyNeed: yup.boolean(),
  typeOfWork: yup.boolean(),
  careerPath: yup.boolean(),
  disability: yup.boolean(),
  supervisor: yup.boolean(),
  relocation: yup.boolean(),
  colleagues: yup.boolean(),
  travel: yup.boolean(),
  workingConditions: yup.boolean(),
  education: yup.boolean(),
  benefits: yup.boolean(),
  otherReason: yup.string().max(50),
  informSupervisor: yup.string().max(50).required("Required"),
  feedback: yup.string().max(50).required("Required"),
  resources: yup.string().max(50).required("Required"),
  growth: yup.string().max(50).required("Required"),
  payment: yup.string().max(50).required("Required"),
  recognized: yup.string().max(50).required("Required"),
  decisions: yup.string().max(50).required("Required"),
  voicing: yup.string().max(50).required("Required"),
  treat: yup.string().max(50).required("Required"),
  coworkers: yup.string().max(50).required("Required"),
  teamMembers: yup.string().max(50).required("Required"),
  stressed: yup.string().max(50).required("Required"),
  workBalance: yup.string().max(50).required("Required"),
  safePlace: yup.string().max(50).required("Required"),
  environment: yup.string().max(50).required("Required"),
  recommendUs: yup.string().max(50).required("Required"),
  comments: yup.string().max(250).required("Required"),
});

const ExitInterview = () => {
  let { id } = useParams();

  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeId: id,
      betterOffer: false,
      salaryPackage: false,
      familyNeed: false,
      typeOfWork: false,
      careerPath: false,
      disability: false,
      supervisor: false,
      relocation: false,
      colleagues: false,
      travel: false,
      workingConditions: false,
      education: false,
      benefits: false,
      otherReason: "",
      informSupervisor: "Yes",
      feedback: "Yes",
      resources: "Very easy",
      growth: "Very helpful",
      payment: "Very well paid",
      recognized: "Very often",
      decisions: "Very reasonable",
      voicing: "Very comfortable",
      treat: "Very well",
      coworkers: "A lot",
      teamMembers: "Very well",
      stressed: "Not at all",
      workBalance: "Not at all difficult",
      safePlace: "Very safe",
      environment: "Very positive",
      recommendUs: "Yes",
      comments: "",
    },
    resolver: yupResolver(schema),
  });
  const {
    otherReason,
    informSupervisor,
    feedback,
    resources,
    growth,
    payment,
    recognized,
    decisions,
    voicing,
    treat,
    coworkers,
    teamMembers,
    stressed,
    workBalance,
    safePlace,
    environment,
    recommendUs,
    comments,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/myresign/update",
        formData: formData,
      });
      if (status === 204) {
        toast.success(
          "Update successfully! We express our sincere gratitude for your invaluable participation and time"
        );
        reset();
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

  useEffect(() => {
    document.title = "Exit Interview : Sobhisab";
  }, []);

  return (
    <div className="bg-white max-w-full px-5 sm:px-8 lg:px-[120px] grid grid-cols-1 place-items-center text-black shadow-sm break-words py-5 md:px-40 w-full">
      <h1 className="w-100 text-2xl">STAFF EXIT SURVEY</h1>
      <h3>
        Please brief the outgoing /Ex-staffs, purpose of this survey before
        start
      </h3>
      <div className="grid mt-4 w-full">
        <span className="font-bold">Instructions:</span>
        <p>
          Please fill in the form completely and answer all the questions
          honestly to achieve the objective of the management to facilitate
          better services to all. Please do not hesitate to provide the required
          information as matters will be kept confidential.
        </p>
        <p>
          Preferred Area of Action Research: professional growth, work safety,
          salary and benefits, supervisory role, branch culture/environment.
        </p>
      </div>
      <div className="grid mt-4 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("employeeId")} />
          <div className="form-col">
            <div className="form-row w-full">
              <label>
                1.Reason of reason of leaving (more than one reason may be given
                if appropriate):
              </label>

              <label htmlFor="Took another job/better offer">
                {" "}
                <input
                  {...register("betterOffer")}
                  type="checkbox"
                  value={true}
                />{" "}
                Took another job/better offer
              </label>
              <label htmlFor="Dissatisfaction with salary package">
                {" "}
                <input
                  {...register("salaryPackage")}
                  type="checkbox"
                  value={true}
                />{" "}
                Dissatisfaction with salary package
              </label>
              <label htmlFor="Pregnancy/home/family need">
                {" "}
                <input
                  {...register("familyNeed")}
                  type="checkbox"
                  value={true}
                />{" "}
                Pregnancy/home/family need
              </label>
              <label htmlFor="Dissatisfaction with type of work">
                {" "}
                <input
                  {...register("typeOfWork")}
                  type="checkbox"
                  value={true}
                />{" "}
                Dissatisfaction with type of work
              </label>
              <label htmlFor="Dissatisfaction with career path">
                {" "}
                <input
                  {...register("careerPath")}
                  type="checkbox"
                  value={true}
                />{" "}
                Dissatisfaction with career path
              </label>
              <label htmlFor="Poor health/physical/disability">
                {" "}
                <input
                  {...register("disability")}
                  type="checkbox"
                  value={true}
                />{" "}
                Poor health/physical/disability
              </label>
              <label htmlFor="Dissatisfaction with supervisor">
                {" "}
                <input
                  {...register("supervisor")}
                  type="checkbox"
                  value={true}
                />{" "}
                Dissatisfaction with supervisor
              </label>
              <label htmlFor="Relocation to another city">
                {" "}
                <input
                  {...register("relocation")}
                  type="checkbox"
                  value={true}
                />{" "}
                Relocation to another city
              </label>
              <label htmlFor="Dissatisfaction with co-workers">
                {" "}
                <input
                  {...register("colleagues")}
                  type="checkbox"
                  value={true}
                />{" "}
                Dissatisfaction with co-workers
              </label>
              <label htmlFor="Travel difficulties">
                {" "}
                <input
                  {...register("travel")}
                  type="checkbox"
                  value={true}
                />{" "}
                Travel difficulties
              </label>
              <label htmlFor="Dissatisfactory working conditions">
                {" "}
                <input
                  {...register("workingConditions")}
                  type="checkbox"
                  value={true}
                />{" "}
                Dissatisfactory working conditions
              </label>
              <label htmlFor="To attend further education">
                {" "}
                <input
                  {...register("education")}
                  type="checkbox"
                  value={true}
                />{" "}
                To attend further education
              </label>
              <label htmlFor="Dissatisfaction with benefits package">
                {" "}
                <input
                  {...register("benefits")}
                  type="checkbox"
                  value={true}
                />{" "}
                Dissatisfaction with benefits package
              </label>
              <Input
                name="otherReason"
                label="Other Reason"
                type="text"
                register={register}
                errorMessage={otherReason?.message}
              />
            </div>
            <RadioButtons
              register={register}
              options={["Yes", "No"]}
              label="2. Did you share your desire to leave the company/concerns with immediate supervisor prior to leaving?"
              name="informSupervisor"
              errorMessage={informSupervisor?.message}
            />
            <RadioButtons
              register={register}
              options={["Yes", "No"]}
              label="3.Did you receive constructive feedback to help improve your situation?"
              name="feedback"
              errorMessage={feedback?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very easy",
                "Easy",
                "Somewhat easy",
                "Not at all easy",
              ]}
              label="4. How easy was it easy here, to get the resources, (branch equipment, transport, security, cell phone etc.) you needed to do your job well?"
              name="resources"
              errorMessage={resources?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very helpful",
                "Helpful",
                "Somewhat helpful",
                "Not at all helpful",
              ]}
              label="5. How helpful was your position here in stimulating your professional growth?"
              name="growth"
              errorMessage={growth?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very well paid",
                "Well paid",
                "Somewhat well paid",
                "Not at all well paid",
              ]}
              label="6. How well were you paid here for the work you did?"
              name="payment"
              errorMessage={payment?.message}
            />
            <RadioButtons
              register={register}
              options={["Very often", "Often", "Sometimes", "Not at all"]}
              label="7. How often did you feel your contributions were recognized?"
              name="recognized"
              errorMessage={recognized?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very reasonable",
                "Reasonable",
                "Somewhat reasonable",
                "Not at all reasonable",
              ]}
              label="8. How reasonable were decisions (e.g. work load distribution, leave acceptance, recommend for promotion, etc.) made by your supervisor?"
              name="decisions"
              errorMessage={decisions?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very comfortable",
                "Comfortable",
                "Somewhat comfortable",
                "Not at all comfortable",
              ]}
              label="9.How comfortable did you feel voicing your opinion? (e.g. opinion on change of process, product, new ideas etc.)"
              name="voicing"
              errorMessage={voicing?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very well",
                "Well",
                "Somewhat well",
                "Not at all well",
              ]}
              label="10. How well did your supervisor treat you? (e.g. common behavior, praising good work, health discussion, handling mistakes professionally etc.)"
              name="treat"
              errorMessage={treat?.message}
            />
            <RadioButtons
              register={register}
              options={["A lot", "Moderately", "A little", "Not all"]}
              label="11. How much did you like your co-workers?"
              name="coworkers"
              errorMessage={coworkers?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very well",
                "Well",
                "Somewhat well",
                "Not at all well",
              ]}
              label="12.How did the members of your team work together?"
              name="teamMembers"
              errorMessage={teamMembers?.message}
            />
            <RadioButtons
              register={register}
              options={["Very often", "Often", "Sometimes", "Not at all"]}
              label="13. In a typical week, how often did you feel stressed at work?"
              name="stressed"
              errorMessage={stressed?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very difficult",
                "Difficult",
                "Somewhat difficult",
                "Not at all difficult",
              ]}
              label="14. How difficult was it for you to balance your work and personal life while working here?"
              name="workBalance"
              errorMessage={workBalance?.message}
            />
            <RadioButtons
              register={register}
              options={["Very safe", "Safe", "Not so safe", "Not at all safe"]}
              label="15. How safe did you feel here at your work place?"
              name="safePlace"
              errorMessage={safePlace?.message}
            />
            <RadioButtons
              register={register}
              options={[
                "Very positive",
                "Positive",
                "Somewhat positive",
                "Neither positive nor negative",
                "Very negative",
              ]}
              label="16. Overall, how was your work environment?"
              name="environment"
              errorMessage={environment?.message}
            />
            <RadioButtons
              register={register}
              options={["Yes", "No"]}
              label="17. If you had a friend looking for a job, would you recommend us?"
              name="recommendUs"
              errorMessage={recommendUs?.message}
            />
            <TextArea
              name="comments"
              label="18. any other comments or concerns, please feel free to write here."
              control={control}
              errorMessage={comments?.message}
            />

            <SaveButton btnText="Save" disabled={submitting} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExitInterview;
