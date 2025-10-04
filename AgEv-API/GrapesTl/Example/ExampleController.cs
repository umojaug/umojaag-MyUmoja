namespace GrapesTl.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ExampleController(IMailSender mailSender) : ControllerBase
{
    private readonly IMailSender _mailSender = mailSender;

    [HttpGet("GetCvr")]
    public async Task<IActionResult> GetCvr([FromServices] CvrService service)
    {
        var response = await service.Get("43778447");
        return Ok(response);
    }

    [HttpGet("TestLogin")]
    public async Task<IActionResult> TestLogin()
    {
        try
        {

            string loginUrl = "https://localhost:44305/api/auth/Login";


            var loginPayload = new
            {
                PhoneNumber = "880122334455",
                Password = "Abcd!234"
            };

            var response = await loginUrl
                .PostJsonAsync(loginPayload)
                .ReceiveJson<AuthResponse>();


            if (response.IsSuccess)
            {
                return Ok(new
                {
                    Message = "Login successful",
                    Token = response.AccessToken
                });
            }
            else
            {
                return Unauthorized("Invalid username or password.");
            }
        }
        catch (FlurlHttpException ex)
        {
            return StatusCode((int)ex.Call.Response.StatusCode, "An error occurred during login.");
        }
    }


    [HttpGet("SendEmail")]
    public async Task<IActionResult> SendEmail()
    {
        var tmp = await _mailSender.SendEmailWithBody(
            "hasan@grapestl.com",
            "info",
            "hasan@grapestl.com",
            //"s.m.tariqul.islam.eu181400082@gmail.com",
            SD.AppointmentLetter,
            "We have the pleasure of offering you an employment opportunity with Umoja. Download Appointment Letter by <a href='https://localhost:44305/api/hrpdfreport/joiningletter/48230c83-7a80-42ac-9198-d6875939cd6e'>clicking here</a>.");
        return Ok(tmp);
    }

    [HttpGet("SendEmailWithTemplate")]
    public async Task<IActionResult> SendEmailWithTemplate()
    {
        var path = $"{Directory.GetCurrentDirectory()}/wwwroot/emails/anniversary.cshtml";
        var tmp = await _mailSender.SendHtmlEmail(
            //model.Email,
            //model.EmployeeName,
            //SD.BccEmail,
            "imammasum.biu@gmail.com",
            "imam masum",
            SD.BccEmail,
            path,
            SD.HappyAnniversary,
            "<span>@</span><span>CTO</span>");
        return Ok(tmp);
    }
}