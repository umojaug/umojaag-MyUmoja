import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

const RejectList = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("evaluation", `/evaluation/listbyreject/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Reject List"
        btn="Return"
        path="/evaluation/reports/summary"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Evaluation Type" />
          <ListHeader label="Start Date" />
          <ListHeader label="End Date" />
          <ListHeader label="Employee PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Manager Name" />
          <ListHeader label="Entry Date" />
          <ListHeader label="Reject Remarks" />
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
              <ListCol label="Employee PIN:" value={item.employeePin} />
              <ListCol label="Employee Name:" value={item.employeeName} />
              <ListCol label="Manager Name:" value={item.employeeName} />

              <ListCol
                label="Entry Date:"
                value={format(new Date(item.entryDate), "dd-MMM-yyyy")}
              />
              <ListCol label="Reject Remarks:" value={item.rejectRemarks} />
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

export default RejectList;
