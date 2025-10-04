namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BeneficiaryDependentController(IUnitOfWork unitOfWork) : ControllerBase
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

            var data = await _unitOfWork.SP_Call.List<BeneficiaryDependent>("HrEmpBeneficiaryDependentGetAll",parameter);

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
            parameter.Add("@ChildDependentId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<BeneficiaryDependent>("HrEmpBeneficiaryDependentGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] BeneficiaryDependent model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);


            var employeeId = Guid.NewGuid();
            var parameter = new DynamicParameters();
            // parameter.Add("@BeneficiaryId", model.BeneficiaryId);
            parameter.Add("@ChildFullName", model.ChildFullName);
            parameter.Add("@DateOfBirth", model.DateOfBirth);
            parameter.Add("@IDNumber", model.IDNumber);
            parameter.Add("@ChildAddress", model.ChildAddress);
            parameter.Add("@GuardianFullName", model.GuardianFullName);
            parameter.Add("@GuardianContact", model.GuardianContact);
            parameter.Add("@GuardianAddress", model.GuardianAddress);
            parameter.Add("@GuardianDesignation", model.GuardianDesignation);
            parameter.Add("@GuardianEmail", model.GuardianEmail);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpBeneficiaryDependentCreate", parameter);

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
    public async Task<IActionResult> DetailsUpdate([FromForm] BeneficiaryDependent model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);


            var parameter = new DynamicParameters();

            parameter.Add("@ChildDependentId", model.ChildDependentId);
            // parameter.Add("@BeneficiaryId", model.BeneficiaryId);
            parameter.Add("@ChildFullName", model.ChildFullName);
            parameter.Add("@DateOfBirth", model.DateOfBirth);
            parameter.Add("@IDNumber", model.IDNumber);
            parameter.Add("@ChildAddress", model.ChildAddress);
            parameter.Add("@GuardianFullName", model.GuardianFullName);
            parameter.Add("@GuardianContact", model.GuardianContact);
            parameter.Add("@GuardianAddress", model.GuardianAddress);
            parameter.Add("@GuardianDesignation", model.GuardianDesignation);
            parameter.Add("@GuardianEmail", model.GuardianEmail);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpBeneficiaryDependentUpdate", parameter);
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
            parameter.Add("@ChildDependentId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpBeneficiaryDependentDelete", parameter);

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
