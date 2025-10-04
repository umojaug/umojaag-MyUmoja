import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import PrintHeader from "../../../../components/PrintHeader";
import { useGetData } from "../../../../hooks/dataApi";
import RiskRegisterDetailsEdit from "./RiskRegisterDetailsEdit";
import RamdomButton from "../../../../components/button/RamdomButton";
import SearchHeader from "../../../../components/SearchHeader";

const RiskRegisterList = () => {
  const [query, setQuery] = useState("");

  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("hrDepartment", `/riskRegisterDetails/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const principleRisks = [...new Set(list.data.map((x) => x.principleRisks))];

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      (item.principleRisks &&
        item.principleRisks.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.riskCode &&
        item.riskCode.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.riskRegisterDetailsId &&
        item.riskRegisterDetailsId
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1) ||
      (item.specificRisk &&
        item.specificRisk.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.riskIndicator &&
        item.riskIndicator.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.indicatorType &&
        item.indicatorType.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.umojaRiskAppetite &&
        item.umojaRiskAppetite.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.riskOwner &&
        item.riskOwner.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.assignedRiskOwner &&
        item.assignedRiskOwner.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      item.likelihoodRating.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.consequenceRating.toLowerCase().indexOf(query.toLowerCase()) !==
        -1 ||
      (item.overallRatin &&
        item.overallRating.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.riskRatingLevel &&
        item.riskRatingLevel.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.comment &&
        item.comment.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.mitigationPlan &&
        item.mitigationPlan.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.riskOfficer &&
        item.riskOfficer.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.timeline &&
        item.timeline.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.riskParameterCheck &&
        item.riskParameterCheck.toLowerCase().indexOf(query.toLowerCase()))
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader
        title="Risk Register Details List"
        // btn="Save"
        // path="/audit/other/risk/register/add"
      />
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="RiskRegisterDetailsReport.csv"
          data={data.map(
            ({
              riskCode,
              principleRisks,
              specificRisk,
              riskIndicator,
              indicatorType,
              umojaRiskAppetite,
              riskOwner,
              assignedRiskOwner,
              likelihoodRating,
              consequenceRating,
              overallRating,
              riskRatingLevel,
              attachment,
              comment,
              mitigationPlan,
              timeline,
              riskOfficer,
              riskParameterCheck,
            }) => ({
              riskCode,
              principleRisks,
              specificRisk,
              riskIndicator,
              indicatorType,
              umojaRiskAppetite,
              riskOwner,
              assignedRiskOwner,
              likelihoodRating,
              consequenceRating,
              overallRating,
              riskRatingLevel,
              attachment,
              comment,
              mitigationPlan,
              timeline,
              riskOfficer,
              riskParameterCheck,
            })
          )}
          headers={[
            { label: "report Type", key: "reportType" },
            { label: "Year", key: "year" },
            { label: "Reporting Quarter", key: "reportingQuarter" },
            { label: "Month Of Audit", key: "monthOfAudit" },
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Region Name", key: "regionName" },

            { label: "Detection Method", key: "detectionMethod" },
            { label: "Type Of FraudName", key: "typeOfFraudName" },
            { label: "Who Might Be Involved", key: "whoMightBeInvolved" },
            { label: "Position Of Fraudster", key: "positionOfFraudster" },
            {
              label: "Length Of Service Of Fraudster",
              key: "lengthOfServiceOfFraudster",
            },
            {
              label: "How Is The Fraud Being Perpetrated",
              key: "howIsTheFraudBeingPerpetrated",
            },
            { label: "Number Of Occurences", key: "numberOfOccurences" },
            { label: "Potential Witness", key: "potentialWitness" },
            { label: "Statements", key: "statements" },
            { label: "Observations", key: "observations" },
            {
              label: "Defective Controls Identified",
              key: "defectiveControlsIdentified",
            },
            { label: "Estimated FraudLoss", key: "estimatedFraudLoss" },
            { label: "Recommendations", key: "recommendations" },
            { label: "Management Response", key: "managementResponse" },
            { label: "Implemented By", key: "implementedByName" },
            { label: "IA Incharge", key: "iaInChargeName" },
            { label: "Amount Recovered", key: "amountRecovered" },
            { label: "Status", key: "status" },
            { label: "Current Status Update", key: "currentStatusUpdate" },
            { label: "Comments", key: "comments" },
          ]}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <RamdomButton principleRisks={principleRisks} action={setQuery} />
      </div>
      <SearchHeader placeholder="Branch" action={setQuery} />

      <div className="overflow-auto h-96 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="p-2 whitespace-nowrap text-center"></th>
              <th className="p-2 whitespace-nowrap text-center">Risk Code</th>
              <th className="p-2 whitespace-nowrap text-center">
                Principle Risks
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Specific Risk
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Risk Indicator
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Indicator Type
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Umoja Risk Appetite
              </th>
              <th className="p-2 whitespace-nowrap text-center">Risk Owner</th>
              <th className="p-2 whitespace-nowrap text-center">
                Assigned Risk Owner
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Likelihood Rating
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Consequence Rating
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Overall Rating
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Risk Rating Level
              </th>
              <th className="p-2 whitespace-nowrap text-center">Attachment</th>
              <th className="p-2 whitespace-nowrap text-center">Comment</th>
              <th className="p-2 whitespace-nowrap text-center">
                Mitigation Plan
              </th>
              <th className="p-2 whitespace-nowrap text-center">Timeline</th>
              <th className="p-2 whitespace-nowrap text-center">
                Risk Officer
              </th>
              <th className="p-2 whitespace-nowrap text-center">
                Risk Parameter Check
              </th>
              <th className="p-2 whitespace-nowrap text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-umojablue hover:text-white space-x-2 odd:bg-gray-100 even:bg-gray-200"
                >
                  <td>
                    <RiskRegisterDetailsEdit
                      riskRegisterDetailsId={item.riskRegisterDetailsId}
                    />
                  </td>
                  <td className="p-2 align-top text-center">{item.riskCode}</td>
                  <td className="p-2 align-top text-center">
                    {item.principleRisks}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.specificRisk}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskIndicator}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.indicatorType}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.umojaRiskAppetite}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskOwner}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.assignedRiskOwner}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.likelihoodRating}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.consequenceRating}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.overallRating}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskRatingLevel}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.attachment}
                  </td>
                  <td className="p-2 align-top text-center">{item.comment}</td>
                  <td className="p-2 align-top text-center">
                    {item.mitigationPlan}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.timeline !== "1980-12-31T00:00:00"
                      ? new Date(item.timeline).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskOfficer}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskParameterCheck}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskRegisterList;
