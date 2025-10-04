import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import EditButton from "../../../../../components/button/EditButton";

function HighlightsList({ id, isSubmit }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrDepartment", `/bmHighlights/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader title="7. Highlights of the day: (Please mention the burning issues of the branch in bullet points)" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Issues" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsBmHighlightsId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label="Issues: " value={item.issues} />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/bm/highlights/daily/edit/${item.opsBmHighlightsId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default HighlightsList;
