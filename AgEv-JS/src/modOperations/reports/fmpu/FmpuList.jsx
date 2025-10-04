import React, { useState } from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { AiOutlineFile } from "react-icons/ai";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";

const FmpuList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("opsfmpuList", "/fmpu/list");

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
      <TopHeader title="FMPU List" />
      <PrintHeader
        fileName="FraudInvestigation.csv"
        data={data.map(
          ({
            branchName,
            detectionMethod,
            typeOfFraud,
            whoMightBeInvolved,
            positionOfFraudster,
            fraudBeingPerpetrated,
            numberOfOccurences,
            potentialWitness,
            documentReview1,
            documentReview2,
            documentReview3,
            documentReview4,
            observations,
            estimatedFraudLoss,
            recommendations,
            fmpuinCharge,
            evidence1,
            evidence2,
            evidence3,
            evidence4,
            evidence5,
            evidence6,
          }) => ({
            branchName,
            detectionMethod,
            typeOfFraud,
            whoMightBeInvolved,
            positionOfFraudster,
            fraudBeingPerpetrated,
            numberOfOccurences,
            potentialWitness,
            documentReview1,
            documentReview2,
            documentReview3,
            documentReview4,
            observations,
            estimatedFraudLoss,
            recommendations,
            fmpuinCharge,
            evidence1,
            evidence2,
            evidence3,
            evidence4,
            evidence5,
            evidence6,
          })
        )}
        headers={[
          { label: "Branch Name", key: "branchName" },
          { label: "Detection Method", key: "detectionMethod" },
          { label: "Type of Fraud", key: "typeOfFraud" },
          { label: "Who Might Be Involved", key: "whoMightBeInvolved" },
          { label: "Position of Fraudster", key: "positionOfFraudster" },
          { label: "Fraud Being Perpetrated", key: "fraudBeingPerpetrated" },
          { label: "Number of Occurrences", key: "numberOfOccurences" },
          { label: "Potential Witness", key: "potentialWitness" },
          { label: "Document Review 1", key: "documentReview1" },
          { label: "Document Review 2", key: "documentReview2" },
          { label: "Document Review 3", key: "documentReview3" },
          { label: "Document Review 4", key: "documentReview4" },
          { label: "Observations", key: "observations" },
          { label: "Estimated Fraud Loss", key: "estimatedFraudLoss" },
          { label: "Recommendations", key: "recommendations" },
          { label: "FMPUIN Charge", key: "fmpuinCharge" },
          { label: "Evidence 1", key: "evidence1" },
          { label: "Evidence 2", key: "evidence2" },
          { label: "Evidence 3", key: "evidence3" },
          { label: "Evidence 4", key: "evidence4" },
          { label: "Evidence 5", key: "evidence5" },
          { label: "Evidence 6", key: "evidence6" },
        ]}
      />

      <SearchHeader placeholder="Branch" action={setQuery} />
      <div className="overflow-auto h-96 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full ">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center">
              <th className="p-2 text-center whitespace-nowrap">Branch Name</th>
              <th className="p-2 text-center whitespace-nowrap">
                Detection Method
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Type Of Fraud
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Who Might Be Involved
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Position Of Fraudster
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Fraud Being Perpetrated
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Number Of Occurences
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Potential Witness
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Document Review 1
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Document Review 2
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Document Review 3
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Document Review 4
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Observations
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Estimated Fraud Loss
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Recommendations
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                FMPU InCharge
              </th>
              <th className="p-2 text-center whitespace-nowrap">Evidence1</th>
              <th className="p-2 text-center whitespace-nowrap">Evidence2</th>
              <th className="p-2 text-center whitespace-nowrap">Evidence3</th>
              <th className="p-2 text-center whitespace-nowrap">Evidence4</th>
              <th className="p-2 text-center whitespace-nowrap">Evidence5</th>
              <th className="p-2 text-center whitespace-nowrap">Evidence6</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr
                  key={item.fmpuId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 align-top text-center">
                    {item.branchName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.detectionMethod}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.typeOfFraud}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.whoMightBeInvolved}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.positionOfFraudster}
                  </td>

                  <td className="p-2 align-top text-center">
                    {item.fraudBeingPerpetrated}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.numberOfOccurences}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.potentialWitness}
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
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.observations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.estimatedFraudLoss}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.recommendations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.fmpuinCharge}
                  </td>

                  <td className="p-2 align-top text-center">
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FmpuList;
