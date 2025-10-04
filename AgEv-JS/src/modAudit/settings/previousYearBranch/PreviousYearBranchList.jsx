import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const PreviousYearBranchList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("previousYear", `/previousYear/List`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="mt-2">
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Year " />
          <ListHeader label="AU Name" />
          <ListHeader label="Portfolio Value" />
          <ListHeader label="PAR" />
          <ListHeader label="Number Of Borrower" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.previousYearId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="Year :" value={item.yearName} />
              <ListCol label="AU Name : " value={item.auName} />
              <ListCol label="Portfolio Value: " value={item.portfolioValue} />
              <ListCol label="PAR: " value={item.par} />
              <ListCol
                label="Number Of Borrower: "
                value={item.numOfBorrower}
              />
            </div>
          ))}
        <div></div>

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousYearBranchList;
