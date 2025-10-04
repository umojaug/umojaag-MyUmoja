import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useParams } from "react-router-dom";
import SalaryReviewfrom from "./SalaryReviewfrom";

const SalaryReviewReply = () => {
  const { id, ans } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("empallded", `/SalaryReview/Details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl p-10">
      <div className="font-helvetica text-xs w-[600px] mx-auto">
        <div className="w-full border-collapse grid gap-3">
          <div className="text-left">
            <img
              className="bg-white  w-20"
              src="/images/reportlogo.jpg"
              alt="Company Logo"
            />
          </div>

          <div className="text-left">{new Date().toLocaleDateString()}</div>

          <div className="text-left">Dear {list.data.employeeName},</div>

          <div className="text-left">
            Following the recently completed Annual Salary Review Process, we
            are pleased to confirm your new salary details. For all eligible
            employees, our review has considered many factors including market
            rates, inflation, company performance, and individual performance.
          </div>

          <div className="text-left">
            Your salary has been reviewed and your new gross salary will be{" "}
            {list.data.amount} {import.meta.env.VITE_CURRENCY}. Congratulations!
          </div>

          <div className="text-left">This is effective 1st March 2025.</div>

          <div className="text-left">
            All the other terms and conditions as stated in your contract of
            employment will remain the same.
          </div>

          <div className="text-left text-xs">
            It is understood and accepted that the employment relationship we
            have agreed to is an at-will relationship, and that it may be ended
            by either party, at any time, and for any reason.
          </div>

          <div className="text-left">
            If you agree this letter sets forth our understanding, please click
            on the accept button in My Umoja shown below this notification.
          </div>

          <div className="text-left">
            We look forward to having a long and good working relationship with
            you.
          </div>

          <div className="text-left">Sincerely,</div>
          <div className="flex justify-between">
            <div className="text-left">
              <span>Md. Abdul Awal</span>
              <br />
              <span>Country Team Leader</span>
            </div>
            <div className="text-left">
              <span>Ms. Grace Komugisha</span>
              <br />
              <span>HR and Administration Manager</span>
            </div>
          </div>
          <div>
            <SalaryReviewfrom
              defaultValues={{
                salaryReviewId: id,
                isAccept: ans === "true" ? 1 : 2,
                comments: "",
              }}
              path="SalaryReview/comments"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryReviewReply;
