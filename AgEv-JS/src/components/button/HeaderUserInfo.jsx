import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../Loading";
import Error from "../Error";

const HeaderUserInfo = ({ textSize = "lg" }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("BusinessDay", "/EmployeeInfo/Details");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="flex items-center gap-1">
      <small className="font-bold text-xs p-1">
        {list.data.employee.employeeName} <br />
        ({list.data.employee.designationName})  <br />
        {list.data.employee.branchName}
      </small>
    </div>
  );
};

export default HeaderUserInfo;
