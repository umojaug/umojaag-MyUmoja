import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import TaskButton from "../../../components/button/TaskButton";
import PrintHeader from "../../../components/PrintHeader";

const CompleteListThree = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "evaluation",
    `/evaluation/listThree/${dataForm.selectYear}/${dataForm.branchId}/${dataForm.employee}`
  );
  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <PrintHeader
        fileName="EvaluationSummary.csv"
        data={list.data.map(
          ({
            branchName,
            employeePin,
            employeeName,
            evaluationTypeName,
            managerName,
            probationReview,
            objectiveDetailsOne,
            employeeCommentOne,
            managerCommentOne,
          }) => ({
            branchName,
            employeePin,
            employeeName,
            evaluationTypeName,
            managerName,
            probationReview,
            objectiveDetailsOne,
            employeeCommentOne,
            managerCommentOne,
          })
        )}
        headers={[
          { label: "Branch Name", key: "branchName" },
          { label: "Employee PIN", key: "employeePin" },
          { label: "Employee Name", key: "employeeName" },
          { label: "Evaluation Type", key: "evaluationTypeName" },
          { label: "Line manager", key: "managerName" },
          { label: "Probation Review Outcome", key: "probationReview" },
          { label: "Objective Details 1", key: "objectiveDetailsOne" },
          { label: "Employee Comment 1", key: "employeeCommentOne" },
          { label: "Manager Comment 1", key: "managerCommentOne" },
        ]}
      />

      <div className="overflow-auto h-96">
        <table className="table-fixed border-collapse rounded-md text-xs">
          <thead className="bg-gray-300 text-primary sticky top-0">
            <tr className="text-center h-28">
              <th></th>
              <th className="p-1 -rotate-45">Branch</th>
              <th className="p-1 -rotate-45">Employee PIN</th>
              <th className="p-1 -rotate-45">Employee Name</th>
              <th className="p-1 -rotate-45">Evaluation Type</th>
              <th className="p-1 -rotate-45">Line Manager</th>
              <th className="p-1 -rotate-45">Probation Review Outcome</th>
              <th className="p-1 -rotate-45">Objective detail 1</th>
              <th className="p-1 -rotate-45">Employee Comments 1</th>
              <th className="p-1 -rotate-45">Manager Comments 1</th>
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item) => (
                <tr
                  key={item.evaluationId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-1 flex align-top">
                    <TaskButton
                      path={`/evaluationThree/reports/complete/view/${item.evaluationId}`}
                      btnColor="btn-gray "
                    />
                  </td>
                  <td className="p-1 align-top">{item.branchName}</td>
                  <td className="p-1 align-top">{item.employeePin}</td>
                  <td className="p-1 align-top">{item.employeeName}</td>
                  <td className="p-1 align-top">{item.evaluationTypeName}</td>
                  <td className="p-1 align-top">{item.managerName}</td>
                  <td className="p-1 align-top">{item.probationReview}</td>
                  <td className="p-1 align-top">{item.objectiveDetailsOne}</td>
                  <td className="p-1 align-top">{item.employeeCommentOne}</td>
                  <td className="p-1 align-top">{item.managerCommentOne}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompleteListThree;
