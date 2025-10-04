import React from "react";
import EditButton from "../../../../../components/button/EditButton";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";

const GroupVisitComments = ({ id, isSubmit, isManager, isBm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "allPortfolioAnalysis",
    `/allVerifyLoanApplication/verifyLoanAppList/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  return (
    <div className="pt-2 flex justify-between">
      <div>
        <p>
          <span className="font-semibold">Findings :</span>
          {list.data.findings}
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
          <EditButton path={`/ops/allvisit/groupVisit/comments/edit/${id}`} />
        )}
        {isSubmit === 1 && isManager === true && (
          <EditButton
            path={`/ops/allvisit/groupVisit/manager/comments/edit/${id}`}
          />
        )}
        {isSubmit === 1 && isBm === true && (
          <EditButton path={`/ops/allvisit/groupVisit/comments/edit/${id}`} />
        )}
      </div>
    </div>
  );
};

export default GroupVisitComments;
