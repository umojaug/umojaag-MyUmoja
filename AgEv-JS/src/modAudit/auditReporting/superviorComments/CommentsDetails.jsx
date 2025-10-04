import Error from "../../../components/Error";
import { ListColDetails } from "../../../components/ListColWithHeader";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";

const CommentsDetails = ({ reportId }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("saleslead", `/SupervisorComments/Header/${reportId}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader title={list.data.header} />
      <div className="text-base font-semibold">
        <div className="col-span-2">
          <ListColDetails label="Year : " value={list.data.year} />
          <ListColDetails
            label="Month Of Audit : "
            value={list.data.monthOfAudit}
          />
          {list.data.branchName !== "" && (
            <ListColDetails label="Branch : " value={list.data.branchName} />
          )}
          {list.data.departmentName !== "" && (
            <ListColDetails
              label="Department : "
              value={list.data.departmentName}
            />
          )}
          {list.data.regionName !== "" && (
            <ListColDetails label="Region : " value={list.data.regionName} />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentsDetails;
