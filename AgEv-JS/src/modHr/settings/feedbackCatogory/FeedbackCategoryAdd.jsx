import TopHeader from "../../../components/TopHeader";
import FeedbackCategoryForm from "./FeedbackCategoryForm";

const FeedbackCatogoryAdd = () => {
  const defaultValues = {
    id: "",
    feedbackType: "",
    category: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Feedback Category"
        btn="Return"
        path="/hr/settings/feedback-category/list"
      />
      <FeedbackCategoryForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/FeedbackCat/create"
        returnPath="/hr/settings/feedback-category/list"
      />
    </div>
  );
};

export default FeedbackCatogoryAdd;
