import { useState } from "react";
import { getCookie, setCookie } from "../../../utils/Helper";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import ViewToggle from "../../../components/ViewToggle";
import Items from "../Items";
import List from "../list";

const AmApprove = () => {
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
  } = useGetData("ticket", "/Tickets/listAm");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ticket Pending List" btn="Save" path="/my/ticket/add" />
      <ViewToggle viewType={viewType} onChange={handleViewChange} />
      {viewType === "grid" ? (
        <Items list={list} refetch={refetch} />
      ) : (
        <List list={list} refetch={refetch} />
      )}
    </div>
  );
};

export default AmApprove;
