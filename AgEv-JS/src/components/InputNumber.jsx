import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const InputNumber = ({
  name,
  label,
  type = "text",
  register,
  errorMessage = "",
  isAutoFocus = false,
  isReadOnly = false,
  showPlaceHolder = false,
  inputNumber = "",
  setInputNumber,
}) => {
  //   const [inputNumber, setInputNumber] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    const formattedNumber = Number(value.replace(/,/g, "")).toLocaleString();
    setInputNumber(formattedNumber);
  };

  return (
    <div className="form-row w-full">
      {showPlaceHolder === false && <label>{label}</label>}
      <input
        type={type}
        className={
          "form-control " +
          (errorMessage ? "input-border-danger " : "input-border-primary ") +
          (isReadOnly === true ? "bg-gray-100" : "bg-white")
        }
        {...register(name)}
        autoFocus={isAutoFocus}
        readOnly={isReadOnly}
        placeholder={showPlaceHolder === true ? label : ""}
        value={inputNumber}
        onChange={handleChange}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default InputNumber;
