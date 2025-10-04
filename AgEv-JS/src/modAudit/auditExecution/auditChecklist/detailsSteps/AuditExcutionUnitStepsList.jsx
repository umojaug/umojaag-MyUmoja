import { format } from "date-fns";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import EditButton from "../../../../components/button/EditButton";
import { AiOutlineConsoleSql, AiOutlineFile } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

const AuditExcutionUnitStepsList = ({ excutionId, auditAreaId, areaType }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "auditworksteps",
    `/auditExcutionUnitSteps/list/${excutionId}/${auditAreaId}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;
  console.log(list.data);

  return (
    <div className="">
      <TopHeader
        title={
          list.data.length > 0 ? (
            <>
              {list.data[0].auditAreaName}{" "}
              <span className="text-umojayellow">({list.data[0].auName})</span>
            </>
          ) : (
            "No Data Found"
          )
        }
        btn="Return"
        path={`/audit/excution/${areaType}/checklist/${excutionId}`}
      />
      <div className="overflow-auto h-auto">
        <table className="table-fixed border-collapse rounded-md text-xs">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center h-24">
              <th></th>
              <th className="p-2 -rotate-45">Audit Year</th>
              <th className="px-20 -rotate-45">Audit Test</th>
              <th className="p-2 -rotate-45">Testing Date</th>
              <th className="p-2 -rotate-45">Sampled Month</th>
              <th className="p-2 -rotate-45">Audit Period</th>
              <th className="p-2 -rotate-45">Selection Method</th>
              <th className="p-2 -rotate-45">Control Frequency</th>
              <th className="p-2 -rotate-45">Sample Size</th>
              <th className="p-2 -rotate-45">Population Size</th>
              <th className="p-2 -rotate-45">Audit Finding</th>
              <th className="p-2 -rotate-45">Test Result</th>
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item, index) => (
                <tr
                  key={index}
                  // onClick={() =>
                  //   navigate(
                  //     `/audit/excution/checklist/details/edit/${item.executionUnitTestStepId}`
                  //   )
                  // }
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex align-top">
                    <EditButton
                      path={`/audit/excution/checklist/details/edit/${item.executionUnitTestStepId}`}
                    />
                    <div className="text-xs ml-2">
                      {item.testEvidences !== "" ? (
                        <a
                          href={item.testEvidences}
                          className="btn-success w-12 h-10"
                        >
                          <AiOutlineFile size={24} />
                        </a>
                      ) : (
                        <></>
                      )}
                      {/* <label>{evidences}</label> */}
                    </div>
                  </td>

                  <td className="p-2 align-top">{item.auditYear}</td>
                  <td className="p-2 md:pr-2 align-top ">
                    {item.testStepsName}
                  </td>
                  <td className="p-2 align-top">
                    {format(new Date(item.testingDate), "dd/MMM/yyyy")}
                  </td>
                  <td className="p-2 align-top">
                    {/* {format(new Date(item.sampledMonth), "dd/MMM/yyyy")} */}
                    {item.sampledMonth}
                  </td>
                  <td className="p-2 align-top">{item.auditPeriod}</td>
                  <td className="p-2 align-top">{item.selectionMethod}</td>
                  <td className="p-2 align-top">{item.controlFrequency}</td>
                  <td className="p-2 align-top">{item.sampleSize}</td>
                  <td className="p-2 align-top">{item.populationSize}</td>
                  <td className="p-2 align-top">{item.testResults}</td>
                  <td className="p-2 align-top">{item.testingConclusion}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditExcutionUnitStepsList;
