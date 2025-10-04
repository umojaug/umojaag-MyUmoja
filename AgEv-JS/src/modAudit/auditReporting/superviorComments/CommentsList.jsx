import CommentsDetails from "./CommentsDetails";
import { format } from "date-fns";
import NoteAdd from "./NoteAdd";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { useParams } from "react-router-dom";

const SupervisorCommentsList = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("feedbacknotelist", `/SupervisorComments/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <CommentsDetails reportId={id} />
      <div className="lg:px-0">
        <NoteAdd reportId={id} action={refetch} />
        <div className="list-wrapper gap-1">
          {list.data.length > 0 &&
            list.data.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 gap-1 list-body rounded-lg"
              >
                <div className="flex space-x-2 font-bold text-xs text-gray-600">
                  <span>Post By : {item.entryBy},</span>
                  <span>
                    Post Date :{" "}
                    {format(new Date(item.entryDate), "dd/MMM/yyyy")}
                  </span>
                </div>
                <span className="text-lg break-words whitespace-pre-line">
                  {item.note}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SupervisorCommentsList;
