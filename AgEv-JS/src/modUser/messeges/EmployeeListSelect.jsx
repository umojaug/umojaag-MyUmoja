import React, { useState } from "react";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  allSelect: yup.array().min(1).required(),
  message: yup.string().required("Required").max(250),
});

const EmployeeListSelect = ({ empData }) => {
  // handle events
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [users, setUsers] = useState(empData);
  const { message } = errors;
  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (value === "all") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.employeeId === value ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };
  const onSubmit = async (formData) => {};

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <input
            type="checkbox"
            className="form-check-input"
            value="all"
            // checked={data.filter((user) => user?.isChecked !== true).length < 1}
            checked={!users.some((user) => user?.isChecked !== true)}
            onChange={handleChange}
          />
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="DOB" />
          <ListHeader label="Designation" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Gender" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Gross Salary" className="flex justify-end" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {users.length > 0 &&
            users.map((item) => (
              <div
                key={item.employeeId}
                className="grid grid-cols-1 md:grid-cols-11 list-body"
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={item.employeeId}
                  {...register("allSelect")}
                  checked={item?.isChecked || false}
                  onChange={handleChange}
                />

                <ListCol label="Branch : " value={item.branchName} />
                <ListCol label="Department : " value={item.departmentName} />
                <ListCol label="PIN/Employee : " value={item.employeePin} />
                <ListCol label="Employee Name : " value={item.employeeName} />
                <ListCol
                  label="DOB : "
                  value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
                />
                <ListCol label="Designation: " value={item.designationName} />
                <ListCol
                  label="Joining Date : "
                  value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
                />
                <ListCol label="Gender : " value={item.gender} />
                <ListCol label="Contact Number : " value={item.contactNumber} />
                <ListCol
                  label="Gross Salary : "
                  value={item.grossSalary.toLocaleString("en-US")}
                  className="flex justify-start md:justify-end"
                />
              </div>
            ))}
          <Input
            name="message"
            label="Message"
            type="text"
            register={register}
            errorMessage={message?.message}
          />
          <div className="flex justify-center items-center mt-10">
            <input
              type="submit"
              value="Submit"
              className="w-2/4 h-14 bg-blue-600 text-white font-bold rounded-lg text-4xl"
            />
          </div>
        </form>

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {empData.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListSelect;
