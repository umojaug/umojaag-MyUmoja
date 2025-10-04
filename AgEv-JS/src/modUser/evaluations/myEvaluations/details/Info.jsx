import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BehaviorsList from "./BehaviorsList";
import LeadershipList from "./LeadershipList";
import ObjectivesList from "./ObjectivesList";
import PersonalList from "./PersonalList";
import PersonalDevList from "./PersonalDevList";
import Preview from "./Preview";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { useGetData } from "../../../../hooks/dataApi";

const Info = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("evaluationdetailsinfo", `/evaluation/detailsinfo/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  switch (page) {
    case 1:
      return <ObjectivesList defaultValues={list.data} action={setPage} />;
    case 2:
      return <BehaviorsList defaultValues={list.data} action={setPage} />;
    case 3:
      return <LeadershipList defaultValues={list.data} action={setPage} />;
    case 4:
      return <PersonalList defaultValues={list.data} action={setPage} />;
    case 5:
      return <PersonalDevList defaultValues={list.data} action={setPage} />;
    case 6:
      return <Preview defaultValues={list.data} action={setPage} />;
    default:
  }
};

export default Info;
