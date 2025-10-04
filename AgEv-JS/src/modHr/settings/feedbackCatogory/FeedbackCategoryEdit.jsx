import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import FeedbackCategoryForm from "./FeedbackCategoryForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const FeedbackCategoryEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("managerMappingDetails", `/FeedbackCat/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Feedback Category"
        btn="Return"
        path="/hr/settings/feedback-category/list"
      />
      <FeedbackCategoryForm
        defaultValues={{
          id: list.data.id,
          category: list.data.category,
          feedbackType: list.data.feedbackType,
        }}
        action={refetch}
        btnText="Update"
        path="/FeedbackCat/update"
        returnPath="/hr/settings/feedback-category/list"
      />
    </div>
  );
};

export default FeedbackCategoryEdit;
