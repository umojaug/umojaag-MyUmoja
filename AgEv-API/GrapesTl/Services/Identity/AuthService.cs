using Microsoft.AspNetCore.Identity;

namespace GrapesTl.Service;
public class AuthService(UserManager<ApplicationUser> userManager, IUnitOfWork unitOfWork, IConfiguration configuration, ISmsSender smsSender) : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    //private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly ISmsSender _smsSender = smsSender;

    private readonly IConfiguration _configuration = configuration;
    const int accessTokenExpiryDays = 1;
    const int refreshTokenExpiryDays = 1;


    public async Task<string> GenerateAccessToken(ApplicationUser user)
    {

        //var isUserAdmin = await _userManager.IsInRoleAsync(user, SD.Role_Admin);
        var role = string.Join(",", (await _userManager.GetRolesAsync(user)));

        List<Claim> authClaims =
        [
            new Claim(JwtRegisteredClaimNames.Jti,
            Guid.NewGuid().ToString()),

            new Claim(JwtRegisteredClaimNames.Sub,
            user.Id.ToString()),

            // Add the ClaimType Role which carries the Role of the user
            new Claim(ClaimTypes.Role, role),
            new Claim("url", role)
        ];

        //foreach (var claim in claims)
        //{
        //    AuthClaims.Add(new Claim(claim.Type, claim.Value));
        //}

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["AuthSettings:Issuer"],
            audience: _configuration["AuthSettings:Audience"],
            claims: authClaims,
            expires: DateTime.Now.AddDays(accessTokenExpiryDays),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<AuthResponse> RegisterUserAsync(RegisterUser model)
    {
        if (model == null)
            throw new NullReferenceException("Register Model is null");

        try
        {
            var user = new ApplicationUser
            {
                UserName = model.PhoneNumber,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                CreatedDate = DateTime.Now,
                ImageName = model.ImageUrl,
                Role = model.Role,
                EmployeeId = model.EmployeeId,
                Email = model.Email,
                LastPasswordChangedDate = DateTime.Now.AddDays(SD.PasswordExpireDays)
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, user.Role);

                var refreshToken = await _userManager.GenerateConcurrencyStampAsync(user);
                await _unitOfWork.UserRefreshToken.AddAsync(new UserRefreshToken
                {
                    UserId = user.Id,
                    RefreshToken = refreshToken,
                    ExpiryDate = DateTime.Now.AddDays(1)
                });

                _unitOfWork.Save();

                return new AuthResponse
                {
                    IsSuccess = true,
                    Message = "User created successfully!",
                };
            }

            return new AuthResponse
            {
                IsSuccess = false,
                Message = "User did not create",
                Errors = result.Errors.Select(e => e.Description)
            };

        }
        catch (Exception e)
        {
            return new AuthResponse
            {
                IsSuccess = false,
                Message = e.Message.ToString()
            };
        }
    }

    public async Task<AuthResponse> LoginUserAsync(LoginUser model)
    {
        var user = await _userManager.FindByNameAsync(model.PhoneNumber);

        if (user == null)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = SD.Message_NotFound,
            };

        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        if (!result)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = SD.Message_NotFound,
            };

        if (user.LastPasswordChangedDate.AddDays(SD.PasswordExpireDays) < DateTime.Now)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = SD.Message_PasswordExpired,
            };

        var roles = await _userManager.GetRolesAsync(user);

        // Generate AccessToken
        string tokenAsString = await GenerateAccessToken(user);

        // Generate Refresh Token
        var refreshToken = await _userManager.GenerateConcurrencyStampAsync(user);

        // Save Refresh Token to "UserRefreshToken" table
        var userRefreshToken = await _unitOfWork.UserRefreshToken.GetFirstOrDefaultAsync(a => a.UserId == user.Id);
        if (userRefreshToken != null)
        {
            if (DateTime.Now <= userRefreshToken.ExpiryDate)
            {
                refreshToken = userRefreshToken.RefreshToken;
            }
            else
            {
                _unitOfWork.UserRefreshToken.Update(new UserRefreshToken
                {
                    UserId = user.Id,
                    RefreshToken = refreshToken,
                    ExpiryDate = DateTime.Now.AddDays(refreshTokenExpiryDays)
                });
                _unitOfWork.Save();
            }
        }

        var parameter = new DynamicParameters();
        parameter.Add("@UserId", user.Id);

        var modules = await _unitOfWork.SP_Call.List<AdModule>("AdModuleAssignGetByUser", parameter);

        var menus = await _unitOfWork.SP_Call.List<AdMenuDto>("AdMenuAssignGetByUser", parameter);

        var submenus = await _unitOfWork.SP_Call.List<AdSubMenuDto>("AdSubMenuAssignGetByUser", parameter);
        
        var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");

        return new AuthResponse
        {
            IsSuccess = true,
            AccessToken = tokenAsString,
            ExpireDate = DateTime.Now.AddDays(accessTokenExpiryDays),
            Role = string.Join(",", roles),
            RefreshToken = refreshToken,
            Modules = modules,
            Menus = menus,
            SubMenus = submenus,
            Company = company
        };
    }

    public async Task<AuthResponse> LoginIdAsync(ImpersonationUser model)
    {
        var user = await _userManager.FindByIdAsync(model.Id);

        if (user == null)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = "There is no user with that phone number",
            };

        var roles = await _userManager.GetRolesAsync(user);

        // Generate AccessToken
        string tokenAsString = await GenerateAccessToken(user);

        // Generate Refresh Token
        var refreshToken = await _userManager.GenerateConcurrencyStampAsync(user);

        // Save Refresh Token to "UserRefreshToken" table
        var userRefreshToken = await _unitOfWork.UserRefreshToken.GetFirstOrDefaultAsync(a => a.UserId == user.Id);
        if (userRefreshToken != null)
        {
            if (DateTime.Now <= userRefreshToken.ExpiryDate)
            {
                refreshToken = userRefreshToken.RefreshToken;
            }
            else
            {
                _unitOfWork.UserRefreshToken.Update(new UserRefreshToken
                {
                    UserId = user.Id,
                    RefreshToken = refreshToken,
                    ExpiryDate = DateTime.Now.AddDays(refreshTokenExpiryDays)
                });
                _unitOfWork.Save();
            }
        }
        var parameter = new DynamicParameters();
        parameter.Add("@UserId", user.Id);

        var modules = await _unitOfWork.SP_Call.List<AdModule>("AdModuleAssignGetByUser", parameter);

        var menus = await _unitOfWork.SP_Call.List<AdMenuDto>("AdMenuAssignGetByUser", parameter);

        var submenus = await _unitOfWork.SP_Call.List<AdSubMenuDto>("AdSubMenuAssignGetByUser", parameter);

        var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");

        return new AuthResponse
        {
            IsSuccess = true,
            //IsDayOpen = data.Status == "Day Op    en" ? true : false,
            AccessToken = tokenAsString,
            ExpireDate = DateTime.Now.AddDays(accessTokenExpiryDays),
            Role = string.Join(",", roles),
            RefreshToken = refreshToken,
            Modules = modules,
            Menus = menus,
            SubMenus = submenus,
            Company = company
        };
    }

    public async Task<bool> UserVerifyAsync(LoginUser model)
    {
        var user = await _userManager.FindByNameAsync(model.PhoneNumber);
        if (user is null)
            return false;

        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        return result;
    }

    public async Task<AuthResponse> ConfirmEmailAsync(string userId, string token)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = "User not found"
            };

        var decodedToken = WebEncoders.Base64UrlDecode(token);
        string normalToken = Encoding.UTF8.GetString(decodedToken);

        var result = await _userManager.ConfirmEmailAsync(user, normalToken);

        if (result.Succeeded)
            return new AuthResponse
            {
                IsSuccess = true,
                Message = "Email confirmed successfully!",
            };

        return new AuthResponse
        {
            IsSuccess = false,
            Message = "Email did not confirm",
            Errors = result.Errors.Select(e => e.Description)
        };
    }

    public async Task<AuthResponse> ForgetPasswordAsync(string phoneNumber)
    {
        var user = await _userManager.FindByNameAsync(phoneNumber);
        if (user == null)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = "No user associated with phone number",
            };

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

        Random _random = new();
        var otp = (_random.Next(100000, 999999)).ToString();

        await _unitOfWork.UserOtp.AddAsync(new UserOtp
        {
            UserId = user.Id,
            Token = token,
            Otp = otp,
            ExpiryDate = DateTime.Now.AddMinutes(5)
        });

        _unitOfWork.Save();

        var msg = otp + " is your GrapesTl reset code of forgot password";
        await _smsSender.SendSms(phoneNumber, msg);

        return new AuthResponse
        {
            IsSuccess = true,
            Message = "Reset OTP has been sent to the phone number successfully!",
            AccessToken = user.Id,
        };
    }

    public async Task<AuthResponse> ResetPasswordAsync(ResetPassword model)
    {
        var user = await _userManager.FindByNameAsync(model.PhoneNumber);

        if (user == null)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = SD.Message_NotFound,
            };

        var checkPassword = await _userManager.CheckPasswordAsync(user, model.OldPassword);

        if (!checkPassword)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = SD.Message_NotFound,
            };      

        if (model.NewPassword != model.ConfirmPassword)
            return new AuthResponse
            {
                IsSuccess = false,
                Message = "Password doesn't match its confirmation",
            };

        var passwordResetToken = await _userManager.GeneratePasswordResetTokenAsync(user);                

        var result = await _userManager.ResetPasswordAsync(user, passwordResetToken, model.NewPassword);

        if (result.Succeeded)
        {
            user.LastPasswordChangedDate = DateTime.Now;
            _unitOfWork.ApplicationUser.Update(user);

            _unitOfWork.Save();

            return new AuthResponse
            {
                IsSuccess = true,
                Message = "Password has been reset successfully!"
            };
        }

        return new AuthResponse
        {
            IsSuccess = false,
            Message = "Something went wrong",
            Errors = result.Errors.Select(e => e.Description),
        };
    }

    public async Task<AuthResponse> RefreshToken(AuthResponse model)
    {
        var user = await GetUserFromAccessToken(model.AccessToken);
        if (user != null && (await ValidateRefreshToken(user, model.RefreshToken)))
        {

            string tokenAsString = await GenerateAccessToken(user);

            return new AuthResponse
            {
                IsSuccess = true,
                AccessToken = tokenAsString,
                ExpireDate = DateTime.Now.AddDays(accessTokenExpiryDays),
                RefreshToken = model.RefreshToken
            };
        }

        return new AuthResponse
        {
            IsSuccess = false,
            Message = "Some properties are not valid",
        };
    }

    private async Task<ApplicationUser> GetUserFromAccessToken(string accessToken)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var principle = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out SecurityToken securityToken);


            if (securityToken is JwtSecurityToken jwtSecurityToken && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                var userId = principle.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                return await _userManager.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            }
        }
        catch (Exception)
        {
            return new ApplicationUser();
        }

        return new ApplicationUser();
    }

    private async Task<bool> ValidateRefreshToken(ApplicationUser user, string refreshToken)
    {
        var refreshTokenUser = await _unitOfWork.UserRefreshToken
        .GetFirstOrDefaultAsync(a => a.RefreshToken == refreshToken && a.UserId == user.Id);

        if (refreshTokenUser != null && refreshTokenUser.ExpiryDate > DateTime.Now)
            return true;

        return false;
    }

    public async Task<ReloadRoleDto> ReloadRoleAsync(string userId)
    {
        var parameter = new DynamicParameters();
        parameter.Add("@UserId", userId);

        var modules = await _unitOfWork.SP_Call.List<AdModule>("AdModuleAssignGetByUser", parameter);

        var menus = await _unitOfWork.SP_Call.List<AdMenuDto>("AdMenuAssignGetByUser", parameter);

        var submenus = await _unitOfWork.SP_Call.List<AdSubMenuDto>("AdSubMenuAssignGetByUser", parameter);

        return new ReloadRoleDto
        {
            Modules = modules,
            Menus = menus,
            SubMenus = submenus
        };
    }

}
