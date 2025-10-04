import React from "react";
import moment from "moment";
import TrainingButton from "../../components/button/TrainingButton";

function TrainingItems({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.topicId}
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
            <TrainingButton path={`/training/evaluation/add/${item.topicId}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrainingItems;
