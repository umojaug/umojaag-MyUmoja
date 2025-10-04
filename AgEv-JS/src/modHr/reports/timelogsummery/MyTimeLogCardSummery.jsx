import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import PdfButton from "../../../components/button/PdfButton";
import { format } from "date-fns";

const MyTimeLogCardSummery = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "myTimeLogList",
    `/hrreports/timeLogCard/${dataForm.searchByPinName}/${dataForm.selectMonth}/${dataForm.selectYear}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data;

  return (
    data.length > 0 && (
      <div className="w-full max-w-screen-xl">
        <div className="flex justify-end items-center">
          {
            <PdfButton
              path={`/hrPdfCommon/timeLogCard/${dataForm.searchByPinName}/${dataForm.selectMonth}/${dataForm.selectYear}`}
            />
          }
          <PrintHeader
            fileName="timelogCard.csv"
            data={data.map(({ taskDate, taskName, taskHour }) => ({
              taskDate,
              taskName,
              taskHour,
            }))}
            headers={[
              { label: "Task Date", key: "taskDate" },
              { label: "Task Name", key: "taskName" },
              { label: "Task Hour", key: "taskHour" },
            ]}
          />
        </div>
        <div className="px-2 py-0  font-bold">
          <div className="">Employee PIN : {data[0].employeePin}</div>
          <div className="">Employee Name : {data[0].employeeName}</div>
          <div className="">Designation : {data[0].designationName}</div>
        </div>
        <div className="md:grid grid-cols-3 list-header mt-10">
          <ListHeader label="Task Date" />
          <ListHeader label="Task Name" />
          <ListHeader label="Task Hour" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol
                label="Task Date : "
                value={format(new Date(item.taskDate), "dd/MMM/yyyy")}
              />

              <ListCol label="Task Hour : " value={item.taskName} />
              <ListCol label="Task Hour : " value={item.taskHour} />
              {/* <ListCol
                label="Task  Date : "
                value={format(new Date(item.taskDate), "dd/MMM/yyyy")}
              /> */}
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default MyTimeLogCardSummery;
