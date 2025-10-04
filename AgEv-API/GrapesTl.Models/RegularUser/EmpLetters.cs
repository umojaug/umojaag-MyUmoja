using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class EmpLetters
{
    public long LetterId { get; set; }
    public IFormFile File { get; set; }
}

public class EmpLettersView : EmpLetters
{
    public string Letterbody { get; set; }
    public string DigitalSignature { get; set; }

}