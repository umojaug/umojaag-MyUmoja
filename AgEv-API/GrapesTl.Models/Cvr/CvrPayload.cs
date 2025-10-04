using Newtonsoft.Json;

namespace GrapesTl.Models;
public record CvrPayload
{
    [JsonProperty("query")]
    public Term Query { get; init; }
}

public record Term
{
    [JsonProperty("term")]
    public Business Business { get; init; }
}

public record Business
{
    [JsonProperty("Vrvirksomhed.cvrNummer")]
    public string CvrNummer { get; init; }
}
