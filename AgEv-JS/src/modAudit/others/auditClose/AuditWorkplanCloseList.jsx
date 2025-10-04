import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";

const AuditWorkplanCloseList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("auditworkplan", "/auditClose/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit Closed List" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <ListHeader label="Audit Year" />
          <ListHeader label="Month" />
          <ListHeader label="Audit Entity" />
          <ListHeader label="Risk Rating" />
          <ListHeader label="Auditor" />
          <ListHeader label="Field Days" />
          <ListHeader label="Expected Cost" />
          <ListHeader label="Audit Status" />
          <ListHeader label="Report Status" />
          <ListHeader label="Discussion Status" />
          <ListHeader label="FollowUp Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 list-body">
              <div className="grid grid-cols-1 md:grid-cols-11">
                <ListCol label="Audit Year :" value={item.auditYear} />
                <ListCol label="Month :" value={item.monthName} />
                <ListCol label="Audit Entiry :" value={item.auName} />
                <ListCol label="Risk Rating :" value={item.overallRiskRating} />
                <ListCol label="Auditor :" value={item.auditorName} />
                <ListCol label="Field Days :" value={item.fieldDays} />
                <ListCol label="Expected Cost :" value={item.expectedCost} />
                <ListCol label="Audit Status :" value={item.auditStatus} />
                <ListCol label="Report Status :" value={item.reportStatus} />
                <ListCol
                  label="Discussion Status :"
                  value={item.discussionStatus}
                />
                <ListCol
                  label="FollowUp Status :"
                  value={item.followUpStatus}
                />
                <div className="flex justify-end space-x-2">
                  {/* <EditButton
                    path={`/audit/workPlan/edit/${item.workPlanId}`}
                  /> */}
                  {/* <DeleteButton
                    action={refetch}
                    path={`/auditWorkplan/delete/${item.workPlanId}`}
                  /> */}
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

export default AuditWorkplanCloseList;
