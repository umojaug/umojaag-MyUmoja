namespace GrapesTl.Controllers;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class PreviousYearController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [Authorize]
    [HttpPost("File/Upload")]
    public async Task<IActionResult> UploadPreviousYearData(IFormFile file)
    {

        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            if (file == null || file.ContentType.Length <= 0)
                return BadRequest("No file uploaded.");

            if (!Path.GetExtension(file.FileName).Equals(".csv", StringComparison.CurrentCultureIgnoreCase))
                return BadRequest("Invalid file format. Only CSV files are allowed.");

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                NewLine = Environment.NewLine,
            };

            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            var records = csv.GetRecords<PreviousYearUpload>();

            if (records.IsNullOrEmpty())
                return BadRequest("No Record Found for Upload");

            //_unitOfWork.SP_Call.BulkInserts(records);
            foreach (var model in records)
            {
                var parameter = new DynamicParameters();

                parameter.Add("@YearName", model.YearName);
                parameter.Add("@AuName", model.AuName);
                parameter.Add("@PortfolioValue", model.PortfolioValue);
                parameter.Add("@Par", model.Par);
                parameter.Add("@NumOfBorrower", model.NumOfBorrower);

                parameter.Add("@Message", "", DbType.String, ParameterDirection.Output);

                await _unitOfWork.SP_Call.Execute("AuditPreviousYearFileUpload", parameter);

                var message = parameter.Get<string>("@Message");
            }
            return Created("", SD.Message_Save);

        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving data." + e.Message);
        }




    }


    [Authorize]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<PreviousYearUploadView>("AuditPreviousYearGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

}








