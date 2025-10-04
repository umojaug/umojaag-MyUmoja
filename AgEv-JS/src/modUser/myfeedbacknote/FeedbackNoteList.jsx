import React from "react";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { useParams } from "react-router-dom";
import FeedbackDetails from "./FeedbackDetails";
import { format } from "date-fns";
import NoteAdd from "./NoteAdd";

const FeedbackNoteList = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("feedbacknotelist", `/feedbacknote/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <FeedbackDetails feedbackId={id} />
      <div className="lg:px-0">
        <NoteAdd feedbackId={id} action={refetch} />
        <div className="list-wrapper gap-1">
          {list.data.map((item) => (
            <div
              key={item.noteId}
              className="grid grid-cols-1 gap-1 list-body rounded-lg"
            >
              <div className="flex space-x-2 font-bold text-xs text-gray-600">
                {/* <span>Post By : Anonymous,</span> */}
                <span>
                  Post Date : {format(new Date(item.entryDate), "dd/MMM/yyyy")}
                </span>
              </div>
              <span className="text-lg break-words whitespace-pre-line">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackNoteList;
