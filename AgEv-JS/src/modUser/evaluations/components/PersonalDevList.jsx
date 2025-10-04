import React from "react";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

import { format } from "date-fns";

const PersonalDevList = ({ data }) => {
  return (
    <>
      <p className="text-justify">
        In the table below you will see your team members top 3 development
        areas according to their feedback that they feel will help them improve
        their performance over the coming year. Please review these and if you
        are not in agreement with them or need the employee to correct any point
        please click reject and guide the employee on what to correct. Otherwise
        you can add you comments as Manager into the Manager comments box and
        you are in agreement with their 3 development areas.
      </p>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Development Need" />
          <ListHeader label="Who will support you?" />
          <ListHeader label="Timeline to complete?" />
          <ListHeader label="Date to review progress?" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 list-body">
          <ListCol label="Development Need:" value={data.developmentNeedOne} />
          <ListCol label="Who will support you?" value={data.supportByOne} />
          {data.timelineOne !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Timeline to complete?"
              value={format(new Date(data.timelineOne), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
          {data.reviewDateOne !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Date to review progress?"
              value={format(new Date(data.reviewDateOne), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 list-body">
          <ListCol label="Development Need:" value={data.developmentNeedTwo} />
          <ListCol label="Who will support you?" value={data.supportByTwo} />
          {data.timelineTwo !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Timeline to complete?"
              value={format(new Date(data.timelineTwo), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
          {data.reviewDateTwo !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Date to review progress?"
              value={format(new Date(data.reviewDateTwo), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 list-body">
          <ListCol
            label="Development Need:"
            value={data.developmentNeedThree}
          />
          <ListCol label="Who will support you?" value={data.supportByThree} />
          {data.timelineThree !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Timeline to complete?"
              value={format(new Date(data.timelineThree), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
          {data.reviewDateThree !== "1980-12-31T00:00:00" ? (
            <ListCol
              label="Date to review progress?"
              value={format(new Date(data.reviewDateThree), "dd-MMM-yyyy")}
            />
          ) : (
            <ListCol label="Timeline to complete?" value="" />
          )}
        </div>
      </div>
      <div className="py-1">
        <h1 className="font-bold">Manager Comment</h1>
        <p>{data.managerCommentDev}</p>
      </div>
    </>
  );
};

export default PersonalDevList;
