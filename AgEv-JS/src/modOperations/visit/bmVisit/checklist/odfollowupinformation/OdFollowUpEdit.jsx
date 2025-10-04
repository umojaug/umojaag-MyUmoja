import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";

import OdFollowUpForm from "./OdFollowUpForm";

const OdFollowUpEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("bmOdFollowUp", `/bmOdFollowUp/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Today’s OD follow up information "
        btn="Return"
        path={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
      <OdFollowUpForm
        defaultValues={{
          opsBmOdFollowUpId: list.data.opsBmOdFollowUpId,
          bmVisitId: list.data.bmVisitId,
          groupName: list.data.groupName,
          borrowerName: list.data.borrowerName,
          realisedAmount: list.data.realisedAmount,
        }}
        action={refetch}
        btnText="Update"
        path="/bmOdFollowUp/update"
        returnPath={`/ops/bm/od/preview/${id}`}
      />
    </div>
  );
};

export default OdFollowUpEdit;
