using System;

namespace GrapesTl.Models
{
    public class EmpTimeSummery
    {
        public int TimeLogId { get; set; }
        public string EmployeePin { get; set; }
        public string EmployeeName { get; set; }
        public string DesignationName { get; set; }
        public double TaskHour { get; set; }
        public string AuthorityName { get; set; }
        public string Status { get; set; }
    }

    public class EmpTimeSummeryView : EmpTimeSummery
    {

        public string TaskName { get; set; }
        public DateTime TaskDate { get; set; }

    }
}
