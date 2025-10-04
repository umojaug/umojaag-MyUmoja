using GrapesTl.Dto;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace GrapesTl.Utility;

public class SmsSender : ISmsSender
{
    private readonly SmsOptions smsOptions;

    public SmsSender(IOptions<SmsOptions> options)
    {
        smsOptions = options.Value;
    }

    public async Task<AuthResponse> SendSms(string receiver, string msg)
    {
        try
        {
            string userId = smsOptions.Userid; //Your Login ID
            string password = smsOptions.Password; //Your Password
            string number = receiver; //Recipient Phone Number multiple number must be separated by comma
            string message = Uri.EscapeDataString(msg);

            string postData = "username=" + userId + "&password=" + password + "&number=" + number + "&message=" + message;
            var data = new StringContent(postData, Encoding.UTF8, "application/x-www-form-urlencoded");

            var url = smsOptions.Host;

            using var client = new HttpClient();

            var response = await client.PostAsync(url, data);

            var stresult = await response.Content.ReadAsStringAsync();
            if (stresult.Split("|")[0] == "1101")
            {
                return new AuthResponse
                {
                    Message = "SMS Send successfully!",
                    IsSuccess = true,
                };
            }
            else
            {
                return new AuthResponse
                {
                    Message = "SMS Send",
                    IsSuccess = false,
                };
            }
        }
        catch (Exception e)
        {
            return new AuthResponse
            {
                Message = e.Message,
                IsSuccess = false,
            };
        }


    }

}
