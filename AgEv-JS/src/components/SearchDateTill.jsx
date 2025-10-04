import React from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "./DatePicker";

const schema = yup.object({
  tillDate: yup.date().required("Required."),
});

const SearchDateTill = ({ action, day = 1 }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tillDate: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const { tillDate } = errors;

  const onSubmit = async (formData) => {
    action({
      tillDate: moment.utc(formData.tillDate).local().format("DD-MMM-YYYY"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 py-2">
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

export default SearchDateTill;
