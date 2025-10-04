namespace GrapesTl.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthService authService, IHttpContextAccessor accessor, IConfiguration configuration) : ControllerBase
{
    private readonly IAuthService _authService = authService;
    private readonly IConfiguration _configuration = configuration;
    private readonly string _userId = accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

#if DEBUG
    int isProduction = 0;
#else
    int isProduction = 0; // 1 
#endif

    // /api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterUser model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            model.EmployeeId = "";
            model.Role = SD.Role_SuperAdmin;
            var result = await _authService.RegisterUserAsync(model);

            if (result.IsSuccess)
            {
                var loginView = new LoginUser { PhoneNumber = model.PhoneNumber, Password = model.Password };
                var loginUser = await _authService.LoginUserAsync(loginView);

                if (loginUser.IsSuccess)
                {
                    return Created("", loginUser);
                }
            }

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Register User - " + e.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginUser model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var isPasswordValid = await _authService.UserVerifyAsync(model);
            if (!isPasswordValid)
            {
                return Unauthorized(SD.Message_NotFound);
            }

            if (isProduction == 0)
            {
                var result = await _authService.LoginUserAsync(model);
                if (result.IsSuccess)
                    return Ok(new { result, isProduction });

                return BadRequest(result.Message);
            }
            else
            {

                var hashPassword = EncryptPassword(model.Password);

                string googleAuthKey = _configuration["AppSettings:GoogleAuthKey"];
                string UserUniqueKey = model.PhoneNumber + googleAuthKey;

                TwoFactorAuthenticator TwoFacAuth = new();
                var setupInfo = TwoFacAuth.GenerateSetupCode("Microfin", model.PhoneNumber, ConvertSecretToBytes(UserUniqueKey, false), 300);

                var result = new
                {
                    UserUniqueKey,
                    model.PhoneNumber,
                    password = hashPassword,
                    BarcodeImageUrl = setupInfo.QrCodeSetupImageUrl,
                    SetupCode = setupInfo.ManualEntryKey
                };

                return Ok(new { result, isProduction });

            }


        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Login - " + e.Message);
        }

    }

    [HttpPost("twoFactorAuthenticate")]
    public async Task<IActionResult> TwoFactorAuthenticate(
        [FromForm] string CodeDigit,
        [FromForm] string UserUniqueKey,
        [FromForm] string PhoneNumber,
        [FromForm] string Password
        )
    {

        if (string.IsNullOrEmpty(UserUniqueKey))
        {
            return NotFound(new { success = false, message = "Session expired, please login again." });
        }

        var model = new LoginUser
        {
            PhoneNumber = PhoneNumber,
            Password = DecryptPassword(Password)
        };

        TwoFactorAuthenticator tfa = new();
        bool isValid = tfa.ValidateTwoFactorPIN(UserUniqueKey, CodeDigit, false);

        if (isValid)
        {
            var result = await _authService.LoginUserAsync(model);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);

        }
        else
        {
            return BadRequest(new { success = false, message = "Invalid Two Factor Authentication Code" });
        }


    }

    // /api/auth/Impersonation
    [HttpPost("impersonation")]
    public async Task<IActionResult> ImpersonationAsync([FromBody] ImpersonationUser model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.LoginIdAsync(model);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Login - " + e.Message);
        }

    }

    // /api/auth/confirmemail?userid&token
    [HttpGet("confirmEmail")]
    public async Task<IActionResult> ConfirmEmail(string userId, string token)
    {
        if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.ConfirmEmailAsync(userId, token);

            if (result.IsSuccess)
            {
                return Redirect($"{_configuration["AppUrl"]}/ConfirmEmail.html");
            }

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Confirm Email - " + e.Message);
        }
    }

    // api/auth/forgetPassword
    [HttpPost("forgetPassword")]
    public async Task<IActionResult> ForgetPassword([FromBody] ForgetPassword model)
    {
        if (string.IsNullOrWhiteSpace(model.PhoneNumber))
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.ForgetPasswordAsync(model.PhoneNumber);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Forget Password - " + e.Message);
        }
    }

    // api/auth/resetPassword
    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPassword model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.ResetPasswordAsync(model);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                 "Error Reset Password - " + e.Message);
        }
    }

    // api/auth/RefreshToken
    [HttpPost("refreshToken")]
    public async Task<ActionResult> RefreshToken([FromBody] AuthResponse refreshRequest)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.RefreshToken(refreshRequest);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Refresh Token - " + e.Message);
        }
    }

    public static byte[] ConvertSecretToBytes(string secret, bool secretIsBase32)
    {
        if (secretIsBase32)
        {
            return Base32Encoding.ToBytes(secret); // If using Base32 encoding (optional)
        }
        else
        {
            return Encoding.UTF8.GetBytes(secret);
        }
    }

    public static string EncryptPassword(string plainText)
    {
        string Key = SD.Key;
        byte[] keyBytes = GetValidKey(Key);
        using (AesCng aes = new AesCng())
        {
            aes.Key = keyBytes;
            aes.Mode = CipherMode.ECB;
            aes.Padding = PaddingMode.PKCS7;

            using (ICryptoTransform encryptor = aes.CreateEncryptor())
            {
                byte[] inputBytes = Encoding.UTF8.GetBytes(plainText);
                byte[] encryptedBytes = encryptor.TransformFinalBlock(inputBytes, 0, inputBytes.Length);
                return Convert.ToBase64String(encryptedBytes);
            }
        }
    }

    public static string DecryptPassword(string encryptedText)
    {
        string Key = SD.Key;
        byte[] keyBytes = GetValidKey(Key);
        using (AesCng aes = new AesCng())
        {
            aes.Key = keyBytes;
            aes.Mode = CipherMode.ECB;
            aes.Padding = PaddingMode.PKCS7;

            using (ICryptoTransform decryptor = aes.CreateDecryptor())
            {
                byte[] encryptedBytes = Convert.FromBase64String(encryptedText);
                byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedBytes, 0, encryptedBytes.Length);
                return Encoding.UTF8.GetString(decryptedBytes);
            }
        }
    }

    private static byte[] GetValidKey(string key)
    {
        using (SHA256 sha256 = SHA256.Create())
        {
            return sha256.ComputeHash(Encoding.UTF8.GetBytes(key)).AsSpan(0, 32).ToArray();
        }
    }

    //Mobile app
    [HttpPost("login/app")]
    public async Task<IActionResult> LoginAppAsync([FromBody] LoginUser model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.LoginUserAsync(model);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result.Message);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Login - " + e.Message);
        }
    }

    [HttpPost("reloadRole")]
    public async Task<IActionResult> ReloadRole()
    {


        try
        {
            var result = await _authService.ReloadRoleAsync(_userId);

            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Login - " + e.Message);
        }
    }
}
