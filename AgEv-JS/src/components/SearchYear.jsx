import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFromOptions, DataListFromDb, SelectFromDb } from "./SelectList";
import { selectOptions } from "../data/selectOptions";

const schema = yup.object({
  selectYear: yup.string().required("Required."),
  evaluationTypeId: yup.string().required("Required."),
  searchByPinName: yup.string().max(50),
});

const SearchYear = ({ action, displaySearch = false }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectYear: new Date().getFullYear(),
      searchByPinName: "",
    },
    resolver: yupResolver(schema),
  });
  const { selectYear, searchByPinName, evaluationTypeId } = errors;

  const onSubmit = async (formData) => {
    action({
      selectYear: formData.selectYear,
      searchByPinName: formData.searchByPinName,
      evaluationTypeId: formData.evaluationTypeId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
        {displaySearch && (
          <DataListFromDb
            register={register}
            label="Employee"
            path="/employees/select"
            name="searchByPinName"
            errorMessage={searchByPinName?.message}
          />
        )}

        <SelectFromDb
          control={control}
          label="Evaluation Type"
          path="/evaluationtype/select"
          name="evaluationTypeId"
          errorMessage={evaluationTypeId?.message}
        />

        <SelectFromOptions
          register={register}
          options={selectOptions.years}
          label="Year"
          name="selectYear"
          errorMessage={selectYear?.message}
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

export default SearchYear;
