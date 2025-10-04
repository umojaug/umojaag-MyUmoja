import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import { ListCol, ListColDetails } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";
import { useGetData } from "../../../hooks/dataApi";

const MyFeedbackList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrMyFeedbacklist", "/myfeedback/mylist");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Feedback List" btn="Save" path="/my/feedback/add" />
      <div className="list-wrapper">
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.feedbackId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <div className="col-span-2">
                <ListColDetails
                  label="Feedback Type : "
                  value={item.feedbackType}
                />
                <ListColDetails
                  label="To Department : "
                  value={item.departmentType}
                />
                <ListColDetails label="Entry Date : " value={item.entryDate} />
                <ListColDetails label="Status : " value={item.status} />
              </div>

              <ListCol
                label="Particulars : "
                value={item.particulars}
                className="md:col-span-6 whitespace-pre-line"
              />
              <div className="col-span-1 flex justify-end space-x-2">
                <TaskButton path={`/my/feedback/note/${item.feedbackId}`} />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFeedbackList;
