import React, { useState } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import EditButton from "../../../../components/button/EditButton";
import SearchHeader from "../../../../components/SearchHeader";
import { format } from "date-fns";
import PrintHeader from "../../../../components/PrintHeader";
import TaskButton from "../../../../components/button/TaskButton";
import { useParams } from "react-router-dom";

const AuditRegionReportDetailsList = () => {
  const [query, setQuery] = useState("");
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "hrAuditBranchDepartmentAuditReport",
    `/AuditRegionReportDetails/list/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      (item.testStepsName !== null &&
        item.testStepsName.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.regionOverview !== null &&
        item.regionOverview.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.detailedAuditFinding !== null &&
        item.detailedAuditFinding.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.recommendations !== null &&
        item.recommendations.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.managementResponse !== null &&
        item.managementResponse.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.repeatFinding !== null &&
        item.repeatFinding.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.followUpCommentIfAny !== null &&
        item.followUpCommentIfAny.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.iaInCharge !== null &&
        item.iaInCharge.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Region Audit Report Details" />

      {data.length > 0 && (
        <div className="grid grid-cols-3 gap-1">
          <div className="">Audit Year : {list.data[0].year} </div>
          <div className="">
            Department Name :{list.data[0].departmentName}{" "}
          </div>
          <div className="">Region : {list.data[0].regionName} </div>
        </div>
      )}
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="RegionAuditReport.csv"
          data={data.map(
            ({
              year,
              reportingQuarter,
              monthOfAudit,
              branchName,
              departmentName,
              regionName,
              testStepsName,
              areaOfReviewName,
              detailedAuditFinding,
              primaryRootCauseName,
              riskImplicationName,
              recommendations,
              implementedByName,
              riskCategory,
              regionResponse,
              managementResponse,
              commitmentDate,
              overallControlsAssessment,
              fraudRisk,
              repeatFinding,
              followUpCommentIfAny,
              inChargeName,
              appendices,
            }) => ({
              year,
              reportingQuarter,
              monthOfAudit,
              branchName,
              departmentName,
              regionName,
              testStepsName,
              areaOfReviewName,
              detailedAuditFinding,
              primaryRootCauseName,
              riskImplicationName,
              recommendations,
              implementedByName,
              riskCategory,
              regionResponse,
              managementResponse,
              commitmentDate,
              overallControlsAssessment,
              fraudRisk,
              repeatFinding,
              followUpCommentIfAny,
              inChargeName,
              appendices,
            })
          )}
          headers={[
            { label: "Year", key: "year" },
            { label: "Reporting Quarter", key: "reportingQuarter" },
            { label: "Month Of Audit", key: "monthOfAudit" },
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Region Name", key: "regionName" },
            { label: "TestSteps Name", key: "testStepsName" },
            { label: "Audit Area", key: "areaOfReviewName" },
            { label: "Audit Finding", key: "detailedAuditFinding" },
            { label: "Primary Root Cause Name", key: "primaryRootCauseName" },
            {
              label: "Risk Implication Name",
              key: "riskImplicationName",
            },
            {
              label: "Recommendations",
              key: "recommendations",
            },
            { label: "Implemented By Name", key: "implementedByName" },
            { label: "Risk Category", key: "riskCategory" },
            { label: "Region Response", key: "regionResponse" },
            { label: "Management Response", key: "managementResponse" },
            { label: "Commitmen tDate", key: "commitmentDate" },
            {
              label: "Overall Controls Assessment",
              key: "overallControlsAssessment",
            },
            { label: "Fraud Risk", key: "fraudRisk" },
            { label: "Repeat Finding", key: "repeatFinding" },
            { label: "FollowUp Comment If Any", key: "followUpCommentIfAny" },
            { label: "IA In Charge Name", key: "inChargeName" },
            { label: "Appendices", key: "appendices" },
          ]}
        />
      </div>
      <SearchHeader
        placeholder="Department / Region / Test Steps Name / Overview / Finding / Recommendations / Response / followUp / In charge"
        action={setQuery}
      />
      <div className="overflow-auto h-80 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full ">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="text-center flex w-32"></th>
              <th className="p-2 text-center whitespace-nowrap">
                Audit Test
              </th>
              <th className="p-2 text-center whitespace-nowrap">Audit Area</th>
              <th className="p-2 text-center whitespace-nowrap">
                Audit Finding
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Primary Root Cause
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Risk Implication
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Recommendations
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Implemented By
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Risk Category
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Region Response
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Management Response
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Commitment Date
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Overall Controls Assessment
              </th>
              <th className="p-2 text-center whitespace-nowrap">Fraud Risk</th>
              <th className="p-2 text-center whitespace-nowrap">
                Repeat Finding
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Follow Up Comment If Any
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                IA In Charge
              </th>
              <th className="p-2 text-center whitespace-nowrap">Appendices</th>
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
                    {/* <TaskButton
                      path={`/audit/reporting/region/comments/${item.reportDetailsId}`}
                      btnColor="btn-gray"
                    /> */}
                    {item.isComment === 0 ? (
                      <TaskButton
                        path={`/audit/reporting/region/comments/${item.reportDetailsId}`}
                        btnColor="btn-gray"
                      />
                    ) : (
                      <TaskButton
                        path={`/audit/reporting/region/comments/${item.reportDetailsId}`}
                        btnColor="btn-red"
                      />
                    )}
                    <EditButton
                      path={`/audit/reporting/region/details/edit/${item.reportDetailsId}`}
                      btnColor="btn-gray"
                    />
                    {/* <DeleteButton
                      action={refetch}
                      path={`/AuditRegionReport/delete/${item.reportDetailsId}`}
                    /> */}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.testStepsName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.areaOfReviewName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.detailedAuditFinding}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.primaryRootCauseName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskImplicationName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.recommendations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.implementedByName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskCategory}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.regionResponse}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.managementResponse}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.commitmentDate !== "1980-12-31T00:00:00"
                      ? format(new Date(item.commitmentDate), "dd/MMM/yyyy")
                      : ""}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.overallControlsAssessment}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.fraudRisk}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.repeatFinding}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.followUpCommentIfAny}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.inChargeName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.appendices && (
                      <a href={item.appendices} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditRegionReportDetailsList;
