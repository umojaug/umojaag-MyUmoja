import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import ReopenButton from "../../components/button/ReopenButton";

const VisitList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("visitlist", "/allVisit/listByAdmin");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.visitDate.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        allVisitId,
        visitDate,
        entryTime,
        visitEndDate,
        exitTime,
        branchName,
        employeePin,
        employeeName,
        designationName,
        visitType,
        stayOvernight,
        branchManagerName,
        managerName,
        isSubmit,
      }) => ({
        allVisitId,
        visitDate,
        entryTime,
        visitEndDate,
        exitTime,
        branchName,
        employeePin,
        employeeName,
        designationName,
        visitType,
        stayOvernight,
        branchManagerName,
        managerName,
        isSubmit,
      })
    );

  return (
    <>
      <div className="card w-full max-w-screen-xl">
        <TopHeader title="Visit List" btn="Return" path="/admin" />

        <SearchHeader
          action={setQuery}
          placeholder=" PIN / Employee Name / Branch"
        />
        <div className="list-wrapper">
          <div className="md:grid grid-cols-9 list-header">
            <ListHeader label="Visit Date" />
            <ListHeader label="Branch" />
            <ListHeader label="PIN" />
            <ListHeader label="Employee Name" />
            <ListHeader label="Designation" />
            <ListHeader label="BM" />
            <ListHeader label="Supervisor" />
            <ListHeader label="Status" />

            <ListHeader label="" />
          </div>
          {data.length > 0 &&
            data.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-9 list-body"
              >
                <ListCol
                  label="Visit Date : "
                  value={format(new Date(item.visitDate), "dd/MMM/yyyy")}
                />
                <ListCol label="Branch : " value={item.branchName} />
                <ListCol label="PIN : " value={item.employeePin} />
                <ListCol label="Employee Name : " value={item.employeeName} />
                <ListCol label="Designation : " value={item.designationName} />
                <ListCol label="BM : " value={item.branchManagerName} />
                <ListCol label="Supervisor : " value={item.managerName} />
                <ListCol label="Status : " value={item.isSubmit} />
                <div>
                  <div className="flex justify-end space-x-2">
                    <ReopenButton
                      action={refetch}
                      allVisitId={item.allVisitId}
                    />
                  </div>
                </div>
              </div>
            ))}
          <div className="list-footer">
            <div className="col-span-10"></div>
            <div className="flex justify-center">
              <span className="font-semibold">TOTAL : {data.length}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitList;
