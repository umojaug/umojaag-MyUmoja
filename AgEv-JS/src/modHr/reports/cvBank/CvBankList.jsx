import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import TopHeader from "../../../components/TopHeader";
import { AiOutlineFile } from "react-icons/ai";
import PdfButton from "../../../components/button/PdfButton";
import PrintHeader from "../../../components/PrintHeader";

const CvBankList = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("cvbank", `/CvBank/list`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.companyName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.jobType.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader title="Cv Bank" />
      <div className="flex justify-end items-center">
        <PdfButton path={`/hrPdfCommon/CVBank`} />
        <PrintHeader
          fileName="cvbank.csv"
          data={data.map(
            ({ companyName, departmentName, fullName, email, jobType }) => ({
              companyName,
              departmentName,
              fullName,
              email,
              jobType,
            })
          )}
          headers={[
            { label: "Country Name", key: "companyName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Candidate Name", key: "fullName" },
            { label: "Email", key: "email" },
            { label: "Opportunity Type", key: "jobType" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder=" Country/ Email/ Name / Department"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Country" />
          <ListHeader label="Department" />
          <ListHeader label="Candidate Name" />
          <ListHeader label="Email " />
          <ListHeader label="Opportunity type " />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Country Name :" value={item.companyName} />
              <ListCol label="Department Name :" value={item.departmentName} />
              <ListCol label="Candidate Name :" value={item.fullName} />
              <ListCol label="Email :" value={item.email} />
              <ListCol label="Opportunity type :" value={item.jobType} />

              <div className="flex justify-end space-x-1 px-1">
                {item.fileUrl !== "" ? (
                  <a href={item.fileUrl} className="btn-success w-12 h-10">
                    <AiOutlineFile size={24} />
                  </a>
                ) : (
                  <> </>
                )}
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

export default CvBankList;
