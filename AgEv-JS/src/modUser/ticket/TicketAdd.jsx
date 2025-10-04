import TicketForm from "./TicketForm";
import TopHeader from "../../components/TopHeader";

const TicketAdd = () => {
  const defaultValues = {
    ticketId: "",
    title: "",
    description: "",
    supportingDocLink: "",
    projectId: "",
    categoryId: "",
    ticketType: "",
    priority: "",
    status: "",
    assigneeIds: [],
    remarks: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Ticket " btn="Return" path="/my/ticket/list" />
      <TicketForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/Tickets/Create"
        returnPath="/my/ticket/list"
      />
    </div>
  );
};

export default TicketAdd;
