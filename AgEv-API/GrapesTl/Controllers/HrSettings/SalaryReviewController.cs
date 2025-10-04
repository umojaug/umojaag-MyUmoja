using GrapesTl.BackgroundServices;

namespace GrapesTl.Controllers;

//[Authorize(Roles = "Super Admin,HR Manager,HR Executive, Accounts Executive, Accounts Manager")]
[Route("api/[controller]")]
[ApiController]
public class SalaryReviewController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<RepeatWork> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<RepeatWork> _logger = logger;

    private string _userId;

    [HttpGet("NotReply")]
    public async Task<IActionResult> NotReply()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<SalaryReviewView>("hrSalaryReviewNotReply");

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<SalaryReviewView>("HrSalaryReviewGetAll");

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }


    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SalaryReviewId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SalaryReview>("HrSalaryReviewGetById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }



    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] SalaryReview model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SalaryReviewId", model.SalaryReviewId);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", model.Particulars);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrSalaryReviewUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }



    [HttpPost("Comments")]
    public async Task<IActionResult> Comments([FromBody] SalaryReviewComments model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SalaryReviewId", model.SalaryReviewId);
            parameter.Add("@Comments", model.Comments);
            parameter.Add("@IsAccept", model.IsAccept);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrSalaryReviewComments", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }



    [HttpPost("Upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {

        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            if (file == null || file.ContentType.Length <= 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (Path.GetExtension(file.FileName).ToLower() != ".csv")
            {
                return BadRequest("Invalid file format. Only CSV files are allowed.");
            }

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                NewLine = Environment.NewLine,
            };

            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
            var records = csv.GetRecords<SalaryReviewUpload>();

            //_unitOfWork.SP_Call.BulkInserts(records);

            foreach (var model in records)
            {
                _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

                var parameter = new DynamicParameters();

                parameter.Add("@ReviewYear", model.ReviewYear);
                parameter.Add("@EmployeePin", model.EmployeePin.Trim());
                parameter.Add("@EmployeeName", model.EmployeeName);
                parameter.Add("@Amount", model.Amount);
                parameter.Add("@Particulars", model.Particulars);
                parameter.Add("@Message", "", DbType.String, ParameterDirection.Output);

                await _unitOfWork.SP_Call.Execute("hrSalaryReviewUpload", parameter);

                var message = parameter.Get<string>("@Message");

                if (message == "Not found")
                    return NotFound(message);


            }

            return Created("", SD.Message_Save);


        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving data." + e.Message);
        }
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SalaryReviewId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrSalaryReviewDelete", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot delete")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

    [HttpPost("EmailLetters")]
    public async Task<IActionResult> EmailLetters()
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var employees = await _unitOfWork.SP_Call.List<SalaryReviewView>("hrSalaryReviewNotReply");

            if (employees is null)
                return NotFound();

            foreach (var employee in employees)
            {
                if (string.IsNullOrWhiteSpace(employee.Email) == false)
                {
                    try
                    {
                        var tmp = await _mailSender.SendEmailWithBody(
                            employee.Email,
                            employee.EmployeeName,
                            SD.BccEmail,
                            "Salary Review",
                            LetterTemplate(employee));
                    }
                    catch (Exception ex)
                    {
                        _logger.LogInformation("Through from try catch: {Message}", ex.Message);
                    }
                }
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    private static string LetterTemplate(SalaryReviewView review)
    {
        var ps = new StringBuilder();

        ps.Append("<!DOCTYPE html>");
        ps.Append("<html lang='en'>");

        ps.Append("<head>");
        ps.Append("<meta charset='UTF-8'>");
        ps.Append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        ps.Append("<title>Salary Review</title>");
        ps.Append("</head>");

        ps.Append("<body>");

        ps.Append("<div style='font-family: Helvetica;font-size: 12px; width: 600px; margin: 0 auto;'>");
        ps.Append("<table border='0' width='100%' cellpadding='5' cellspacing='0'>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: left;'>");
        ps.Append("<img style='background-color: white; padding: 3px; width:60px' src='" + SD.ReportImageUrl + "'/>");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: left;'>");
        //ps.Append($"{review.ReviewYear}");
        ps.Append(DateTime.Now.ToString("dd/MMM/yyyy"));
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"Dear {review.EmployeeName},");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"Following the recently completed Annual Salary Review Process we are pleased to confirm your new salary details. For all eligible employees, our review has considered many factors including market rates, inflation, company performance and individual performance.");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"Your salary has been reviewed and your new gross salary will be {review.Amount} {SD.Currency}. Congratulations!");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"This is effective 1st March 2025.");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"All the other terms and conditions as stated in your contract of employment will remain the same.");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"It is understood and accepted that the employment relationship we have agreed to is an at-will relationship, and that it may be ended by either party, at any time, and for any reason.");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"If you agree this letter sets forth our understanding, please click on the accept button in My Umoja shown below this notification.");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"We look forward to have long and good working relationship with you.");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: Left;'>");
        ps.Append($"Sincerely,");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='1' style='text-align: Left;'>");
        ps.Append($"<span>Md. Abdul Awal</span></br><span>Country Team Leader</span>");
        ps.Append("</td>");
        ps.Append("<td colspan='1' style='text-align: Left;'>");
        ps.Append($"<span>Ms. Grace Komugisha</span></br><span>HR and Administration Manager</span>");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>");

        ps.Append("<table border='0' cellspacing='3' cellpadding='3'>");
        ps.Append("<tr>");
        ps.Append("<td bgcolor='#007bff' style='background-color: Green;padding: 10px 20px; border-radius: 8px;'>");
        ps.Append($"<a href='{SD.SalaryReviewCallBack + "true/" + review.SalaryReviewId}' style='color: #ffffff; text-decoration: none; display: inline-block;'>I Accept</a>");
        ps.Append("</td>");
        ps.Append("<td bgcolor='#007bff' style='background-color: Red;padding: 10px 20px; border-radius: 8px;'>");
        ps.Append($"<a href='{SD.SalaryReviewCallBack + "false/" + review.SalaryReviewId}' style='color: #ffffff; text-decoration: none; display: inline-block;'>I Decline</a>");
        ps.Append("</td>");
        ps.Append("</tr>");
        ps.Append("</table>");
        ps.Append("</td>");
        ps.Append("</tr>");
        ps.Append("<tr>");

        ps.Append("</table>");
        ps.Append("</div>");

        ps.Append("</body>");
        ps.Append("</html>");

        return ps.ToString();
    }

}
