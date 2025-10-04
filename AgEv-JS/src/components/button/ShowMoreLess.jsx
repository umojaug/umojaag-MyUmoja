import React, { useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { ListCol } from "../ListColWithHeader";

const ShowMoreLess = ({ readText }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {showMore ? (
        <ListCol
          label="Particulars : "
          value={readText}
          className="md:col-span-4 whitespace-pre-line"
        />
      ) : (
        <ListCol
          label="Particulars : "
          value={readText.slice(0, 50)}
          className="md:col-span-4"
        />
      )}

      <div className="flex justify-end space-x-1 px-1">
        <button
          className="btn-sky w-12 h-10"
          onClick={() => setShowMore(!showMore)}
        >
          <AiOutlineExpandAlt size={24} />
        </button>
      </div>
    </>
  );
};

export default ShowMoreLess;
