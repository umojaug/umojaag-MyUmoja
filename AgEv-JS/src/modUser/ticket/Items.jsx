import { useState } from "react";
import EditButton from "../../components/button/EditButton";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../hooks/context";
import actionRoles from "../../data/ActionRoles";
import SearchHeader from "../../components/SearchHeader";
import { format } from "date-fns";
import { MdLink, MdOutlineCategory, MdSearchOff } from "react-icons/md";
import { TbEdit, TbAlertCircle } from "react-icons/tb";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaRegFileLines } from "react-icons/fa6";
import AcceptButton from "../../components/button/AcceptButton";
import RejectRemarkButton from "../../components/button/RejectRemarkButton";

function Items({ list, refetch, previousPath = null }) {
  console.log(refetch,'Refetch');
  console.log(list.data,'HH');
  
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
  // const canDelete = actionRoles.canDelete.includes(role);

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
  const handleRemarksChange = async (ticketId, newValue) => {
    try {
      var data = new FormData();
      data.append("remarks", newValue);
      const { status } = await mutateAsync({
        path: `Tickets/Feedback/${ticketId}`,
        formData: data,
      });

      if (status === 201 || status === 204) {
        toast.success("Remarks updated successfully!");
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
          progress: 30,
        };
      case "Hold":
        return {
          badge: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
          bar: "from-gray-400 to-gray-500",
          light: "text-gray-500 bg-gray-100/30",
          progress: 40,
        };
      case "In Review":
        return {
          badge: "bg-gradient-to-r from-purple-400 to-purple-500 text-white",
          bar: "from-purple-400 to-purple-500",
          light: "text-purple-500 bg-purple-100/30",
          progress: 80,
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 &&
          data.map((item, i) => {
            const statusStyle = getStatusStyle(item.status);
            const priorityStyle = getPriorityStyle(item.priority);

            return (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition duration-300 hover:translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="h-1.5 w-full bg-gray-100">
                  <div
                    className={`h-full bg-gradient-to-r ${statusStyle.bar}`}
                    style={{ width: `${statusStyle.progress}%` }}
                  ></div>
                </div>

                <div className="p-5 flex-grow">
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full">
                      # {item.ticketCode}
                    </span>
                    <span className="text-xs font-medium bg-gray-300 text-gray-800 px-2.5 py-1 rounded-full">
                      {item.ticketLevel}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusStyle.badge}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4 w-full">
                    <div className="bg-gray-100 rounded-lg p-3 w-full">
                      <div className="text-sm font-medium text-gray-800 mb-1">
                        Open On:{" "}
                        {format(new Date(item.createdDate), "dd/MMM/yyyy")}
                      </div>
                      <div className="text-sm font-medium text-gray-800 mb-1">
                        Open By: {item.createdBy}
                      </div>
                      <div className="text-gray-600 text-xs">
                        {item.closeDate !== "1980-12-31T00:00:00" &&
                        item.closeDate !== "0001-01-01T00:00:00" ? (
                          <div className="flex gap-2">
                            <span>Updated On:</span>
                            <span>
                              {format(new Date(item.closeDate), "dd/MMM/yyyy")}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        {item.closedBy && (
                          <div className="flex gap-2">
                            <span>Updated By:</span>
                            <span>{item.closedBy}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-xl leading-tight mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p
                    className="text-gray-600 text-sm mb-4 cursor-pointer flex items-center overflow-x-auto"
                    onClick={() => {
                      if (!window.getSelection().toString()) {
                        toggleExpand(item.ticketId);
                      }
                    }}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: expandedItems[item.ticketId]
                          ? item.description
                          : item.description.slice(0, 50) +
                            (item.description.length > 50 ? "..." : ""),
                      }}
                    />
                    {item.description.length > 50 && (
                      <span className="ml-1">
                        {expandedItems[item.ticketId] &&
                        item.description.length > 50 ? (
                          <FiChevronUp size={20} className="text-gray-600" />
                        ) : (
                          <FiChevronDown size={20} className="text-gray-600" />
                        )}
                      </span>
                    )}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${priorityStyle.badge}`}
                    >
                      {priorityStyle.icon} Priority: {item.priority}
                    </span>

                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-100 text-purple-700">
                      <MdOutlineCategory className="mr-1.5" /> Type:{" "}
                      {item.ticketType}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      {/* <label className="block text-xs font-medium text-gray-500">
                        Update Estimated & Actual Time
                      </label> */}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      {/* <input
                        type="text"
                        name="estimatedTime"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        key={`est-time-${item.ticketId}`}
                        defaultValue={item.estimatedTime}
                        onBlur={(e) => {
                          handleEstimatedTimeChange(
                            item.ticketId,
                            e.target.value,
                            item.estimatedTime
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.target.blur();
                          }
                        }}
                        placeholder="E.Time"
                      /> */}
                      {/* <input
                        type="text"
                        name="actualTime"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        key={`act-time-${item.ticketId}`}
                        defaultValue={item.actualTime}
                        onBlur={(e) => {
                          handleActualTimeChange(
                            item.ticketId,
                            e.target.value,
                            item.actualTime
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.target.blur();
                          }
                        }}
                        placeholder="A.Time"
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 flex-shrink-0">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        Project
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        Category
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800 truncate max-w-[45%]">
                        {item.projectName}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 truncate max-w-[45%]">
                        {item.categoryName}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        Branch
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2 mr-2">
                        <div className="p-2 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-medium border-2 border-white">
                          {item.branchName}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-xs font-medium text-gray-500">
                        Update Status & Order
                      </label>
                    </div>
                    {/* <div className="flex items-center justify-between gap-2">
                      {item.ticketLevel === "Level-2" ? (
                        <p className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
                          {item.status} & {item.ticketLevel}
                        </p>
                      ) : (
                        <>
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.ticketId, e.target.value)
                            }
                            className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                          <br />
                          <select
                            value={item.ticketLevel}
                            onChange={(e) =>
                              handleLevelChange(item.ticketId, e.target.value)
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
                    </div> */}

                    <div className="flex items-center justify-between gap-2">
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
                          ⚠️ You do not have permission to view or update this
                          ticket.
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
                              handleStatusChange(item.ticketId, e.target.value)
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
                              handleLevelChange(item.ticketId, e.target.value)
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
                  </div>
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-xs font-medium text-gray-500">
                        Feedback
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        key={`${item.ticketId}-${item.remarks}`}
                        defaultValue={item.remarks}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        name="remarks"
                        placeholder="Enter Feedback"
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          if (value !== item.remarks) {
                            handleRemarksChange(item.ticketId, value);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50 mt-auto">
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
                    // <DocumentsModal file={item.attachment1} />
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
                    // <DocumentsModal file={item.attachment2} />
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
                  <div className="flex space-x-2">
                    <EditButton
                      path={`/my/ticket/edit/${item.ticketId}`}
                      className="p-2 rounded-lg bg-white border border-gray-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-200 transition-colors"
                      icon={TbEdit}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <MdSearchOff size={50} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No tickets found
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            We couldn't find any tickets for you.
          </p>
        </div>
      )}
    </div>
  );
}

export default Items;
