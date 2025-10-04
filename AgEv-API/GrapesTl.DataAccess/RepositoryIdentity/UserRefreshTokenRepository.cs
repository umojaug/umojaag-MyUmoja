using GrapesTl.Models;
using System.Linq;

namespace GrapesTl.Service
{
    public class UserRefreshTokenRepository(ApplicationDbContext db) : RepositoryAsync<UserRefreshToken>(db), IUserRefreshTokenRepository
    {
        private readonly ApplicationDbContext _db = db;

        public void Update(UserRefreshToken userRefreshToken)
        {
            var objFromDb = _db.UserRefreshTokens.FirstOrDefault(s => s.UserId == userRefreshToken.UserId);
            if (objFromDb != null)
            {
                objFromDb.RefreshToken = userRefreshToken.RefreshToken;
                objFromDb.ExpiryDate = userRefreshToken.ExpiryDate;
            }
        }
    }
}
