import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const DesignationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDesignation", "/designations/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Designation"
        btn="Save"
        path="/hr/settings/designation/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Designation Name" />
          <ListHeader label="Role Name" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.designationId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Designation Name:" value={item.designationName} />
              <ListCol label="Role Name:" value={item.roleName} />

              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/hr/settings/designation/edit/${item.designationId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/designations/delete/${item.designationId}`}
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

export default DesignationList;
