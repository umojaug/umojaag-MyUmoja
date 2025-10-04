import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectAllFromDb } from "../components/SelectList";

const schema = yup.object({
  branchId: yup.string().required("Required."),
  departmentId: yup.string().required("Required."),
  designationId: yup.string().required("Required."),
});

const SearchByCategory = ({ action }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      branchId: "All",
      departmentId: "All",
      designationId: "All",
    },
    resolver: yupResolver(schema),
  });
  const { branchId, departmentId, designationId } = errors;

  const onSubmit = async (formData) => {
    action({
      branchId: formData.branchId,
      departmentId: formData.departmentId,
      designationId: formData.designationId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
        <SelectAllFromDb
          control={control}
          label="Branch"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />
        <SelectAllFromDb
          control={control}
          label="Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />
        <SelectAllFromDb
          control={control}
          label="Designation"
          path="/designations/select"
          name="designationId"
          errorMessage={designationId?.message}
        />
        <div className="form-row w-full place-content-end">
          <button type="submit" className="btn-umojayellow h-9">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchByCategory;
