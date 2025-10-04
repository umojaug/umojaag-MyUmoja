import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import DepartmentForm from "./DepartmentFocalForm";

const DepartmentFocalEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/departmentFocals/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Department Manager"
        btn="Return"
        path="/hr/settings/department/focal/list"
      />
      <DepartmentForm
        defaultValues={{
          focalId: list.data.focalId,
          departmentId: list.data.departmentId,
          employeeId: list.data.employeeId,
        }}
        action={refetch}
        btnText="Update"
        path="/departmentFocals/update"
        returnPath="/hr/settings/department/focal/list"
      />
    </div>
  );
};

export default DepartmentFocalEdit;
