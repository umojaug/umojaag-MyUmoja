import React from "react";
import { AiOutlineFile } from "react-icons/ai";

const AttachmentButton = ({ path }) => {
  return (
    <>
      <a href={path} target="blank" className="btn-teal w-12 h-10">
        <AiOutlineFile size={24} />
      </a>
    </>
  );
};

export default AttachmentButton;
