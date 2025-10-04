import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "./Error/ErrorMessage";

const DatePicker = ({ label, field, errorMessage = "" }) => {
  return (
    <div className="form-row w-full">
      <label className="place-item-center">{label}</label>
      <ReactDatePicker
        className="form-control"
        placeholderText="Select date"
        onChange={(e) => field.onChange(e)}
        selected={field.value}
        //minDate={new Date()}
        dateFormat="dd/MMM/yyyy"
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default DatePicker;
