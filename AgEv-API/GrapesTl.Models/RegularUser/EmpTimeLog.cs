using System;

namespace GrapesTl.Models.HrSettings
{
    public class EmpTimeLog
    {
        public string TimeLogId { get; set; }
        public string TaskName { get; set; }
        public double TaskHour { get; set; }

        public string PinName { get; set; }
        public string Status { get; set; }
        public DateTime TaskDate { get; set; }
        public string AuthorityName { get; set; }


    }
}
