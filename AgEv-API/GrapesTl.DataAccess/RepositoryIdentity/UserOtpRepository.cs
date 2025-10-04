using GrapesTl.Models;

namespace GrapesTl.Service;

public class UserOtpRepository(ApplicationDbContext db) : RepositoryAsync<UserOtp>(db), IUserOtpRepository
{
    private readonly ApplicationDbContext _db = db;
}
