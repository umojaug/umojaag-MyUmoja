using GrapesTl.Shared.Enums;
using System;

namespace GrapesTl.Dto;

public class AcBusinessDayDto
{
    public long BusinessDayId { get; set; }
    public string BranchId { get; set; }
    public string BranchName { get; set; }
    public DateTime BusinessDate { get; set; }
    public DayStatus Status { get; set; }
    public string OpenedBy { get; set; }
    public DateTime OpenedDate { get; set; }
    public string ClosedBy { get; set; }
    public DateTime ClosedDate { get; set; }
    public string ApprovedBy { get; set; }
    public DateTime ApprovedDate { get; set; }
}