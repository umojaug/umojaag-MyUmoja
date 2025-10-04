import { useState } from "react";
import EditButton from "../../components/button/EditButton";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../hooks/context";
import actionRoles from "../../data/ActionRoles";
import SearchHeader from "../../components/SearchHeader";
import { format } from "date-fns";
import { MdLink, MdSearchOff } from "react-icons/md";
import { TbEdit, TbAlertCircle } from "react-icons/tb";
import TableColumn from "../../components/TableColumn";
import TableCell from "../../components/TableCell";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaRegFileLines } from "react-icons/fa6";
import AcceptButton from "../../components/button/AcceptButton";
import RejectRemarkButton from "../../components/button/RejectRemarkButton";

function List({ list, refetch, previousPath = null }) {
  console.log(list);

  const [query, setQuery] = useState("");
  const { mutateAsync } = usePostData();
  const { role } = useGlobalContext();

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (ticketId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };
  const canApprove = actionRoles.canApprove.includes(role);
  const isLoanOfficer = actionRoles.isLoanOfficer.includes(role);
  const canDelete = actionRoles.canDelete.includes(role);

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.ticketCode.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.projectName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.categoryName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // item.assignees.some(
      //   (assignee) =>
      //     assignee.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      // )
    ) {
      return item;
    } else return null;
  });
  console.log(data, "AFTER PROC");

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      var data = new FormData();
      data.append("ticketId", ticketId);
      data.append("status", newStatus);
      const { status } = await mutateAsync({
        path: "/Tickets/UpdateStatus",
        formData: data,
      });

      if (status === 201 || status === 204) {
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :" + error.message);
      }
    } finally {
      refetch();
    }
  };

  const handleLevelChange = async (ticketId, newStatus) => {
    try {
      var data = new FormData();
      data.append("ticketId", ticketId);
      data.append("ticketLevel", newStatus);
      const { status } = await mutateAsync({
        path: "/Tickets/LevelStatus",
        formData: data,
      });

      if (status === 201 || status === 204) {
        toast.success("Level updated successfully!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :" + error.message);
      }
    } finally {
      refetch();
    }
  };
  const handleOrderChange = async (ticketId, newOrder, oldOrder) => {
    if (!newOrder || Number(newOrder) === oldOrder || newOrder === "0") {
      return;
    }
    try {
      var data = new FormData();
      data.append("ticketId", ticketId);
      data.append("priorityOrder", newOrder);
      const { status } = await mutateAsync({
        path: "/Tickets/UpdateOrder",
        formData: data,
      });

      if (status === 201 || status === 204) {
        toast.success("Order updated successfully!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :" + error.message);
      }
    } finally {
      refetch();
    }
  };

  const handleEstimatedTimeChange = async (ticketId, newTime, oldTime) => {
    if (!newTime || newTime === oldTime) {
      return;
    }
    try {
      var data = new FormData();
      data.append("ticketId", ticketId);
      data.append("estimatedTime", newTime);
      const { status } = await mutateAsync({
        path: "/Tickets/UpdateEstimatedTime",
        formData: data,
      });

      if (status === 201 || status === 204) {
        toast.success("Estimated time updated successfully!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :" + error.message);
      }
    } finally {
      refetch();
    }
  };

  const handleActualTimeChange = async (ticketId, newTime, oldTime) => {
    if (!newTime || newTime === oldTime) {
      return;
    }
    try {
      var data = new FormData();
      data.append("ticketId", ticketId);
      data.append("actualTime", newTime);
      const { status } = await mutateAsync({
        path: "/Tickets/UpdateActualTime",
        formData: data,
      });

      if (status === 201 || status === 204) {
        toast.success("Actual time updated successfully!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :" + error.message);
      }
    } finally {
      refetch();
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return {
          badge: "bg-gradient-to-r from-amber-400 to-amber-500 text-white",
          bar: "from-amber-400 to-amber-500",
          light: "text-amber-500 bg-amber-100/30",
          progress: 25,
        };
      case "In Progress":
        return {
          badge: "bg-gradient-to-r from-blue-400 to-indigo-500 text-white",
          bar: "from-blue-400 to-indigo-500",
          light: "text-blue-500 bg-blue-100/30",
          progress: 66,
        };
      case "Closed":
        return {
          badge: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white",
          bar: "from-emerald-400 to-teal-500",
          light: "text-emerald-500 bg-emerald-100/30",
          progress: 100,
        };
      default:
        return {
          badge: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
          bar: "from-gray-400 to-gray-500",
          light: "text-gray-500 bg-gray-100/30",
          progress: 0,
        };
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "High":
        return {
          text: "text-red-600",
          badge: "bg-red-100 text-red-700",
          border: "border-red-200",
          icon: <TbAlertCircle className="mr-1.5" />,
        };
      case "Medium":
        return {
          text: "text-orange-600",
          badge: "bg-orange-100 text-orange-700",
          border: "border-orange-200",
          icon: <TbAlertCircle className="mr-1.5" />,
        };
      case "Low":
        return {
          text: "text-emerald-600",
          badge: "bg-emerald-100 text-emerald-700",
          border: "border-emerald-200",
          icon: <TbAlertCircle className="mr-1.5" />,
        };
      default:
        return {
          text: "text-gray-600",
          badge: "bg-gray-100 text-gray-700",
          border: "border-gray-200",
          icon: <TbAlertCircle className="mr-1.5" />,
        };
    }
  };
  return (
    <div className="list-wrapper">
      <SearchHeader
        action={setQuery}
        placeholder="Ticket Code / Description / Assigned Name / Category / Project Name"
        className="w-full max-w-md"
      />
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div className="mt-4 md:mt-0 flex items-center">
            <span className="px-3 py-1 rounded-full font-medium text-xs bg-indigo-100 text-indigo-700 mr-2">
              Total: {list.data.length}
            </span>
            <span className="px-3 py-1 rounded-full font-medium text-xs bg-emerald-100 text-emerald-700">
              Active:{" "}
              {list.data.filter((item) => item.status !== "Closed").length}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableColumn className="text-right"></TableColumn>
                <TableColumn>Ticket</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Branch</TableColumn>
                <TableColumn>Project, Category, Priority, Status</TableColumn>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((item, i) => {
                  const statusStyle = getStatusStyle(item.status);
                  const priorityStyle = getPriorityStyle(item.priority);

                  return (
                    <tr
                      key={item.ticketCode + i}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="whitespace-nowrap text-right">
                        <div className="grid grid-cols-2 gap-2 w-[90px] justify-end ml-auto">
                          {item.supportingDocLink && (
                            <a
                              href={
                                item.supportingDocLink.startsWith("http")
                                  ? item.supportingDocLink
                                  : `https://${item.supportingDocLink}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="w-10 h-10 btn-teal">
                                <MdLink size={24} />
                              </button>
                            </a>
                          )}
                          {item.attachment1 && (
                            // <DocumentsModal
                            //   file={item.attachment1}
                            //   className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                            // />
                            <a
                              href={
                                item.attachment1.startsWith("http")
                                  ? item.attachment1
                                  : `https://drive.google.com/file/d/${item.attachment1}/view`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="w-10 h-10 btn-success">
                                <FaRegFileLines size={24} />
                              </button>
                            </a>
                          )}
                          {item.attachment2 && (
                            // <DocumentsModal
                            //   file={item.attachment2}
                            //   className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                            // />
                            <a
                              href={
                                item.attachment2.startsWith("http")
                                  ? item.attachment2
                                  : `https://drive.google.com/file/d/${item.attachment2}/view`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="w-10 h-10 btn-success">
                                <FaRegFileLines size={24} />
                              </button>
                            </a>
                          )}
                          <EditButton
                            path={`/my/ticket/edit/${item.ticketId}`}
                            className="p-2 rounded-lg bg-white border border-gray-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-200 transition-colors"
                            icon={TbEdit}
                          />
                        </div>
                      </TableCell>

                      <TableCell className="min-w-[200px] max-w-[200px]">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500">
                            # {item.ticketCode}
                          </span>
                          <div className="text-sm font-bold text-gray-900 mb-1">
                            {item.title}
                          </div>
                          <span className="text-xs font-medium text-gray-500">
                            Open On:{" "}
                            {format(new Date(item.createdDate), "dd/MMM/yyyy")}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            Open By: {item.createdBy}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            {item.ticketLevel}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="min-w-[400px] max-w-[400px]">
                        <div className="text-sm text-gray-500 whitespace-pre-wrap cursor-pointer">
                          <div
                            onClick={() => {
                              if (!window.getSelection().toString()) {
                                toggleExpand(item.ticketId);
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: expandedItems[item.ticketId]
                                    ? item.description
                                    : item.description.slice(0, 50) +
                                      (item.description.length > 50
                                        ? "..."
                                        : ""),
                                }}
                              />
                              {!expandedItems[item.ticketId] &&
                                item.description.length > 50 && (
                                  <FiChevronDown
                                    className="flex-shrink-0 ml-1"
                                    size={20}
                                  />
                                )}
                              {expandedItems[item.ticketId] && (
                                <FiChevronUp
                                  className="flex-shrink-0 ml-1"
                                  size={20}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center mb-2">
                            <div className="flex -space-x-2 mr-2">
                              <div className="p-2 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-medium border-2 border-white">
                                {item.branchName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-700">
                          {item.projectName}
                        </div>
                        <div className="text-xs font-medium text-gray-500 mb-1">
                          {item.categoryName}
                        </div>
                        <div className="mb-2 gap-2 flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${priorityStyle.badge}`}
                          >
                            {priorityStyle.icon} {item.priority}
                          </span>
                          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                            {item.ticketType}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          {item.closeDate !== "1980-12-31T00:00:00" &&
                          item.closeDate !== "0001-01-01T00:00:00" ? (
                            <span className="text-xs font-medium text-red-500">
                              Updated On:{" "}
                              {format(new Date(item.closeDate), "dd/MMM/yyyy")}
                            </span>
                          ) : (
                            ""
                          )}
                          {item.closedBy && (
                            <span className="text-xs font-medium text-red-500">
                              Updated By: {item.closedBy}
                            </span>
                          )}
                          {item.ticketType && <div className="mt-1"></div>}
                        </div>
                        {/* <div className="gap-2  flex items-center">
                          {item.ticketLevel === "Level-2" ? (
                            <p>
                              {item.status} & {item.ticketLevel}
                            </p>
                          ) : (
                            <>
                              <select
                                value={item.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    item.ticketId,
                                    e.target.value
                                  )
                                }
                                className="min-w-10 bg-gray-50 border border-gray-200 text-gray-700 py-1.5 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                                key={`status-${item.ticketId}`}
                              >
                                {[
                                  "Open",
                                  "In Progress",
                                  "Hold",
                                  "In Review",
                                  "Closed",
                                  "Sorted & Closed",
                                  "Rejected",
                                ].map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                              <div className="gap-2 mt-2 flex items-center">
                                <select
                                  value={item.ticketLevel}
                                  onChange={(e) =>
                                    handleLevelChange(
                                      item.ticketId,
                                      e.target.value
                                    )
                                  }
                                  className="min-w-10 bg-gray-50 border border-gray-200 text-gray-700 py-1.5 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                                >
                                  {["Level-1", "Level-2"].map((ticketLevel) => (
                                    <option
                                      key={ticketLevel}
                                      value={ticketLevel}
                                    >
                                      {ticketLevel}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                        </div> */}

                        <div className="gap-2  flex items-center">
                          {canApprove ? (
                            <>
                              <AcceptButton
                                path={`Tickets/approveBmAm/${item.ticketId}`}
                              />
                              <RejectRemarkButton
                                path={`Tickets/reject/${item.ticketId}`}
                                action={refetch}
                                noted={true}
                              />
                            </>
                          ) : isLoanOfficer ? (
                            <div className="w-full bg-yellow-100 text-yellow-800 border border-yellow-300 py-2 px-3 rounded-lg">
                              ⚠️ You do not have permission to view or update
                              this ticket.
                            </div>
                          ) : item.ticketLevel === "Level-2" ||
                            item.ticketLevel === "Level-3" ? (
                            <p className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                              {item.status} & {item.ticketLevel}
                            </p>
                          ) : (
                            <>
                              <select
                                value={item.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    item.ticketId,
                                    e.target.value
                                  )
                                }
                                className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                              >
                                {[
                                  "Open",
                                  "In Progress",
                                  // "Hold",
                                  // "In Review",
                                  // "Closed",
                                  "Sorted & Closed",
                                  "Rejected",
                                ].map((status) => (
                                  <option key={status} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                              <br />
                              <select
                                value={item.ticketLevel}
                                onChange={(e) =>
                                  handleLevelChange(
                                    item.ticketId,
                                    e.target.value
                                  )
                                }
                                className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                              >
                                {["Level-1", "Level-2"].map((ticketLevel) => (
                                  <option key={ticketLevel} value={ticketLevel}>
                                    {ticketLevel}
                                  </option>
                                ))}
                              </select>
                            </>
                          )}
                        </div>

                        <div className=" items-center"></div>
                      </TableCell>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <MdSearchOff size={32} />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        No tickets found
                      </h3>
                      <p className="text-gray-500 text-center max-w-md">
                        We couldn't find any tickets for you.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default List;
