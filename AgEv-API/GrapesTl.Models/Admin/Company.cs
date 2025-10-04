using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Company
{
    public string CompanyId { get; set; }

    [MaxLength(50)]
    [Required]
    public string CompanyName { get; set; }

    [MaxLength(50)]
    [Required]
    public string CompanyAddress { get; set; }

    [Required]
    public int NssfEmployee { get; set; }
    [Required]
    public int NssfEmployer { get; set; }
    public string GoogleDriveKey { get; set; }

    [Required]
    public string Country { get; set; }
    [Required]
    public int NidDigit { get; set; }
    [Required]
    public int VoterIdDigit { get; set; }
    [Required]
    public int ContactDigit { get; set; }
    [Required]
    public string VoterIdRequired { get; set; }
    public string MyUmojaUrl { get; set; }
}
