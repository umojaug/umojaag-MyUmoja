import React from "react";
import EditButton from "../../../../../components/button/EditButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";

const RmRecordKeepingList = ({ id, isSubmit }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrDepartment", `/rmRecordKeeping/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader title="4. Today’s Record Keeping information: " btn="" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Number of Books Account" />
          <ListHeader label="Matched Number" />
          <ListHeader label="Finding" />
          <ListHeader label="Suggestion" />
          <ListHeader label="Remarks" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsRmRecordKeepingId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Books Account:" value={item.booksAccount} />
              <ListCol label="Matched:" value={item.matchedWith} />
              <ListCol label="Finding:" value={item.finding} />
              <ListCol label="Suggession:" value={item.suggestion} />
              <ListCol label="Remarks:" value={item.remarks} />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/rm/record/visit/edit/${item.opsRmRecordKeepingId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default RmRecordKeepingList;
