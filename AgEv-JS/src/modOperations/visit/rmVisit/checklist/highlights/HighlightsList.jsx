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
  } = useGetData("rmHighlights", `/rmHighlights/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader
        title="6. Highlights of the day: (Please mention the burning issues of the branch in bullet points)"
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/rm/highlights/daily/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Issues" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsRmHighlightsId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label="Issues: " value={item.issues} />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/rm/highlights/daily/edit/${item.opsRmHighlightsId}`}
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
