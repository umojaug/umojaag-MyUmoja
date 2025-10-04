using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models.Fix
{
    public class TicketAssignedTo
    {
        public string TicketId { get; set; }
        public string AssigneeId { get; set; }
        public string UserId { get; set; }
        public string FullName { get; set; }
    }
    public class TicketView
    {
        public string TicketId { get; set; }
        public string TicketCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string SupportingDocType { get; set; }
        public string SupportingDocLink { get; set; }
        public string TicketType { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public string CategoryId { get; set; }
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string CategoryName { get; set; }
        public string Attachment1 { get; set; }
        public string Attachment2 { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime CloseDate { get; set; }
        public string TicketLevel { get; set; }
        public string CreatedBy { get; set; }
        public string BranchName { get; set; }
        public string ClosedBy { get; set; }
    }
    public class TicketStatus
    {
        public string TicketId { get; set; }
        public string TicketLevel { get; set; }
    }

    public class TicketAdd
    {
        public string TicketId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string SupportingDocType { get; set; }
        public string SupportingDocLink { get; set; }
        public IFormFile File1 { get; set; }
        public IFormFile File2 { get; set; }
        public string TicketType { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string Remarks { get; set; }
        public string CategoryId { get; set; }
        public string ProjectId { get; set; }
        public string AssigneeIds { get; set; }
    }



    public class TicketDeveloper
    {
        public string UserId { get; set; }
        public string FullName { get; set; }
        public string Closed { get; set; }
        public string Open { get; set; }
        public string InProgress { get; set; }
        public DateTime EntryDate { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationName { get; set; }
        public float TotalHours { get; set; }
    }


    public class UpdateTicket
    {
        public string TicketId { get; set; }
        public string Status { get; set; }
    }

}
