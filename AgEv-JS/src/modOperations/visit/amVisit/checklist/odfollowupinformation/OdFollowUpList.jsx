import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import EditButton from "../../../../../components/button/EditButton";
import DeleteButton from "../../../../../components/button/DeleteButton";

function OdFollowUpList({ id, isSubmit }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/amOdFollowUp/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader
        title="3.Today’s OD follow up information"
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/am/od/visit/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Group Name" />
          <ListHeader label="Borrower’s Name" />
          <ListHeader label="Realised amount" />
          <ListHeader label="Remarks" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsAmODFollowUpId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Group Name: " value={item.groupName} />
              <ListCol label="Borrower’s Name: " value={item.borrowerName} />
              <ListCol label="Realised amount: " value={item.realisedAmount} />
              <ListCol label="Remarks: " value={item.remarks} />

              <div className="flex justify-end space-x-2">
                {isSubmit === 0 && (
                  <>
                    <EditButton
                      path={`/ops/am/od/visit/edit/${item.opsAmODFollowUpId}`}
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/amOdFollowUp/delete/${item.opsAmODFollowUpId}`}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OdFollowUpList;
