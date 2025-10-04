import React from "react";
import { format } from "date-fns";

const DetailsList = ({ employee }) => {
  return (
    <div>
      <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
        Details
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <img
            src={`https://drive.google.com/thumbnail?id=${employee.imageUrl}`}
            alt=""
          />
        </div>
        <div className="grid">
          <div className="">Branch : {employee.branchName}</div>
          <div className="">Department : {employee.departmentName}</div>
          <div className="">PIN : {employee.employeePin}</div>
          <div className="">Name : {employee.employeeName}</div>
          <div className="">Designation : {employee.designationName}</div>
          <div className="">
            DOB :{format(new Date(employee.dateOfBirth), "dd/MMM/yyyy")}
          </div>
          <div className="">Gender : {employee.gender}</div>
          <div className="">
            Date of Joining :
            {format(new Date(employee.joiningDate), "dd/MMM/yyyy")}
          </div>
          <div className="">Contact Number : {employee.contactNumber}</div>
          {employee.grossSalaryUsd === 0 ? (
            <div className="">
              Gross Salary : {employee.grossSalary.toLocaleString("en-US")}
            </div>
          ) : (
            <div className="">
              Gross Salary USD :
              {employee.grossSalaryUsd.toLocaleString("en-US")}
            </div>
          )}
          <div className="">
            Sacco Deduction : {employee.saccoDeduction.toLocaleString("en-US")}
          </div>
        </div>
        <div className="grid">
          <div className="">NSSF Number : {employee.nssfNumber}</div>
          <div className="">Bank Name : {employee.bankName}</div>
          <div className="">Account Number : {employee.bankAccountNumber}</div>
          <div className="">TIN Number : {employee.tinNumber}</div>
          <div className="">Father Name : {employee.fatherName}</div>
          <div className="">Mother Name : {employee.motherName}</div>
          <div className="">Religion : {employee.religion}</div>
          <div className="">Marital Status : {employee.maritalStatus}</div>
          <div className="">Blood Group : {employee.bloodGroup}</div>
          <div className="">Contact Address : {employee.contactAddress}</div>
          <div className="">Education Name : {employee.educationName}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailsList;
