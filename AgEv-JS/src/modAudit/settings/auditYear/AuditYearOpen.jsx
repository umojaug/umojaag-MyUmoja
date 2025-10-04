import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditYearOpenButton from "./AuditYearOpenButton";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const AuditYearOpen = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("auditYearCurrentAuditYear", "/AuditYear/CurrentAuditYear");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Open New Audit Year"
        btn="Return"
        path="/audit/settings"
      />
      <p className="pb-4 text-xl font font-semibold text-green-600">
        Current Audit Year: {list.data.auditYear}
      </p>

      <AuditYearOpenButton path={`/auditYear/yearOpen`} />
    </div>
  );
};

export default AuditYearOpen;
