import React from "react";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import { format } from "date-fns";

const Transfer = ({ transfer }) => {
  return (
    <div>
      <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
        Transfer History
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Old Branch" />
          <ListHeader label="Old Department" />
          <ListHeader label="Effective Date" />
          <ListHeader label="New Branch" />
          <ListHeader label="New Department" />
          <ListHeader label="Particulars" />
        </div>
        {transfer.length > 0 &&
          transfer.map((item) => (
            <div
              key={item.empHistoryId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Old Branch:" value={item.preBranchName} />
              <ListCol
                label="Old Department: "
                value={item.preDepartmentName}
              />
              <ListCol
                label="Effective Date: "
                value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
              />
              <ListCol label="New Branch:" value={item.branchName} />
              <ListCol label="New Department: " value={item.departmentName} />
              <ListCol label="Particulars: " value={item.particulars} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Transfer;
