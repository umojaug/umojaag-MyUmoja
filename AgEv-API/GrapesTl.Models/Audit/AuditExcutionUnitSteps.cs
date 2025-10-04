using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

//public class AuditExcutionUnitTestSteps
//{
//public long ExecutionUnitTestStepId { get; set; }
//public string ExcutionId { get; set; }
//public string AuditYearId { get; set; }
//public string AuditTestStepsId { get; set; }
//public DateTime TestingDate { get; set; }
//public DateTime SampledMonth { get; set; }
//public string AuditPeriod { get; set; }
//public string SelectionMethod { get; set; }
//public string ControlFrequency { get; set; }
//public double SampleSize { get; set; }
//public double PopulationSize { get; set; }
//public string TestResults { get; set; }
//public string TestingConclusion { get; set; }
//public string OverallTestConclusion { get; set; }
//public string Finding { get; set; }
//public string Cause { get; set; }
//public string Implication { get; set; }
//public string Recommendation { get; set; }
//public string BranchResponse { get; set; }
//public DateTime ImplementationDate { get; set; }
//public string ManagementAction { get; set; }
//public string Exceptions { get; set; }

//public IFormFile File { get; set; }


//}


public class AuditExcutionUnitTestSteps
{
    public long ExecutionUnitTestStepId { get; set; }
    public DateTime TestingDate { get; set; }
    public string SampledMonth { get; set; }
    public string AuditPeriod { get; set; }
    public string SelectionMethod { get; set; }
    public string ControlFrequency { get; set; }
    public string SampleSize { get; set; }
    public string PopulationSize { get; set; }
    public string TestingConclusion { get; set; }
    public string TestResults { get; set; }
    public IFormFile File { get; set; }

}
public class AuditExcutionUnitTestStepsView : AuditExcutionUnitTestSteps
{

    public string BranchName { get; set; }
    public string EmployeeName { get; set; }
    public string AuditorName { get; set; }
    public double AuditAreaId { get; set; }
    public string AuditAreaName { get; set; }
    public string AuditAreaType { get; set; }
    public string AuditYear { get; set; }
    public DateTime EntryDate { get; set; }
    public string TestStepsName { get; set; }
    public string TestEvidences { get; set; }
    public string ExcutionId { get; set; }
    public string AuditYearId { get; set; }
    public string AuditTestStepsId { get; set; }
    public string OverallTestConclusion { get; set; }
    public string Finding { get; set; }
    public string Cause { get; set; }
    public string Implication { get; set; }
    public string Recommendation { get; set; }
    public string BranchResponse { get; set; }
    public DateTime ImplementationDate { get; set; }
    public string ManagementAction { get; set; }
    public string Exceptions { get; set; }
    public string AuName { get; set; }


}
