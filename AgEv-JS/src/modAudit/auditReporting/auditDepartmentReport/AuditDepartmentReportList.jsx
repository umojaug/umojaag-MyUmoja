import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import TaskButton from "../../../components/button/TaskButton";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import EditButton from "../../../components/button/EditButton";

const AuditDepartmentReportList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "hrAuditBranchDepartmentAuditReport",
    "/AuditDepartmentReport/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Department Report " />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Year" />
          <ListHeader label="Reporting Quarter" />
          <ListHeader label="Month Of Audit" />
          <ListHeader label="Department Name" />
          <ListHeader label="Department Overview" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-6 list-body">
              <ListCol label="Year:" value={item.year} />
              <ListCol
                label="Reporting Quarter:"
                value={item.reportingQuarter}
              />
              <ListCol label="Month Of Audit:" value={item.monthOfAudit} />
              <ListCol label="Department Name:" value={item.departmentName} />
              <ListCol
                label="departmentOverview:"
                value={item.departmentOverview}
              />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/audit/reporting/department/details/${item.reportId}`}
                />
                <EditButton
                  path={`/audit/reporting/department/edit/${item.reportId}`}
                  btnColor="btn-gray"
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

export default AuditDepartmentReportList;
