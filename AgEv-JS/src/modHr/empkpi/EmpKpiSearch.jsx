import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import DeleteButton from "../../components/button/DeleteButton";

const EmpKpiSearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("empKpisearch", `/empkpi/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-10 list-header">
        <ListHeader label="Branch" />
        <ListHeader label="Department" />
        <ListHeader label="PIN" />
        <ListHeader label="Employee Name" />
        <ListHeader label="Designation" />
        <ListHeader label="Kpi Type" />
        <ListHeader label="From Date" />
        <ListHeader label="Till Date" />
        <ListHeader label="Particulars" />
        <ListHeader label="" />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.empKpiId}
            className="grid grid-cols-1 md:grid-cols-10 list-body"
          >
            <ListCol label="Branch:" value={item.branchName} />
            <ListCol label="Department: " value={item.departmentName} />
            <ListCol label="PIN : " value={item.employeePin} />
            <ListCol label="Employee Name: " value={item.employeeName} />
            <ListCol label="Designation: " value={item.designationName} />
            <ListCol label="Kpi Type: " value={item.KpiName} />
            <ListCol
              label="From Date: "
              value={format(new Date(item.fromDate), "dd/MMM/yyyy")}
            />
            <ListCol
              label="Till Date: "
              value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
            />
            <ListCol label="Particulars: " value={item.particulars} />
            <div>
              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/empkpi/delete/${item.empKpiId}`}
                />
              </div>
            </div>
          </div>
        ))}

      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">Total : {list.data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default EmpKpiSearch;
