import React from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";

const PrintHeaderHtml = ({ title, contentRef }) => {
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="flex justify-between py-2">
      <div className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
        {title}
      </div>
      <div className="flex space-x-5 transition hover:-translate-y-1">
        <button
          onClick={reactToPrintFn}
          className="rounded-md px-4 py-2 text-black"
        >
          <AiFillPrinter size={30} />{" "}
        </button>
      </div>
    </div>
  );
};

export default PrintHeaderHtml;
