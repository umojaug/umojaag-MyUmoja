import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import Items from "../Items";
import List from "../List";
import { getCookie, setCookie } from "../../../utils/Helper";
import ViewToggle from "../../../components/ViewToggle";
import { useState } from "react";

const MyTicketOpenList = ({ dataForm }) => {
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
  } = useGetData("ticket", `/Tickets/Open`);
  // /Tickets/MasterList
  // /${dataForm.tillDate}

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <ViewToggle viewType={viewType} onChange={handleViewChange} />
      {viewType === "grid" ? (
        <Items list={list} refetch={refetch} previousPath={"/Tickets/master"} />
      ) : (
        <List list={list} refetch={refetch} previousPath={"/Tickets/master"} />
      )}
    </>
  );
};

export default MyTicketOpenList;
