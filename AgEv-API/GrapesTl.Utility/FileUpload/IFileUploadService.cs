using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace GrapesTl.Utility;

public interface IFileUploadService
{
    Task<string> GetUploadIdAsync(IFormFile file);
    Task<string> GetUploadUrlAsync(IFormFile file);
}
