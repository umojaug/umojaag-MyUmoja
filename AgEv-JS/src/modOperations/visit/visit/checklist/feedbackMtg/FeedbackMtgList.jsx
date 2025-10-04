import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import DeleteButton from "../../../../../components/button/DeleteButton";
import ImageView from "./ImageView";
import FeedbackMtgAdd from "./FeedbackMtgAdd";
import FeedbackMtgEdit from "./FeedbackMtgEdit";

function FeedbackMtgList({ id, isSubmit }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allFeedback", `/allFeedback/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <div className="flex justify-between align-items-center">
        <TopHeader title="8. Have you done the feedback meeting (30 minutes meeting) before leaving the branch:" />
        <FeedbackMtgAdd />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="" />
          <ListHeader className="md:pr-2" label="Issues Discussed " />
          <ListHeader className="md:pr-2" label="Specific Feedback Given " />
          <ListHeader className="md:pr-2" label="Remarks" />
          <ListHeader className="md:pr-2" label="Name of Attendees" />
          <ListHeader label="Signature" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              {isSubmit === 0 && (
                <div className="flex gap-2">
                  <FeedbackMtgEdit id={item.allFeedbackId} />
                  <DeleteButton
                    action={refetch}
                    path={`/allFeedback/delete/${item.allFeedbackId}`}
                  />
                </div>
              )}
              <ListCol
                className="md:pr-2"
                label="Issues Discussed : "
                value={item.discussedIssues}
                // value={item.discussedIssues.split(/,|\n/).map((issue, i) => (
                //   <div key={i}>{issue}</div>
                // ))}
              />
              <ListCol
                className="md:pr-2"
                label="Specific feedback Given :"
                value={item.givenFeedback}
                // value={item.givenFeedback.split(/,|\n/).map((feedback, i) => (
                //   <div key={i}>{feedback}</div>
                // ))}
              />
              <ListCol
                className="md:pr-2"
                label="Remarks :"
                value={item.remarks}
                // value={item.remarks.split(/,|\n/).map((remark, i) => (
                //   <div key={i}>{remark}</div>
                // ))}
              />
              <ListCol
                className="md:pr-2"
                label="Name of Attendees : "
                value={item.nameOfAttendees}
                // value={item.nameOfAttendees.split(/,|\n/).map((attendee, i) => (
                //   <div key={i}>{attendee}</div>
                // ))}
              />

              <div>
                <ImageView imageUrl={item.imageUrl} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FeedbackMtgList;
