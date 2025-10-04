import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeMonthlyStaffList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/hrreports/monthlyStaff/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data;

  const csvData = list.data.map(({ title, staffCount }) => ({
    title,
    staffCount,
  }));

  return (
    <>
      <div className="list-wrapper">
        <div className="flex justify-end items-center">
          <PdfButton
            path={`/HrPdfCommon/monthlyStaff/${dataForm.fromDate}/${dataForm.tillDate}`}
          />
          <PrintHeader
            fileName="periodicStaffPosition.csv"
            data={data.map(({ title, staffCount }) => ({
              title,
              staffCount,
            }))}
            headers={[
              { label: "Title", key: "title" },
              { label: "Staff Count", key: "staffCount" },
            ]}
          />
        </div>
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="General Statistics" />
          <ListHeader label="Details" className="flex md:justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label="General Statistics : " value={item.title} />
              <ListCol
                label="Details : "
                value={item.staffCount.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default EmployeeMonthlyStaffList;
