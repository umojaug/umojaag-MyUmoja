import React from "react";
import TopHeader from "../../../components/TopHeader";

const BehaviorsList = ({ data }) => {
  return (
    <>
      <TopHeader title="Behaviors Performance" />
      <p className="text-justify">
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
      <div className="grid">
        <h1 className="text-lg font-bold text-gray-700 capitalize">
          Be Consistent – Do the simple tasks right every day, every time
        </h1>
        <div className="pl-5">
          <div className="px-5">
            <div className="py-1">
              <h1 className="font-semibold ">
                1. Tell us about a situation where you have shown consistency?
              </h1>
              <p>
                <span className="font-bold">Ans: </span>
                {data.consistentAnswer1}
              </p>
            </div>
            <div className="py-1 ">
              <h1 className="font-semibold">
                2. Tell us about a situation where you have not lived this value
                and what you have learnt from it. How can you improve?
              </h1>
              <p>
                <span className="font-bold">Ans: </span>
                {data.consistentAnswer2}
              </p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg p-5">
            <div>
              <div className="py-1">
                <h1 className="font-semibold">Manager Comment</h1>
                <p>{data.consistentReply} </p>
              </div>
              <div className="py-1">
                <h1 className="font-semibold">
                  Rating:{" "}
                  {data.consistentRating > 0 ? (
                    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                      {data.consistentRating}
                    </span>
                  ) : (
                    ""
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <h1 className="text-lg font-bold text-gray-700 capitalize">
          Be Ambitious – Strive to innovate, grow and improve in all that you do
        </h1>

        <div className="pl-5">
          <div className="px-5">
            <div className="py-1">
              <h1 className="font-semibold ">
                1. Tell us about a situation where you have shown ambition?
              </h1>
              <p>
                <span className="font-bold">Ans: </span> {data.ambitiousAnswer1}
              </p>
            </div>
            <div className="py-1 ">
              <h1 className="font-semibold">
                2. Tell us about a situation where you have not lived this value
                and what you have learnt from it. How can you improve?
              </h1>
              <p>
                <span className="font-bold">Ans: </span> {data.ambitiousAnswer2}
              </p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg p-5">
            <div>
              <div className="py-1">
                <h1 className="font-semibold">Manager Comment</h1>
                <p>{data.ambitiousReply} </p>
              </div>
              <div className="py-1">
                <h1 className="font-semibold">
                  Rating:{" "}
                  {data.ambitiousRating > 0 ? (
                    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                      {data.ambitiousRating}
                    </span>
                  ) : (
                    ""
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        <h1 className="text-lg font-bold text-gray-700 capitalize">
          Be Positive - Stay upbeat and keep a fun attitude
        </h1>
        <div className="pl-5">
          <div className="px-5">
            <div className="py-1">
              <h1 className="font-semibold ">
                1. Tell us about a situation where you have shown positivity?
              </h1>
              <p>
                <span className="font-bold">Ans: </span> {data.positiveAnswer1}
              </p>
            </div>
            <div className="py-1 ">
              <h1 className="font-semibold">
                2. Tell us about a situation where you have not lived this value
                and what you have learnt from it. How can you improve?
              </h1>
              <p>
                <span className="font-bold">Ans: </span> {data.positiveAnswer2}
              </p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg p-5">
            <div>
              <div className="py-1">
                <h1 className="font-semibold">Manager Comment</h1>
                <p>{data.positiveReply} </p>
              </div>
              <div className="py-1">
                <h1 className="font-semibold">
                  Rating:{" "}
                  {data.positiveRating > 0 ? (
                    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                      {data.positiveRating}
                    </span>
                  ) : (
                    ""
                  )}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BehaviorsList;
