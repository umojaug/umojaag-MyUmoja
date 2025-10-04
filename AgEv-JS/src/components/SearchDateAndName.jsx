import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import DatePicker from "./DatePicker";
import { SelectFromDb } from "./SelectList";

const schema = yup.object({
  searchId: yup.string().required("Required."),
  fromDate: yup.date().required("Required."),
  tillDate: yup.date().required("Required."),
});
// To create a search function that retrieves data from an SQL database using a
//  stored procedure, you will need to implement a searchId operation,
//  which searches for a specific record based on the provided ID.

const SearchDateAndName = ({ action, path, label }) => {
  var date = new Date();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchId: "",
      fromDate: new Date(date.getFullYear(), date.getMonth(), 1),
      tillDate: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const { searchId, fromDate, tillDate } = errors;

  const onSubmit = async (formData) => {
    action({
      searchId: formData.searchId,
      fromDate: moment.utc(formData.fromDate).local().format("DD-MMM-YYYY"),
      tillDate: moment.utc(formData.tillDate).local().format("DD-MMM-YYYY"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-2">
        <SelectFromDb
          control={control}
          label={label}
          path={path}
          name="searchId"
          errorMessage={searchId?.message}
        />
        <Controller
          control={control}
          name="fromDate"
          render={({ field }) => (
            <DatePicker
              label="From Date"
              field={field}
              errorMessage={fromDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="tillDate"
          render={({ field }) => (
            <DatePicker
              label="Till Date"
              field={field}
              errorMessage={tillDate?.message}
              isRow={false}
            />
          )}
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

export default SearchDateAndName;
