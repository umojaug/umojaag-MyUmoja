namespace GrapesTl.Service;
public class UserPermissionService(IUnitOfWork unitOfWork) : IUserPermissionService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    public async Task<bool> HasPermissionAsync(string userId, string permissionName)
    {
        var parameter = new DynamicParameters();
        parameter.Add("@userId", userId);
        parameter.Add("@PermissionName", permissionName);
        var result = await _unitOfWork.SP_Call.Single<bool>("AdRoleAccess", parameter);
        return result;
    }
}
