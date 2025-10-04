import { useParams } from "react-router";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import UpdateBoardDetails from "./UpdateBoardDetails";

function MonthlyBoardDetails() {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "hrAuditBranchDepartmentAuditReport",
    `/boardMonthDetails/list/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  console.log(list.data);

  return (
    <div className="card w-full max-w-screen-xl">
      <UpdateBoardDetails data={list.data} refetch={refetch} />
    </div>
  );
}

export default MonthlyBoardDetails;
