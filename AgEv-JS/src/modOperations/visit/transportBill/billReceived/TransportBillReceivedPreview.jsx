import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TravelView from "../../components/TravelView";
import BillDetailsList from "../checklist/billDetails/BillDetailsList";
import SubmitToManager from "../checklist/SubmitToManager";

// import TransportAccept from "../../components/TransportAccept";
// import TransportReject from "../../components/TransportReject";

const TransportBillReceivedPreview = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("travelingBill", `/myTravelingBill/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const isSubmit = list.data.isSubmit;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="px-5">
        <TravelView
          title="Transport Bill"
          data={list.data}
          path={`/ops/transportBill/received/list`}
        />
        <BillDetailsList id={id} isSubmit={isSubmit} />

        {(list.data.isSubmit === 0 || list.data.isSubmit === 4) && (
          <SubmitToManager id={id} allVisitId={list.data.allVisitId} />
          // <LinkButton
          //   btnText="Continue Updating"
          //   path={`/ops/am/visit/checklist/update/${id}`}
          // />
        )}
      </div>
    </div>
  );
};

export default TransportBillReceivedPreview;
