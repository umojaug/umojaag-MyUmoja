import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { useNavigate } from "react-router-dom";
import DocumentationEdit from "./DocumentationEdit";
import DocCheckBmEdit from "./DocCheckBmEdit";
import DocCheckManagerCommentsEdit from "./DocCheckSupervisorEdit";

function DocumentationList({ id, isSubmit, isManager, isBm }) {
  const navigate = useNavigate();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("allDocCheckList", `/allDocCheck/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader title="5.Documentaiton Check:" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader className="" label="" />
          <ListHeader className="md:col-span-2" label="Work to be done" />
          <ListHeader label="Status" className="md:flex md:justify-center" />
          <ListHeader
            className="md:col-span-2 pr-2"
            label="Major Issues Identified "
          />
          <ListHeader className="pr-2" label="Steps Taken" />
          <ListHeader className="md:col-span-2 pr-2" label="BM Comments" />
          <ListHeader className="md:col-span-3" label="Supervisor Comments" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              // onClick={() =>
              //   navigate(
              //     isSubmit === 0
              //       ? `/ops/docCheckList/edit/${item.docCheckId}`
              //       : isSubmit === 1 && isBm
              //       ? `/ops/allvisit/docCheck/bm/edit/${item.docCheckId}`
              //       : isSubmit === 1 && isManager
              //       ? `/ops/allvisit/docCheck/supervisor/edit/${item.docCheckId}`
              //       : null
              //   )
              // }
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 list-body"
            >
              <div className="flex gap-2">
                {isSubmit === 0 && <DocumentationEdit id={item.docCheckId} />}
                {isSubmit === 1 && isBm && (
                  <DocCheckBmEdit id={item.docCheckId} />
                )}
                {isSubmit === 1 && isManager && (
                  <DocCheckManagerCommentsEdit id={item.docCheckId} />
                )}
              </div>
              <ListCol
                className="md:col-span-2"
                label="Work To Be Done: "
                value={item.workToBeDone}
              />
              <ListCol
                label="Status: "
                value={item.status}
                className="md:flex md:justify-center"
              />
              <ListCol
                className="md:col-span-2 pr-2"
                label="Major Issues Identified : "
                value={item.identifiedMajor}
              />
              <ListCol
                className="pr-2"
                label="Steps Taken: "
                value={item.takenSteps}
              />
              <ListCol
                className="md:col-span-2 pr-2"
                label="BM Comments: "
                value={item.bmComments}
              />
              <ListCol
                className="md:col-span-3"
                label="Supervisor Comments: "
                value={item.supervisorComments}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DocumentationList;
