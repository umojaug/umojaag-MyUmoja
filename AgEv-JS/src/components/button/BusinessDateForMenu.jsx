import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../Loading";
import Error from "../Error";
import { MdOutlineDateRange } from "react-icons/md";

const BusinessDateForMenu = ({ textSize = "sm" }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("BusinessDay", "/AcBusinessDay/StatusByBranch");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      {/* <Link
      className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-orange"
      to="/settings/day/list"
    > */}
      <div className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-orange">
        <span
          className={`${
            list.data.status === "Opened" ? "text-black" : "text-red-600"
          }`}
        >
          <MdOutlineDateRange size={30} />
        </span>
        <span
          className={`ml-1 text-${textSize} font-bold hidden lg:block ${
            list.data.status === "Opened" ? "text-black" : "text-red-600"
          }`}
        >
          {list.data.status === "Opened"
            ? "Business Day : "
            : list.data.status === "RequestToClose"
            ? "Business Day : "
            : "Business Day : "}
          {format(new Date(list.data.businessDate), "dd-MMM-yyyy")}
        </span>
      </div>
      {/* </Link> */}
    </>
  );
};

export default BusinessDateForMenu;
