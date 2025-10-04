import React from "react";
import TopHeader from "../../../../../../components/TopHeader";
import { HashLoading } from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import { useGetData } from "../../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../../components/ListColWithHeader";
import EditButton from "../../../../../../components/button/EditButton";
import DeleteButton from "../../../../../../components/button/DeleteButton";
import BmCheckAdd from "./BmCheckAdd";
import BmCheckEdit from "./BmCheckEdit";

const BmCheckList = ({ id, isSubmit, isManager, isBm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allBmEffectivenesslist", `/allBmEffectiveness/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  //

  return (
    <>
      <div className="flex justify-between align-items-center">
        <TopHeader title="a) Effectiveness of BM visit " />
        <BmCheckAdd />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="" />
          <ListHeader className="md:pr-2" label="Strength " />
          <ListHeader className="md:pr-2" label="Weakness" />
          <ListHeader label="Action Taken" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 list-body">
              {isSubmit === 0 && (
                <div className="flex gap-2">
                  <BmCheckEdit id={item.allBmEffectId} />
                  <DeleteButton
                    action={refetch}
                    path={`/allBmEffectiveness/delete/${item.allBmEffectId}`}
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

export default BmCheckList;
