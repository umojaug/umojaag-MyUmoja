import React from "react";
// import BehaviorsList from "../../components/BehaviorsList";
// import LeadershipList from "../../components/LeadershipList";
// import PersonalDevList from "../../components/PersonalDevList";
// import PersonalList from "../../components/PersonalList";
// import ObjectivesList from "../../components/ObjectivesList";
import EmployeeDetails from "../../components/EmployeeDetails";
import Reject from "../../components/Reject";
import ObjectivesListThree from "../../components/ObjectivesListThree";

const ViewApplication = ({ data, action }) => {
  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <EmployeeDetails
        data={{
          evaluationTypeName: data.evaluationTypeName,
          employeePin: data.employeePin,
          employeeName: data.employeeName,
          designationName: data.designationName,
          startDate: data.startDate,
          endDate: data.endDate,
          managerName: data.managerName,
          totalRating: data.totalRating,
        }}
      />
      <ObjectivesListThree
        data={{
          objectiveDetailsOne: data.objectiveDetailsOne,
          employeeCommentOne: data.employeeCommentOne,
          managerCommentOne: data.managerCommentOne,
          probationReview: data.probationReview,
          answer1: data.answer1,
          answer2: data.answer2,
          answer3: data.answer3,
        }}
      />
      {/* <BehaviorsList
        data={{
          ambitiousAnswer1: data.ambitiousAnswer1,
          ambitiousAnswer2: data.ambitiousAnswer2,
          consistentAnswer1: data.consistentAnswer1,
          consistentAnswer2: data.consistentAnswer2,
          positiveAnswer1: data.positiveAnswer1,
          positiveAnswer2: data.positiveAnswer2,
          ambitiousReply: data.ambitiousReply,
          ambitiousRating: data.ambitiousRating,
          consistentReply: data.consistentReply,
          consistentRating: data.consistentRating,
          positiveReply: data.positiveReply,
          positiveRating: data.positiveRating,
        }}
      />
      {data.isLeadership === 1 && (
        <LeadershipList
          data={{
            innovationComment: data.innovationComment,
            leadsComment: data.leadsComment,
            resultComment: data.resultComment,
            innovationReply: data.innovationReply,
            innovationRating: data.innovationRating,
            leadsReply: data.leadsReply,
            leadsRating: data.leadsRating,
            resultReply: data.resultReply,
            resultRating: data.resultRating,
          }}
        />
      )}
      <PersonalList
        data={{
          evaPersonalId: data.evaPersonalId,
          answer1: data.answer1,
          answer2: data.answer2,
          answer3: data.answer3,
          answer4: data.answer4,
          answer5: data.answer5,
          managerComment: data.managerComment,
        }}
      />

      <PersonalDevList
        data={{
          evaPersonalDevId: data.evaPersonalDevId,
          evaluationId: data.evaluationId,
          developmentNeedOne: data.developmentNeedOne,
          supportByOne: data.supportByOne,
          timelineOne:
            data.timelineOne !== "1980-12-31T00:00:00"
              ? new Date(data.timelineOne)
              : "",
          reviewDateOne:
            data.reviewDateOne !== "1980-12-31T00:00:00"
              ? new Date(data.reviewDateOne)
              : "",
          developmentNeedTwo: data.developmentNeedTwo,
          supportByTwo: data.supportByTwo,
          timelineTwo:
            data.timelineTwo !== "1980-12-31T00:00:00"
              ? new Date(data.timelineTwo)
              : "",
          reviewDateTwo:
            data.reviewDateTwo !== "1980-12-31T00:00:00"
              ? new Date(data.reviewDateTwo)
              : "",
          developmentNeedThree: data.developmentNeedThree,
          supportByThree: data.supportByThree,
          timelineThree:
            data.timelineThree !== "1980-12-31T00:00:00"
              ? new Date(data.timelineThree)
              : "",
          reviewDateThree:
            data.reviewDateThree !== "1980-12-31T00:00:00"
              ? new Date(data.reviewDateThree)
              : "",
          managerCommentDev: data.managerCommentDev,
        }}
      /> */}

      <div className="grid">
        <button
          className="btn-umojayellow w-full h-10"
          onClick={() => action(1)}
        >
          Continue manager comments
        </button>
      </div>
      <Reject id={data.evaluationId} />
    </div>
  );
};

export default ViewApplication;
