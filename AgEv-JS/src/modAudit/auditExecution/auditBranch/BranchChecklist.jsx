import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import LinkButton from "../../../components/button/LinkButton";
import BranchInfo from "./BranchInfo";

const BranchChecklist = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("auditchecklist", "/auditTestAreas/listbybranch");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Branch Audit Check List" />
      <div className="grid grid-cols-2">
        <BranchInfo id={id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div key={index}>
              <LinkButton
                btnText={`${item.auditAreaName}`}
                path={`/audit/checkdetails/branch/${id}/${item.auditAreaId}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BranchChecklist;
