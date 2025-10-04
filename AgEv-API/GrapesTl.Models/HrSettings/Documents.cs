using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class Documents
{

    public string DocumentId { get; set; }
    public string Title { get; set; }
    public string CategoryId { get; set; }
    public IFormFile File { get; set; }

}

public class DocumentsView : Documents
{

    public string CategoryName { get; set; }
    public string FileUrl { get; set; }


}




public class DocumentsReadByUser
{
    public string DocumentId { get; set; }
    public DateTime ReadDateTime { get; set; }

}