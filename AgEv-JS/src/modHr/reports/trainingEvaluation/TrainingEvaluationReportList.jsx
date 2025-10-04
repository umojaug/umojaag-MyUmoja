import { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import PdfButton from "../../../components/button/PdfButton";

const TrainingEvaluationReportList = () => {
  const [query, setQuery] = useState("all");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "trainingEvaluationlist",
    `/trainingEvaluation/list/${query === "" ? "all" : query}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Training Evaluation Report List" />
      <div className="flex justify-end items-center">
        <PdfButton path={`/hrPdfCommon/trainingList/${query}`} />

        <PrintHeader
          fileName="TrainingFeedback.csv"
          data={data.map(
            ({
              categoryName,
              trainingName,
              designationName,
              employeePin,
              employeeName,
              satisfiedWithOverAllTrainingSession,
              relevantTrainingContentToYourJob,
              effectiveTrainerInDeliveringTheContent,
              usefulTrainingMaterialsProvided,
              engagingTrainingSession,
              likelyApplyLearnedJob,
              didYouLikeMostAboutTheTrainingSession,
              couldImprovedFutureTrainingSessions,
              anyAdditionalCommentsOrSuggestions,
              trainingContent,
              trainersKnowledge,
              trainingEnvironment,
              overallExperience,
            }) => ({
              categoryName,
              trainingName,
              designationName,
              employeePin,
              employeeName,
              satisfiedWithOverAllTrainingSession,
              relevantTrainingContentToYourJob,
              effectiveTrainerInDeliveringTheContent,
              usefulTrainingMaterialsProvided,
              engagingTrainingSession,
              likelyApplyLearnedJob,
              didYouLikeMostAboutTheTrainingSession,
              couldImprovedFutureTrainingSessions,
              anyAdditionalCommentsOrSuggestions,
              trainingContent,
              trainersKnowledge,
              trainingEnvironment,
              overallExperience,
            })
          )}
          headers={[
            { label: "Category Name", key: "categoryName" },
            { label: "Training Name", key: "trainingName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            {
              label: "Satisfied with Overall Training Session",
              key: "satisfiedWithOverAllTrainingSession",
            },
            {
              label: "Relevant Training Content to Your Job",
              key: "relevantTrainingContentToYourJob",
            },
            {
              label: "Effective Trainer in Delivering the Content",
              key: "effectiveTrainerInDeliveringTheContent",
            },
            {
              label: "Useful Training Materials Provided",
              key: "usefulTrainingMaterialsProvided",
            },
            {
              label: "Engaging Training Session",
              key: "engagingTrainingSession",
            },
            { label: "Likely Apply Learned Job", key: "likelyApplyLearnedJob" },
            {
              label: "Did You Like Most About the Training Session",
              key: "didYouLikeMostAboutTheTrainingSession",
            },
            {
              label: "Could Improve Future Training Sessions",
              key: "couldImprovedFutureTrainingSessions",
            },
            {
              label: "Any Additional Comments or Suggestions",
              key: "anyAdditionalCommentsOrSuggestions",
            },
            { label: "Training Content", key: "trainingContent" },
            { label: "Trainer's Knowledge", key: "trainersKnowledge" },
            { label: "Training Environment", key: "trainingEnvironment" },
            { label: "Overall Experience", key: "overallExperience" },
          ]}
        />
      </div>

      <SearchHeader
        placeholder="Designation / Employee Name / Employee Pin "
        action={setQuery}
      />

      <div className="overflow-auto h-96 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full ">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="p-2 text-center whitespace-nowrap">
                Category Name
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Training Name
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Designation Name
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Employee Pin
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Employee Name
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Satisfied With Over All Training Session
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Relevant Training Content To Your Job
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Effective Trainer In Delivering The Content
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                useful were the training materials provided
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Engaging was the training session
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Likely to apply what you learned in your job
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Like most about the training session
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Improved in future training sessions
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Additional comments or suggestions
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Training Content
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Trainer's Knowledge
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Training Environment
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Overall Experience
              </th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  {/* <td className="p-2 flex justify-between align-top text-center">
                    <EditButton
                      path={`/audit/reporting/branch/edit/${item.reportId}`}
                      btnColor="btn-gray"
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/AuditBranchReport/delete/${item.reportId}`}
                    />
                  </td> */}
                  <td className="p-2 align-top text-center">
                    {item.categoryName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.trainingName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.designationName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.employeePin}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.employeeName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.satisfiedWithOverAllTrainingSession}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.relevantTrainingContentToYourJob}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.effectiveTrainerInDeliveringTheContent}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.usefulTrainingMaterialsProvided}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.engagingTrainingSession}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.likelyApplyLearnedJob}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.didYouLikeMostAboutTheTrainingSession}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.couldImprovedFutureTrainingSessions}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.anyAdditionalCommentsOrSuggestions}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.trainingContent}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.trainersKnowledge}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.trainingEnvironment}
                  </td>

                  <td className="p-2 align-top text-center">
                    {item.overallExperience}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingEvaluationReportList;
