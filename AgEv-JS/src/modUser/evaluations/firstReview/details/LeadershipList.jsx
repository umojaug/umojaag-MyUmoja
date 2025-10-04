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
  evaLeadershipId: yup.string().max(50),
  innovationReply: yup.string().required("Required.").max(2500),
  innovationRating: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  leadsReply: yup.string().required("Required.").max(2500),
  leadsRating: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  resultReply: yup.string().required("Required.").max(2500),
  resultRating: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const LeadershipList = ({ defaultValues, action }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evaLeadershipId: defaultValues.evaLeadershipId,
      evaluationId: defaultValues.evaluationId,
      innovationComment: defaultValues.innovationComment,
      leadsComment: defaultValues.leadsComment,
      resultComment: defaultValues.resultComment,
      innovationReply: defaultValues.innovationReply,
      innovationRating: defaultValues.innovationRating,
      leadsReply: defaultValues.leadsReply,
      leadsRating: defaultValues.leadsRating,
      resultReply: defaultValues.resultReply,
      resultRating: defaultValues.resultRating,
    },
    resolver: yupResolver(schema),
  });
  const {
    innovationReply,
    innovationRating,
    leadsReply,
    leadsRating,
    resultReply,
    resultRating,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaLeadershipId", formData.evaLeadershipId);
    data.append("innovationReply", formData.innovationReply);
    data.append("innovationRating", formData.innovationRating);
    data.append("leadsReply", formData.leadsReply);
    data.append("leadsRating", formData.leadsRating);
    data.append("resultReply", formData.resultReply);
    data.append("resultRating", formData.resultRating);
    try {
      const { status } = await mutateAsync({
        path: "/evaleadership/updateapp",
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
      action(4);
      setSubmitting(false);
    }
  };

  return (
    <div className="card w-full max-w-screen-xl gap-1">
      <TopHeader
        title="Leadership Essentials"
        btn="Return"
        path="/evaluation/first/Review/list"
      />
      <p className="text-sm text-justify">
        In their position your team memebrs plays a key leadership role in our
        organization and now we will take a closer look at how they have
        performance across certain competencies that we believe all leaders need
        to have and develop in order to be a successful leader. For each
        category please provide your manager comments on how you think they have
        performed.
        <br />
        If you notice they have not completed this section correctly or they
        need to add more detail before you add your comments please click reject
        and provide the employee with feedback on what they need to correct in
        their submission.
        <br />
        When selecting rating the below definitions provide guidance: <br />
        1 = requires development. This means the employee has regularly failed
        to meet expectations for this leadership competency, they are not
        performing at the level expected and they need performance improvement
        support and development.
        <br />
        2 = Good performance. This means the employee is meeting performance
        expectations for this leadership competency.
        <br />
        3 = Consistently Strong Performance. This means that the employee is
        always meeting performance expectations and often exceeds expectations
        for this leaderhip competency.
        <br />4 = Exceptional Performance. This means that the employee is
        always above and beyond expected performance levels. They are always
        meeting and exceeding their targets and going above and beyond what is
        needed. They go the extra mile every time and are a role model as a
        leader for this leadership competency.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaLeadershipId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Drives Innovation
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
            <div className="grid grid-cols-1 text-justify text-sm place-items-start w-full">
              <p>
                Driving innovation is about how much we seek to develop new
                insights and situations and how we encourage new ideas and
                innovations in our processes from our team members as well as
                ourselves. It looks at our ability to generate innovative
                solutions in work situations, whether trying different or novel
                ways to deal with work problems and it is vital to our business
                success and creativity.
              </p>
              <h2 className="font-bold">Employee Comment</h2>
              <p className="text-sm">{defaultValues.innovationComment}</p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="innovationReply"
                label=""
                errorMessage={innovationReply?.message}
                areaHeight="h-44"
                isAutoFocus={true}
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="innovationRating"
                errorMessage={innovationRating?.message}
              />
            </div>
          </div>

          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Leads People
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
            <div className="grid grid-cols-1 text-justify text-sm place-items-start w-full">
              <p>
                At all levels, effectiveness in this area is about leading from
                the front and communicating with clarity, conviction and
                enthusiasm. Leading people is the ability to make things happen
                through others by organising, motivating and inspiring them. It
                is underpinned by the ability to communicate effectively. Strong
                leaders effectively manage and guide group efforts, track team
                progress and adequately anticipate roadblocks. They adapt as
                needed to achieve team or business unit goals and provide
                feedback, coaching and direction to their team.
              </p>
              <h2 className="font-bold ">Employee Comments:</h2>
              <p className="text-sm">{defaultValues.leadsComment}</p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="leadsReply"
                label=""
                errorMessage={leadsReply?.message}
                areaHeight="h-44"
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="leadsRating"
                errorMessage={leadsRating?.message}
              />
            </div>
          </div>
          <h1 className="text-lg font-bold text-gray-700 capitalize">
            Delivers Results
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
            <div className="grid grid-cols-1 text-justify text-sm place-items-start w-full">
              <p>
                Delivering results is the enthusiasm and desire to meet and
                exceed objectives and targets to improve one's own performance.
                It is about being frustrated with the status quo, wanting to
                improve the way we do things and making it happen. At a higher
                level it is about calculated risk taking in the interest of
                improving overall business performance. A leader who delivers
                results consistently, often delivers more than just the required
                results. This person sets and achieves realistic achievable, yet
                ambitious, goals. They consistently comply with
                quality/regulatory standards and meet deadlines. This person
                delivers through their team and actively collaborates with
                others.
              </p>
              <h1 className="font-bold">Employee Comments:</h1>
              <p className="text-sm">{defaultValues.resultComment}</p>
            </div>
            <div className="grid grid-cols-1 place-items-start w-full">
              <h2 className="font-semibold">Manager Comment</h2>
              <TextArea
                control={control}
                name="resultReply"
                label=""
                errorMessage={resultReply?.message}
                areaHeight="h-44"
              />
              <h2 className="font-semibold">Rating</h2>
              <SelectFromOptionsWithKey
                register={register}
                options={selectOptions.evaluationRating}
                label=""
                name="resultRating"
                errorMessage={resultRating?.message}
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

export default LeadershipList;
