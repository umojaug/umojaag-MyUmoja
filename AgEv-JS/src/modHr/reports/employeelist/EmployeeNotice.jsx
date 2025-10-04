import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeNoticeList from "./EmployeeNoticeList";
import SearchNotice from "../../../components/SearchNotice";

const EmployeeNotice = () => {
  const [noticeId, setNoticeId] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Notice Read" />
      <SearchNotice action={setNoticeId} />
      {noticeId && <EmployeeNoticeList noticeId={noticeId} />}
    </div>
  );
};

export default EmployeeNotice;
