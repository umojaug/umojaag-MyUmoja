import { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import SearchHeader from "../../../components/SearchHeader";
import { ListCol, ListColDetails } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";

const FeedbackList = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("myfeedbacklist", `/myfeedback/myAssignList`);

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
      {/* <PrintHeader
        // title={id + " list"}
        // fileName={id + `.csv`}
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
            contactNumber,
            feedbackType,
            departmentType,
            entryDate,
            particulars,
          })
        )}
      /> */}
      <SearchHeader action={setQuery} placeholder="Particular" />
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
                <ListColDetails
                  label="Feedback Type : "
                  value={item.feedbackType}
                />

                <ListColDetails label="Status : " value={item.status} />
              </div>
              <ListCol
                label="Particulars : "
                value={item.particulars}
                className="md:col-span-6 whitespace-pre-line"
              />

              <div className="col-span-1 flex justify-end space-x-2">
                <div className="flex items-center gap-2"></div>

                <TaskButton
                  path={`/my/feedback/assign-list/details/${item.feedbackId}`}
                />
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
