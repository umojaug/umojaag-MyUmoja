import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import EditButton from "../..//components/button/EditButton";
import TaskButton from "../..//components/button/TaskButton";
import DeleteButton from "../../components/button/DeleteButton";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { format } from "date-fns";

const EmployeeSearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("employeessearch", `/employees/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-10 list-header gap-2">
        <ListHeader label="Branch" />
        <ListHeader label="Department" />
        <ListHeader label="PIN" />
        <ListHeader label="Employee Name" />
        <ListHeader label="Joining Date" />
        <ListHeader label="Designation" />
        <ListHeader label="Contact Number" />
        <ListHeader label="Gross Salary" className="flex justify-end" />
        <ListHeader label="" className="col-span-2"/>
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.employeeId}
            className="grid grid-cols-1 md:grid-cols-10 list-body gap-1 text-xs"
          >
            <ListCol label="Branch : " value={item.branchName} />
            <ListCol label="Department : " value={item.departmentName} />
            <ListCol label="PIN : " value={item.employeePin} />
            <ListCol label="Employee Name : " value={item.employeeName} />
            <ListCol
              label="Joining Date : "
              value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
            />
            <ListCol label="Designation : " value={item.designationName} />
            <ListCol label="Contact Number : " value={item.contactNumber} />
            <ListCol
              label="Gross Salary : "
              value={item.grossSalary.toLocaleString("en-US")}
              className="flex justify-start md:justify-end md:pr-5"
            />
            <div className="flex justify-end space-x-1 px-1 col-span-2">
              <TaskButton path={`/hr/archive/list/${item.employeeId}`} />
              <EditButton path={`/hr/employee/edit/${item.employeeId}`} />
              <DeleteButton
                action={refetch}
                path={`/employeesetup/delete/${item.employeeId}`}
              />
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

export default EmployeeSearch;
