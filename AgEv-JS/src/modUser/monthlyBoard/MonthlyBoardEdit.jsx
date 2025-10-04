import MonthlyBoardForm from "./MonthlyBoardForm";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { useParams } from "react-router";
import TopHeader from "../../components/TopHeader";
import { format } from "date-fns";

const MonthlyBoardEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("detailsMonthlyBoard", `/boardMonth/Details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Monthly Board" btn="Return" path="/monthly/board/list" />
      <div className="bg-gray-50 rounded-lg shadow-md border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span className="text-gray-600 text-sm">Report Month</span>
            <p className="font-semibold text-gray-900">{list.data.reportMonth}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Report Year</span>
            <p className="font-semibold text-gray-900">{list.data.reportYear}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Prepared By</span>
            <p className="font-semibold text-gray-900">{list.data.preparedBy}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Report Date</span>
            <p className="font-semibold text-gray-900">
              {format(new Date(list.data.reportDate), "dd/MMM/yyyy")}
            </p>
          </div>
        </div>
      </div>

      <MonthlyBoardForm
        defaultValues={{
          reportId: list.data.reportId,
          executiveSummary: list.data.executiveSummary,
          significantDevelopments: list.data.significantDevelopments,
          totalHeadcount: list.data.totalHeadcount,
          turnoverRateMonth: list.data.turnoverRateMonth,
          turnoverRateYTD: list.data.turnoverRateYTD,
          seniorLevelNewHires: list.data.seniorLevelNewHires,
          seniorLevelVacancies: list.data.seniorLevelVacancies,
          trainingUpdates: list.data.trainingUpdates,
          legalCaseUpdates: list.data.legalCaseUpdates,
          systemPerformance: list.data.systemPerformance,
          cybersecurityUpdates: list.data.cybersecurityUpdates,
          itSupportGaps: list.data.itSupportGaps,
          auditPlanExecution: list.data.auditPlanExecution,
          emergingRisks: list.data.emergingRisks,
          fraudSummary: list.data.fraudSummary,
          riskSummary: list.data.riskSummary,
          mitigationSteps: list.data.mitigationSteps,
          upcomingPlans: list.data.upcomingPlans,
          boardInputNeeded: list.data.boardInputNeeded,
        }}
        path="/boardMonth/update"
        action={() => { }}
        returnPath="/monthly/board/list"
      />
    </div>
  );
};

export default MonthlyBoardEdit;
