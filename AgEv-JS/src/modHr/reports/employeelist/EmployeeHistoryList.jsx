import React, { useState } from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeHistoryList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppromotionlist",
    `/hrreports/history/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        item.preDesignation.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empHistoryId,
        empStatus,
        employeePin,
        employeeName,
        preBranch,
        preDepartment,
        preDesignation,
        preGrossSalaryUsd,
        preGrossSalary,
        effectiveDate,
        branchName,
        departmentName,
        designationName,
        grossSalaryUsd,
        grossSalary,
        particulars,
      }) => ({
        empHistoryId,
        empStatus,
        employeePin,
        employeeName,
        preBranch,
        preDepartment,
        preDesignation,
        preGrossSalaryUsd,
        preGrossSalary,
        effectiveDate,
        branchName,
        departmentName,
        designationName,
        grossSalaryUsd,
        grossSalary,
        particulars,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfCommon/history/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="history.csv"
          data={data.map(
            ({
              empStatus,
              employeePin,
              employeeName,
              preBranch,
              preDepartment,
              preDesignation,
              preGrossSalaryUsd,
              preGrossSalary,
              effectiveDate,
              branchName,
              departmentName,
              designationName,
              grossSalaryUsd,
              grossSalary,
              particulars,
            }) => ({
              empStatus,
              employeePin,
              employeeName,
              preBranch,
              preDepartment,
              preDesignation,
              preGrossSalaryUsd,
              preGrossSalary,
              effectiveDate,
              branchName,
              departmentName,
              designationName,
              grossSalaryUsd,
              grossSalary,
              particulars,
            })
          )}
          headers={[
            { label: "Employee Status", key: "empStatus" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Previous Branch", key: "preBranch" },
            { label: "Previous Department", key: "preDepartment" },
            { label: "Previous Designation", key: "preDesignation" },
            { label: "Previous Gross Salary (USD)", key: "preGrossSalaryUsd" },
            { label: "Previous Gross Salary", key: "preGrossSalary" },
            { label: "Effective Date", key: "effectiveDate" },
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Designation", key: "designationName" },
            { label: "Gross Salary (USD)", key: "grossSalaryUsd" },
            { label: "Gross Salary", key: "grossSalary" },
            { label: "Particulars", key: "particulars" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Office"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Employee" />
          <ListHeader label="Previous Details" />
          <ListHeader label="Last Details" />
          <ListHeader label="Particulars" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empHistoryId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <div className="grid place-content-start">
                <div className="md:hidden">
                  <span className="font-bold">Employee</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">PIN :</span>
                  <span className="break-words">{item.employeePin}</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">Name :</span>
                  <span className="break-words">{item.employeeName}</span>
                </div>
              </div>
              <div className="grid place-content-start">
                <div className="pt-2 md:hidden">
                  <span className="font-bold">Previous Details</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">Branch :</span>
                  <span className="break-words">{item.preBranch}</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">
                    Department :
                  </span>
                  <span className="break-words">{item.preDepartment}</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">
                    Designation :
                  </span>
                  <span className="break-words">{item.preDesignation}</span>
                </div>
                <div>
                  {item.preGrossSalaryUsd > 0 && (
                    <>
                      <span className="inline-block font-semibold">
                        Gross Salary USD :
                      </span>
                      <span className="break-words">
                        {item.preGrossSalaryUsd.toLocaleString("en-US")}
                      </span>
                    </>
                  )}
                </div>
                <div>
                  {item.preGrossSalary > 0 && (
                    <>
                      <span className="inline-block font-semibold">
                        Gross Salary :
                      </span>
                      <span className="break-words">
                        {item.preGrossSalary.toLocaleString("en-US")}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid place-content-start">
                <div className="pt-2 md:hidden">
                  <span className="font-bold">Last Details</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">Branch :</span>
                  <span className="break-words">{item.branchName}</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">
                    Department :
                  </span>
                  <span className="break-words">{item.departmentName}</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">
                    Designation :
                  </span>
                  <span className="break-words">{item.designationName}</span>
                </div>
                <div>
                  {item.grossSalaryUsd > 0 && (
                    <>
                      <span className="inline-block font-semibold">
                        Gross Salary USD :
                      </span>
                      <span className="break-words">
                        {item.grossSalaryUsd.toLocaleString("en-US")}
                      </span>
                    </>
                  )}
                </div>
                <div>
                  {item.grossSalary > 0 && (
                    <>
                      <span className="inline-block font-semibold">
                        Gross Salary :
                      </span>
                      <span className="break-words">
                        {item.grossSalary.toLocaleString("en-US")}
                      </span>{" "}
                    </>
                  )}
                </div>
              </div>
              <div className="grid place-content-start">
                <div className="pt-2 md:hidden">
                  <span className="font-bold">Particulars</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">Status :</span>
                  <span className="break-words">{item.empStatus}</span>
                </div>
                <div>
                  <span className="inline-block font-semibold">
                    Effective Date :
                  </span>
                  <span className="break-words">
                    {format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
                  </span>
                </div>
                <div>
                  <span className="inline-block font-semibold">Remarks:</span>
                  <span className="break-words">{item.particulars}</span>
                </div>
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
    </>
  );
};

export default EmployeeHistoryList;
