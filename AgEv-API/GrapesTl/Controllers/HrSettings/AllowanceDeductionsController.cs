namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive, Accounts Executive, Accounts Manager")]
[Route("api/[controller]")]
[ApiController]
public class AllowanceDeductionsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AllowanceDeduction>("hrAllowanceDeductionGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AllowanceDeduction>("hrAllowanceDeductionGetAll");
            return Ok(data.Select(a => new { listId = a.AllowanceDeductionId, listName = a.AllowanceDeductionName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllowanceDeductionId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AllowanceDeduction>("hrAllowanceDeductionGetById", parameter);

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

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] AllowanceDeduction model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllowanceDeductionName", model.AllowanceDeductionName);
            parameter.Add("@AllowanceDeductionType", model.AllowanceDeductionType);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrAllowanceDeductionCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] AllowanceDeduction model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllowanceDeductionId", model.AllowanceDeductionId);
            parameter.Add("@AllowanceDeductionName", model.AllowanceDeductionName);
            parameter.Add("@AllowanceDeductionType", model.AllowanceDeductionType);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrAllowanceDeductionUpdate", parameter);
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


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllowanceDeductionId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrAllowanceDeductionDelete", parameter);

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

    [HttpPost("EmpAllDed/Upload")]
    public async Task<IActionResult> AllowanceDeduction(IFormFile file)
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
            var records = csv.GetRecords<EmpAllDedFileUpload>();

            //_unitOfWork.SP_Call.BulkInserts(records);
            foreach (var model in records)
            {
                _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

                var parameter = new DynamicParameters();

                parameter.Add("@BranchName", model.BranchName);
                parameter.Add("@EmployeePin", model.EmployeePin.Trim());
                parameter.Add("@EmployeeName", model.EmployeeName);
                parameter.Add("@AllowanceDeductionName", model.AllowanceDeductionName);
                parameter.Add("@Amount", model.Amount);
                parameter.Add("@Particulars", model.Particulars);
                parameter.Add("@Message", "", DbType.String, ParameterDirection.Output);

                await _unitOfWork.SP_Call.Execute("hrEmpAllDedFileUpload", parameter);

                var message = parameter.Get<string>("@Message");


            }

            return Created("", SD.Message_Save);


        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving data." + e.Message);
        }
    }

}
