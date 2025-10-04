namespace GrapesTl.Models;

public class EmpAttendanceView
{
    public long EmpAttendanceId { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public string AttenStatus { get; set; }
    public string WorkDate { get; set; }
    public string Particulars { get; set; }
    public bool ManualEntry { get; set; }

}
