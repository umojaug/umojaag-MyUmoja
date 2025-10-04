import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import PrintHeader from "../../../components/PrintHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import BranchVisitDetailsEdit from "./BranchVisitDetailsEdit";
import BranchVisitDetailsAdd from "./BranchVisitDetailsAdd";
import { format } from "date-fns";

const BranchVisitDetailsList = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/branchVisitDetails/Ownlist`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Branch Visit Details Assigned
        </h1>
        {/* <BranchVisitDetailsAdd branchVisitId={id} /> */}
      </div>
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="branchVisitList.csv"
          data={list.data.map((item) => ({
            topicAssessed: item.topicAssessed,
            findings: item.findings,
            ratingGiven: item.ratingGiven,
            actionToBeTaken: item.actionToBeTaken,
            ownerAssigned: item.ownerAssigned,
            actionCompletionDate: item.actionCompletionDate
              ? format(new Date(item.actionCompletionDate), "dd/MMM/yyyy")
              : "",
          }))}
          headers={[
            { label: "Topic Assessed", key: "topicAssessed" },
            { label: "Findings", key: "findings" },
            { label: "Rating Given", key: "ratingGiven" },
            { label: "Action To Be Taken", key: "actionToBeTaken" },
            { label: "Action Owner Assigned", key: "ownerAssigned" },
            { label: "Action Completion Date", key: "actionCompletionDate" },
          ]}
        />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Topic Assessed" />
          <ListHeader label="Findings" />
          <ListHeader label="Rating Given" />
          <ListHeader label="Action To Be Taken" />
          <ListHeader label="Action Owner Assigned" />
          <ListHeader label="Action Completion Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-7 list-body">
              <ListCol label="Topic Assessed:" value={item.topicAssessed} />
              <ListCol label="Findings:" value={item.findings} />
              <ListCol label="Rating Given:" value={item.ratingGiven} />
              <ListCol
                label="Action To Be Taken:"
                value={item.actionToBeTaken}
              />

              <ListCol
                label="Action Owner Assigned:"
                value={item.ownerAssigned}
              />

              <ListCol
                label="Action Completion Date:"
                // value={item.actionCompletionDate.toLocaleString("en-US")}
                value={format(
                  new Date(item.actionCompletionDate),
                  "dd/MMM/yyyy"
                )}
              />
              <div className="flex justify-end space-x-2">
                <BranchVisitDetailsEdit
                  branchVisitDetailsId={item.branchVisitDetailsId}
                  branchVisitId={id}
                  // path={`/hr/settings/department/edit/${item.departmentId}`}
                />
                {/* <DeleteButton
                  action={refetch}
                  path={`/branchVisitDetails/delete/${item.branchVisitDetailsId}`}
                /> */}
              </div>
            </div>
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

export default BranchVisitDetailsList;
