using GrapesTl.Models.RegularUser;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BeneficiaryPrimaryController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private string _userId;


    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<BeneficiaryPrimary>("HrEmpBeneficiaryGetAll", parameter);

            return Ok(data);
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
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@BeneficiaryId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<BeneficiaryPrimary>("HrEmpBeneficiaryGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] BeneficiaryPrimary model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);


            var employeeId = Guid.NewGuid();
            var parameter = new DynamicParameters();
            parameter.Add("@SlNo", model.SlNo);
            parameter.Add("@Name", model.Name);
            parameter.Add("@Relationship", model.Relationship);
            parameter.Add("@ReceivedBenefitPercentage", model.ReceivedBenefitPercentage);
            parameter.Add("@DOB", model.DOB);
            parameter.Add("@IdNumber", model.IdNumber);
            parameter.Add("@BeneficiaryContactNumber", model.BeneficiaryContactNumber);
            parameter.Add("@BeneficiaryEmail", model.BeneficiaryEmail);
            parameter.Add("@BeneficiaryAddress", model.BeneficiaryAddress);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpBeneficiaryCreate", parameter);

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
    public async Task<IActionResult> DetailsUpdate([FromForm] BeneficiaryPrimary model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);


            var parameter = new DynamicParameters();

            parameter.Add("@BeneficiaryId", model.BeneficiaryId);
            parameter.Add("@SlNo", model.SlNo);
            parameter.Add("@Name", model.Name);
            parameter.Add("@Relationship", model.Relationship);
            parameter.Add("@ReceivedBenefitPercentage", model.ReceivedBenefitPercentage);
            parameter.Add("@DOB", model.DOB);
            parameter.Add("@IdNumber", model.IdNumber);
            parameter.Add("@BeneficiaryContactNumber", model.BeneficiaryContactNumber);
            parameter.Add("@BeneficiaryEmail", model.BeneficiaryEmail);
            parameter.Add("@BeneficiaryAddress", model.BeneficiaryAddress);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpBeneficiaryUpdate", parameter);
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
            parameter.Add("@BeneficiaryId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpBeneficiaryDelete", parameter);

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
}
