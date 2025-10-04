import React from "react";
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";
import { useDownloadFile } from "../../hooks/useDownloadFile";

const ExcelButton = ({ path, filename = "tmp.xlsx", method = "Get", data }) => {
  const downloadFile = useDownloadFile();
  return (
    <button
      onClick={() => downloadFile(path, filename, "xlsx", method, data)}
      className="transition hover:-translate-y-1"
    >
      <PiMicrosoftExcelLogoDuotone size={40} />
    </button>
  );
};

export default ExcelButton;
