import React from "react";

function TableColumn({ className, children }) {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
        className || ""
      }`}
    >
      {children}
    </th>
  );
}

export default TableColumn;
