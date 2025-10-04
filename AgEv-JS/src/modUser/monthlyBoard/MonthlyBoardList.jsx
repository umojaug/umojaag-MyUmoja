import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import PrintHeader from "../../components/PrintHeader";
import SearchHeader from "../../components/SearchHeader";
import TaskButton from "../../components/button/TaskButton";
import EditButton from "../../components/button/EditButton";
import { format } from "date-fns";
import MonthlySubmitButton from "./MonthlySubmitButton";
import PdfButton from "../../components/button/PdfButton";

const MonthlyBoardList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrAuditBranchDepartmentAuditReport", `/boardMonth/list`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;
  console.log(data, "data");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Monthly Board List" />
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="monthboard.csv"
          data={data.map(
            ({
              reportMonth,
              reportYear,
              // companyName,
              preparedBy,
              reportDate,
              executiveSummary,
              significantDevelopments,
              totalHeadcount,
              turnoverRateMonth,
              turnoverRateYTD,
              seniorLevelNewHires,
              seniorLevelVacancies,
              trainingUpdates,
              legalCaseUpdates,
              systemPerformance,
              cybersecurityUpdates,
              itSupportGaps,
              auditPlanExecution,
              emergingRisks,
              fraudSummary,
              riskSummary,
              mitigationSteps,
              upcomingPlans,
              boardInputNeeded,
            }) => ({
              reportMonth,
              reportYear,
              // companyName,
              preparedBy,
              reportDate,
              executiveSummary,
              significantDevelopments,
              totalHeadcount,
              turnoverRateMonth,
              turnoverRateYTD,
              seniorLevelNewHires,
              seniorLevelVacancies,
              trainingUpdates,
              legalCaseUpdates,
              systemPerformance,
              cybersecurityUpdates,
              itSupportGaps,
              auditPlanExecution,
              emergingRisks,
              fraudSummary,
              riskSummary,
              mitigationSteps,
              upcomingPlans,
              boardInputNeeded,
            })
          )}
          headers={[
            { label: "Report Month", key: "reportMonth" },
            { label: "Report Year", key: "reportYear" },
            // { label: "Company ID", key: "companyName" },
            { label: "Prepared By", key: "preparedBy" },
            { label: "Report Date", key: "reportDate" },
            { label: "Executive Summary", key: "executiveSummary" },
            {
              label: "Significant Developments",
              key: "significantDevelopments",
            },
            { label: "Total Headcount", key: "totalHeadcount" },
            { label: "Turnover Rate (Month)", key: "turnoverRateMonth" },
            { label: "Turnover Rate (YTD)", key: "turnoverRateYTD" },
            { label: "Senior Level New Hires", key: "seniorLevelNewHires" },
            { label: "Senior Level Vacancies", key: "seniorLevelVacancies" },
            { label: "Training Updates", key: "trainingUpdates" },
            { label: "Legal Case Updates", key: "legalCaseUpdates" },
            { label: "System Performance", key: "systemPerformance" },
            { label: "Cybersecurity Updates", key: "cybersecurityUpdates" },
            { label: "IT Support Gaps", key: "itSupportGaps" },
            { label: "Audit Plan Execution", key: "auditPlanExecution" },
            { label: "Emerging Risks", key: "emergingRisks" },
            { label: "Fraud Summary", key: "fraudSummary" },
            { label: "Risk Summary", key: "riskSummary" },
            { label: "Mitigation Steps", key: "mitigationSteps" },
            { label: "Upcoming Plans", key: "upcomingPlans" },
            { label: "Board Input Needed", key: "boardInputNeeded" },
          ]}
        />
      </div>
      <SearchHeader
        placeholder="Department / Region / Branch / Test Steps Name / Overview / Finding / Recommendations / Response / followUp / In charge"
        // action={setQuery}
      />
      <div className="overflow-auto h-80 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full ">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="text-center flex w-32"></th>

              <th className="p-2 text-center whitespace-nowrap">
                Report Month
              </th>
              <th className="p-2 text-center whitespace-nowrap">Report Year</th>
              {/* <th className="p-2 text-center whitespace-nowrap">
                Company Name
              </th> */}
              <th className="p-2 text-center whitespace-nowrap">Prepared By</th>
              <th className="p-2 text-center whitespace-nowrap">Report Date</th>
              <th className="p-2 text-center whitespace-nowrap">
                Executive Summary
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Significant Developments
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Total Head Count
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Turnover Rate Month
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Turnover Rate YTD
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Senior Level NewHires
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Senior Level Vacancies
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Training Updates
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Legal Case Updates
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                System Performance
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Cyber security Updates
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                IT Support Gaps
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Audit Plan Execution
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Emerging Risks
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Fraud Summary
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Risk Summary
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Mitigation Steps
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Upcoming Plans
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Board Input Needed
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
                  <td className="p-2 flex justify-between space-x-2 align-top text-center">
                    <TaskButton
                      path={`/monthly/board/details/${item.reportId}`}
                      btnColor="btn-umojayellow"
                    />
                    <EditButton path={`/monthly/board/edit/${item.reportId}`} />
                    <PdfButton
                      path={`/UserReport/BoardMonthlyReport/${item.reportId}`}
                      filename="monthboard.pdf"
                    />
                    <MonthlySubmitButton
                      path={`/boardMonth/submitted/${item.reportId}`}
                    />
                  </td>

                  <td className="p-2 align-top text-center">
                    {item.reportMonth}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.reportYear}
                  </td>
                  {/* <td className="p-2 align-top text-center">
                    {item.companyName}
                  </td>  */}
                  <td className="p-2 align-top text-center">
                    {item.preparedBy}
                  </td>
                  <td className="p-2 align-top text-center">
                    {format(new Date(item.reportDate), "dd/MMM/yyyy")}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.executiveSummary}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.significantDevelopments}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.totalHeadcount}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.turnoverRateMonth}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.turnoverRateYTD}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.seniorLevelNewHires}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.seniorLevelVacancies}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.trainingUpdates}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.legalCaseUpdates}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.systemPerformance}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.cybersecurityUpdates}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.itSupportGaps}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.auditPlanExecution}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.emergingRisks}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.fraudSummary}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskSummary}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.mitigationSteps}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.upcomingPlans}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.boardInputNeeded}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyBoardList;
