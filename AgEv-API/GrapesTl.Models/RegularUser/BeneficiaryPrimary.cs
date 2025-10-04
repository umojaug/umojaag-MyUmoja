using System;

namespace GrapesTl.Models.RegularUser;

public class BeneficiaryPrimary
{
    public string BeneficiaryId { get; set; }
    public string SlNo { get; set; }
    public string Name { get; set; }
    public string Relationship { get; set; }
    public double ReceivedBenefitPercentage { get; set; }
    public DateTime DOB { get; set; }
    public string IdNumber { get; set; }
    public string BeneficiaryContactNumber { get; set; }
    public string BeneficiaryEmail { get; set; }
    public string BeneficiaryAddress { get; set; }

}
