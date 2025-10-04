import React from "react";
import TopHeader from "../../../components/TopHeader";

const ObjectivesListSix = ({ data }) => {
  return (
    <>
      <TopHeader title="Performance Objectives" />
      <p className="text-justify">
        In the section below you will see your team members objectives and their
        comments on how they have performed against each objective. Please read
        carefully through their comments. If they have not provided detailed
        comments or if they have missed any information please click the reject
        button and speak to your team member to guide them on how to rectify any
        issues. If they have completed it correctly please go ahead and add your
        feedback on their performance into the Manager comments boxes. When
        selecting your performance rating for each objective the meaning of each
        rating is as follows:
        <br />1 = requires development. This means the employee has regularly
        failed to meet their target, they are not performing at the level
        expected and they need performance improvement support and development.{" "}
        <br />2 = Good performance. This means the employee is meeting
        performance expectations. <br />3 = Consistently Strong Performance.
        This means that the employee is always meeting performance expectations
        and often exceeds expectations. <br />4 = Exceptional Performance. This
        means that the employee is always above and beyond expected performance
        levels. They are always meeting and exceeding their targets and going
        above and beyond what is needed. They go the extra mile every time.
      </p>

      <div className="grid grid-cols-1 gap-y-5">
        <div className="grid grid-cols-2 rounded-lg">
          <div className="grid grid-cols-1 place-content-start">
            <h2 className="font-bold">Objective Details</h2>
            {data.objectiveDetailsOne}
          </div>
          <div className="grid grid-cols-1 gap-y-5">
            <div>
              <h2 className="font-bold">Employee comment</h2>
              {data.employeeCommentOne}
            </div>
            <div>
              <h2 className="font-bold">Manager comment</h2>
              {data.managerCommentOne}
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 rounded-lg">
          <div className="grid grid-cols-1 place-content-start">
            <h2 className="font-bold">Objective Details</h2>
            {data.objectiveDetailsTwo}
          </div>
          <div className="grid grid-cols-1 gap-y-5">
            <div>
              <h2 className="font-bold">Employee comment</h2>
              {data.employeeCommentTwo}
            </div>
            <div>
              <h2 className="font-bold">Manager comment</h2>
              {data.managerCommentTwo}
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 rounded-lg">
          <div className="grid grid-cols-1 place-content-start">
            <h2 className="font-bold">Objective Details</h2>
            {data.objectiveDetailsThree}
          </div>
          <div className="grid grid-cols-1 gap-y-5">
            <div>
              <h2 className="font-bold">Employee comment</h2>
              {data.employeeCommentThree}
            </div>
            <div>
              <h2 className="font-bold">Manager comment</h2>
              {data.managerCommentThree}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <TopHeader title="Let's Reflect" />
          <p className="text-justify">
            In section 2 we would like to discuss what has gone well over the
            past 6 months, what could be improved and what support you may need
            moving forward. Please answer the following questions and review
            with your Line Manager during your probation review meeting..
          </p>

          <div className="px-3">
            <div className="pl-5">
              <div className="py-1">
                <h1 className="font-semibold ">
                  1. What has gone well during your first few months as part of
                  the Umoja team?
                </h1>
                <p>
                  <span className="font-bold">Ans: </span> {data.answer1}
                </p>
              </div>
              <div className="py-1">
                <h1 className="font-semibold">
                  2.What challenges have you faced during your first few months
                  and how have you tried to overcome these?
                </h1>
                <p>
                  <span className="font-bold">Ans: </span> {data.answer2}
                </p>
              </div>
              <div className="py-1">
                <h1 className="font-semibold">
                  3.What can you do to strive to continuously improve your
                  performance and how can the company support you?
                </h1>
                <p>
                  <span className="font-bold">Ans: </span> {data.answer3}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h3>
            <span className="text-black font-bold">
              Probation Review Outcome:
            </span>{" "}
            <span
              className={`font-bold   ${
                (data.probationReview === "Pass" && "text-green-500") ||
                (data.probationReview === "Fail" && "text-red-500") ||
                (data.probationReview === "Extension of 3 months" &&
                  "text-yellow-600")
              }`}
            >
              {data.probationReview}
            </span>{" "}
          </h3>
        </div>
      </div>
    </>
  );
};

export default ObjectivesListSix;
