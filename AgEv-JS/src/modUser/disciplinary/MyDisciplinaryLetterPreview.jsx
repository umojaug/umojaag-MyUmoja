import React from "react";
import moment from "moment";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import { useParams } from "react-router-dom";

const EmployeeDisciplinaryLetterPreview = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "EmpDisciplinaryLetter",
    `/mydisciplinaryletter/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  var item = list.data;
  return (
    <div className="card w-full max-w-screen-xl">
      <div className="px-10">
        <TopHeader title="" btn="Return" path="/my/disciplinary/letter" />
        <div className="grid gap-5">
          <div>
            <span className="inline-block font-semibold pr-2">Date :</span>
            <span className="break-words">
              {moment.utc(item.issueDate).local().format("DD-MMM-YYYY")}
            </span>
          </div>

          <div>
            <span className="block font-semibold">To : </span>
            <span className="block break-words">
              {item.employeePin}, {item.employeeName}
            </span>
            <span className="break-words">
              {item.designationName}, {item.departmentName}, {item.branchName}
            </span>
          </div>
          <div>
            <span className="inline-block font-semibold pr-2">
              Letter Type :
            </span>
            <span className="break-words">{item.letterType}</span>
          </div>
          <div>
            <span className="inline-block font-semibold pr-2">Subject :</span>
            <span className="break-words font-semibold">{item.title}</span>
          </div>
          <div className="break-words whitespace-pre-line">
            {item.particulars}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDisciplinaryLetterPreview;
