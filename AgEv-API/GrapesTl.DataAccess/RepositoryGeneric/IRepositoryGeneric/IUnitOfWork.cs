using System;

namespace GrapesTl.Service;

public interface IUnitOfWork : IDisposable
{
    IUserRefreshTokenRepository UserRefreshToken { get; }
    IUserOtpRepository UserOtp { get; }

    //IM Start

    IApplicationUserRepository ApplicationUser { get; }

    ISP_Call SP_Call { get; }


    //IM End


    void Save();
}
