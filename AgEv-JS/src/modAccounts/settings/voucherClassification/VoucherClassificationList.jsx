import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const VoucherClassificationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrBank", "/voucherClassification/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Voucher Classification List"
        btn="Save"
        path="/ac/settings/classification/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Classification Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.classificationId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol
                label="Classification Name:"
                value={item.classificationName}
              />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ac/settings/classification/edit/${item.classificationId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/voucherClassification/delete/${item.classificationId}`}
                  />
                </div>
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

export default VoucherClassificationList;
