import React from "react";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import DayCloseButton from "../../components/layout/DayCloseButton";
import DenominationButton from "../../../components/button/DenominationButton";

const DayOpenList = ({ data, action }) => {
  console.log("DayOpenList data", data);
  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-10 list-header gap-2">
        <ListHeader label="Branch Name" />
        <ListHeader label="Business Date" />
        <ListHeader label="Status" />
        <ListHeader label="Open By" />
        <ListHeader label="Open Date" />
        <ListHeader label="Close By" />
        <ListHeader label="Closing Date" />
        <ListHeader label="Approve By" />
        <ListHeader label="Approve Date" />
        <ListHeader label="" />
      </div>

      {data.length > 0 &&
        data.slice(0, 30).map((item) => (
          <div
            key={item.dayOpenCloseId}
            className="grid grid-cols-1 md:grid-cols-10 list-body gap-1 text-xs items-center"
          >
            <ListCol label="Branch Name: " value={item.branchName} />
            <ListCol
              label="Business Date: "
              value={format(new Date(item.businessDate), "dd/MMM/yyyy")}
            />
            <ListCol label="Status: " value={item.status} />
            <ListCol label="Open By: " value={item.openBy} />
            <ListCol
              label="Open Date: "
              value={format(new Date(item.openDate), "dd/MMM/yyyy")}
            />
            <ListCol label="Close By: " value={item.closeBy} />
            <ListCol
              label="Closing Date: "
              value={format(new Date(item.closingDate), "dd/MMM/yyyy")}
            />
            <ListCol label="Approve By: " value={item.closeBy} />
            <ListCol
              label="Approve Date: "
              value={format(new Date(item.approveDate), "dd/MMM/yyyy")}
            />

            {/* {item.status === "Day Closed" && (
              <ListCol
                className="text-red-600"
                label="Status : "
                value={item.status}
              />
            )} */}

            {item.status === "Day Open" && (
              <>
                <div className="flex justify-end space-x-2">
                  <DayCloseButton
                    path={`/acDay/DayClose/${item.dayOpenCloseId}`}
                    action={action}
                  />
                  <DenominationButton
                    path={`/acDay/Denomination/${item.dayOpenCloseId}`}
                    action={action}
                  />
                </div>
              </>
            )}
          </div>
        ))}

      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">
            Total : {data.slice(0, 30).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DayOpenList;
