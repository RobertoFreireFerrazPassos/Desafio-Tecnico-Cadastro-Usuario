using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserRegistration.Domain.Entities;
using UserRegistration.DataAccess.Repositories.Base;
using UserRegistration.Domain.Repositories;

namespace UserRegistration.DataAccess.Repositories
{
    public class UserRepository : Repository<UserEntity>, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) {}

        public Task<IEnumerable<UserEntity>> GetAllAsync()
        {
            string query = $@"SELECT 
                                USER_ID AS Id,
                                NAME,
                                BIRTHDATE,
                                EMAIL,
                                ACTIVE,
                                GENDERID,
                                DESCRIPTION AS Gender
                              FROM UR_USER U
                              JOIN UR_GENDER G ON G.GENDER_ID = U.GENDERID
                            ";

            return ExecuteAsync(query);
        }
    }
}
// Name BirthDate Email Password  Active

