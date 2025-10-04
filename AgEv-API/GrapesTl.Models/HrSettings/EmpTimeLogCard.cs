using GrapesTl.Models.HrSettings;
using System;
using System.Collections.Generic;

namespace GrapesTl.Models;

public class EmpTimeLogCard
{
    public int TimeLogId { get; set; }
    public string TaskName { get; set; }
    public double TaskHour { get; set; }
    public string EmployeePin { get; set; }
    public DateTime TaskDate { get; set; }
    public string EmployeeName { get; set; }
    public string TaskStatus { get; set; }
    public int TaskMonth { get; set; }
    public int TaskYear { get; set; }
    public string DesignationName { get; set; }
    public string CompanyName { get; set; }

    List<EmpTimeLog> timeLogs { get; set; }



}
