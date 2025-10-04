import React from "react";
import { GrDocumentCsv } from "react-icons/gr";
import { CSVLink } from "react-csv";

const ToCsv = ({ data, headers, filename }) => {
  return (
    <CSVLink
      data={data}
      headers={headers}
      enclosingCharacter={`"`}
      filename={filename}
      className="btn-print px-2"
      target="_blank"
    >
      <GrDocumentCsv size={34} />
    </CSVLink>
  );
};

export default ToCsv;
