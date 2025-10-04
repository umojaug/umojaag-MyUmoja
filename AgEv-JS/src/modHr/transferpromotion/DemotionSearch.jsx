import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import {
  ListHeader,
  ListCol,
  SortableListHeader,
} from "../../components/ListColWithHeader";
import { format } from "date-fns";
import { filterAndSort, useSorting } from "../../utils/FilterSort";

const DemotionSearch = ({ query }) => {
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("DemotionSearch", `/empDemotion/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const searchFields = [
    "employeePin",
    "employeeName",
    "branchName",
    "departmentName",
    "designationName",
  ];

  const data = filterAndSort(
    list.data,
    decodeURIComponent(query),
    searchFields,
    currentSort
  );

  return (
    <div className="list-wrapper text-xs">
      <div className="md:grid grid-cols-9 list-header gap-1">
        <SortableListHeader
          label="Effective Date"
          sortKey="effectiveDate"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="PIN"
          sortKey="employeePin"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <ListHeader
          label="Employee Name"
          sortKey="employeeName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <ListHeader
          label="Pre Designation"
          sortKey="preDesignation"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <ListHeader
          label="Branch"
          sortKey="branchName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <ListHeader
          label="Department"
          sortKey="departmentName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <ListHeader
          label="Designation"
          sortKey="designationName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <ListHeader
          label="Gross Salary"
          sortKey="grossSalaryUsd"
          currentSort={currentSort}
          onSort={handleSort}
          className="flex justify-end"
        />
        <ListHeader label="Particulars" />
      </div>
      {data.length > 0 &&
        data.map((item) => (
          <div
            key={item.empHistoryId}
            className="grid grid-cols-1 md:grid-cols-9 list-body gap-1"
          >
            <ListCol
              label="Effective Date : "
              value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
            />
            <ListCol label="PIN : " value={item.employeePin} />
            <ListCol label="Employee Name : " value={item.employeeName} />
            <ListCol label="Designation : " value={item.preDesignation} />
            <ListCol label="Branch : " value={item.branchName} />
            <ListCol label="Department : " value={item.departmentName} />
            <ListCol label="Designation Name : " value={item.designationName} />
            <ListCol
              label={"Gross Salary : "}
              value={
                item.grossSalaryUsd > 0
                  ? item.grossSalaryUsd.toLocaleString("en-US") + " USD"
                  : item.grossSalary.toLocaleString("en-US") +
                    ` ${import.meta.env.VITE_CURRENCY}`
              }
              className="flex justify-start md:justify-end"
            />
            <ListCol label="Particulars : " value={item.particulars} />
          </div>
        ))}

      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">Total : {list.data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default DemotionSearch;
