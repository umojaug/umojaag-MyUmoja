namespace GrapesTl.Models;


public class SalaryReview
{
    public string SalaryReviewId { get; set; }
    public string ReviewYear { get; set; }
    public string BranchName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public double Amount { get; set; }
    public string Particulars { get; set; }
}

public class SalaryReviewUpload
{
    public string ReviewYear { get; set; }
    public string BranchName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public double Amount { get; set; }
    public string Particulars { get; set; }
}

public class SalaryReviewView : SalaryReview
{
    public string DepartmentName { get; set; }
    public string DesignationName { get; set; }
    public string Email { get; set; }
    public string DigitalSignature { get; set; }
    public string Comments { get; set; }
    public int IsAccept { get; set; }
}

public class SalaryReviewComments
{
    public string SalaryReviewId { get; set; }
    public string Comments { get; set; }
    public int IsAccept { get; set; }
}
