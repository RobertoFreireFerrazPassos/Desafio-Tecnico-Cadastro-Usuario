using System;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using System.Collections.Generic;
using UserRegistration.Domain.Repositories.Base;
using System.Linq;
using UserRegistration.Domain.Entities.Base;

namespace UserRegistration.DataAccess.Repositories.Base
{
	public class Repository<T> : IRepository<T> where T : Entity
	{
        private readonly IConfiguration configuration;
		public Repository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        private SqlConnection OpenDbConnection()
        {
            return new SqlConnection(configuration.GetConnectionString("mssqlserverConnection"));
        }

		public async Task<IEnumerable<T>> ExecuteAsync(string query, params (string, object)[] parameters)
		{
			using (var sqlConnection = OpenDbConnection())
			{
				try
				{
					await sqlConnection.OpenAsync();
					if (parameters.Length == 0)
					{
						var result = await sqlConnection.QueryAsync<T>(query);
						return result; 
					} else {
						return await sqlConnection.QueryAsync<T>(query, AddParameters(parameters));
					}					
				}
				catch (Exception exception)
				{
					throw exception;
				}
				finally
				{
					sqlConnection.Close();
				}
			}
		}

		public async Task<IEnumerable<Z>> ExecuteAsync<Z>(string query, params (string, object)[] parameters)
		{
			using (var sqlConnection = OpenDbConnection())
			{
				try
				{
					await sqlConnection.OpenAsync();
					return await sqlConnection.QueryAsync<Z>(query, AddParameters(parameters));
				}
				catch (Exception exception)
				{
					throw exception;
				}
				finally
				{
					sqlConnection.Close();
				}
			}
		}

		private IDictionary<string, object> AddParameters(params (string, object)[] parameter)
		{
			IDictionary<string, object> dictionary = new Dictionary<string, object>();
			foreach (var item in parameter)
			{
				dictionary.Add(item.Item1, item.Item2);
			}

			return dictionary;
		}	
	}
}