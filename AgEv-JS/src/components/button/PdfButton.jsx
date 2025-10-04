import React from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { useDownloadFile } from "../../hooks/useDownloadFile";

const PdfButton = ({ path, filename = "tmp.pdf", method = 'Get', data }) => {
  const downloadFile = useDownloadFile();
  return (
    <button
      onClick={() => downloadFile(path, filename, method, data)}
      className="transition hover:-translate-y-1"
    >
      <AiOutlinePrinter size={40} />
    </button>
  );
};

export default PdfButton;
