import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import HolidayForm from "./HolidayForm";

const HolidayEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrHoliday", `/holidays/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Holiday"
        btn="Return"
        path="/admin/settings/holiday/list"
      />
      <HolidayForm
        defaultValues={{
          holidayId: list.data.holidayId,
          holidayName: list.data.holidayName,
          fromDate: new Date(Date.parse(list.data.fromDate)),
          tillDate: new Date(Date.parse(list.data.tillDate)),
        }}
        action={refetch}
        btnText="update"
        path="/holidays/update"
        returnPath="/admin/settings/holiday/list"
      />
    </div>
  );
};

export default HolidayEdit;
