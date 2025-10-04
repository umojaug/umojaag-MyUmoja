using System;

namespace GrapesTl.Models;

public class MyTicket
{
    public string TicketId { get; set; }
    public string CategoryId { get; set; }
    public string CategoryName { get; set; }
    public string TicketType { get; set; }
    public string Priority { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
    public DateTime CreateDate { get; set; }
    public string CreatedBy { get; set; }
    public DateTime ClosedDate { get; set; }
    public string CloseBy { get; set; }
    public string TokenNo { get; set; }

}
