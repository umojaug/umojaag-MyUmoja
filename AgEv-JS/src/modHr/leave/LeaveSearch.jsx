import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";

const LeaveSearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("empleavesearch", `/empleave/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-5 list-header">
        <ListHeader label="Branch, Department" />
        <ListHeader label="Employee" />
        <ListHeader label="Leave Details" />
        <ListHeader label="Particulars" />
        <ListHeader label="Status" />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.empLeaveId}
            className="grid grid-cols-1 md:grid-cols-5 list-body"
          >
            <ListCol
              label="Branch:"
              value={item.branchName + ", " + item.departmentName}
            />

            <div className="grid">
              <div>
                <span className="inline-block md:hidden font-semibold">
                  PIN :
                </span>
                <span className="break-words">{item.employeePin}</span>
              </div>
              <div>
                <span className="inline-block md:hidden font-semibold">
                  Name :
                </span>
                <span className="break-words">{item.employeeName}</span>
              </div>
              <div>
                <span className="inline-block md:hidden font-semibold">
                  Designation :
                </span>
                <span className="break-words">{item.designationName}</span>
              </div>
            </div>

            <div className="grid">
              <div>
                <span className="inline-block md:hidden font-semibold">
                  Leave Type :
                </span>
                <span className="break-words">{item.leaveName}</span>
              </div>
              <div>
                <span className="inline-block md:hidden font-semibold">
                  From Date :
                </span>
                <span className="break-words">
                  {format(new Date(item.fromDate), "dd/MMM/yyyy")}
                </span>
              </div>
              <div>
                <span className="inline-block md:hidden font-semibold">
                  Till Date :
                </span>
                <span className="break-words">
                  {format(new Date(item.tillDate), "dd/MMM/yyyy")}
                </span>
              </div>
            </div>

            <ListCol label="Particulars: " value={item.particulars} />
            <div className="grid">
              <div>
                <span className="inline-block font-semibold">Status :</span>
                <span className="break-words">{item.leaveStatus}</span>
              </div>
              <div>
                <span className="inline-block font-semibold">Supervisor :</span>
                <span className="break-words">{item.authorityName}</span>
              </div>
              <div>
                <span className="inline-block font-semibold">Comments :</span>
                <span className="break-words">{item.authorityComments}</span>
              </div>
              <div>
                <span className="inline-block font-semibold">
                  Hr Comments :
                </span>
                <span className="break-words">{item.hrComments}</span>
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

export default LeaveSearch;
