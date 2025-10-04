using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GrapesTl.Models;

[Table("UserOtp")]
public class UserOtp
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string UserOtpId { get; set; }

    [Required]
    [MaxLength(50)]
    public string UserId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Token { get; set; }

    [Required]
    [MaxLength(50)]
    public string Otp { get; set; }

    [Required]
    [Column(TypeName = "datetime")]
    [DataType(DataType.DateTime)]
    public DateTime ExpiryDate { get; set; }
}
