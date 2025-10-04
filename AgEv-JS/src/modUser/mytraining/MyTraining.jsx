import React, { useState } from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import SearchHeader from "../../components/SearchHeader";
import TrainingItems from "./TrainingItems";

const MyTraining = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrTopiclist", "/topics/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.categoryName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Training List" btn="none" />
      <SearchHeader placeholder="Category / Title" action={setQuery} />
      {list.data.length > 0 && <TrainingItems data={data} />}
    </div>
  );
};

export default MyTraining;
