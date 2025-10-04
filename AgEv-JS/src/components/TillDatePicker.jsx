import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "./DatePicker";

const schema = yup.object({
  tillDate: yup.date().required("Required."),
});

const TillDatePicker = ({ action }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tillDate: new Date(),
    },
    resolver: yupResolver(schema),
  });

  const tillDate = watch("tillDate");

  useEffect(() => {
    if (tillDate && action) {
      action(moment.utc(tillDate).local().format("DD-MMM-YYYY"));
    }
  }, [tillDate, action]);

  return (
    <Controller
      control={control}
      name="tillDate"
      render={({ field }) => (
        <DatePicker
          label="Till Date"
          field={field}
          errorMessage={errors.tillDate?.message}
          isRow={false}
        />
      )}
    />
  );
};

export default TillDatePicker;