import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import TopHeader from "../../../components/TopHeader";
import { AiOutlineFile } from "react-icons/ai";
import TaskButton from "../../../components/button/TaskButton";
import PdfButton from "../../../components/button/PdfButton";
import PrintHeader from "../../../components/PrintHeader";

const JobApplyList = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("cvbank", `/Jobs/ApplyJobList`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.companyName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader title="Job Apply List" />
      <div className="flex justify-end items-center">
        <PdfButton path={`/hrPdfCommon/JobsList`} />
        <PrintHeader
          fileName="JobsList.csv"
          data={data.map(
            ({
              companyName,
              departmentName,
              title,
              fullName,
              email,
              phone,
              feedback,
              isdecline,
              fileUrl,
            }) => ({
              companyName,
              departmentName,
              title,
              fullName,
              email,
              phone,
              feedback,
              isdecline,
              fileUrl,
            })
          )}
          headers={[
            { label: "Country Name", key: "companyName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Job Title", key: "title" },
            { label: "Candidate Name", key: "fullName" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Feedback", key: "feedback" },
            { label: "Is Declined", key: "isdecline" },
            { label: "File URL", key: "fileUrl" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="Company / Email/ Name / Department"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Company" />
          <ListHeader label="Department" />
          <ListHeader label="Job Title" />
          <ListHeader label="Full Name" />
          <ListHeader label="Email" />
          <ListHeader label="Phone" />
          <ListHeader label="Feedback" />
          <ListHeader label="Decline" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-9 list-body">
              <ListCol label="Country Name :" value={item.companyName} />
              <ListCol label="Department Name :" value={item.departmentName} />
              <ListCol label="Job Title :" value={item.title} />
              <ListCol label="Candidate Name :" value={item.fullName} />
              <ListCol label="Email :" value={item.email} />
              <ListCol label="Phone :" value={item.phone} />
              <ListCol label="Phone :" value={item.feedback} />
              <ListCol label="Phone :" value={item.isdecline} />
              <div className="flex justify-end space-x-1 px-1">
                {item.fileUrl !== "" ? (
                  <a href={item.fileUrl} className="btn-success w-12 h-10">
                    <AiOutlineFile size={24} />
                  </a>
                ) : (
                  <> </>
                )}
                <TaskButton
                  path={`/hr/reports/jobapply/details/${item.jobApplyId}`}
                />
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
    </div>
  );
};

export default JobApplyList;
