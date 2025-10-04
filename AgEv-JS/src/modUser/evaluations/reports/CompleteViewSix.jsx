import React from "react";
import { useParams } from "react-router-dom";
// import BehaviorsList from "../components/BehaviorsList";
// import LeadershipList from "../components/LeadershipList";
// import PersonalDevList from "../components/PersonalDevList";
// import PersonalList from "../components/PersonalList";
// import ObjectivesList from "../components/ObjectivesList";
import EmployeeDetails from "../components/EmployeeDetails";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import ObjectivesListSix from "../components/ObjectivesListSix";

const CompleteViewSix = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("evaluationdetailsinfo", `/evaluation/detailsinfoSix/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <EmployeeDetails
        data={{
          evaluationTypeName: list.data.evaluationTypeName,
          employeePin: list.data.employeePin,
          employeeName: list.data.employeeName,
          designationName: list.data.designationName,
          startDate: list.data.startDate,
          endDate: list.data.endDate,
          managerName: list.data.managerName,
          totalRating: list.data.totalRating,
        }}
      />
      <ObjectivesListSix
        data={{
          objectiveDetailsOne: list.data.objectiveDetailsOne,
          employeeCommentOne: list.data.employeeCommentOne,
          objectiveDetailsTwo: list.data.objectiveDetailsTwo,
          employeeCommentTwo: list.data.employeeCommentTwo,
          objectiveDetailsThree: list.data.objectiveDetailsThree,
          employeeCommentThree: list.data.employeeCommentThree,
          managerCommentOne: list.data.managerCommentOne,
          managerCommentTwo: list.data.managerCommentTwo,
          managerCommentThree: list.data.managerCommentThree,
          probationReview: list.data.probationReview,
          answer1: list.data.answer1,
          answer2: list.data.answer2,
          answer3: list.data.answer3,
        }}
      />
      {/* <BehaviorsList
        data={{
          ambitiousAnswer1: list.data.ambitiousAnswer1,
          ambitiousAnswer2: list.data.ambitiousAnswer2,
          consistentAnswer1: list.data.consistentAnswer1,
          consistentAnswer2: list.data.consistentAnswer2,
          positiveAnswer1: list.data.positiveAnswer1,
          positiveAnswer2: list.data.positiveAnswer2,
          ambitiousReply: list.data.ambitiousReply,
          ambitiousRating: list.data.ambitiousRating,
          consistentReply: list.data.consistentReply,
          consistentRating: list.data.consistentRating,
          positiveReply: list.data.positiveReply,
          positiveRating: list.data.positiveRating,
        }}
      />
      {list.data.isLeadership === 1 && (
        <LeadershipList
          data={{
            innovationComment: list.data.innovationComment,
            leadsComment: list.data.leadsComment,
            resultComment: list.data.resultComment,
            innovationReply: list.data.innovationReply,
            innovationRating: list.data.innovationRating,
            leadsReply: list.data.leadsReply,
            leadsRating: list.data.leadsRating,
            resultReply: list.data.resultReply,
            resultRating: list.data.resultRating,
          }}
        />
      )}
      <PersonalList
        data={{
          evaPersonalId: list.data.evaPersonalId,
          answer1: list.data.answer1,
          answer2: list.data.answer2,
          answer3: list.data.answer3,
          answer4: list.data.answer4,
          answer5: list.data.answer5,
          managerComment: list.data.managerComment,
        }}
      />
      <PersonalDevList
        data={{
          developmentNeedOne: list.data.developmentNeedOne,
          supportByOne: list.data.supportByOne,
          timelineOne: list.data.timelineOne,
          reviewDateOne: list.data.reviewDateOne,
          developmentNeedTwo: list.data.developmentNeedTwo,
          supportByTwo: list.data.supportByTwo,
          timelineTwo: list.data.timelineTwo,
          reviewDateTwo: list.data.reviewDateTwo,
          developmentNeedThree: list.data.developmentNeedThree,
          supportByThree: list.data.supportByThree,
          timelineThree: list.data.timelineThree,
          reviewDateThree: list.data.reviewDateThree,
          managerCommentDev: list.data.managerCommentDev,
        }}
      /> */}
    </div>
  );
};

export default CompleteViewSix;
