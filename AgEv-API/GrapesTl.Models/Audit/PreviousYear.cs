namespace GrapesTl.Models;


public class PreviousYearUpload
{
    public string YearName { get; set; }
    public string AuName { get; set; }
    public string PortfolioValue { get; set; }
    public string Par { get; set; }
    public string NumOfBorrower { get; set; }

}

public class PreviousYearUploadView : PreviousYearUpload
{
    public string PreviousYearId { get; set; }


}