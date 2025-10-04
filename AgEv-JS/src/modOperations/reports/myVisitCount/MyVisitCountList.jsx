import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import PrintHeader from "../../../components/PrintHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PdfButton from "../../../components/button/PdfButton";

const MyVisitCountList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "myVisitCount",
    `/allVisit/myVisitCount/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({ employeeName, designationName, branchName, visitCount }) => ({
      employeeName,
      designationName,
      branchName,
      visitCount,
    })
  );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/opsPdf/myVisitCount/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="NumberOfVisitReport.csv"
          data={list.data.map(
            ({ employeeName, designationName, branchName, visitCount }) => ({
              employeeName,
              designationName,
              branchName,
              visitCount,
            })
          )}
          headers={[
            { label: "Visitor Name", key: "employeeName" },
            { label: "Designation", key: "designationName" },
            { label: "Branch Name", key: "branchName" },
            { label: "No. Of Visit", key: "visitCount" },
          ]}
        />
      </div>
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

export default MyVisitCountList;
