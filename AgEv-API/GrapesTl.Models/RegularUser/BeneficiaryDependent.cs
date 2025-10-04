using System;

namespace GrapesTl.Models;

public class BeneficiaryDependent
{
    public string ChildDependentId { get; set; }
    //public string BeneficiaryId { get; set; } 
    public string ChildFullName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string IDNumber { get; set; }
    public string ChildAddress { get; set; }
    public string GuardianFullName { get; set; }
    public string GuardianContact { get; set; }
    public string GuardianAddress { get; set; }
    public string GuardianDesignation { get; set; }
    public string GuardianEmail { get; set; }

}
