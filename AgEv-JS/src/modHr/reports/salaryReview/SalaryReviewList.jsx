import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const SalaryReviewList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("empallded", "/SalaryReview/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  console.log("dsfdsfsdf", list);

  // Filter the data based on the query
  const filteredData = list.data
    .filter((item) => {
      if (query === "") {
        return true; // Show all items if query is empty
      }
      return (
        item.employeePin?.toLowerCase().includes(query.toLowerCase()) ||
        item.employeeName?.toLowerCase().includes(query.toLowerCase()) ||
        item.branchName?.toLowerCase().includes(query.toLowerCase()) ||
        item.departmentName?.toLowerCase().includes(query.toLowerCase())
      );
    })
    .map(
      ({
        reviewYear,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        amount,
        particulars,
        salaryReviewId, // Include this for edit/delete functionality
        comments,
        isAccept,
        digitalSignature,
      }) => ({
        reviewYear,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        amount,
        particulars,
        salaryReviewId, // Keep this for buttons
        comments,
        isAccept: isAccept === 1 ? "Accept" : "Decline",
        digitalSignature,
      })
    );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Salary Review List" />

      <div className="list-wrapper">
        <div className="flex justify-end space-x-1">
          <div className="flex items-center space-x-2"></div>
          <PrintHeader
            fileName="Salary Review"
            data={filteredData} // Use filtered data directly
            headers={[
              { label: "Year", key: "reviewYear" },
              { label: "Branch Name", key: "branchName" },
              { label: "Department", key: "departmentName" },
              { label: "PIN", key: "employeePin" },
              { label: "Employee Name", key: "employeeName" },
              { label: "Designation", key: "designationName" },
              { label: "Amount", key: "amount" },
              { label: "Particulars", key: "particulars" },
              { label: "Status", key: "isAccept" },
              { label: "Decline Reason", key: "comments" },
              { label: "Digital Signature", key: "digitalSignature" },
            ]}
          />
        </div>
        <SearchHeader
          action={setQuery}
          placeholder="PIN / Name / Designation / Department / Branch"
        />
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Year" />
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Amount" />
          <ListHeader label="Status" />
          <ListHeader label="Decline Reason" />
          <ListHeader label="Digital Signature" />
        </div>
        {filteredData.length > 0 &&
          filteredData.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-10 list-body">
              <ListCol label="Year:" value={item.reviewYear} />
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Amount: " value={item.amount} />
              <ListCol label="Status: " value={item.isAccept} />
              <ListCol label="Decline Reason: " value={item.comments} />
              <ListCol
                label="Digital Signature: "
                value={item.digitalSignature}
              />
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {filteredData.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryReviewList;
