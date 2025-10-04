import React from "react";
import { useParams } from "react-router-dom";
import AuditExcutionUnitStepsList from "./detailsSteps/AuditExcutionUnitStepsList";
import MeetingMinutesList from "./entryExitMeeting/MeetingMinutesList";

const ChecklistDetails = () => {
  const { excutionId, areaId, areaType } = useParams();

  return (
    <div className="card w-full max-w-screen-xl">
      {areaId === "101" ? (
        <>
          <MeetingMinutesList excutionId={excutionId} />
        </>
      ) : (
        <>
          <AuditExcutionUnitStepsList
            excutionId={excutionId}
            auditAreaId={areaId}
            areaType={areaType}
            // branch={}
          />
        </>
      )}
    </div>
  );
};

export default ChecklistDetails;
