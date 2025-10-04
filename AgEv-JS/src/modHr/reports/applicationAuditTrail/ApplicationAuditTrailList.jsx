import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";

const ApplicationAuditTrailList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/AdAppAuditLog/auditTrail/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.operationByName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.operationType.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.details.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // item.operationDate.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/AdAppAuditLog/LogAuditTrail/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="auditTrailReport.csv"
          data={data.map(
            ({ operationByName, operationType, details, operationDate }) => ({
              operationByName,
              operationType,
              details,
              operationDate,
            })
          )}
        />
      </div>

      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Entry By / Task Name"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Operation By" />
          <ListHeader label="Operation Type" />
          <ListHeader label="Details" />
          <ListHeader label="Operation Date" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Operation By : " value={item.operationByName} />
              <ListCol label="Operation Type : " value={item.operationType} />
              <ListCol label="Operation Name : " value={item.details} />
              {/* <ListCol label="Operation Date : " value={item.operationDate} /> */}

              <ListCol
                label="Operation Date : "
                value={format(new Date(item.operationDate), "dd/MMM/yyyy")}
              />

              {/* <ListCol
                label="Update Date : "
                value={format(new Date(item.updateDate), "dd/MMM/yyyy")}
              />  */}
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAuditTrailList;
