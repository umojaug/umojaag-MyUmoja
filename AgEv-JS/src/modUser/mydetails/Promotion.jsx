import React from "react";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { format } from "date-fns";

const Promotion = ({ promotion }) => {
  return (
    <div>
      <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
        Promotion History
      </div>
      <div className="list-wrapper text-xs">
        <div className="md:grid grid-cols-10 list-header gap-1">
          <ListHeader label="Effective Date" />
          <ListHeader label="Pre Designation" />
          <ListHeader
            label="Old Gross Salary Usd"
            className="flex justify-end"
          />
          <ListHeader label="Old Gross Salary" className="flex justify-end" />

          <ListHeader label="New Branch" />
          <ListHeader label="New Department" />
          <ListHeader label="New Designation" />
          <ListHeader
            label="New Gross Salary Usd"
            className="flex justify-end"
          />
          <ListHeader label="New Gross Salary" className="flex justify-end" />
          <ListHeader label="Particulars" />
        </div>
        {promotion.length > 0 &&
          promotion.map((item) => (
            <div
              key={item.empHistoryId}
              className="grid grid-cols-1 md:grid-cols-10 list-body gap-1"
            >
              <ListCol
                label="Effective Date : "
                value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation : " value={item.preDesignation} />
              <ListCol
                label="Old Gross Salary Usd : "
                value={item.preGrossSalaryUsd.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Old Gross Salary : "
                value={item.preGrossSalary.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol
                label="Designation Name : "
                value={item.designationName}
              />
              <ListCol
                label="Gross Salary Usd : "
                value={item.grossSalaryUsd.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Gross Salary : "
                value={item.grossSalary.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol label="Particulars : " value={item.particulars} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Promotion;
