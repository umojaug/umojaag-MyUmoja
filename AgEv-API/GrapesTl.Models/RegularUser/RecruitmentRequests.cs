using System;
using System.ComponentModel.DataAnnotations;
namespace GrapesTl.Models;

public class RecruitmentRequest
{
    public string RecruitmentId { get; set; }

    [Required]
    [StringLength(50)]
    public string JobTitle { get; set; }

    [Required]
    [StringLength(50)]
    public string DepartmentId { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    [StringLength(50)]
    public string StaffTypeId { get; set; }

    [Required]
    [StringLength(50)]
    public string ManagerId { get; set; }

}


public class RecruitmentRequestView: RecruitmentRequest
{
    public string RecruitmentStatus { get; set; }
    public string DepartmentName { get; set; }

}