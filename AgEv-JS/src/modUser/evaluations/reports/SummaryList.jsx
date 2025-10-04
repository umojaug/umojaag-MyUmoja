import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import { format } from "date-fns";
import DeleteButton from "../../../components/button/DeleteButton";

const SummaryList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "evaluation",
    `/evaluation/summary/${dataForm.evaluationTypeId}/${dataForm.selectYear}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="list-wrapper">
      <PrintHeader
        fileName={`summaryEvaluation.csv`}
        data={list.data.map(
          ({
            branchName,
            employeePin,
            employeeName,
            designationName,
            joiningDate,
            submitStatus,
            totalRating,
          }) => ({
            branchName,
            employeePin,
            employeeName,
            designationName,
            joiningDate: format(new Date(joiningDate), "dd/MMM/yyyy"),
            submitStatus,
            totalRating,
          })
        )}
        headers={[
          { label: "Branch Name", key: "branchName" },
          { label: "Employee Pin", key: "employeePin" },
          { label: "Employee Name", key: "employeeName" },
          { label: "Designation Name", key: "designationName" },
          { label: "Joining Date", key: "joiningDate" },
          { label: "Submit Status", key: "submitStatus" },
          { label: "Total Rating", key: "totalRating" },
        ]}
      />
      <div className="md:grid grid-cols-8 list-header">
        <ListHeader label="Branch Name" />
        <ListHeader label="Employee Pin" />
        <ListHeader label="Employee Name" />
        <ListHeader label="Designation" />
        <ListHeader label="Joining Date" />
        <ListHeader label="Submit Status" />
        <ListHeader label="Total Rating" />
      </div>
      {list.data.length > 0 &&
        list.data.map((item, id) => (
          <div key={id} className="grid grid-cols-1 md:grid-cols-8 list-body">
            <ListCol label="Branch Name : " value={item.branchName} />
            <ListCol label="Employee Pin: " value={item.employeePin} />
            <ListCol label="Employee Name : " value={item.employeeName} />
            <ListCol label="Designation Name : " value={item.designationName} />
            <ListCol
              label="Joining Date : "
              value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
            />
            <ListCol label="Submit Status : " value={item.submitStatus} />
            <ListCol
              label="Total Rating : "
              value={item.totalRating.toLocaleString("en-US")}
              className="flex justify-end"
            />
            <div className="flex justify-end space-x-2">
              {/* {(item.submitStatus === "Submit to 1st Supervisor" ||
                item.submitStatus === "Submit to 2nd Supervisor" ||
                item.submitStatus === "Complete") && ( */}
              <DeleteButton
                action={refetch}
                path={`/evaluation/reset/${item.evaluationId}`}
              />
              {/* )} */}
            </div>
          </div>
        ))}

      <div className="list-footer font-bold">
        <div className="grid grid-cols-1">
          {list.data.length > 0 && (
            <>
              <span className="hidden md:block pr-5 text-left">
                Total Employee : {list.data.length}
              </span>
              <span className="hidden md:block pr-5 text-left">
                No Eligible :
                {
                  list.data.filter((e) => e.submitStatus === "No Eligible")
                    .length
                }
              </span>
              <span className="hidden md:block pr-5 text-left">
                No Started :
                {
                  list.data.filter((e) => e.submitStatus === "No Started")
                    .length
                }
              </span>
              <span className="hidden md:block pr-5 text-left">
                Not Submitted :
                {
                  list.data.filter((e) => e.submitStatus === "Not Submitted")
                    .length
                }
              </span>
              <span className="hidden md:block pr-5 text-left">
                Submit to 1st Supervisor :
                {
                  list.data.filter(
                    (e) => e.submitStatus === "Submit to 1st Supervisor"
                  ).length
                }
              </span>
              <span className="hidden md:block pr-5 text-left">
                Submit to 2nd Supervisor :
                {
                  list.data.filter(
                    (e) => e.submitStatus === "Submit to 2nd Supervisor"
                  ).length
                }
              </span>
              <span className="hidden md:block pr-5 text-left">
                Complete :
                {list.data.filter((e) => e.submitStatus === "Complete").length}
              </span>
              <span className="hidden md:block pr-5 text-left">
                Rejected :
                {list.data.filter((e) => e.submitStatus === "Rejected").length}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryList;
