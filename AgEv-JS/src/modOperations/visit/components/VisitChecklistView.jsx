import React from "react";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";

const VisitChecklistView = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("visitchecklist", `/visit/Checklist/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      {list.data.length > 0 &&
        list.data.map((field, index) => (
          <div
            key={field.detailsId}
            className="grid grid-cols-1 list-body gap-y-2 rounded-md"
          >
            <div className="text-lg">
              <span className="font-bold">Que:</span> {field.question}
            </div>
            <div className="text-lg">
              <span className="font-bold">Ans:</span> {field.answerShort}
            </div>
            {field.answerLong !== "" && (
              <div className="text-lg text-justify">
                <span className="font-bold">Remarks:</span> {field.answerLong}
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default VisitChecklistView;
