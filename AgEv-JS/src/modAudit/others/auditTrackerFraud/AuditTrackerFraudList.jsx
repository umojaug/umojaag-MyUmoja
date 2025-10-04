import React, { useState } from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import SearchHeader from "../../../components/SearchHeader";
import TopHeader from "../../../components/TopHeader";
import { AiOutlineFile } from "react-icons/ai";
import PrintHeader from "../../../components/PrintHeader";
import AuditTrackerFraudModelEdit from "./AuditTrackerFraudModelEdit";

const AuditTrackerFraudList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditTrackerFraud", "/auditTrackerFraud/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Fraud Tracker" />
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="FraudTrackerReport.csv"
          data={data.map(
            ({
              reportType,
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
              comments,
            }) => ({
              reportType,
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
              comments,
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
      <SearchHeader placeholder="Branch" action={setQuery} />
      <div className="overflow-auto h-96 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="text-center flex w-32"></th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Report Type
              </th>
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
                Department
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Branch
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Region
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
              {/* <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence 1
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence 2
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence 3
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence 4
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence 5
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence 6
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Document Review 1
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Document Review 2
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Document Review 3
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Document Review 4
              </th> */}
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
              <th className="p-2 transform  whitespace-nowrap text-center">
                Comments
              </th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-umojablue hover:text-white space-x-2 odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex justify-between align-top text-center space-x-2">
                    <AuditTrackerFraudModelEdit id={item.reportId} />
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.reportType}
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
                  {/* <td className="p-2 align-top text-center">
                    {item.evidence1 && (
                      <a href={item.evidence1} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.evidence2 && (
                      <a href={item.evidence2} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.evidence3 && (
                      <a href={item.evidence3} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.evidence4 && (
                      <a href={item.evidence4} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.evidence5 && (
                      <a href={item.evidence5} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.evidence6 && (
                      <a href={item.evidence6} className="btn-sky w-12 h-10">
                        <AiOutlineFile size={24} />
                      </a>
                    )}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.documentReview1}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.documentReview2}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.documentReview3}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.documentReview4}
                  </td> */}
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
                    {item.implementedName}
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
                  <td className="p-2 align-top text-center">{item.comments}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditTrackerFraudList;
