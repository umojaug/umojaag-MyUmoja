import { useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListColDetails } from "../../components/ListColWithHeader";
import SearchHeader from "../../components/SearchHeader";
import PrintHeader from "../../components/PrintHeader";
import TaskDetailsButton from "../../components/button/TaskDetailsButton";
import { ListCol } from "../../components/ListColWithHeader";
import StatusToggleButton from "../../components/button/StatusToggleButton";

const FeedbackList = () => {
  const { id } = useParams();
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("myfeedbacklist", `/myfeedback/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.departmentType.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.status.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <PrintHeader
        title={id + " list"}
        fileName={id + `.csv`}
        data={data.map(
          ({
            branchName,
            departmentName,
            employeePin,
            employeeName,
            designationName,
            contactNumber,
            feedbackType,
            departmentType,
            entryDate,
            particulars,
          }) => ({
            branchName,
            departmentName,
            employeePin,
            employeeName,
            designationName,
            contactNumber: `\t${contactNumber}`,
            feedbackType,
            departmentType,
            entryDate,
            particulars,
          })
        )}
        headers={[
          { label: "Branch Name", key: "branchName" },
          { label: "Department Name", key: "departmentName" },
          { label: "Employee Pin", key: "employeePin" },
          { label: "Employee Name", key: "employeeName" },
          { label: "Designation Name", key: "designationName" },
          { label: "Contact Number", key: "contactNumber" },
          { label: "Feedback Type", key: "feedbackType" },
          { label: "Department Type", key: "departmentType" },
          { label: "Entry Date", key: "entryDate" },
          { label: "Particulars", key: "particulars" },
        ]}
      />

      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.feedbackId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <div className="col-span-2">
                <ListColDetails label="Branch : " value={item.branchName} />
                <ListColDetails
                  label="Department : "
                  value={item.departmentName}
                />
                {item.allowAnonymous === "No" && (
                  <>
                    <ListColDetails label="PIN : " value={item.employeePin} />
                    <ListColDetails
                      label="Employee Name : "
                      value={item.employeeName}
                    />
                    <ListColDetails
                      label="Designation : "
                      value={item.designationName}
                    />
                    <ListColDetails
                      label="Contact Number : "
                      value={item.contactNumber}
                    />
                  </>
                )}
                <ListColDetails label="Status: " value={item.status} />
                <ListColDetails
                  label="To Department : "
                  value={item.departmentType}
                />
                <ListColDetails
                  label="Entry Date: "
                  value={format(new Date(item.entryDate), "dd/MMM/yyyy")}
                />
                <div className="col-span-1 flex justify-start space-x-2">
                  <StatusToggleButton
                    path={`/feedback/status/${item.feedbackId}`}
                    action={refetch}
                    status={item.status}
                  />
                  <TaskDetailsButton
                    path={`/hr/feedback/note/${item.feedbackId}`}
                  />
                </div>
              </div>
              <ListCol
                label="Particulars : "
                value={item.particulars}
                className="md:col-span-6 whitespace-pre-line"
              />

              <div className="col-span-1 flex justify-end space-x-2">
                <div className="flex items-center gap-2"></div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;
