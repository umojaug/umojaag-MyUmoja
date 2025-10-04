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

const SearchDateRangeMulti = ({ action, day = 1 }) => {
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

  const setAction = (fromDate, tillDate) => {
    action({
      fromDate: moment.utc(fromDate).local().format("DD-MMM-YYYY"),
      tillDate: moment.utc(tillDate).local().format("DD-MMM-YYYY"),
    });
  };

  const weeklySubmit = () => {
    let t = new Date();
    let f = new Date();
    f.setDate(t.getDate() - 7);
    setAction(f, t);
  };

  const onSubmit = async (formData) => {
    setAction(fromDate.fromDate, tillDate.tillDate);
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
          <div className="btn-umojayellow h-9" onClick={weeklySubmit}>
            last Week
          </div>
        </div>
        <div className="form-row w-full place-content-end">
          <button type="submit" className="btn-umojayellow h-9">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchDateRangeMulti;
