import { useParams } from "react-router-dom";
import TicketForm from "./TicketForm";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";

const TicketEdit = () => {
  const { id, "*": prevPath } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ticketdetails", `/Tickets/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  // console.log(id);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Ticket" btn="Return" path="/my/ticket/list" />
      <TicketForm
        defaultValues={{
          ticketId: list.data.ticketId,
          title: list.data.title,
          description: list.data.description,
          ticketType: list.data.ticketType,
          priority: list.data.priority,
          file1Path: list.data.attachment1,
          file2Path: list.data.attachment2,
          supportingDocLink: list.data.supportingDocLink,
          projectId: list.data.projectId,
          categoryId: list.data.categoryId,
          status: list.data.status,
          // assigneeIds: list.data.assignees.map((assignee) => assignee.userId),
          remarks: list.data.remarks,
        }}
        action={refetch}
        btnText="Update"
        path="/Tickets/Update"
        returnPath="/my/ticket/list"
      />
    </div>
  );
};

export default TicketEdit;
