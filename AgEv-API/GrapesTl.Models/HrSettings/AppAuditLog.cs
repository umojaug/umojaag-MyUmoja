using System;

namespace GrapesTl.Models.HrSettings;

public class AppAuditLog
{
    public string OperationByName { get; set; }
    public string OperationBy { get; set; }
    public string OperationType { get; set; }
    public string Details { get; set; }
    public DateTime OperationDate { get; set; }
}
