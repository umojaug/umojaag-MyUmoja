import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import MeetingMinutesForm from "./MeetingMinutesForm";

const MeetingMinutesEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditMeetingMinutes", `/auditMeetingMinutes/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Entry Exit Meeting Minutes"
        btn="Return"
        path={`/audit/meeting/checkdetails/${list.data.excutionId}/101`}
      />
      <MeetingMinutesForm
        defaultValues={{
          meetingMinutesId: list.data.meetingMinutesId,
          excutionId: list.data.excutionId,
          // auditYearId: list.data.auditYearId,
          auditYear: list.data.auditYear,
          particulars: list.data.particulars,
          fileUrl: list.data.fileUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/auditMeetingMinutes/update"
        returnPath={`/audit/meeting/checkdetails/${list.data.excutionId}/101`}
      />
    </div>
  );
};

export default MeetingMinutesEdit;
