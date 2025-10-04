import TopHeader from "../../../components/TopHeader";
import DepartmentForm from "./DepartmentFocalForm";

const DepartmentFocalAdd = () => {
  const defaultValues = {
    focalId: "",
    departmentId: "",
    employeeId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Department Manager"
        btn="Return"
        path="/hr/settings/department/focal/list"
      />
      <DepartmentForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/departmentFocals/create"
        returnPath="/hr/settings/department/focal/list"
      />
    </div>
  );
};

export default DepartmentFocalAdd;
