using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace GrapesTl.Utility;

public static class FileExtension
{
    public static async Task<string> SaveImage(IFormFile imageFile, string folderName, string webRootPath)
    {
        string imageName = Guid.NewGuid().ToString();
        imageName += Path.GetExtension(imageFile.FileName);
        var imagePath = Path.Combine(webRootPath, folderName, imageName);
        using (var fileStream = new FileStream(imagePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }
        return imageName;
    }

    public static void DeleteImage(string imageName, string folderName, string webRootPath)
    {
        var imagePath = Path.Combine(webRootPath, folderName, imageName);
        if (File.Exists(imagePath))
            File.Delete(imagePath);
    }
}
