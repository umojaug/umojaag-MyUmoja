import React from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const QuestionList = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrevaluationquestion", `/evaluationquestion/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const uniqueArr = [
    ...new Set(list.data.map((data) => data.evaluationTypeName)),
  ];

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title={uniqueArr[0]}
        btn="Save"
        path="/hr/evaluation/type/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Qestion" />
          <ListHeader label="Marks" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.questionId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Question : " value={item.question} />
              <ListCol label="Marks : " value={item.marks} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/hr/evaluation/type/edit/${item.evaluationTypeId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/evaluationquestion/delete/${item.questionId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
