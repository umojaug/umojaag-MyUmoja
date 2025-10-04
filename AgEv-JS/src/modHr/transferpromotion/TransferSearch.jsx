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
import DeleteButton from "../../components/button/DeleteButton";
import { filterAndSort, useSorting } from "../../utils/FilterSort";

const TransferSearch = ({ query }) => {
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("empTransfersearch", `/emptransfer/search/${query}`);

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
    <div className="list-wrapper">
      <div className="md:grid grid-cols-10 list-header">
        <SortableListHeader
          label="PIN"
          sortKey="employeePin"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="Employee Name"
          sortKey="employeeName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="Designation Name"
          sortKey="designationName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="Old Branch"
          sortKey="prepreBranchName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="Old Department"
          sortKey="predepartmentName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="Effective Date"
          sortKey="effectiveDate"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="New Branch"
          sortKey="branchName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="New Department"
          sortKey="departmentName"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <SortableListHeader
          label="Particulars"
          sortKey="particulars"
          currentSort={currentSort}
          onSort={handleSort}
        />
        <ListHeader label="" />
      </div>
      {data.length > 0 &&
        data.map((item) => (
          <div
            key={item.empHistoryId}
            className="grid grid-cols-1 md:grid-cols-10 list-body"
          >
            <ListCol label="PIN: " value={item.employeePin} />
            <ListCol label="Employee Name: " value={item.employeeName} />
            <ListCol label="Designation Name: " value={item.designationName} />
            <ListCol label="Old Branch:" value={item.preBranchName} />
            <ListCol label="Old Department: " value={item.preDepartmentName} />
            <ListCol
              label="Effective Date: "
              value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
            />
            <ListCol label="New Branch:" value={item.branchName} />
            <ListCol label="New Department: " value={item.departmentName} />
            <ListCol label="Particulars: " value={item.particulars} />
            <div className="flex justify-end space-x-2">
              {/* <EditButton path={`/ticket/edit/${item.ticketId}`} /> */}
              <DeleteButton
                action={refetch}
                path={`/empTransfer/delete/${item.empHistoryId}`}
              />
            </div>
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

export default TransferSearch;
