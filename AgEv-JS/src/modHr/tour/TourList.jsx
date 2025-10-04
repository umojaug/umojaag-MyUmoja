import React from "react";
import TopHeader from "../../components/TopHeader";
import EditButton from "../..//components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";

const TourList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("tour", "/tour/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Tour" btn="Save" path="/hr/tour/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Tour" />
          <ListHeader label="Employee Name" />
          <ListHeader label="From Data" />
          <ListHeader label="Till Date" />
          <ListHeader label="Application Date" />
          <ListHeader label="Work Date" />
          <ListHeader label="Particulars" />
          <ListHeader label="" />
        </div>

        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.Id}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="Tour:" value={item.tourType} />
              <ListCol label="Employee Name:" value={item.employeeName} />
              <ListCol
                label="From Data:"
                value={format(new Date(item.fromDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Till Date:"
                value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Application Date:"
                value={format(new Date(item.applicationDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Work Date:"
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />

              <ListCol label="Particulars:" value={item.particulars} />
              <div>
                <div className="flex justify-start md:justify-center">
                  <div className="flex justify-start md:justify-center">
                    <EditButton path={`/hr/tour/edit/${item.Id}`} />
                    <DeleteButton
                      action={refetch}
                      path={`/hr/tour/${item.Id}`}
                    />
                  </div>
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

export default TourList;
