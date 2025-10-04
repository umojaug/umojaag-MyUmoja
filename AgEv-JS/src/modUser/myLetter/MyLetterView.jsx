import React from "react";
import { useParams } from "react-router";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";

const MyLetterView = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("userdetails", `/EmpLetters/LetterView/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div>{list.data.letterbody}</div>
      <div className="grid">
        <div>I Accept</div>
        <img
          src={`https://drive.google.com/thumbnail?id=${list.data.digitalSignature}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default MyLetterView;
