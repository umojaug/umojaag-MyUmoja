using GrapesTl.Dto;
using System.Threading.Tasks;

namespace GrapesTl.Utility;

public interface ISmsSender
{
    Task<AuthResponse> SendSms(string receiver, string msg);
}
