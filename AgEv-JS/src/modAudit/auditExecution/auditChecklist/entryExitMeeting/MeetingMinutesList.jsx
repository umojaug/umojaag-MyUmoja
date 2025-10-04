import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import EditButton from "../../../../components/button/EditButton";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import { AiOutlineFile } from "react-icons/ai";

const MeetingMinutesList = ({ excutionId }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "auditmeetingminutes",
    `/auditMeetingMinutes/list/${excutionId}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="">
      <TopHeader
        title="Exntry & Exit Meeting Minutes List"
        btn="Return"
        path={`/audit/excution/branch/checklist/${excutionId}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Audit Year" />
          <ListHeader label="Particulars" />
          <ListHeader label="Meeting Minutes (Attached File)" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-2 list-body cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-4">
                <ListCol label="Audit Year :" value={item.auditYear} />
                <ListCol label="Particulars :" value={item.particulars} />
                {item.fileUrl !== "" ? (
                  <a href={item.fileUrl} className="btn-success w-12 h-10">
                    <AiOutlineFile size={24} />
                  </a>
                ) : (
                  <>File Not Attached</>
                )}
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/audit/meetingMinutes/edit/${item.meetingMinutesId}`}
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingMinutesList;
