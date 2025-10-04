import React from "react";
import { FaThLarge, FaList } from "react-icons/fa";

const ViewToggle = ({ viewType, onChange }) => {
  return (
    <div className="flex justify-end items-center mb-4">
      <div className="flex items-center gap-2">
        <button
          className={`p-2 rounded ${
            viewType === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChange("grid")}
          aria-label="Grid View"
        >
          <FaThLarge />
        </button>
        <button
          className={`p-2 rounded ${
            viewType === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChange("list")}
          aria-label="List View"
        >
          <FaList />
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
