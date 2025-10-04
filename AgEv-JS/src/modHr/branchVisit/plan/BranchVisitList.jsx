import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";

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

  console.log(list.data);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Visit List"
        btn="Save"
        path="/hr/branch/visit/plan/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Branch Name" />
          <ListHeader label="Branch Manager" />
          <ListHeader label="Visit Date" />
          <ListHeader label="Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.branchVisitId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Branch Name:" value={item.branchName} />
              <ListCol label="Branch Manager:" value={item.branchManager} />
              <ListCol
                label="Visit Date:"
                value={format(new Date(item.visitDate), "dd-MM-yyyy")}
              />
              <ListCol label="Satus:" value={item.status} />
              <div className="flex justify-end space-x-2">
                {/* <TaskButton
                  path={`/hr/branch/visit/details/${item.branchVisitId}`}
                /> */}
                <EditButton
                  path={`/hr/branch/visit/edit/${item.branchVisitId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/branchVisit/delete/${item.branchVisitId}`}
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
