import React, { useState } from "react";
import DeleteButton from "../../components/button/DeleteButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { AiOutlineFile } from "react-icons/ai";
import EditButton from "../../components/button/EditButton";
import SearchHeader from "../../components/SearchHeader";

const FmpuList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("opsfmpuList", "/fmpu/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      //item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      item.regionName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.reportingQuarter.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.monthOfAudit.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.detectionMethod.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      //item.typeOfFraudName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      item.whoMightBeInvolved.toLowerCase().indexOf(query.toLowerCase()) !==
        -1 ||
      item.positionOfFraudster.toLowerCase().indexOf(query.toLowerCase()) !==
        -1 ||
      // item.lengthOfServiceOfFraudster
      //   .toLowerCase()
      //   .indexOf(query.toLowerCase()) !== -1 ||
      item.howIsTheFraudBeingPerpetrated
        .toLowerCase()
        .indexOf(query.toLowerCase()) !== -1 ||
      item.numberOfOccurences.toLowerCase().indexOf(query.toLowerCase()) !==
        -1 ||
      item.potentialWitness.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.observations.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.defectiveControlsIdentified
        .toLowerCase()
        .indexOf(query.toLowerCase()) !== -1 ||
      item.estimatedFraudLoss.toLowerCase().indexOf(query.toLowerCase()) !==
        -1 ||
      item.recommendations.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.managementResponse.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="FMPU List" btn="Save" path="/ops/fmpu/add" />

      <SearchHeader placeholder="" action={setQuery} />
      <div className="overflow-auto h-96 border-2 border-gray-300">
        <table className="table-auto border-collapse rounded-md text-xs w-full ">
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
                Department
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Branch
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Region
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Fraud Examination
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
              {/* <th className="p-2 text-center whitespace-nowrap">
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
                FMPU in charge.
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
              data.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex justify-between align-top text-center">
                    <EditButton
                      path={`/ops/fmpu/edit/${item.reportId}`}
                      btnColor="btn-gray"
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/fmpu/delete/${item.reportId}`}
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
                  {/* <td className="p-2 align-top text-center">
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
