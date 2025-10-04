import React from "react";
import ToCsv from "./ToCsv";

const PrintHeader = ({ title, data, fileName, headers}) => {
  return (
    <div className="flex justify-between py-2">
      <div className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
        {title}
      </div>
      <div className="flex space-x-5 transition hover:-translate-y-1">
        <ToCsv data={data} filename={fileName} headers={headers}/>
      </div>
    </div>
  );
};

export default PrintHeader;
