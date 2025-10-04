import TopHeader from "../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";

const ManagerMappingList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("managerMappingList", "/managerMapping/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Manager Mapping "
        btn="Save"
        path="/hr/settings/manager-mapping/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Designation" />
          <ListHeader label="Mapped To" />
          <ListHeader label="Manager First" />
          <ListHeader label="Manager Second" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.mgt}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Designation:" value={item.designationName} />
              <ListCol label="Mapped To:" value={item.mappedTo} />
              <ListCol label="Manager First:" value={item.managerFirst} />
              <ListCol label="Mapped Second:" value={item.managerSecond} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/settings/manager-mapping/edit/${item.mgtMappingId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/managerMapping/delete/${item.mgtMappingId}`}
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

export default ManagerMappingList;
