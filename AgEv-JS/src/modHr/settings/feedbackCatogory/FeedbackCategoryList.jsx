import TopHeader from "../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";

const FeedbackCategoryList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("managerMappingList", "/FeedbackCat/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Feedback  Category List"
        btn="Save"
        path="/hr/settings/feedback-category/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="FeedBack Type" />
          <ListHeader label="Feedback Category" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.mgt}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="FeedBack Type:" value={item.feedbackType} />
              <ListCol label="Category :" value={item.category} />

              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/settings/feedback-category/edit/${item.id}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/FeedbackCat/delete/${item.id}`}
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

export default FeedbackCategoryList;
