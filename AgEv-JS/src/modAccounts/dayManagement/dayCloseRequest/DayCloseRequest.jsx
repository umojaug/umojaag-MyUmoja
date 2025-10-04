import React from "react";
import TopHeader from "../../../components/TopHeader";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import DenominationButton from "../../../components/button/DenominationButton";
import DayCloseButton from "../../components/layout/DayCloseButton";
import { format } from "date-fns";

function DayCloseRequest() {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("AsDayList", "/AcBusinessDay/StatusByBranch");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const firstItem = list.data;
  // console.log(firstItem, "FIT");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Day Close Request"
        btn="Return"
        path="/ac/day/management"
      />

      {firstItem ? (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Branch Information
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Branch Name:
                  </label>
                  <p className="text-sm text-gray-800 font-medium">
                    {firstItem.branchName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Business Date:
                  </label>
                  <p className="text-sm text-gray-800">
                    {format(new Date(firstItem.businessDate), "dd/MMM/yyyy")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status:
                  </label>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      firstItem.status === "Opened"
                        ? "bg-green-100 text-green-800"
                        : firstItem.status === "Closed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-200 text-red-800"
                    }`}
                  >
                    {firstItem.status === "RequestToClose"
                      ? "Request To Close"
                      : firstItem.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Opening Details
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Open By:
                  </label>
                  <p className="text-sm text-gray-800">{firstItem.openedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Open Date:
                  </label>
                  <p className="text-sm text-gray-800">
                    {format(new Date(firstItem.openedDate), "dd/MMM/yyyy")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Closing Details
              </h3>
              <div className="flex space-x-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Close By:
                  </label>
                  <p className="text-sm text-gray-800">
                    {firstItem.closedBy && firstItem.closedBy.trim() !== ""
                      ? firstItem.closedBy
                      : "N/A"}
                  </p>

                  <label className="text-sm font-medium text-gray-600">
                    Closing Date:
                  </label>
                  <p className="text-sm text-gray-800">
                    {firstItem.closedBy &&
                    firstItem.closedBy.trim() !== "" &&
                    firstItem.closedDate
                      ? format(new Date(firstItem.closedDate), "dd/MMM/yyyy")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Approve By:
                  </label>
                  <p className="text-sm text-gray-800">
                    {firstItem.approvedBy && firstItem.approvedBy.trim() !== ""
                      ? firstItem.approvedBy
                      : "N/A"}
                  </p>

                  <label className="text-sm font-medium text-gray-600">
                    Approve Date:
                  </label>
                  <p className="text-sm text-gray-800">
                    {firstItem.approvedBy &&
                    firstItem.approvedBy.trim() !== "" &&
                    firstItem.approvedDate
                      ? format(new Date(firstItem.approvedDate), "dd/MMM/yyyy")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <DayCloseButton
              path={`/acBusinessDay/dayCloseRequest/${firstItem.businessDayId}`}
              action={refetch}
            />
            <DenominationButton
              path={`/acBusinessDay/denomination`}
              businessDayId={firstItem.businessDayId}
              action={refetch}
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">No day close requests found</p>
        </div>
      )}
    </div>
  );
}

export default DayCloseRequest;
