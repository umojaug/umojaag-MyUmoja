import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";

const TicketCloseList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/ticket/closelist/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;



  return (
    <>
      <div>
        <div className="list-wrapper">
          <div className="md:grid grid-cols-8 list-header">
            <ListHeader label="Token No" />
            <ListHeader label="Ticket Category" />
            <ListHeader label="Ticket Type" />
            <ListHeader label="Title" />
            <ListHeader label="Description" />
            <ListHeader label="Status" />
            <ListHeader label="Priority" />
            <ListHeader label="" />
          </div>
          {list.data.length > 0 &&
            list.data.map((item) => (
              <div
                key={item.areaId}
                className="grid grid-cols-1 md:grid-cols-8 list-body"
              >
                <ListCol label="Token No:" value={item.tokenNo} />
                <ListCol label="Ticket Category:" value={item.categoryName} />
                <ListCol label="Ticket Type:" value={item.ticketType} />
                <ListCol label="Title:" value={item.title} />
                <ListCol label="Description:" value={item.description} />
                <ListCol label="Status:" value={item.status} />
                <ListCol label="Priority:" value={item.priority} />
                <div>
                  <div className="flex justify-end space-x-2">
                    {/* <EditButton
                      path={`/admin/settings/area/edit/${item.areaId}`}
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/areaes/delete/${item.areaId}`}
                    /> */}
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
    </>
  );
};

export default TicketCloseList;
