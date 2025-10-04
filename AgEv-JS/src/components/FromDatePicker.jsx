import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "./DatePicker";

const schema = yup.object({
  fromDate: yup.date().required("Required."),
});

const FromDatePicker = ({ action, day = 1 }) => {
  const date = new Date();
  
  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromDate: new Date(date.getFullYear(), date.getMonth(), day),
    },
    resolver: yupResolver(schema),
  });

  const fromDate = watch("fromDate");

  useEffect(() => {
    if (fromDate && action) {
      action(moment.utc(fromDate).local().format("DD-MMM-YYYY"));
    }
  }, [fromDate, action]);

  return (
    <Controller
      control={control}
      name="fromDate"
      render={({ field }) => (
        <DatePicker
          label="From Date"
          field={field}
          errorMessage={errors.fromDate?.message}
          isRow={false}
        />
      )}
    />
  );
};

export default FromDatePicker;