import React, { useState } from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

import { format } from "date-fns";
import SearchHeader from "../../../components/SearchHeader";

const VisitCardList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "visitlist",
    `/bmvisit/list/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.visitType.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(({ visitId, visitDate, branchName, employeeName, visitType }) => ({
      visitId,
      visitDate,
      branchName,
      employeeName,
      visitType,
    }));

  return (
    <>
      <SearchHeader action={setQuery} placeholder="Branch / Employee / Type" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.length > 0 &&
          data.map((item) => (
            <div key={item.visitId}>
              <div className="bg-gray-200 grid place-items-start p-5 border border-black hover:bg-primary hover:text-gray-300 rounded-lg">
                <p>
                  <span className="font-semibold ">Visit Date : </span>
                  <span>{format(new Date(item.visitDate), "dd-MMM-yyyy")}</span>
                </p>
                <p>
                  <span className="font-semibold ">Branch Name : </span>
                  <span>{item.branchName}</span>
                </p>

                <p>
                  <span className="font-semibold ">Employee : </span>
                  <span>{item.employeeName}</span>
                </p>
                <p>
                  <span className="font-semibold "> Visit Type : </span>
                  <span>{item.visitType}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default VisitCardList;
