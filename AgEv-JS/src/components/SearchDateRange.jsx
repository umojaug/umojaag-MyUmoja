import React from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "./DatePicker";

const schema = yup.object({
  fromDate: yup.date().required("Required."),
  tillDate: yup.date().required("Required."),
});

const SearchDateRange = ({ action, day = 1 }) => {
  var date = new Date();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromDate: new Date(date.getFullYear(), date.getMonth(), day),
      tillDate: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const { fromDate, tillDate } = errors;

  const onSubmit = async (formData) => {
    action({
      fromDate: moment.utc(formData.fromDate).local().format("DD-MMM-YYYY"),
      tillDate: moment.utc(formData.tillDate).local().format("DD-MMM-YYYY"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 py-2">
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

export default SearchDateRange;
