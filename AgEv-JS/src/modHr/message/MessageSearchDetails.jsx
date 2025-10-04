import React, { useState } from "react";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import TextArea from "../../components/TextArea";
import SaveButton from "../../components/button/SaveButton";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  // allSelect: yup.array().of(yup.string()).min(1, "tes").required(),
  note: yup.string().required("Required").max(2500),
});

function MessageSearchDetails({ data }) {
  const [users, setUsers] = useState(data);
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { note } = errors;

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

  const onSubmit = async (formData) => {
    const employeeIds = users
      .filter((user) => user.isChecked === true)
      .map((item) => item.employeeId);

    if (employeeIds.length < 1) {
      toast.error("Please select employee");
      return;
    }

    var data = new FormData();
    data.append("note", formData.note);
    data.append("employeeIds", employeeIds);

    try {
      const { status } = await mutateAsync({
        path: "/hrmessage/send",
        formData: data,
      });
      if (status === 204) {
        toast.success("Send successfully!");
        reset();
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-8 list-header">
        <input
          type="checkbox"
          className="h-5 w-5 "
          value="all"
          //checked={data.filter((user) => user?.isChecked !== true).length < 1}
          checked={!users.some((user) => user?.isChecked !== true)}
          onChange={handleChange}
        />
        <ListHeader label="Branch" />
        <ListHeader label="Department" />
        <ListHeader label="PIN" />
        <ListHeader label="Employee Name" />
        <ListHeader label="Designation" />
        <ListHeader label="Joining Date" />
        <ListHeader label="Email" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {users.length > 0 &&
          users.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
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
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol
                label="Joining Date : "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Email : " value={item.email} />
            </div>
          ))}

        <div className="my-3">
          <TextArea
            control={control}
            name="note"
            label="Message"
            type="text"
            register={register}
            errorMessage={note?.message}
          />
        </div>
        <SaveButton btnText="Send" disabled={submitting} />
      </form>
    </div>
  );
}

export default MessageSearchDetails;
