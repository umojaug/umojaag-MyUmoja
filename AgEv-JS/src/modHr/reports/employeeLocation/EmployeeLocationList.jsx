import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import { format } from "date-fns";

const EmployeeLocationList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/EmployeesLocation/list/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        latitude,
        longitude,
        date,
        employeeName,
        employeePin,
        locationName,
      }) => ({
        latitude,
        longitude,
        date,
        employeeName,
        employeePin,
        locationName,
      })
    );

  return (
    <>
      {/* <div className="card w-full max-w-screen-xl"> */}
      <div className="flex justify-end items-center">
        <PrintHeader
          fileName="EmployeeLocation.csv"
          data={data.map(
            ({ latitude, longitude, date, employeeName, locationName }) => ({
              latitude,
              longitude,
              date,
              employeeName,
              locationName,
            })
          )}
          headers={[
            { label: "Latitude", key: "latitude" },
            { label: "Longitude", key: "longitude" },
            { label: "Date", key: "date" },
            { label: "EmployeeName", key: "employeeName" },
            { label: "LocationName", key: "locationName" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Latitude" />
          <ListHeader label="Longitude" />
          <ListHeader label="Date" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Location Name" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-5 list-body">
              <ListCol label="Latitude:" value={item.latitude} />
              <ListCol label="Longitude:" value={item.longitude} />
              <ListCol
                label="Date:"
                // value={item.date}
                value={format(new Date(item.date), "dd/MMM/yyyy")}
              />
              <ListCol label="Employee Name:" value={item.employeeName} />
              <ListCol label="Location Name:" value={item.locationName} />

              <div className="flex justify-end space-x-2">
                {/* <PdfButton
                  path={`/hrPdfCommon/JoiningLetter/${item.employeeId}`}
                  filename={`AppointmentToThePostOf${item.designationName}_${item.employeeId}.pdf`}
                  method="Get"
                  payload={item}
                /> */}
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default EmployeeLocationList;
