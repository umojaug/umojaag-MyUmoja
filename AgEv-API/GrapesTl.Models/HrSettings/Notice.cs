using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class Notice
{
    public string NoticeId { get; set; }
    public string Title { get; set; }
    public IFormFile File { get; set; }
    public DateTime PublishDate { get; set; }
    public DateTime ExpiryDate { get; set; }

}

public class NoticeView : Notice
{
    public string FileUrl { get; set; }
}