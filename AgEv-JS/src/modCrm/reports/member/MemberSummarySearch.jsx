import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const MemberListSearch = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "crmmemberssummary",
    `/crmmembers/summary/${dataForm.fromDate}/${dataForm.tillDate}`
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
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(({ branchName, employeePin, employeeName, totalMember }) => ({
      branchName,
      employeePin,
      employeeName,
      totalMember,
    }));

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/crmPdf/summary/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="Membersummary.csv"
          data={data.map(
            ({ branchName, employeePin, employeeName, totalMember }) => ({
              branchName,
              employeePin,
              employeeName,
              totalMember,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Total Member", key: "totalMember" },
          ]}
        />
      </div>

      <SearchHeader action={setQuery} placeholder="Branch / LO Name" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="PIN" />
          <ListHeader label="LO Name" />
          <ListHeader label="Total" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.memberId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Branch Name : " value={item.branchName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="LO Name : " value={item.employeeName} />
              <ListCol
                label="Total"
                value={item.totalMember}
                className="flex justify-start md:justify-end"
              />
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

export default MemberListSearch;
