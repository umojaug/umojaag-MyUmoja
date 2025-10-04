namespace GrapesTl.Models;

public class AllPortfolioAnalysis
{
    public long AnalysisId { get; set; }
    public string AllVisitId { get; set; }
    public string LoId { get; set; }
    public string PinName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public double BorrowerMicroLoan { get; set; }
    public double BorrowerSbl { get; set; }
    public double BorrowerTotal { get; set; }
    public double LoiMicroLoan { get; set; }
    public double LoiSbl { get; set; }
    public double LoiTotal { get; set; }
    public double BorrowerTarget { get; set; }
    public double ShortageNoOfBorrower { get; set; }
    public double OverdueNo { get; set; }
    public double OverdueAmount { get; set; }
    public double OverdueInDeNo { get; set; }
    public double OverdueInDeAmount { get; set; }
    public string SupervisorComments { get; set; }
    public string SupervisorRemarks { get; set; }
    public string BmComments { get; set; }
    public double IsSubmit { get; set; }
    public double IsLock { get; set; }

}


