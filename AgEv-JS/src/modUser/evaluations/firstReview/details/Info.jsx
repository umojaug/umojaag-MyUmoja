import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ObjectivesList from "./ObjectivesList";
import BehaviorsList from "./BehaviorsList";
import LeadershipList from "./LeadershipList";
import PersonalList from "./PersonalList";
import PersonalDevList from "./PersonalDevList";
import ViewApplication from "./ViewApplication";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { useGetData } from "../../../../hooks/dataApi";

const Info = () => {
  const { id } = useParams();
  const [page, setPage] = useState(0);

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("evaluationdetailsinfo", `/evaluation/detailsinfo/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  switch (page) {
    case 0:
      return <ViewApplication data={list.data} action={setPage} />;
    case 1:
      return <ObjectivesList defaultValues={list.data} action={setPage} />;
    case 2:
      return <BehaviorsList defaultValues={list.data} action={setPage} />;
    case 3:
      return <LeadershipList defaultValues={list.data} action={setPage} />;
    case 4:
      return <PersonalList defaultValues={list.data} action={setPage} />;
    case 5:
      return <PersonalDevList defaultValues={list.data} />;
    default:
  }
};

export default Info;
