import Error from "../../../components/Error";
import { ListCol, ListColDetails } from "../../../components/ListColWithHeader";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { format } from "date-fns";

const FeedbackDetails = ({ feedbackId }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("saleslead", `/myfeedback/Details/${feedbackId}`);

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  const feedback = list.data;

  console.log(feedback);

  return (
    <>
      <TopHeader title={`${feedback.feedbackType} Details`} />
      <div className="grid grid-cols-1 md:grid-cols-8 rounded-lg py-2 px-3 bg-gray-200 text-sm">
        <div className="col-span-2">
          <ListColDetails label="Branch : " value={feedback.branchName} />
          <ListColDetails
            label="Department : "
            value={feedback.departmentName}
          />

          {feedback.allowAnonymous !== "Yes" && (
            <>
              <ListColDetails label="PIN : " value={feedback.employeePin} />
              <ListColDetails
                label="Employee Name : "
                value={feedback.employeeName}
              />
              <ListColDetails
                label="Designation : "
                value={feedback.designationName}
              />
              <ListColDetails
                label="Contact Number : "
                value={feedback.contactNumber}
              />
            </>
          )}

          <ListColDetails
            label="To Department : "
            value={feedback.departmentType}
          />
          <ListColDetails
            label="Entry Date: "
            value={format(new Date(feedback.entryDate), "dd/MMM/yyyy")}
          />
        </div>

        <ListCol
          label="Particulars : "
          value={feedback.particulars}
          className="md:col-span-6 whitespace-pre-line"
        />
      </div>
    </>
  );
};

export default FeedbackDetails;
