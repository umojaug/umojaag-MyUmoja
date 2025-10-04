using Newtonsoft.Json;

namespace GrapesTl.Models;

public record Journal
{
    [JsonProperty("ledgerId")]
    public string LedgerId { get; set; }
    [JsonProperty("particulars")]
    public string Particulars { get; set; }
    [JsonProperty("dr")]
    public double Dr { get; set; }
    [JsonProperty("cr")]
    public double Cr { get; set; }
}
