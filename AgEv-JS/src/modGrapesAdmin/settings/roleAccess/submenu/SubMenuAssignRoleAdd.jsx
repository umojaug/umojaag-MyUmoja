import TopHeader from "../../../../components/TopHeader";
import SubMenuAssignRoleForm from "./SubMenuAssignRoleForm";

const SubMenuAssignRoleAdd = () => {
  const defaultValues = {
    menuAssignId: "",
    userId: "",
    menuId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Sub Menu Assign to Role"
        btn="Return"
        path="/grapes/settings/role/access"
      />
      <SubMenuAssignRoleForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/SubMenuAssignRole/create"
        returnPath="/grapes/settings/role/access"
        isEdit={false}
      />
    </div>
  );
};

export default SubMenuAssignRoleAdd;
