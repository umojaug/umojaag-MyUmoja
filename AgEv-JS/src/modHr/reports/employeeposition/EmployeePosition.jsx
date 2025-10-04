import React from "react";
import TopHeader from "../../../components/TopHeader";
import Position from "./Position";
import PositionSalary from "./PositionSalary";

const EmployeePosition = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Employee Position" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 content-around">
        <Position title="Basic Info" path="basicinfo" />
        <Position title="Department Wise" path="DepartmentInfo" />
        <Position title="Designation Wise" path="DesignationInfo" />
        <PositionSalary />
      </div>
    </div>
  );
};

export default EmployeePosition;
