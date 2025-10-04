import React from "react";
import EmployeeDetails from "../../components/EmployeeDetails";
import SubmitButton from "./SubmitButton";
import ObjectivesListThree from "../../components/ObjectivesListThree";

const Preview = ({ defaultValues }) => {
  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <EmployeeDetails
        data={{
          evaluationTypeName: defaultValues.evaluationTypeName,
          employeePin: defaultValues.employeePin,
          employeeName: defaultValues.employeeName,
          designationName: defaultValues.designationName,
          startDate: defaultValues.startDate,
          endDate: defaultValues.endDate,
          managerName: defaultValues.managerName,
          totalRating: defaultValues.totalRating,
        }}
      />
      <ObjectivesListThree
        data={{
          objectiveDetailsOne: defaultValues.objectiveDetailsOne,
          employeeCommentOne: defaultValues.employeeCommentOne,
          managerCommentOne: defaultValues.managerCommentOne,
          probationReview: defaultValues.probationReview,
          answer1: defaultValues.answer1,
          answer2: defaultValues.answer2,
          answer3: defaultValues.answer3,
        }}
      />
      {/* <BehaviorsList
        data={{
          ambitiousAnswer1: defaultValues.ambitiousAnswer1,
          ambitiousAnswer2: defaultValues.ambitiousAnswer2,
          consistentAnswer1: defaultValues.consistentAnswer1,
          consistentAnswer2: defaultValues.consistentAnswer2,
          positiveAnswer1: defaultValues.positiveAnswer1,
          positiveAnswer2: defaultValues.positiveAnswer2,
          ambitiousReply: defaultValues.ambitiousReply,
          ambitiousRating: defaultValues.ambitiousRating,
          consistentReply: defaultValues.consistentReply,
          consistentRating: defaultValues.consistentRating,
          positiveReply: defaultValues.positiveReply,
          positiveRating: defaultValues.positiveRating,
        }}
      />
      {defaultValues.isLeadership === 1 && (
        <LeadershipList
          data={{
            innovationComment: defaultValues.innovationComment,
            leadsComment: defaultValues.leadsComment,
            resultComment: defaultValues.resultComment,
            innovationReply: defaultValues.innovationReply,
            innovationRating: defaultValues.innovationRating,
            leadsReply: defaultValues.leadsReply,
            leadsRating: defaultValues.leadsRating,
            resultReply: defaultValues.resultReply,
            resultRating: defaultValues.resultRating,
          }}
        />
      )}
      <PersonalList
        data={{
          evaPersonalId: defaultValues.evaPersonalId,
          answer1: defaultValues.answer1,
          answer2: defaultValues.answer2,
          answer3: defaultValues.answer3,
          answer4: defaultValues.answer4,
          answer5: defaultValues.answer5,
          managerComment: defaultValues.managerComment,
        }}
      />
      <PersonalDevList
        data={{
          developmentNeedOne: defaultValues.developmentNeedOne,
          supportByOne: defaultValues.supportByOne,
          timelineOne: defaultValues.timelineOne,
          reviewDateOne: defaultValues.reviewDateOne,
          developmentNeedTwo: defaultValues.developmentNeedTwo,
          supportByTwo: defaultValues.supportByTwo,
          timelineTwo: defaultValues.timelineTwo,
          reviewDateTwo: defaultValues.reviewDateTwo,
          developmentNeedThree: defaultValues.developmentNeedThree,
          supportByThree: defaultValues.supportByThree,
          timelineThree: defaultValues.timelineThree,
          reviewDateThree: defaultValues.reviewDateThree,
          managerCommentDev: defaultValues.managerCommentDev,
        }}
      /> */}
      {(defaultValues.isSubmit === 0 || defaultValues.isSubmit === 3) && (
        <SubmitButton id={defaultValues.evaluationId} />
      )}
    </div>
  );
};

export default Preview;
