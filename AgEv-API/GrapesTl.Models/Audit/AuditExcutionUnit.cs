using System;

namespace GrapesTl.Models;

public class AuditExcutionUnit
{
    public string ExcutionId { get; set; }
    public string BmId { get; set; }
    public string AmId { get; set; }
    public string RmId { get; set; }
    public DateTime AuditStartDate { get; set; }
    public DateTime AuditEndDate { get; set; }
    public DateTime PeriodUnderAuditTill { get; set; }
    public DateTime PeriodUnderAuditFrom { get; set; }
    public string LastAuditPeriod { get; set; }
    public int NumOfBorrowers { get; set; }
    public int TotalLoanPortfolio { get; set; }
    public string EmployeeId { get; set; }
    public string AuditNotification { get; set; }
    public string AuditObjectives { get; set; }
    public DateTime FirstLoanDisbursementDate { get; set; }
    public string ParDateOfAudit { get; set; }
    public string TotalNumberOfBranchStaff { get; set; }
    public string PriorFraudReport { get; set; }
    public string StaffTurnover { get; set; }
    public string RevenueOfTheBranchLastMonth { get; set; }
    public string ProfitOfTheBranchLastMonth { get; set; }
    public string NumberOfBorrowersAudit { get; set; }

}


public class AuditExcutionUnitRegion
{
    public string ExcutionId { get; set; }
    public string RmId { get; set; }
    public DateTime AuditStartDate { get; set; }
    public DateTime AuditEndDate { get; set; }
    public DateTime PeriodUnderAuditTill { get; set; }
    public DateTime PeriodUnderAuditFrom { get; set; }
    public string LastAuditPeriod { get; set; }
    public string AuditNotification { get; set; }
    public string AuditObjectives { get; set; }
    public string ParDateOfAudit { get; set; }
    public int NumberOfBorrowersAudit { get; set; }
    public string TotalNumberOfBranchStaff { get; set; }
    public string PriorFraudReport { get; set; }
    public string StaffTurnover { get; set; }


}

public class AuditExcutionUnitView : AuditExcutionUnit
{
    public string AuName { get; set; }
    public string BmName { get; set; }
    public string AmName { get; set; }
    public string RmName { get; set; }
    public string AreaName { get; set; }
    public string RegionName { get; set; }
    public string DivisionName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime JoiningDate { get; set; }

}
