import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import DeleteButton from "../../components/button/DeleteButton";

const DisciplinarySearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "empdisciplinarylettersearch",
    `/empdisciplinaryletter/search/${query}`
  );

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
        <ListHeader label="Letter Type" />
        <ListHeader label="Issue Date" />
        <ListHeader label="Title" className="md:col-span-2" />
        <ListHeader label="" />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.disciplinaryLetterId}
            className="grid grid-cols-1 md:grid-cols-10 list-body"
          >
            <ListCol label="Branch:" value={item.branchName} />
            <ListCol label="Department: " value={item.departmentName} />
            <ListCol label="PIN: " value={item.employeePin} />
            <ListCol label="Employee Name: " value={item.employeeName} />
            <ListCol label="Designation: " value={item.designationName} />
            <ListCol label="Letter Type: " value={item.letterType} />
            <ListCol
              label="Issue Date: "
              value={format(new Date(item.issueDate), "dd/MMM/yyyy")}
            />
            <ListCol
              label="Subject : "
              value={item.title}
              className="md:col-span-2"
            />
            <div className="flex justify-end space-x-1 px-1">
              {/* <EditButton
                path={`/hr/disciplinary/edit/${item.disciplinaryLetterId}`}
              /> */}
              <DeleteButton
                action={refetch}
                path={`/empdisciplinaryletter/delete/${item.disciplinaryLetterId}`}
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

export default DisciplinarySearch;
