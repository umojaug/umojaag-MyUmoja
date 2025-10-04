import AcceptButton from "../../../components/button/AcceptButton";
import RejectRemarkButton from "../../../components/button/RejectRemarkButton";
import TaskButton from "../../../components/button/TaskButton";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { format } from "date-fns";

const BranchVisitList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/branchVisit/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Visit Approve"
        // btn="Save"
        // path="/hr/branch/visit/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Branch Name" />
          <ListHeader label="Branch Manager" />
          <ListHeader label="Visit Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.branchVisitId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Branch Name:" value={item.branchName} />
              <ListCol label="Branch Manager:" value={item.branchManager} />
              <ListCol
                label="Visit Date:"
                // value={item.visitDate.toLocaleString("en-US")}
                value={format(new Date(item.visitDate), "dd-MM-yyyy")}
              />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/hr/branch/visit/details/${item.branchVisitId}`}
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

export default BranchVisitList;
