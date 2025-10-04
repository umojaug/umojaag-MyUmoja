using Flurl.Http;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
namespace GrapesTl.Utility;

public class UploadResult
{
    public bool Success { get; set; }
    public string Id { get; set; }
    public string Message { get; set; }
}

public class FileUploadService : IFileUploadService
{
    //public async Task<string> UploadFileAsync(IFormFile file)
    //{
    //    try
    //    {
    //        // Load Google credentials from the environment or a file.
    //        GoogleCredential credential = await GoogleCredential.GetApplicationDefaultAsync();
    //        credential = credential.CreateScoped(DriveService.Scope.DriveFile);

    //        // Create Drive API service.
    //        var service = new DriveService(new BaseClientService.Initializer
    //        {
    //            HttpClientInitializer = credential,
    //            ApplicationName = "Drive API Snippets"
    //        });

    //        // Create metadata for the file to be uploaded.
    //        var fileMetadata = new Google.Apis.Drive.v3.Data.File()
    //        {
    //            Name = file.FileName
    //        };

    //        // Upload the file to Google Drive.
    //        FilesResource.CreateMediaUpload request;
    //        using (var stream = new MemoryStream())
    //        {
    //            await file.CopyToAsync(stream);
    //            stream.Seek(0, SeekOrigin.Begin);

    //            request = service.Files.Create(
    //                fileMetadata, stream, file.ContentType);
    //            request.Fields = "id";
    //            await request.UploadAsync();
    //        }

    //        var uploadedFile = request.ResponseBody;

    //        // Return the file ID.
    //        return uploadedFile.Id;
    //    }
    //    catch (Exception e)
    //    {
    //        // Handle exceptions.
    //        Console.WriteLine($"Error uploading file: {e.Message}");
    //        return null;
    //    }
    //}


    //public async Task<string> GetUploadIdAsync(IFormFile file)
    //{
    //    // ✅ First, validate file size
    //    if (file.Length > 1 * 1024 * 1024)
    //    {
    //        return "File size must be less than or equal to 1 MB.";
    //    }

    //    // ✅ Then copy to memory
    //    using var memoryStream = new MemoryStream();
    //    await file.CopyToAsync(memoryStream);

    //    var data = new
    //    {
    //        data = memoryStream.ToArray(),
    //        name = file.FileName,
    //        type = file.ContentType
    //    };

    //    var dataSendPayLoad = new
    //    {
    //        dataReq = data,
    //        fname = "uploadFilesToGoogleDrive",
    //    };

    //    var response = await SD.DriveUrl
    //        .PostJsonAsync(dataSendPayLoad)
    //        .ReceiveJson<FileUploadResponse>();

    //    if (string.IsNullOrWhiteSpace(response.Id))
    //    {
    //        throw new Exception("File upload failed: Empty file ID received.");
    //    }

    //    return response.Id;
    //}


    //public async Task<UploadResult> GetUploadIdAsync(IFormFile file)
    //{
    //    if (file.Length > 1 * 1024 * 1024)
    //    {
    //        return new UploadResult
    //        {
    //            Success = false,
    //            Message = "File size must be less than or equal to 1 MB."
    //        };
    //    }

    //    using var memoryStream = new MemoryStream();
    //    await file.CopyToAsync(memoryStream);

    //    var data = new
    //    {
    //        data = memoryStream.ToArray(),
    //        name = file.FileName,
    //        type = file.ContentType
    //    };

    //    var dataSendPayLoad = new
    //    {
    //        dataReq = data,
    //        fname = "uploadFilesToGoogleDrive",
    //    };

    //    var response = await SD.DriveUrl
    //        .PostJsonAsync(dataSendPayLoad)
    //        .ReceiveJson<FileUploadResponse>();

    //    if (string.IsNullOrWhiteSpace(response.Id))
    //    {
    //        return new UploadResult
    //        {
    //            Success = false,
    //            Message = "Upload failed: Empty file ID."
    //        };
    //    }

    //    return new UploadResult
    //    {
    //        Success = true,
    //        Id = response.Id
    //    };
    //}






    //public async Task<string> GetUploadIdAsync(IFormFile file)
    //{
    //    using var memoryStream = new MemoryStream();
    //    await file.CopyToAsync(memoryStream);

    //    if (file.Length > 1 * 1024 * 1024)
    //              {
    //                    return "File size must be less than or equal to 1 MB.";
    //              }

    //        var data = new
    //    {
    //        data = memoryStream.ToArray(),
    //        name = file.FileName,
    //        type = file.ContentType
    //    };

    //    var dataSendPayLoad = new
    //    {
    //        dataReq = data,
    //        fname = "uploadFilesToGoogleDrive",
    //    };

    //    var response = await SD.DriveUrl
    //        .PostJsonAsync(dataSendPayLoad)
    //        .ReceiveJson<FileUploadResponse>();

    //    if (string.IsNullOrWhiteSpace(response.Id))
    //    {
    //        throw new Exception("File upload failed: Empty file ID received.");
    //    }

    //    return response.Id;
    //}

    //public async Task<string> GetUploadIdAsync(IFormFile file)
    //{
    //    try
    //    {

    //        if (file.Length > 1 * 1024 * 1024)
    //        {
    //            return "File size must be less than or equal to 1 MB.";
    //        }

    //        using var memoryStream = new MemoryStream();
    //        file.CopyTo(memoryStream);

    //        var data = new
    //        {
    //            data = memoryStream.ToArray(),
    //            name = file.FileName,
    //            type = file.ContentType
    //        };

    //        var dataSendPayLoad = new
    //        {
    //            dataReq = data,
    //            fname = "uploadFilesToGoogleDrive",
    //        };

    //        var response = await SD.DriveUrl
    //                .PostJsonAsync(dataSendPayLoad)
    //               .ReceiveJson<FileUploadResponse>();

    //        return string.IsNullOrWhiteSpace(response.Id) == true ? "" : response.Id;
    //    }
    //    catch (FlurlHttpException ex)
    //    {
    //        return ex.Message;
    //    }
    //}


    public async Task<string> GetUploadIdAsync(IFormFile file)
    {
        if (file.Length > 1 * 1024 * 1024)
        {
            // Either throw an exception:
            throw new InvalidOperationException("File size must be less than or equal to 1 MB.");

            // Or return a special error string (not recommended)
            // return "ERROR: File size must be less than or equal to 1 MB.";
        }

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var data = new
        {
            data = memoryStream.ToArray(),
            name = file.FileName,
            type = file.ContentType
        };

        var dataSendPayLoad = new
        {
            dataReq = data,
            fname = "uploadFilesToGoogleDrive",
        };

        var response = await SD.DriveUrl
            .PostJsonAsync(dataSendPayLoad)
            .ReceiveJson<FileUploadResponse>();

        if (string.IsNullOrWhiteSpace(response.Id))
        {
            throw new Exception("File upload failed: Empty file ID received.");
        }

        return response.Id;
    }


    public async Task<string> GetUploadUrlAsync(IFormFile file)
    {
        try
        {

            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);

            var data = new
            {
                data = memoryStream.ToArray(),
                name = file.FileName,
                type = file.ContentType
            };

            var dataSendPayLoad = new
            {
                dataReq = data,
                fname = "uploadFilesToGoogleDrive",
            };

            var response = await SD.DriveUrl
                    .PostJsonAsync(dataSendPayLoad)
                   .ReceiveJson<FileUploadResponse>();

            return string.IsNullOrWhiteSpace(response.Url) == true ? "" : response.Url;
        }
        catch (FlurlHttpException ex)
        {
            return ex.Message;
        }
    }

    private class FileUploadResponse
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("url")]
        public string Url;
    }

}
