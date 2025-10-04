using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrapesTl.Service;

public class SP_Call : ISP_Call
{
    private static string ConnectionString = "";
    private SqlConnection _connection;
    private SqlTransaction _transaction;

    public SP_Call(ApplicationDbContext db)
    {
        ConnectionString = db.Database.GetDbConnection().ConnectionString;
    }

    public async Task BeginTransactionAsync()
    {
        _connection = new SqlConnection(ConnectionString);
        await _connection.OpenAsync();
        _transaction = _connection.BeginTransaction();
    }

    public Task CommitAsync()
    {
        _transaction?.Commit();
        return Task.CompletedTask;
    }

    public Task RollbackAsync()
    {
        _transaction?.Rollback();
        return Task.CompletedTask;
    }

    public async Task Execute(string procedureName, DynamicParameters param = null)
    {
        if (_transaction != null)
        {
            await _connection.ExecuteAsync(procedureName, param, commandType: System.Data.CommandType.StoredProcedure, transaction: _transaction);
        }
        else
        {
            using var sqlCon = new SqlConnection(ConnectionString);
            await sqlCon.OpenAsync();
            await sqlCon.ExecuteAsync(procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
        }
    }

    public async Task<IEnumerable<T>> List<T>(string procedureName, DynamicParameters param = null)
    {
        using SqlConnection sqlCon = new(ConnectionString);
        sqlCon.Open();
        return await sqlCon.QueryAsync<T>(procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
    }

    public Tuple<IEnumerable<T1>, IEnumerable<T2>> List<T1, T2>(string procedureName, DynamicParameters param = null)
    {
        using (SqlConnection sqlCon = new(ConnectionString))
        {
            sqlCon.Open();
            var result = SqlMapper.QueryMultiple(sqlCon, procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
            var item1 = result.Read<T1>().ToList();
            var item2 = result.Read<T2>().ToList();


            if (item1 != null && item2 != null)
            {
                return new Tuple<IEnumerable<T1>, IEnumerable<T2>>(item1, item2);
            }

        }

        return new Tuple<IEnumerable<T1>, IEnumerable<T2>>(new List<T1>(), new List<T2>());
    }

    public async Task<T> OneRecord<T>(string procedureName, DynamicParameters param = null)
    {
        using SqlConnection sqlCon = new(ConnectionString);
        sqlCon.Open();
        var value = await sqlCon.QueryAsync<T>(procedureName, param, commandType: System.Data.CommandType.StoredProcedure);
        return (T)Convert.ChangeType(value.FirstOrDefault(), typeof(T));
    }

    public async Task<T> Single<T>(string procedureName, DynamicParameters param = null)
    {
        using SqlConnection sqlCon = new(ConnectionString);
        sqlCon.Open();
        return (T)Convert.ChangeType(await sqlCon.ExecuteScalarAsync<T>(procedureName, param, commandType: System.Data.CommandType.StoredProcedure), typeof(T));
    }

    public void Dispose()
    {
        _transaction?.Dispose();
        if (_connection?.State == System.Data.ConnectionState.Open)
            _connection.Close();
        _connection?.Dispose();
    }
}
