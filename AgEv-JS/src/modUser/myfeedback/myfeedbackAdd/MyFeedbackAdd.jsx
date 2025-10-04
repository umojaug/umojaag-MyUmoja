import MyFeedbackForm from "./MyFeedbackForm";
import TopHeader from "../../../components/TopHeader";

const MyFeedbackAdd = () => {
  const defaultValues = {
    feedbackType: "Suggestion",
    particulars: "",
    category: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Feedback Create" btn="Return" path="/my/feedback/list" />
      <MyFeedbackForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/myfeedback/create"
        returnPath="/my/feedback/list"
      />
    </div>
  );
};

export default MyFeedbackAdd;
