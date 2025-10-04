import React from "react";
import { Link } from "react-router-dom";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";

import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import TopHeader from "../../components/TopHeader";

const AuditFeedbackList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("AuditPlanMaterList", "/Auditfeedback/auditStatusDone");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ready for Aduit Feedback" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Audit Year" />
          <ListHeader label="Month" />
          <ListHeader label="Audit Entity" />
          <ListHeader label="Auditor" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <Link key={i} to={`/auditfeedback/add/${item.workPlanId}`}>
              <div className="grid grid-cols-4 gap-2 list-body">
                {/* <div className="grid grid-cols-1 md:grid-cols-4"> */}
                <ListCol label="Audit Year :" value={item.auditYear} />
                <ListCol label="Month :" value={item.monthName} />
                <ListCol label="Audit Entiry :" value={item.auName} />
                <ListCol label="Auditor :" value={item.auditorName} />
                {/* </div> */}
              </div>
            </Link>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditFeedbackList;
