import React, { useState } from "react";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveButton from "../../components/button/SaveButton";
import SearchHeader from "../../components/SearchHeader";

const schema = yup.object({
  allSelect: yup.array().min(1).required(),
  message: yup.string().required("Required").max(250),
});

const MessageList = ({ empData }) => {
  //const [query, setQuery] = useState("");

  // handle events

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [users, setUsers] = useState();
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
    <>
      {/* <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      /> */}
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <input
            type="checkbox"
            className="h-5 w-5 "
            value="all"
            // checked={data.filter((user) => user?.isChecked !== true).length < 1}
            checked={!users.some((user) => user?.isChecked !== true)}
            onChange={handleChange}
          />
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {users.length > 0 &&
            users.map((item) => (
              <div
                key={item.employeeId}
                className="grid grid-cols-1 md:grid-cols-6 list-body"
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 "
                  value={item.employeeId}
                  {...register("allSelect")}
                  checked={item?.isChecked || false}
                  onChange={handleChange}
                />

                <ListCol label="Branch : " value={item.branchName} />
                <ListCol label="Department : " value={item.departmentName} />
                <ListCol label="PIN/Employee : " value={item.employeePin} />
                <ListCol label="Employee Name : " value={item.employeeName} />

                <ListCol label="Designation : " value={item.designationName} />
              </div>
            ))}
          <Input
            name="message"
            label="Message"
            type="text"
            register={register}
            errorMessage={message?.message}
          />
          <div className="flex justify-center items-center mt-10 from-cols">
            <SaveButton btnText="Send" />
            <div className="from-cols mt-4"></div>
            {/* <input
              type="submit"
              value="Submit"
              className="w-2/4 h-14 bg-blue-600 text-white font-bold rounded-lg text-4xl"
            /> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageList;
