namespace GrapesTl.Service;

public interface IAuthService
{
    Task<AuthResponse> RegisterUserAsync(RegisterUser model);

    Task<AuthResponse> LoginUserAsync(LoginUser model);

    Task<AuthResponse> LoginIdAsync(ImpersonationUser model);
    Task<bool> UserVerifyAsync(LoginUser model);

    Task<AuthResponse> ConfirmEmailAsync(string userId, string token);

    Task<AuthResponse> ForgetPasswordAsync(string email);

    Task<AuthResponse> ResetPasswordAsync(ResetPassword model);

    Task<AuthResponse> RefreshToken(AuthResponse model);
    Task<ReloadRoleDto> ReloadRoleAsync(string userId);
}
