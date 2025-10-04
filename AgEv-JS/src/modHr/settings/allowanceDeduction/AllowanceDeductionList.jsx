import React from "react";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const AllowanceDeductionList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingAllowanceDeduction", "/allowancedeductions/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Allowance / Deduction"
        btn="Save"
        path="/hr/settings/allowance-deduction/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Name" />
          <ListHeader label="Type" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.allowanceDeductionId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Name:" value={item.allowanceDeductionName} />
              <ListCol label="Type:" value={item.allowanceDeductionType} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/settings/allowance-deduction/edit/${item.allowanceDeductionId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/allowancedeductions/delete/${item.allowanceDeductionId}`}
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

export default AllowanceDeductionList;
