import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const BusinessDay = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("BusinessDay", "/AcBusinessDay/StatusByBranch");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="">
      {list.data.status === "Day Open" ? (
        <p className="font-medium text-xs md:text-base leading-0 ">
          Business Date Open: {/*   */}
          <span className="text-green-600">
            {format(new Date(list.data.businessDate), "dd-MMM-yyyy")}
          </span>
        </p>
      ) : (
        <p className="font-medium text-xs md:text-base leading-0">
          Business Date Closed: {/*   */}
          <span className="text-red-600">
            {format(new Date(list.data.businessDate), "dd-MMM-yyyy")}
          </span>
        </p>
      )}
    </div>
  );
};

export default BusinessDay;
