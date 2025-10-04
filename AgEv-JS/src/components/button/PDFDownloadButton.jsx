import React from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { useDownloadFile } from "../../hooks/useDownloadFile";

const PDFDownloadButton = ({
  path, filename = "tmp.pdf", method = "Get", data, btnText = "", btnClass = "transition hover:-translate-y-1", Icon = AiOutlinePrinter, iconSize = 24, iconClass = "ml-1"
}) => {
  const downloadFile = useDownloadFile();
  return (
    <button
      onClick={() => downloadFile(path, filename, method, data)}
      className={btnClass}
    >
      {btnText} <Icon size={iconSize} className={iconClass} />
    </button>
  );
};

export default PDFDownloadButton;
