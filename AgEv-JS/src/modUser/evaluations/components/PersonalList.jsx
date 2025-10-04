import React from "react";
import TopHeader from "../../../components/TopHeader";

const PersonalList = ({ data }) => {
  return (
    <>
      <TopHeader title="Personal Development Roadmap" />
      <p className="text-justify">
        Your team members career and success is important to us and in order to
        progress and develop it is good to talk about their personal goals and
        hopes for the forthcoming year and what development areas they might
        have to work on in order to get there. Below, they have provided their
        feedback on their personal development roadmap. In the Managers Comments
        box please provide your feedback on what they have outlined and any
        support you think you can provide.
      </p>

      <div key={data.evaPersonalId} className="px-3">
        <div className="pl-5">
          <div className="py-1">
            <h1 className="font-semibold ">
              1. What are your personal Umoja career goals?
            </h1>
            <p>
              <span className="font-bold">Ans: </span> {data.answer1}
            </p>
          </div>
          <div className="py-1">
            <h1 className="font-semibold">
              2. What actions can you take to help yourself achieve your
              personal Umoja career goals?
            </h1>
            <p>
              <span className="font-bold">Ans: </span> {data.answer2}
            </p>
          </div>
          <div className="py-1">
            <h1 className="font-semibold">
              3. How can the company or your Line Manager help you to achieve
              your goals?
            </h1>
            <p>
              <span className="font-bold">Ans: </span> {data.answer3}
            </p>
          </div>
          <div className="py-1">
            <h1 className="font-semibold">
              4. Are there any behaviours or actions that you need to stop doing
              that might be hindering your progression?
            </h1>
            <p>
              <span className="font-bold">Ans: </span> {data.answer4}
            </p>
          </div>
          <div className="py-1">
            <h1 className="font-semibold">
              5. What are your key strengths that you can do more of that will
              help you to achieve your career goals?
            </h1>
            <p>
              <span className="font-bold">Ans: </span> {data.answer5}
            </p>
          </div>
          <div className="py-1">
            <h1 className="font-bold">Manager Comment</h1>
            <p>{data.managerComment}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalList;
