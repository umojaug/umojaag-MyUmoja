import TopHeader from "../../../components/TopHeader";
import { ListCol } from "../../../components/ListColWithHeader";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { useParams } from "react-router-dom";

const FeedbackDetails = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("saleslead", `/myfeedback/Details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader title={list.data.feedbackType + " Details"} />
      <div className="grid grid-cols-1 md:grid-cols-8 rounded-lg py-2 px-3 bg-gray-200 text-sm">
        
        <ListCol
          label="Particulars : "
          value={list.data.particulars}
          className="md:col-span-6 whitespace-pre-line"
        />
      </div>
    </>
  );
};

export default FeedbackDetails;
