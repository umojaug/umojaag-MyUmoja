import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import TaskButton from "../../../components/button/TaskButton";
import PrintHeader from "../../../components/PrintHeader";

const CompleteListSix = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "evaluation",
    `/evaluation/listSix/${dataForm.selectYear}/${dataForm.branchId}/${dataForm.employee}`
  );
  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <PrintHeader
        fileName="evaluation.csv"
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
            objectiveDetailsTwo,
            employeeCommentTwo,
            managerCommentTwo,
            objectiveDetailsThree,
            employeeCommentThree,
            managerCommentThree,
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
            objectiveDetailsTwo,
            employeeCommentTwo,
            managerCommentTwo,
            objectiveDetailsThree,
            employeeCommentThree,
            managerCommentThree,
          })
        )}
        headers={[
          { label: "Branch Name", key: "branchName" },
          { label: "Employee Pin", key: "employeePin" },
          { label: "Employee Name", key: "employeeName" },
          { label: "Evaluation Type", key: "evaluationTypeName" },
          { label: "Manager Name", key: "managerName" },
          { label: "Probation Review", key: "probationReview" },
          { label: "Objective 1", key: "objectiveDetailsOne" },
          { label: "Employee Comment 1", key: "employeeCommentOne" },
          { label: "Manager Comment 1", key: "managerCommentOne" },
          { label: "Objective 2", key: "objectiveDetailsTwo" },
          { label: "Employee Comment 2", key: "employeeCommentTwo" },
          { label: "Manager Comment 2", key: "managerCommentTwo" },
          { label: "Objective 3", key: "objectiveDetailsThree" },
          { label: "Employee Comment 3", key: "employeeCommentThree" },
          { label: "Manager Comment 3", key: "managerCommentThree" },
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
              <th className="p-1 -rotate-45">Objective detail 2</th>
              <th className="p-1 -rotate-45">Employee Comments 2</th>
              <th className="p-1 -rotate-45">Manager Comments 2</th>
              <th className="p-1 -rotate-45">Objective detail 3</th>
              <th className="p-1 -rotate-45">Employee Comments 3</th>
              <th className="p-1 -rotate-45">Manager Comments 3</th>
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
                      path={`/evaluationSix/reports/complete/view/${item.evaluationId}`}
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
                  <td className="p-1 align-top">{item.objectiveDetailsTwo}</td>
                  <td className="p-1 align-top">{item.employeeCommentTwo}</td>
                  <td className="p-1 align-top">{item.managerCommentTwo}</td>
                  <td className="p-1 align-top">
                    {item.objectiveDetailsThree}
                  </td>
                  <td className="p-1 align-top">{item.employeeCommentThree}</td>
                  <td className="p-1 align-top">
                    <span>{item.managerCommentThree}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompleteListSix;
