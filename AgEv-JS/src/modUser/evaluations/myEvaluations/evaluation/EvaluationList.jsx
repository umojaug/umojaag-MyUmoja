import React from "react";
import DeleteButton from "../../../../components/button/DeleteButton";
import EditButton from "../../../../components/button/EditButton";
import Error from "../../../../components/Error";
import { HashLoading } from "../../../../components/Loading";
import TopHeader from "../../../../components/TopHeader";
import { useGetData } from "../../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import TaskButton from "../../../../components/button/TaskButton";
import { format } from "date-fns";
import { selectOptions } from "../../../../data/selectOptions";

const EvaluationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("evaluation", "/evaluation/listbyuser");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  //
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Evaluation List" btn="Save" path="/my/evaluation/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Evaluation Type" />
          <ListHeader label="Start Date" />
          <ListHeader label="End Date" />
          <ListHeader label="Manager Name" />
          <ListHeader label="Entry Date" />
          <ListHeader label="Total Rating" />
          <ListHeader label="Reject Remarks" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.evaluationId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
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
                value={selectOptions.evaluationRating
                  .filter((x) => x.key === item.totalRating.toString())
                  .map((y) => y.value)}
              />
              <ListCol label="Reject Remarks:" value={item.rejectRemarks} />
              <div className="flex justify-end space-x-2">
                {item.evaluationTypeName === "Annual Performance Review" && (
                  <TaskButton
                    path={
                      (item.isSubmit === 0 || item.isSubmit === 3) &&
                      item.isLock === 0
                        ? `/my/evaluation/pending/view/${item.evaluationId}`
                        : `/evaluation/reports/complete/view/${item.evaluationId}`
                    }
                    btnColor="btn-gray"
                  />
                )}
                {item.evaluationTypeName ===
                  "Three Months Probation Review" && (
                  <TaskButton
                    path={
                      (item.isSubmit === 0 || item.isSubmit === 3) &&
                      item.isLock === 0
                        ? `/my/evaluationThree/pending/view/${item.evaluationId}`
                        : `/evaluationThree/reports/complete/view/${item.evaluationId}`
                    }
                    btnColor="btn-gray"
                  />
                )}
                {item.evaluationTypeName === "Six months probation review" && (
                  <TaskButton
                    path={
                      (item.isSubmit === 0 || item.isSubmit === 3) &&
                      item.isLock === 0
                        ? `/my/evaluationSix/pending/view/${item.evaluationId}`
                        : `/evaluationSix/reports/complete/view/${item.evaluationId}`
                    }
                    btnColor="btn-gray"
                  />
                )}

                {item.isLock === 0 && (
                  <>
                    <EditButton
                      path={`/my/evaluation/edit/${item.evaluationId}`}
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/evaluation/delete/${item.evaluationId}`}
                    />
                  </>
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

export default EvaluationList;
