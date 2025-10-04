import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";

import ApplyForThisJob from "./ApplyForThisJob";

const JobOpportunitiesDetails = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("careerDetails", `/Jobs/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <div className="">
        <div className="grid grid-cols-1  gap-12">
          <div className="text-justify p-8">
            <div className="pb-4 text-1xl font-bold text-black">
              <h2 className="text-3xl font-bold text-umojablue ">
                {list.data.title}
              </h2>
              <p>Department: {list.data.departmentName} </p>
              <p>Loaction: {list.data.companyName} </p>
            </div>
            <div className="iHaveList">
              <div dangerouslySetInnerHTML={{ __html: list.data.section }} />
            </div>
          </div>

          <ApplyForThisJob
            jobId={list.data.jobId}
            companyId={list.data.companyId}
          />
        </div>
      </div>
    </div>
  );
};

export default JobOpportunitiesDetails;
