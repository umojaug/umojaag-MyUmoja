import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import TopHeader from "../../components/TopHeader";

const AdvanceSalaryView = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("myAdvanceSalaryView", `/myAdvanceSalary/view/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <TopHeader
        title="Salary Advance Request Form"
        btn="Return"
        path="/advanceSalary/myAdvanceSalary/list"
      />
      <div className="mb-5">
        <p className="mt-5">
          Date: {format(new Date(list.data.entryDate), "dd/MMM/yyyy")}
        </p>
      </div>
      <ul>
        <li className="mb-3">
          <span className="block mb-2">
            1. Name of Staff requesting for Advance
          </span>
          <span className="block font-bold w-1/2">
            {" "}
            {list.data.employeeName}
          </span>
        </li>

        <li className="mb-3">
          <span className="block mb-2">2. EmployeeID</span>
          <span className="block font-bold w-1/2">
            {" "}
            {list.data.employeePin}
          </span>
        </li>

        <li className="mb-3">
          <span className="block mb-2">3. Amount of Salary Advance</span>
          <span className="block font-bold w-1/2">
            {list.data.advanceAmount}
          </span>
        </li>

        <li className="mb-3">
          <span className="block mb-2">4. Purpose of Cash Advance</span>
          <span className="block font-bold w-1/2">
            {list.data.purposeOfAdvance}
          </span>
        </li>

        <li className="mb-3">
          <span className="block mb-2">5. Date Salary Advance is Needed</span>
          <span className="block font-bold w-1/2">
            {format(new Date(list.data.neededAdvanceDate), "dd/MMM/yyyy")}
          </span>
        </li>

        <li className="mb-3">
          <span className="block mb-2">
            6. Date by which salary advance should have been paid (note this
            should not exceed 3 months starting from the next available payroll)
          </span>
          <span className="block font-bold w-1/2">Yes</span>
          <span className="block my-4">
            I{" "}
            <span className="inline-block border-b-2 border-dotted border-black ">
              {list.data.employeeName}
            </span>{" "}
            understand the terms of this advance and the repayment timelines. I
            also confirm that should I leave employment for whatsoever reason
            prior to completing repayment, any outstanding dues can be deducted
            from my final salary payments.{" "}
          </span>

          <div className="lg:flex justify-between">
            <div>
              {" "}
              <label className="font-bold">Signed: </label>
              <span className="border-b-2 border-dotted border-black">
                {list.data.employeeName}
              </span>
            </div>
            <div>
              <label className=" font-bold"> Date: </label>
              <span className="border-b-2 border-dotted border-black">
                {format(new Date(list.data.entryDate), "dd/MMM/yyyy")}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <div className="my-5">
        <h3 className="font-bold text-center border-2 border-black">
          Salary Advance Approval Section
        </h3>
        <div className="mt-3 lg:flex justify-between">
          <div>
            <label className="font-bold">Supervisor: </label>
            <span className="border-b-2 border-dotted border-black">
              {list.data.authorityName}
            </span>
          </div>
          <div>
            <label className="font-bold">Department Name: </label>
            <span className="border-b-2 border-dotted border-black">
              {list.data.authDepartmentName}
            </span>
          </div>

          <div>
            <label className="font-bold">Title: </label>
            <span className="border-b-2 border-dotted border-black">
              {list.data.authDesignationName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <h3 className="font-bold border-2 border-black w-full text-center">
          Advance recommended for approvals
        </h3>
        <h3 className="font-bold border-2 border-black w-full text-center">
          Yes / No (circle accordingly)
        </h3>
      </div>

      <div className="my-5">
        <h3 className="font-bold text-center border-2 border-black">
          HR Authorization
        </h3>
        <div className="mt-3 lg:flex justify-between">
          <div>
            <label className="font-bold">Name: </label>
            <span className="border-b-2 border-dotted border-black">
              {list.data.hrEmployeeName}
            </span>
          </div>
          <div>
            <label className="font-bold">Signature: </label>
            <span className="border-b-2 border-dotted border-black">
              {" "}
              {list.data.hrEmployeeName}
            </span>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h3 className="font-bold text-center border-2 border-black">
          Finance Department Authorization
        </h3>
        <div className="mt-3 lg:flex justify-between">
          <div>
            <label className="font-bold">Name: </label>
            <span className="border-b-2 border-dotted border-black"></span>
          </div>
          <div>
            <label className="font-bold">Signature: </label>
            <span className="border-b-2 border-dotted border-black"></span>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h3 className="font-bold text-center border-2 border-black">
          Country Team Lead Approval
        </h3>
        <div className="mt-3 lg:flex justify-between">
          <div>
            <label className="font-bold">Name: </label>
            <span className="border-b-2 border-dotted border-black"></span>
          </div>
          <div>
            <label className="font-bold">Signature: </label>
            <span className="border-b-2 border-dotted border-black"></span>
          </div>

          <div>
            <label className="font-bold">Date: </label>
            <span className="border-b-2 border-dotted border-black"></span>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-center border-2 border-black">
        Group Approvals
      </h3>

      <div className="flex justify-between mt-5">
        <h3 className="font-bold border-2 border-black w-full text-center">
          Advance Sanctioned
        </h3>
        <h3 className="font-bold border-2 border-black w-full text-center">
          Yes / No (circle accordingly)
        </h3>
      </div>

      <div className="lg:flex justify-between mt-5 font-bold">
        <div>
          <p>_____________</p>
          <p>SGM</p>
        </div>

        <div>
          <p>_____________</p>
          <p>COO</p>
        </div>
      </div>
      <div className="mt-5 font-bold">
        <label>Date:</label>
        <span>12/10/2023</span>
      </div>
    </div>
  );
};

export default AdvanceSalaryView;
