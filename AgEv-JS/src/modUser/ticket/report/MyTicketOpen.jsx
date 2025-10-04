import TopHeader from "../../../components/TopHeader";
import MyTicketOpenList from "./MyTicketOpenList";

const MyTicketOpen = () => {
  // const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="All Open Ticket" />

      <MyTicketOpenList />
    </div>
  );
};

export default MyTicketOpen;
