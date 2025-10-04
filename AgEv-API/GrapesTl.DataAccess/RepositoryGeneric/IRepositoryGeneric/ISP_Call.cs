using Dapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GrapesTl.Service;

public interface ISP_Call
{
    Task BeginTransactionAsync();
    Task CommitAsync();
    Task RollbackAsync();

    Task<T> Single<T>(string procedureName, DynamicParameters param = null);

    Task Execute(string procedureName, DynamicParameters param = null);

    Task<T> OneRecord<T>(string procedureName, DynamicParameters param = null);

    Task<IEnumerable<T>> List<T>(string procedureName, DynamicParameters param = null);

    Tuple<IEnumerable<T1>, IEnumerable<T2>> List<T1, T2>(string procedureName, DynamicParameters param = null);
}
