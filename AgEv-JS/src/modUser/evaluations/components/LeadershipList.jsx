import React from "react";
import TopHeader from "../../../components/TopHeader";

const LeadershipList = ({ data }) => {
  return (
    <>
      <TopHeader title="Leadership Essentials" />
      <p className="text-justify">
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
      <div className="grid">
        <h1 className="text-lg font-bold text-gray-700 capitalize">
          Leadership Essential ‐ Drives Innovation
        </h1>
        <p>
          Driving innovation is about how much we seek to develop new insights
          and situations and how we encourage new ideas and innovations in our
          processes from our team members as well as ourselves. It looks at our
          ability to generate innovative solutions in work situations, whether
          trying different or novel ways to deal with work problems and it is
          vital to our business success and creativity.
        </p>
        <div className="pl-5">
          <div className="px-5">
            <div className="py-1">
              <h1 className="font-semibold ">Employee Comments:</h1>
              <p>{data.innovationComment}</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg p-5">
            <div className="py-1 ">
              <h1 className="font-semibold">Managers Comments:</h1>
              <p> {data.innovationReply}</p>
            </div>
            <div className="py-1">
              <h1 className="font-semibold">
                Rating:{" "}
                {data.innovationRating > 0 ? (
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                    {data.innovationRating}
                  </span>
                ) : (
                  ""
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <h1 className="text-lg font-bold text-gray-700 capitalize">
          Leadership Essential ‐ Leads People
        </h1>
        <p>
          At all levels, effectiveness in this area is about leading from the
          front and communicating with clarity, conviction and enthusiasm.
          Leading people is the ability to make things happen through others by
          organising, motivating and inspiring them. It is underpinned by the
          ability to communicate effectively. Strong leaders effectively manage
          and guide group efforts, track team progress and adequately anticipate
          roadblocks. They adapt as needed to achieve team or business unit
          goals and provide feedback, coaching and direction to their team.
        </p>
        <div className="pl-5">
          <div className="px-5">
            <div className="py-1">
              <h1 className="font-semibold ">Employee Comments:</h1>
              <p>{data.leadsComment}</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg p-5">
            <div className="py-1 ">
              <h1 className="font-semibold">Managers Comments:</h1>
              <p> {data.leadsReply}</p>
            </div>
            <div className="py-1">
              <h1 className="font-semibold">
                Rating:{" "}
                {data.leadsRating > 0 ? (
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                    {data.leadsRating}
                  </span>
                ) : (
                  ""
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <h1 className="text-lg font-bold text-gray-700 capitalize">
          Leadership Essential - Delivers Results
        </h1>
        <p>
          Delivering results is the enthusiasm and desire to meet and exceed
          objectives and targets to improve one's own performance. It is about
          being frustrated with the status quo, wanting to improve the way we do
          things and making it happen. At a higher level it is about calculated
          risk taking in the interest of improving overall business performance.
          A leader who delivers results consistently, often delivers more than
          just the required results. This person sets and achieves realistic
          achievable, yet ambitious, goals. They consistently comply with
          quality/regulatory standards and meet deadlines. This person delivers
          through their team and actively collaborates with others.
        </p>
        <div className="pl-5">
          <div className="px-5">
            <div className="py-1">
              <h1 className="font-semibold ">Employee Comments:</h1>
              <p>{data.resultComment}</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg p-5">
            <div className="py-1 ">
              <h1 className="font-semibold">Managers Comments:</h1>
              <p> {data.resultReply}</p>
            </div>
            <div className="py-1">
              <h1 className="font-semibold">
                Rating:{" "}
                {data.resultRating > 0 ? (
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                    {data.resultRating}
                  </span>
                ) : (
                  ""
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadershipList;
