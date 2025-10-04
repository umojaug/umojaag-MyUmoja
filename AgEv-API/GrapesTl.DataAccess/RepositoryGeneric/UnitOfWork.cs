namespace GrapesTl.Service;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _db;

    public UnitOfWork(ApplicationDbContext db)
    {
        _db = db;

        UserRefreshToken = new UserRefreshTokenRepository(_db);
        ApplicationUser = new ApplicationUserRepository(_db);
        UserOtp = new UserOtpRepository(_db);
        SP_Call = new SP_Call(_db);

    }

    public IUserRefreshTokenRepository UserRefreshToken { get; private set; }
    public IApplicationUserRepository ApplicationUser { get; private set; }
    public IUserOtpRepository UserOtp { get; private set; }

    public ISP_Call SP_Call { get; private set; }


    public void Dispose()
    {
        _db.Dispose();
    }

    public void Save()
    {
        _db.SaveChanges();
    }
}
