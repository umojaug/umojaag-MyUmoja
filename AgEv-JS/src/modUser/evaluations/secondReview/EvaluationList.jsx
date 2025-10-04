import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";
import { format } from "date-fns";

const EvaluationSecondReview = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("evaluation", "/evaluation/listbysecondmanager");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Application Received For Second Review" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Evaluation Type" />
          <ListHeader label="Start Date" />
          <ListHeader label="End Date" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Entry Date" />
          <ListHeader label="Total Rating" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.evaluationId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol
                label="Evaluation Type:"
                value={item.evaluationTypeName}
              />
              <ListCol
                label="Start Date:"
                value={format(new Date(item.startDate), "dd-MMM-yyyy")}
              />
              <ListCol
                label="End Date:"
                value={format(new Date(item.endDate), "dd-MMM-yyyy")}
              />
              <ListCol label="Manager Name:" value={item.employeeName} />
              <ListCol
                label="Entry Date:"
                value={format(new Date(item.entryDate), "dd-MMM-yyyy")}
              />
              <ListCol
                label="Total Rating:"
                value={item.totalRating === 0 ? "" : item.totalRating}
              />
              <div className="flex justify-end space-x-2">
                {item.evaluationTypeName === "Annual Performance Review" && (
                  <TaskButton
                    path={`/evaluation/second/review/details/${item.evaluationId}`}
                    btnColor="btn-gray"
                  />
                )}
                {item.evaluationTypeName ===
                  "Three Months Probation Review" && (
                  <TaskButton
                    path={`/evaluationThree/second/review/details/${item.evaluationId}`}
                    btnColor="btn-gray"
                  />
                )}
                {item.evaluationTypeName === "Six months probation review" && (
                  <TaskButton
                    path={`/evaluationSix/second/review/details/${item.evaluationId}`}
                    btnColor="btn-gray"
                  />
                )}
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationSecondReview;
