using Newtonsoft.Json;
using System.Collections.Generic;

namespace GrapesTl.Models;
public record CvrResponse
{
    [JsonProperty("hits")]
    public Response Response { get; init; }
}

public record Response
{
    [JsonProperty("hits")]
    public List<Hits> Hits { get; init; }
}

public record Hits
{
    [JsonProperty("_source")]
    public Source Source { get; init; }
}

public record Source
{
    [JsonProperty("Vrvirksomhed")]
    public Details Business { get; init; }
}

public record Details
{
    [JsonProperty("cvrNummer")]
    public string CvrNumber { get; init; }
    [JsonProperty("attributter")]
    public List<AttributterDetails> Attributter { get; init; }

    [JsonProperty("navne")]
    public List<Name> CompanyName { get; init; }

    [JsonProperty("beliggenhedsadresse")]
    public List<LocationAddress> LocationAddresses { get; init; }

    [JsonProperty("telefonNummer")]
    public List<TelephoneNumber> TelephoneNumbers { get; init; }

    [JsonProperty("elektroniskPost")]
    public List<Email> Emails { get; init; }

    [JsonProperty("hjemmeside")]
    public List<Homepage> Homepages { get; init; }

    [JsonProperty("virksomhedsform")]
    public List<BusinessType> BusinessTypes { get; init; }

    [JsonProperty("deltagerRelation")]
    public List<Participant> Participants { get; init; }

}

public record AttributterDetails
{
    [JsonProperty("type")]
    public string Type { get; init; }
    [JsonProperty("vaerdier")]
    public List<Vaerdier> Vaerdier { get; init; }
}

public record Vaerdier
{
    public string Vaerdi { get; init; }
}
public record Name
{
    [JsonProperty("navn")]
    public string CompanyName { get; init; }
    [JsonProperty("periode")]
    public Period Period { get; init; }
    [JsonProperty("sidstOpdateret")]
    public string LastUpdate { get; init; }
}

public record Period
{
    [JsonProperty("gyldigFra")]
    public string StartDate { get; init; }
    [JsonProperty("gyldigTil")]
    public string EndDate { get; init; }
}

public record LocationAddress
{
    [JsonProperty("vejnavn")]
    public string RoadName { get; init; }

    [JsonProperty("husnummerFra")]
    public string HouseNumber { get; init; }

    [JsonProperty("etage")]
    public string BuidingFloor { get; init; }

    [JsonProperty("sidedoer")]
    public string FloorSide { get; init; }

    [JsonProperty("postnummer")]
    public string PostNumber { get; init; }

    [JsonProperty("postdistrikt")]
    public string PostDistrict { get; init; }

    [JsonProperty("landekode")]
    public string CountryCode { get; init; }
}

public record TelephoneNumber
{
    [JsonProperty("kontaktoplysning")]
    public string ContactNumber { get; init; }


}

public record Email
{
    [JsonProperty("kontaktoplysning")]
    public string ContactEmail { get; init; }
}

public record Homepage
{
    [JsonProperty("kontaktoplysning")]
    public string ContactHomepage { get; init; }
}

public record BusinessType
{
    [JsonProperty("kortBeskrivelse")]
    public string TypeNameShort { get; init; }

    [JsonProperty("langBeskrivelse")]
    public string TypeNameLong { get; init; }
}

public record Participant
{
    [JsonProperty("deltager")]
    public ParticipantDetail ParticipantDetails { get; init; }
}

public record ParticipantDetail
{
    [JsonProperty("navne")]
    public List<ParticipantName> ParticipantNames { get; init; }
}

public record ParticipantName
{
    [JsonProperty("navn")]
    public string Name { get; init; }
}