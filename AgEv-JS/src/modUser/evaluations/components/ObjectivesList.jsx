import React from "react";
import TopHeader from "../../../components/TopHeader";

const ObjectivesList = ({ data }) => {
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
            {
              <div>
                <h2 className="font-bold">
                  Rating:{" "}
                  {data.ratingOne > 0 ? (
                    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                      {data.ratingOne}
                    </span>
                  ) : (
                    ""
                  )}
                </h2>
              </div>
            }
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
            <div>
              <h2 className="font-bold">
                Rating:{" "}
                {data.ratingTwo > 0 ? (
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                    {data.ratingTwo}
                  </span>
                ) : (
                  ""
                )}
              </h2>
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
            <div>
              <h2 className="font-bold">
                Rating:{" "}
                {data.ratingThree > 0 ? (
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                    {data.ratingThree}
                  </span>
                ) : (
                  ""
                )}
              </h2>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 rounded-lg">
          <div className="grid grid-cols-1 place-content-start">
            <h2 className="font-bold">Objective Details</h2>
            {data.objectiveDetailsFour}
          </div>
          <div className="grid grid-cols-1 gap-y-5">
            <div>
              <h2 className="font-bold">Employee comment</h2>
              {data.employeeCommentFour}
            </div>
            <div>
              <h2 className="font-bold">Manager comment</h2>
              {data.managerCommentFour}
            </div>
            <div>
              <h2 className="font-bold">
                Rating:{" "}
                {data.ratingFour > 0 ? (
                  <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded">
                    {data.ratingFour}
                  </span>
                ) : (
                  ""
                )}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ObjectivesList;
