using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GrapesTl.Models;

[Table("UserRefreshToken")]
public class UserRefreshToken
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string UserRefreshTokenId { get; set; }
    public string UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual ApplicationUser User { get; set; }

    [MaxLength(50)]
    public string RefreshToken { get; set; }

    [Column(TypeName = "datetime")]
    [DataType(DataType.DateTime)]
    public DateTime ExpiryDate { get; set; }
}
