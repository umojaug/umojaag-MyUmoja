namespace GrapesTl.Models;

public class RiskRegister
{
    public string RiskRegisterId { get; set; }
    public string CompanyId { get; set; }
    public string Title { get; set; }


}

public class RiskRegisterView : RiskRegister
{
    public string CompanyName { get; set; }
    public int IsSubmitted { get; set; }


}

public class RiskRegisterAssign
{
    public string RiskRegisterId { get; set; }
    public string EmployeeId { get; set; }
    public string PrincipleRisks { get; set; }

}
