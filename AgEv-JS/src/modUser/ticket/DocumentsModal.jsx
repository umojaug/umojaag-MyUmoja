import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Transition,
} from "@headlessui/react";

function DocumentsModal({ file }) {
  let [isOpen, setIsOpen] = useState(false);

  const isPDF = file
    ? file.toLowerCase().includes(".pdf") || file.toLowerCase().includes("pdf")
    : false;

  const renderFilePreview = () => {
    if (!file) return null;

    if (isPDF) {
      return (
        <div className="relative group flex flex-col items-center">
          <a
            href={`https://drive.google.com/file/d/${file}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            <FaFilePdf size={64} className="text-red-600 mb-2" />
            <div className="bg-gray-100 p-3 rounded-lg w-full max-w-sm">
              <img
                src={`https://drive.google.com/thumbnail?id=${file}`}
                alt="PDF Preview"
                className="object-contain w-full rounded-lg shadow-md transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="mt-2 text-blue-600 hover:underline">View PDF</span>
          </a>
        </div>
      );
    } else {
      return (
        <div className="relative group">
          <a
            href={`https://drive.google.com/file/d/${file}/view`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`https://drive.google.com/thumbnail?id=${file}`}
              alt="Image Attachment"
              className="object-cover rounded-lg shadow-md transition-transform group-hover:scale-105 max-h-96"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      );
    }
  };

  return (
    <>
      <button className="w-10 h-10 btn-success" onClick={() => setIsOpen(true)}>
        <FaRegFileLines size={24} />
      </button>

      <Transition appear show={isOpen}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60" />
          <DialogPanel className="relative w-full max-w-md md:max-w-xl bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {isPDF ? "PDF Document" : "Image"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-red-600 transition"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              {renderFilePreview()}
            </div>
          </DialogPanel>
        </Dialog>
      </Transition>
    </>
  );
}

export default DocumentsModal;
