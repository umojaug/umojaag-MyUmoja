namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EmployeesController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [HttpGet("EmpSearch/{id}")]
    public async Task<IActionResult> EmpSearch(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpSearch>("hrEmployeeGetByEmpSearch", parameter);

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

    [HttpGet("Search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetBySearch", parameter);

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

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectAll")]
    public async Task<IActionResult> SelectAll()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectAll");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectAreaManager")]
    public async Task<IActionResult> SelectAreaManager()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationName", "Area Manager,Area Manager Trainee");

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByDesignation", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("SelectAssignedRiskOwner")]
    public async Task<IActionResult> SelectAssignedRiskOwner()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationName", "IT and product support officer,HR & Administration Manager,Accounts Manager,Internal Audit Manager,Deputy Team Leader");

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByDesignation", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectAuditor")]
    public async Task<IActionResult> SelectAuditor()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationName", "Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations");

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByDesignation", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectBranchManager")]
    public async Task<IActionResult> SelectBranchManager()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationName", "Branch Manager,Branch Manager Trainee,Assistant Branch Manager");

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByDesignation", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("SelectByBranch/{id}")]
    public async Task<IActionResult> SelectByBranch(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@branchId", id);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByBranch", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByRmAmBm/{id}")]
    public async Task<IActionResult> SelectByRmAmBm(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchId", id);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByRmAmBm", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByRmAm/{id}")]
    public async Task<IActionResult> SelectByRmAm(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@branchId", id);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByRmAm", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectbyRmOm/{id}")]
    public async Task<IActionResult> SelectbyRmOm(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@regionSelectId", id);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectbyRmOm", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectbyRmOmCtl/{id}")]
    public async Task<IActionResult> SelectbyRmOmCtl(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchId", id);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectbyRmOmCtlByBranch", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByDepartmentFocal/{id}")]
    public async Task<IActionResult> SelectByDepartmentFocal(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DepartmentId", id);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByDepartmentFocal", parameter);

            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByDepartmentAuditType/{id}")]
    public async Task<IActionResult> SelectByDepartmentAuditType(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DepartmentId", id);

            var data = await _unitOfWork.SP_Call.List<AuditDepartmentType>("hrEmployeeGetForSelectByDepartmentAuditType", parameter);

            return Ok(data.Select(a => new { listId = a.DepartmentId, listName = a.AuditType }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectFmpu")]
    public async Task<IActionResult> SelectFmpu()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationName", "fmpu,Fraud & Misappropriation Prevention in-charge");

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByDesignation", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("SelectManager")]
    public async Task<IActionResult> SelectManager()
    {


        try

        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeMgtSelect", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectOpsManager")]
    public async Task<IActionResult> SelectOpsManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeOpsGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectRegionManager")]
    public async Task<IActionResult> SelectRegionManager()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationName", "Regional Manager,Regional Manager Trainee");

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectByDesignation", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName })); ;
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectSecondManager")]
    public async Task<IActionResult> SelectSecondManager()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeSecondMgtGetForSelect", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectTopManager")]
    public async Task<IActionResult> SelectTopManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeTopMgtGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }
}
