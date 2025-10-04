using System;

namespace GrapesTl.Models;

public class EmpAttendance
{
    public string PinName { get; set; }
    public string AttenStatus { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime TillDate { get; set; }
    public string Particulars { get; set; }


}
