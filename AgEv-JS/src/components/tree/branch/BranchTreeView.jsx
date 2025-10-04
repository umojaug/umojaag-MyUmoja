import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../Loading";
import Error from "../../Error";
import BranchTreeViewComponent from "./BranchTreeViewComponent";

const BranchTreeView = ({ onBranchSelect, viewFor = "MIS" }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("branchesbyRole", "/Branches/allBranchByRole");

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  return (
    <BranchTreeViewComponent
      onBranchSelect={onBranchSelect}
      viewFor={viewFor}
      list={list}
    />
  );
};

export default BranchTreeView;
