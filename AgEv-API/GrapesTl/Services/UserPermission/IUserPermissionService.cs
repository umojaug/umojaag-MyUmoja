namespace GrapesTl.Service;
public interface IUserPermissionService
{
    Task<bool> HasPermissionAsync(string userId, string permissionName);
}