import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { useNavigate } from "react-router-dom";

const AuditSummaryList = () => {
  const navigate = useNavigate();
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("auditsummary", "/auditSummary/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit Workplan Summary List" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Audit Year" />
          <ListHeader
            label="Criteria for branch scheduling"
            className="md:col-span-3 md:pr-2"
          />
          <ListHeader label="Annual Audit" />
          <ListHeader label="Follow Up Audit" />
          <ListHeader label="Units" />
          <ListHeader label="Regions & Areas" />
          <ListHeader label="Total Audits" />
          <ListHeader label="Number Of Audit Staff" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              onClick={() =>
                navigate(`/audit/workplanSummary/edit/${item.summaryId}`)
              }
              key={index}
              className="grid grid-cols-1 gap-2 list-body cursor-pointer"
            >
              <div className="grid grid-cols-1 md:grid-cols-10">
                <ListCol label="Audit Year :" value={item.auditYear} />
                <ListCol
                  className="md:col-span-3 md:pr-2"
                  label="Criteria for branch scheduling :"
                  value={item.branchScCriteria}
                />
                <ListCol label="Annual Audit :" value={item.annualAudit} />
                <ListCol label="Follow Up Audit :" value={item.followUpAudit} />
                <ListCol label="Units :" value={item.units} />
                <ListCol label="Regions & Areas :" value={item.regionsAreas} />
                <ListCol label="Total Audits :" value={item.totalAudit} />
                <ListCol
                  label="Number Of Audit Staff :"
                  value={item.numberOfAuditStaff}
                />
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

export default AuditSummaryList;
