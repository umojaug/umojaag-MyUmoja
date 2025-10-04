import React from "react";
import EditButton from "../../../../../components/button/EditButton";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";

const CashAtHandComments = ({ id, isSubmit, isManager, isBm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "allCashBalancecashBalanceList",
    `/allCashBalance/cashBalanceList/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="pt-2 flex justify-between">
      <div>
        <p>
          <span className="font-semibold">Identified Major :</span>
          {list.data.identifiedMajor}
        </p>
        <p>
          <span className="font-semibold">Taken Steps :</span>
          {list.data.takenSteps}
        </p>
        <p>
          <span className="font-semibold">Comments of BM :</span>
          {list.data.bmComments}
        </p>
        <p>
          <span className="font-semibold">
            Follow up comments by the supervisor :
          </span>
          {list.data.supervisorComments}
        </p>
      </div>
      <div className="flex justify-end py-1">
        {isSubmit === 0 && (
          <EditButton path={`/ops/allvisit/cashBalance/comments/edit/${id}`} />
        )}
        {isSubmit === 1 && isManager === true && (
          <EditButton
            path={`/ops/allvisit/cashBalance/manager/comments/edit/${id}`}
          />
        )}
        {isSubmit === 1 && isBm === true && (
          <EditButton path={`/ops/allvisit/cashBalance/comments/edit/${id}`} />
        )}
      </div>
    </div>
  );
};

export default CashAtHandComments;
