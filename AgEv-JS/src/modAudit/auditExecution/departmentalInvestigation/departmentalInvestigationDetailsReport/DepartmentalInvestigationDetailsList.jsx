import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import EditButton from "../../../../components/button/EditButton";
import { AiOutlineFile } from "react-icons/ai";

const DepartmentalInvestigationDetailsList = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "evaluationdetailsinfo",
    `/AuditDpInvestigation/detailsList/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="mt-2">
      <div className="overflow-auto h-96 border-gray-300">
        <table className="table-fixed border-collapse rounded-md text-xs w-full">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center h-28">
              <th className="text-center"></th>
              <th className="p-1 -rotate-45 text-center">Department Name</th>
              <th className="p-1 -rotate-45 text-center">Test Area</th>
              <th className="p-1 -rotate-45 w-60">Audit Test</th>
              <th className="p-1 -rotate-45 text-center">
                Sample Selection Method
              </th>
              <th className="p-1 -rotate-45 text-center">Control Frequency</th>
              <th className="p-1 -rotate-45 text-center">Population Size</th>
              <th className="p-1 -rotate-45 text-center">Sample Size</th>
              <th className="p-1 -rotate-45 text-center">Test Conclusion</th>
              <th className="p-1 -rotate-45 text-center">Test Result</th>
              <th className="p-1 -rotate-45 text-center">Evidences</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr
                  key={item.investigationDetailsId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-1 flex align-top text-center">
                    <EditButton
                      path={`/audit/excution/departmental/details/edit/${item.investigationDetailsId}`}
                      btnColor="btn-gray"
                    />
                  </td>
                  <td className="p-1 align-top text-center">
                    {item.departmentName}
                  </td>
                  <td className="p-1 align-top text-center">{item.testArea}</td>
                  <td className="p-1 align-top w-60">{item.testSteps}</td>
                  <td className="p-1 align-top text-center">
                    {item.sampleSelectionMethod}
                  </td>
                  <td className="p-1 align-top text-center">
                    {item.controlFrequency}
                  </td>
                  <td className="p-1 align-top text-center">
                    {item.populationSize}
                  </td>
                  <td className="p-1 align-top text-center">
                    {item.sampleSize}
                  </td>
                  <td className="p-1 align-top text-center">
                    {item.testConclusion}
                  </td>
                  <td className="p-1 align-top text-center">
                    {item.auditFinding}
                  </td>
                  <td className="p-1 align-top text-center">
                    {item.evidences !== "" ? (
                      <a
                        href={item.evidences}
                        className="btn-success w-12 h-10"
                      >
                        <AiOutlineFile size={24} />
                      </a>
                    ) : (
                      <></>
                    )}
                  </td>
                  {/* <td className="p-1 align-top text-center">{item.auditFinding}</td>
                <td className="p-1 align-top text-center">{item.cause}</td>
                <td className="p-1 align-top text-center">{item.implication}</td>
                <td className="p-1 align-top text-center">{item.recommendation}</td>
                <td className="p-1 align-top text-center">{item.controlOwnerResponse}</td>
                <td className="p-1 align-top text-center">
                  {format(new Date(item.implementationDate), "dd/MMM/yyyy")}
                </td>
                <td className="p-1 align-top text-center">{item.managementAction}</td>
                <td className="p-1 align-top text-center">{item.exceptions}</td>
                <td className="p-1 align-top text-center">{item.evidences}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentalInvestigationDetailsList;
