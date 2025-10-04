import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import moment from "moment";
import toast from "react-hot-toast";

function Documentstems({ data }) {
  const onSubmit = async (fileUrl) => {
    if (fileUrl) window.location = fileUrl;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-1 grid-rows-twoRowsReverse gap-1 content-start bg-gray-200 rounded-lg shadow-lg p-4"
        >
          <div>
            <div className="text-md">
              <span>Publish date: </span>
              {moment.utc(item.publishDate).local().format("DD-MMM-YYYY")}
            </div>
            <div className="text-sm md:text-lg font-bold">{item.title}</div>
          </div>

          <div className="border-t border-gray-300 pt-2">
            <button
              className="btn-umojayellow w-full"
              onClick={() => onSubmit(item.fileUrl)}
            >
              <span className="">
                <AiOutlineLink size={24} />
              </span>
              <span className="text-xs font-bold">Read and Received</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Documentstems;
