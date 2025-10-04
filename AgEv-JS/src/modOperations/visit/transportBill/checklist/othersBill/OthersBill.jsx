import React from "react";
import EditButton from "../../../../../components/button/EditButton";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";

const OthersBill = ({ id, isSubmit, subTotal }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("myOthersBill", `/myOthersBill/othersBill/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  const grandTotal =
    subTotal +
    list.data.daAllowance +
    list.data.hotelRent +
    list.data.miscellaneous;
  return (
    <>
      <div className="pt-2 grid grid-cols-1 md:grid-cols-3">
        <div className="flex justify-end col-span-2">
          <div className="">
            <p className="flex justify-between">
              <span className="font-semibold pr-2">
                Grand total of traveling expenses :{" "}
              </span>
              {subTotal.toLocaleString("en-US")}
            </p>
            <p className="flex justify-between">
              <span className="font-semibold pr-2">
                DA/Monitoring allowance :{" "}
              </span>
              {list.data.daAllowance.toLocaleString("en-US")}
            </p>
            <p className="flex justify-between">
              <span className="font-semibold  pr-2">Accommodation Cost : </span>
              {list.data.hotelRent.toLocaleString("en-US")}
            </p>
            <p className="flex justify-between">
              <span className="font-semibold  pr-2">
                Miscellaneous(if Any) :{" "}
              </span>
              {list.data.miscellaneous.toLocaleString("en-US")}
            </p>
            <p className="flex justify-between font-bold ">
              <span className="font-bold pr-2">Grand total : </span>
              {grandTotal.toLocaleString("en-US")}
            </p>
          </div>
        </div>
        <div className="flex justify-end py-1">
          {(isSubmit === 0 || isSubmit === 4) && (
            <EditButton
              path={`/ops/othersBill/edit/${list.data.othersBillId}`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default OthersBill;
