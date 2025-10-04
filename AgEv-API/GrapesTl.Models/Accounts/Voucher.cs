using Newtonsoft.Json;
using System.Collections.Generic;

namespace GrapesTl.Models;

public record Voucher
{
    [JsonProperty("voucherId")]
    public string VoucherId { get; set; }

    [JsonProperty("voucherTypeId")]
    public string VoucherTypeId { get; set; }
    [JsonProperty("voucherDetails")]
    public List<Journal> VoucherDetails { get; set; }
}
