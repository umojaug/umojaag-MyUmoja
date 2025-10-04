import React from "react";

const SaccoRow = ({ label, value, isBold = false }) => {
  return (
    <div
      className={`text-xs border-b border-black grid grid-cols-3 w-full ${
        isBold && "font-bold"
      }`}
    >
      <div className="px-2 py-0 border-r border-black col-span-2">{label}</div>
      <div className="px-2 py-0 text-right">{value}</div>
    </div>
  );
};

export default SaccoRow;
