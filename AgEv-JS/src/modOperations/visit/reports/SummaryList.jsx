import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import {
  ListCol,
  ListColRouteLink,
  ListHeader,
} from "../../../components/ListColWithHeader";

const SummaryList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("evaluation", `/evaluation/summary/${dataForm.selectYear}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  let currentEmployee = 0;
  let created = 0;
  let submitted = 0;
  let completed = 0;
  let rejected = 0;

  if (list.data.length > 0) {
    currentEmployee = list.data
      .map((item) => item.currentEmployee)
      .reduce((sum, val) => sum + val, 0);
    created = list.data
      .map((item) => item.created)
      .reduce((sum, val) => sum + val, 0);
    submitted = list.data
      .map((item) => item.submitted)
      .reduce((sum, val) => sum + val, 0);
    completed = list.data
      .map((item) => item.completed)
      .reduce((sum, val) => sum + val, 0);
    rejected = list.data
      .map((item) => item.rejected)
      .reduce((sum, val) => sum + val, 0);
  }

  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-6 list-header">
        <ListHeader label="Branch Name" />
        <ListHeader
          label="Current Employee"
          className="flex justify-start md:justify-end"
        />
        <ListHeader
          label="Created"
          className="flex justify-start md:justify-end"
        />
        <ListHeader
          label="Submitted"
          className="flex justify-start md:justify-end"
        />
        <ListHeader
          label="Completed"
          className="flex justify-start md:justify-end"
        />
        <ListHeader
          label="Rejected"
          className="flex justify-start md:justify-end"
        />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.evaluationId}
            className="grid grid-cols-1 md:grid-cols-6 list-body"
          >
            <ListCol label="Branch Name : " value={item.branchName} />
            <ListCol
              label="Current Employee : "
              value={item.currentEmployee}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Created : "
              value={item.created}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Submitted : "
              value={item.submitted}
              className="flex justify-start md:justify-end"
            />
            <ListCol
              label="Completed : "
              value={item.completed}
              className="flex justify-start md:justify-end"
            />
            <ListColRouteLink
              label="Rejected : "
              path={`/evaluation/reports/reject/${item.branchId}`}
              value={item.rejected}
              className="flex justify-start md:justify-end font-bold"
            />
          </div>
        ))}

      <div className="list-footer font-bold">
        <div className="grid grid-cols-1 md:grid-cols-6">
          <span className="hidden md:block pr-5 text-left">
            Total Branch {list.data.length}
          </span>
          <ListCol
            label="Total Current Employee :  "
            value={currentEmployee.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
          <ListCol
            label="Total Created :  "
            value={created.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
          <ListCol
            label="Total Submitted :  "
            value={submitted.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
          <ListCol
            label="Total Completed :  "
            value={completed.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
          <ListCol
            label="Total Rejected :  "
            value={rejected.toLocaleString("en-US")}
            className="flex justify-start md:justify-end"
          />
        </div>
      </div>
    </div>
  );
};

export default SummaryList;
