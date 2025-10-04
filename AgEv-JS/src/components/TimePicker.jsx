import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "./Error/ErrorMessage";

const TimePicker = ({ label, field, errorMessage = "" }) => {
  return (
    <div className="form-row w-full">
      <label className="place-item-center">{label}</label>
      <ReactDatePicker
        className="form-control"
        placeholderText="Select time"
        onChange={(e) => field.onChange(e)}
        selected={field.value}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default TimePicker;
