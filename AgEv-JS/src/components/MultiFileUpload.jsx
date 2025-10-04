import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose, AiOutlineFile } from "react-icons/ai";
import ErrorMessage from "./Error/ErrorMessage";
import toast from "react-hot-toast";

const MultiFileUpload = ({
  label,
  onFilesChange,
  errorMessage,
  accept,
  maxFiles = 2,
}) => {
  const [files, setFiles] = useState([]);
  const [pastedFiles, setPastedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (maxFiles && files.length + acceptedFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      onFilesChange(newFiles);
    },
    [files, onFilesChange, maxFiles]
  );

  const removeFile = (fileIndex) => {
    const updatedFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handlePaste = (event) => {
    if (event.clipboardData) {
      const items = event.clipboardData.items;
      const newFiles = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          const file = items[i].getAsFile();
          newFiles.push(file);
        }
      }
      if (maxFiles && files.length + newFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} files.`);
        const allowedFiles = newFiles.slice(0, maxFiles - files.length);
        setPastedFiles(allowedFiles);
      } else {
        setPastedFiles(newFiles);
      }
    }
  };

  useEffect(() => {
    const handleDocumentPaste = (event) => {
      handlePaste(event);
    };
    document.addEventListener("paste", handleDocumentPaste);
    return () => {
      document.removeEventListener("paste", handleDocumentPaste);
    };
  }, []);

  useEffect(() => {
    if (pastedFiles.length > 0) {
      const updatedFiles = [...files, ...pastedFiles];
      if (maxFiles && updatedFiles.length > maxFiles) {
        // const exceededFiles = updatedFiles.slice(maxFiles);
        toast.error(`You can only upload up to ${maxFiles} files.`);
        const allowedFiles = updatedFiles.slice(0, maxFiles);
        setFiles(allowedFiles);
        onFilesChange(allowedFiles);
      } else {
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
      }
      setPastedFiles([]);
    }
  }, [pastedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    noClick: false,
  });

  return (
    <>
      {label && <label className="block font-medium mb-2">{label}</label>}
      <div className="border p-3 rounded">
        <div
          {...getRootProps()}
          className="p-4 border-2 border-dashed rounded cursor-pointer text-center"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">
            Drag & drop files here, or click to select
            {maxFiles ? ` (Max ${maxFiles} files)` : ""}
          </p>
        </div>

        {files.length > 0 ? (
          <div className="mt-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border"
              >
                <span className="flex items-center">
                  <AiOutlineFile className="mr-2 text-gray-600" />
                  {file.name}
                </span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeFile(index)}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <ErrorMessage message={errorMessage} />
      </div>
    </>
  );
};

export default MultiFileUpload;
