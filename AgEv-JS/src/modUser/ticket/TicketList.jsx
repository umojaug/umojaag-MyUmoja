import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { getCookie, setCookie } from "../../utils/Helper";
import Items from "./Items";
import List from "./list";
import { useState } from "react";
import ViewToggle from "../../components/ViewToggle";

const TicketList = () => {
  const savedView = getCookie("ticketViewType");
  const [viewType, setViewType] = useState(savedView || "grid");

  const handleViewChange = (type) => {
    setViewType(type);
    setCookie("ticketViewType", type);
  };

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ticket", "/Tickets/OwnTickList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Today's Tickets" btn="Save" path="/my/ticket/add" />
      <ViewToggle viewType={viewType} onChange={handleViewChange} />
      {viewType === "grid" ? (
        <Items list={list} refetch={refetch} />
      ) : (
        <List list={list} refetch={refetch} />
      )}
    </div>
  );
};

export default TicketList;
