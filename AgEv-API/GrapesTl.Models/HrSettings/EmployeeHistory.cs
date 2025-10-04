using System.Collections.Generic;

namespace GrapesTl.Models;

public class EmployeeHistory
{
    public EmployeeGetViewById Employee { get; set; }
    public IEnumerable<EmpTransferView> Transfer { get; set; }
    public IEnumerable<EmpPromotionView> Promotion { get; set; }
    public IEnumerable<EmpInterview> Interview { get; set; }
}
