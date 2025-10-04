import React from "react";

const SaveButton = ({ btnText, disabled, isRow = true }) => {
  return (
    <div className={isRow ? "form-row w-full" : "md:mt-6"}>
      <button type="submit" className="btn-umojayellow" disabled={disabled}>
        {disabled ? <span className="loader"></span> : btnText}
      </button>
    </div>
  );
};

export default SaveButton;
