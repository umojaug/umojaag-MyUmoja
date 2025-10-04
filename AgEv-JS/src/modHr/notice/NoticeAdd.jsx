import React from "react";
import TopHeader from "../../components/TopHeader";
import NoticeForm from "./NoticeForm";

const NoticeAdd = () => {
  const defaultValues = {
    noticeId: "",
    title: "",
    expiryDate: new Date(),
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Notice Create" btn="Return" path="/hr/notice/list" />
      <NoticeForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/notices/create"
        returnPath="/hr/notice/list"
      />
    </div>
  );
};

export default NoticeAdd;
