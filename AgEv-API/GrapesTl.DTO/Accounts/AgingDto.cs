namespace GrapesTl.Dto;


public class AgingDto
{
    public int SL { get; set; }
    public string CompanyName { get; set; }
    public string Classifications { get; set; }
    public int Days { get; set; }
    public decimal ProvisionPercentage { get; set; }
    public decimal TotalOverdue { get; set; }
    public decimal PrincipalOutstanding { get; set; }
    public decimal InterestOutstanding { get; set; }
    public decimal TotalOutstanding { get; set; }
    public decimal SecurityBalance { get; set; }
    public decimal PrincipalProvisionAmount { get; set; }
    public decimal InterestProvisionAmount { get; set; }
}



