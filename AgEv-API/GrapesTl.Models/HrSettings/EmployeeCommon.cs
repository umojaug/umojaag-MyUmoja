using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class EmployeeCommon
{
    public string EmployeeId { get; set; }
    [MaxLength(50)]
    [Required]
    public string EmployeeName { get; set; }
    [MaxLength(50)]
    [Required]
    public string ContactNumber { get; set; }
    [MaxLength(50)]
    public string Email { get; set; }
    [MaxLength(50)]
    [Required]
    public string BranchId { get; set; }
    [MaxLength(50)]
    [Required]
    public string DepartmentId { get; set; }
    [MaxLength(50)]
    [Required]
    public string DesignationId { get; set; }
    [MaxLength(50)]
    [Required]
    public string StaffTypeId { get; set; }
    [MaxLength(50)]
    [Required]
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    [Required]
    public DateTime JoiningDate { get; set; }
    public double GrossSalaryUsd { get; set; }
    [Required]
    public double GrossSalary { get; set; }
    public double SaccoDeduction { get; set; }
    [MaxLength(50)]
    [Required]
    public string NssfNumber { get; set; }
    [MaxLength(50)]
    [Required]
    public string BankId { get; set; }
    [MaxLength(50)]
    [Required]
    public string BankAccountNumber { get; set; }
    [MaxLength(50)]
    [Required]
    public string TinNumber { get; set; }
    public string MotherName { get; set; }
    public string FatherName { get; set; }
    public string Religion { get; set; }
    public string MaritalStatus { get; set; }
    public string BloodGroup { get; set; }
    public string EducationId { get; set; }
    public string ContactAddress { get; set; }
    public string LanguagesSpoken { get; set; }
    public string ImageUrl { get; set; }
    public IFormFile File { get; set; }
    public string FatherContactNumber { get; set; }
    public string MotherContactNumber { get; set; }
    public string KinName { get; set; }
    public string KinAddress { get; set; }
    public string KinContactNumber { get; set; }
    public string KinRelationship { get; set; }
    public string KinEmail { get; set; }
}