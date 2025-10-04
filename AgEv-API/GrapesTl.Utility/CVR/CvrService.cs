using Flurl.Http;
using Flurl.Http.Configuration;
using GrapesTl.Models;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;

namespace GrapesTl.Utility;

public class CvrService : ICvrService
{
    private readonly IFlurlClient _flurlClient;
    private readonly ILogger<CvrService> _logger;
    public CvrService(IFlurlClientFactory clientFactory, ILogger<CvrService> logger)
    {
        _logger = logger;
        _flurlClient = clientFactory.Get("http://distribution.virk.dk/cvr-permanent")
            .WithHeader("Accept", "application/json");
    }
    public async Task<CvrViewModel> Get(string cvrNumber)
    {
        try
        {
            //var data ="{\"term\":{\"Vrvirksomhed.cvrNummer\":\"36291052\"}}"; //example request payload

            var requestPayload = new CvrPayload()
            {
                Query = new Term()
                {
                    Business = new Business()
                    {
                        CvrNummer = cvrNumber
                    }
                }
            };

            var response = await _flurlClient.Request("virksomhed/_search")
                        .WithBasicAuth(username: "Clienty.dk_CVR_I_SKYEN", password: "5e97e05a-6729-45f5-93a1-b3aaaa26b887")
                        .PostJsonAsync(requestPayload)
                        .ReceiveJson<CvrResponse>();

            var businesss = response?.Response?.Hits;
            if (businesss.Any() == false)
                return new CvrViewModel() { IsValidCvr = false, Cvr = "Invalid CVR", FullName = "" };

            var business = businesss[0]?.Source?.Business;
            if (business is null)
                return new CvrViewModel() { IsValidCvr = false, Cvr = "Invalid CVR", FullName = "" };

            if (business.CvrNumber != cvrNumber)
                return new CvrViewModel() { IsValidCvr = false, Cvr = "Invalid CVR", FullName = "" };

            var financialYearStartDate = !string.IsNullOrWhiteSpace(business.Attributter.FirstOrDefault(x => x.Type == "FØRSTE_REGNSKABSPERIODE_START")?.Vaerdier?.LastOrDefault()?.Vaerdi)
                    ? business.Attributter.FirstOrDefault(x => x.Type == "FØRSTE_REGNSKABSPERIODE_START")?.Vaerdier?.LastOrDefault()?.Vaerdi
                    : "";
            var companyName = business.CompanyName?.LastOrDefault()?.CompanyName;
            var contactAddresses = business.LocationAddresses?.LastOrDefault();
            var address = contactAddresses.RoadName + " " + contactAddresses.HouseNumber + ", " + contactAddresses.BuidingFloor + " " + contactAddresses.FloorSide + (string.IsNullOrWhiteSpace(contactAddresses.FloorSide) == false ? ". " : "") + contactAddresses.PostNumber + " " + contactAddresses.PostDistrict + ", " + contactAddresses.CountryCode;
            var contactNumber = business.TelephoneNumbers?.LastOrDefault()?.ContactNumber;
            var contactEmail = business.Emails?.LastOrDefault()?.ContactEmail;
            var typeNameShort = business.BusinessTypes?.LastOrDefault()?.TypeNameShort;
            var reelOwner = business.Participants?.FirstOrDefault()?.ParticipantDetails?.ParticipantNames?.LastOrDefault()?.Name;
            var financialYear = !string.IsNullOrWhiteSpace(business.Attributter.FirstOrDefault(x => x.Type == "REGNSKABSÅR_START")?.Vaerdier?.LastOrDefault()?.Vaerdi) ? string.Concat(business.Attributter.LastOrDefault(x => x.Type == "REGNSKABSÅR_START")?.Vaerdier?.LastOrDefault()?.Vaerdi?.Replace("--", "")?.Replace("-", "."), " - ", business.Attributter.LastOrDefault(x => x.Type == "REGNSKABSÅR_SLUT")?.Vaerdier?.LastOrDefault()?.Vaerdi?.Replace("--", "")?.Replace("-", "."), "") : null;

            if (!string.IsNullOrWhiteSpace(business.CompanyName?.LastOrDefault()?.Period?.StartDate))
            {
                if (financialYearStartDate == "")
                {
                    financialYearStartDate = business.CompanyName?.LastOrDefault()?.Period?.StartDate;
                }
                if (string.IsNullOrWhiteSpace(financialYear))
                {
                    financialYear = string.Concat(string.Join(".", business.CompanyName?.LastOrDefault()?.Period?.StartDate?.Replace("--", "")?.Replace("-", ".").Split(".").Skip(1)), " - ", string.Join(".", business.CompanyName?.LastOrDefault()?.Period?.StartDate?.Replace("--", "")?.Replace("-", ".").Split(".").Skip(1)), "");
                }
            }


            if (typeNameShort == "ENK" || typeNameShort == "I/S" || typeNameShort == "PMV" || typeNameShort == "FOR")
            {
                financialYear = "01.01 - 12.31";
            }
            else if (financialYear.Length >= 12 && financialYear.Substring(0, 5) == financialYear.Substring(8, 5))
            {
                financialYear = "01.01 - 12.31";
            }

            return new CvrViewModel()
            {
                IsValidCvr = true,
                Cvr = business.CvrNumber,
                FullName = companyName is not null ? companyName : "",
                Address = address is not null ? address : "",
                Telephone = contactNumber is not null ? contactNumber : "",
                Email = contactEmail is not null ? contactEmail : "",
                ClientType = typeNameShort is not null ? typeNameShort : "",
                ReelOwner = reelOwner is not null ? reelOwner : "N/A",
                FinancialYear = financialYear is not null ? financialYear : "",
                FinancialYearStartDate = financialYearStartDate is not null ? financialYearStartDate : null
            };
        }
        catch (FlurlHttpTimeoutException ex)
        {
            var error = await ex.GetResponseStringAsync();
            _logger.LogInformation("Error returned from {ex}: {error}", ex.Call.Request.Url, error);
            throw;
        }
        catch (FlurlHttpException ex)
        {
            var error = await ex.GetResponseStringAsync();
            _logger.LogInformation("Error returned from {ex}: {error}", ex.Call.Request.Url, error);
            throw;
        }
    }
}
