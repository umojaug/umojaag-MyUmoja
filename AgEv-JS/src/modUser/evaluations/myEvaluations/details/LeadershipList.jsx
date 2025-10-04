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
  evaLeadershipId: yup.string().max(50),
  innovationComment: yup.string().required("Required.").max(2500),
  leadsComment: yup.string().required("Required.").max(2500),
  resultComment: yup.string().required("Required.").max(2500),
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
      innovationComment: defaultValues.innovationComment,
      leadsComment: defaultValues.leadsComment,
      resultComment: defaultValues.resultComment,
    },
    resolver: yupResolver(schema),
  });
  const { innovationComment, leadsComment, resultComment } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaLeadershipId", formData.evaLeadershipId);
    data.append("innovationComment", formData.innovationComment);
    data.append("leadsComment", formData.leadsComment);
    data.append("resultComment", formData.resultComment);
    try {
      const { status } = await mutateAsync({
        path: "/evaleadership/update",
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
        path="/my/evaluation/list"
      />
      <p className="text-sm text-justify">
        In your position you play a key leadership role in our organization and
        now we will take a closer look at how you have performance across
        certain competencies that we believe all leaders need to have and
        develop in order to be a successful leader. For each category please
        provide your comments on how you think you have performed along with
        some specific examples. Your Manager will then review your comments.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaLeadershipId")} />
        <div className="grid grid-cols-1 gap-1 place-items-start">
          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Drives Innovation
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
              <p className="text-sm text-justify">
                Driving innovation is about how much we seek to develop new
                insights and situations and how we encourage new ideas and
                innovations in our processes from our team members as well as
                ourselves. It looks at our ability to generate innovative
                solutions in work situations, whether trying different or novel
                ways to deal with work problems and it is vital to our business
                success and creativity.
              </p>
              <TextArea
                control={control}
                name="innovationComment"
                label="Employee Comments"
                errorMessage={innovationComment?.message}
                areaHeight="h-16"
                isAutoFocus={true}
              />
            </div>
          </div>
          <div className="w-full grid">
            <h1 className="text-lg font-bold text-gray-700 capitalize">
              Leads People
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
              <p className="text-sm text-justify">
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
              <TextArea
                control={control}
                name="leadsComment"
                label="Employee Comments"
                errorMessage={leadsComment?.message}
                areaHeight="h-16"
              />
            </div>
          </div>
          <div className="w-full grid">
            <h1 className="text-md font-bold text-gray-700 capitalize">
              Delivers Results
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-start">
              <p className="text-sm text-justify">
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
              <TextArea
                control={control}
                name="resultComment"
                label="Employee Comments"
                errorMessage={resultComment?.message}
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

export default LeadershipList;
