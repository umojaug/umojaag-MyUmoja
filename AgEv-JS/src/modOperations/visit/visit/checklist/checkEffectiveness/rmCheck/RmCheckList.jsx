import React from "react";
import TopHeader from "../../../../../../components/TopHeader";
import { HashLoading } from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import { useGetData } from "../../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../../components/ListColWithHeader";
import DeleteButton from "../../../../../../components/button/DeleteButton";
import RmCheckAdd from "./RmCheckAdd";
import BmCheckEdit from "./RmCheckEdit";

const RmCheckList = ({ id, isSubmit, isManager }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/allRmEffectiveness/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <div className="flex justify-between align-items-center">
        <TopHeader title="c) Effectiveness of RM visit " />
        <RmCheckAdd />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
        <ListHeader label="" />
          <ListHeader className="md:pr-2" label="Strength " />
          <ListHeader className="md:pr-2" label="Weakless" />
          <ListHeader label="Action Taken" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 list-body">
               {isSubmit === 0 && (
                <div className="flex gap-2">
                  <BmCheckEdit id={item.allRmEffectId} />
                  <DeleteButton
                    action={refetch}
                    path={`/allRmEffectiveness/delete/${item.allRmEffectId}`}
                  />
                </div>
              )}
              <ListCol
                className="md:pr-2"
                label="Strength:"
                value={item.strength}
              />
              <ListCol
                className="md:pr-2"
                label="Weakless:"
                value={item.weakness}
              />
              <ListCol label="Action Taken:" value={item.actionTaken} />
            </div>
          ))}
      </div>
    </>
  );
};

export default RmCheckList;
