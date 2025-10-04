import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import {
  ListCol,
  ListHeader,
  SortableListHeader,
} from "../../components/ListColWithHeader";
import SearchHeader from "../../components/SearchHeader";
import TopHeader from "../../components/TopHeader";
import ImpersonationButton from "../../components/button/ImpersonationButton";
import { filterAndSort, useSorting } from "../../utils/FilterSort";

const UserList = () => {
  const [query, setQuery] = useState("");
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userlist", "/userCreate/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const searchFields = [
    "employeePin",
    "employeeName",
    "branchName",
    "departmentName",
    "userName",
    "role",
    "designationName",
  ];

  const data = filterAndSort(
    list.data,
    decodeURIComponent(query),
    searchFields,
    currentSort
  );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="User List" btn="Save" path="/grapes/user/add" />
      <div className="flex justify-end px-0 py-2 items-center"></div>
      <SearchHeader
        action={setQuery}
        placeholder="User Name / Role / PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <SortableListHeader
            label="Branch"
            sortKey="branchName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Department"
            sortKey="departmentName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Employee Id"
            sortKey="employeeId"
            currentSort={currentSort}
            onSort={handleSort}
          />
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
            label="Designation"
            sortKey="designationName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="User Name"
            sortKey="userName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Role"
            sortKey="role"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="Employee Id : " value={item.employeeId} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="User Name : " value={item.userName} />
              <ListCol label="Role : " value={item.role} />

              <div className="flex justify-end space-x-2">
                <ImpersonationButton id={item.id} />
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
  );
};

export default UserList;
