import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import DepartmentForm from "./DepartmentForm";

const FeedbackAssignEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/departments/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Feedback Assign"
        btn="Return"
        path="/hr/settings/department/list"
      />
      <DepartmentForm
        defaultValues={{
          assignId: list.data.assignId,
          feedbackId: list.data.feedbackId,
          employeeId: list.data.employeeId,
        }}
        action={refetch}
        btnText="Update"
        path="/departments/update"
        returnPath="/hr/settings/department/list"
      />
    </div>
  );
};

export default FeedbackAssignEdit;
