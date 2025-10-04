import { useGetData } from "../../../hooks/dataApi";
import TopHeader from "../../../components/TopHeader";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TaskButton from "../../../components/button/TaskButton";
import EditButton from "../../../components/button/EditButton";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import { useState } from "react";
import { AiOutlineFile } from "react-icons/ai";

const AuditSpecialInvestigationReportList = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "hrAuditSpecialInvestigationReport",
    "/auditSpecialInvestigationReport/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      (item.departmentName !== null &&
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.regionName !== null &&
        item.regionName.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.whoMightBeInvolved !== null &&
        item.whoMightBeInvolved.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.positionOfFraudster !== null &&
        item.positionOfFraudster.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.howIsTheFraudBeingPerpetrated !== null &&
        item.howIsTheFraudBeingPerpetrated
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1) ||
      (item.potentialWitness !== null &&
        item.potentialWitness.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.observations !== null &&
        item.observations.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
      (item.defectiveControlsIdentified !== null &&
        item.defectiveControlsIdentified
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1) ||
      (item.estimatedFraudLoss !== null &&
        item.estimatedFraudLoss.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.recommendations !== null &&
        item.recommendations.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.managementResponse !== null &&
        item.managementResponse.toLowerCase().indexOf(query.toLowerCase()) !==
          -1) ||
      (item.branchName !== null &&
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    ) {
      return item;
    } else return null;
  });
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Report"
        btn="Save"
        path="/audit/reporting/Special/Investigation/add"
      />

      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="SpecialInvestigationReport.csv"
          data={data.map(
            ({
              year,
              reportingQuarter,
              monthOfAudit,
              branchName,
              departmentName,
              regionName,
              detectionMethod,
              typeOfFraudName,
              whoMightBeInvolved,
              positionOfFraudster,
              lengthOfServiceOfFraudster,
              howIsTheFraudBeingPerpetrated,
              numberOfOccurences,
              potentialWitness,
              evidence1,
              statements,
              observations,
              defectiveControlsIdentified,
              estimatedFraudLoss,
              recommendations,
              managementResponse,
              implementedByName,
              iaInChargeName,
              amountRecovered,
              status,
              currentStatusUpdate,
            }) => ({
              year,
              reportingQuarter,
              monthOfAudit,
              branchName,
              departmentName,
              regionName,
              detectionMethod,
              typeOfFraudName,
              whoMightBeInvolved,
              positionOfFraudster,
              lengthOfServiceOfFraudster,
              howIsTheFraudBeingPerpetrated,
              numberOfOccurences,
              potentialWitness,
              evidence1,
              statements,
              observations,
              defectiveControlsIdentified,
              estimatedFraudLoss,
              recommendations,
              managementResponse,
              implementedByName,
              iaInChargeName,
              amountRecovered,
              status,
              currentStatusUpdate,
            })
          )}
          headers={[
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
            { label: "Evidence1", key: "evidence1" },
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
          ]}
        />
      </div>
      <SearchHeader
        placeholder="Department / Region / Involved / Fraudster / Perpetrated / Witness / Observations / Recommendations / Response"
        action={setQuery}
      />

      <div className="overflow-auto h-96  border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="text-center flex w-32"></th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Year
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Reporting Quarter
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Month Of Audit
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Department Name
              </th>

              <th className="p-2 transform  whitespace-nowrap text-center">
                Branch Name
              </th>

              <th className="p-2 transform  whitespace-nowrap text-center">
                Region Name
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Detection Method
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Type of Fraud
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Who might be involved?
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Position of Fraudster
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Length of Service of fraudster
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                How is the fraud being perpetrated?
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Number of occurrences
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Potential Witness
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Statements
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Observations
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Defective controls identified
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Estimated fraud loss
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Recommendations
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Management Response
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Implemented by
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                IA InCharge
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Amount Recovered
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Status
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Current Status Update
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-umojablue hover:text-white space-x-2 odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex justify-between space-x-2 align-top text-center">
                    {/* <TaskButton
                      path={`/audit/reporting/Special/comments/${item.reportId}`}
                      btnColor="btn-gray"
                    /> */}

                    {item.isComment === 0 ? (
                      <TaskButton
                        path={`/audit/reporting/Special/comments/${item.reportId}`}
                        btnColor="btn-gray"
                      />
                    ) : (
                      <TaskButton
                        path={`/audit/reporting/Special/comments/${item.reportId}`}
                        btnColor="btn-red"
                      />
                    )}
                    <EditButton
                      path={`/audit/reporting/Special/Investigation/edit/${item.reportId}`}
                      btnColor="btn-gray"
                    />
                  </td>

                  <td className="p-2 align-top text-center">{item.year}</td>

                  <td className="p-2 align-top text-center">
                    {item.reportingQuarter}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.monthOfAudit}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.departmentName}
                  </td>

                  <td className="p-2 align-top text-center">
                    {item.branchName}
                  </td>

                  <td className="p-2 align-top text-center">
                    {item.regionName}
                  </td>

                  <td className="p-2 align-top text-center">
                    {item.detectionMethod}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.typeOfFraudName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.whoMightBeInvolved}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.positionOfFraudster}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.lengthOfServiceOfFraudster}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.howIsTheFraudBeingPerpetrated}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.numberOfOccurences}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.potentialWitness}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.statements && (
                      <a href={item.statements} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.evidence1 && (
                      <a href={item.evidence1} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.observations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.defectiveControlsIdentified}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.estimatedFraudLoss}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.recommendations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.managementResponse}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.implementedByName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.iaInChargeName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.amountRecovered}
                  </td>
                  <td className="p-2 align-top text-center">{item.status}</td>
                  <td className="p-2 align-top text-center">
                    {item.currentStatusUpdate}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditSpecialInvestigationReportList;
