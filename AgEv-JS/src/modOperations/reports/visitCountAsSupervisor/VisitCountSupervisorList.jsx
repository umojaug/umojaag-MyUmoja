import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import PrintHeader from "../../../components/PrintHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PdfButton from "../../../components/button/PdfButton";
import SearchHeader from "../../../components/SearchHeader";

const VisitCountSupervisorList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "supervisorVisitCount",
    `/allVisit/supervisorVisitCount/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(({ branchName, employeeName, designationName, visitCount }) => ({
      branchName,
      employeeName,
      designationName,
      visitCount,
    }));

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/opsPdf/visitCount/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="NumberOfVisitReport.csv"
          data={list.data.map(
            ({ branchName, employeeName, designationName, visitCount }) => ({
              branchName,
              employeeName,
              designationName,
              visitCount,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Visit Count", key: "visitCount" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="Visitor Name / Designation / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Visitor Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Branch Name" />
          <ListHeader label="No. Of Visit" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Visitor Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="Branch Name : " value={item.branchName} />
              <ListCol label="No. Of Visit : " value={item.visitCount} />
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitCountSupervisorList;
