import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const DepartmentFocalList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/departmentFocals/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Department Manager List"
        btn="Save"
        path="/hr/settings/department/focal/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Department Name" />
          <ListHeader label="Employee Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.focalId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label=" Department Name:" value={item.departmentName} />
              <ListCol label=" Department Name:" value={item.employeeName} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/hr/settings/department/focal/edit/${item.focalId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/departmentFocals/delete/${item.focalId}`}
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

export default DepartmentFocalList;
