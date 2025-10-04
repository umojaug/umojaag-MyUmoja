import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectAllFromDb, SelectFromOptions } from "./SelectList";
import { selectOptions } from "../data/selectOptions";
import Input from "./Input";

const schema = yup.object({
  selectYear: yup.string().required("Required."),
  frequency: yup.string().required("Required."),
  branchId: yup.string().required("Required."),
  employee: yup.string(),
});

const SearchEvaluationThreeSix = ({ action }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectYear: new Date().getFullYear(),
      frequency: "All",
      branchId: "All",
      employee: "",
    },
    resolver: yupResolver(schema),
  });
  const { selectYear, branchId, employee } = errors;

  const onSubmit = async (formData) => {
    action({
      selectYear: formData.selectYear,
      // frequency: formData.frequency,
      branchId: formData.branchId,
      employee: formData.employee === "" ? "All" : formData.employee,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2">
        <SelectFromOptions
          register={register}
          options={selectOptions.years}
          label="Year"
          name="selectYear"
          errorMessage={selectYear?.message}
        />
        {/* <SelectFromOptions
          register={register}
          options={[
            "All",
            "Annual",
            "Eighteen Months",
            "Three Months",
            "Six Months",
          ]}
          label="Frequency"
          name="frequency"
          errorMessage={frequency?.message}
        /> */}
        <SelectAllFromDb
          control={control}
          label="Branch"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />
        <Input
          name="employee"
          label="Employee"
          type="text"
          register={register}
          errorMessage={employee?.message}
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

export default SearchEvaluationThreeSix;
