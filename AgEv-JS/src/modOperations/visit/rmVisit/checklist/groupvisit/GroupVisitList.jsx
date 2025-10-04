import React from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import EditButton from "../../../../../components/button/EditButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";

const GroupVisitList = ({ id, isSubmit }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/rmGroupVisit/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader
        title="2. Today’s group visit information: "
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/rm/group/visit/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="LO name" />
          <ListHeader label="Group name" />
          <ListHeader label="Total borrower" />
          <ListHeader label="Number of borrower present" />
          <ListHeader label="Number of passbook checked with LO based" />
          <ListHeader label="Number of passbook missing " />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsRmGroupvisitId}
              className="grid grid-cols-1  md:grid-cols-8 list-body"
            >
              <ListCol label="LO name:" value={item.loName} />
              <ListCol label="Group name:" value={item.groupName} />
              <ListCol label="Total borrower:" value={item.totalBorrower} />
              <ListCol
                label="Number of borrower present:"
                value={item.numberOfBorrower}
              />
              <ListCol
                label="Number of passbook checked with LO based:"
                value={item.passbookChecked}
              />
              <ListCol
                label="Number of passbook missing:"
                value={item.passbookMissing}
              />
              <ListCol label="" />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/rm/group/visit/edit/${item.opsRmGroupvisitId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/rmgroupvisit/delete/${item.opsRmGroupvisitId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default GroupVisitList;
