import React from "react";
import { useGetData, usePostData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useParams } from "react-router-dom";
import DocumentsModal from "../DocumentsModal";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { MdLink } from "react-icons/md";

function Details() {
  const { id } = useParams();
  const { mutateAsync } = usePostData();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ticketdetails", `/Tickets/details/${id}`);

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

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

  const ticket = list.data;

  return (
    <div className="ticket-details h-96 overflow-y-auto bg-white p-4 shadow-md rounded-lg">
      <table className="w-full border border-gray-300 rounded-lg">
        <tbody>
          <TableRow
            label="Created Date"
            value={format(new Date(ticket.createdDate), "dd/MMM/yyyy")}
          />
          <TableRow label="Level" value={"Level-3"} />
          <TableRow label="Title" value={ticket.title} />
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-4 py-3 font-medium bg-gray-100 text-gray-700 w-1/3">
              Description
            </td>
            <td className="px-4 py-3">
              <div
                className="text-gray-600 text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: ticket.description }}
              />
            </td>
          </tr>
          <TableRow label="Ticket Type" value={ticket.ticketType} />
          <TableRow label="Priority" value={ticket.priority} />
          <TableRow label="Project" value={ticket.projectName} />
          <TableRow label="Category" value={ticket.categoryName} />
          <TableRow
            label="Assigned To"
            value={
              ticket.assignees
                ?.map((assignee) => assignee.fullName)
                .join(", ") || "Not Assigned"
            }
          />
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-4 py-3 font-medium bg-gray-100 text-gray-700 w-1/3">
              Status
            </td>
            <td className="px-4 py-3">
              <select
                value={ticket.status}
                onChange={(e) =>
                  handleStatusChange(ticket.ticketId, e.target.value)
                }
                className="form-control bg-white"
              >
                {["Open", "In Progress", "Closed"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="px-4 py-3 font-medium bg-gray-100 text-gray-700 w-1/3">
              Supporting Documents
            </td>
            <td className="px-4 py-3 flex gap-2">
              {ticket.supportingDocLink && (
                <a
                  href={
                    ticket.supportingDocLink.startsWith("http")
                      ? ticket.supportingDocLink
                      : `https://${ticket.supportingDocLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-gtblue w-10 h-10">
                    <MdLink size={24} />
                  </button>
                </a>
              )}
              {ticket.attachment1 && (
                <DocumentsModal file={ticket.attachment1} />
              )}
              {ticket.attachment2 && (
                <DocumentsModal file={ticket.attachment2} />
              )}
            </td>
          </tr>
          <TableRow label="Remarks" value={ticket.remarks} />
        </tbody>
      </table>
    </div>
  );
}

const TableRow = ({ label, value }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-100">
    <td className="px-4 py-3 font-medium bg-gray-100 text-gray-700 w-1/3">
      {label}
    </td>
    <td className="px-4 py-3">{value || "N/A"}</td>
  </tr>
);

export default Details;
