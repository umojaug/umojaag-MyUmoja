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
  } = useGetData("amOdFollowUp", `/amOdFollowUp/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Today’s OD follow up information "
        btn="Return"
        path={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
      <OdFollowUpForm
        defaultValues={{
          opsAmODFollowUpId: list.data.opsAmODFollowUpId,
          amVisitId: list.data.amVisitId,
          groupName: list.data.groupName,
          borrowerName: list.data.borrowerName,
          realisedAmount: list.data.realisedAmount,
          remarks: list.data.remarks,
        }}
        action={refetch}
        btnText="Update"
        path="/amOdFollowUp/update"
        returnPath={`/ops/am/od/preview/${id}`}
      />
    </div>
  );
};

export default OdFollowUpEdit;
