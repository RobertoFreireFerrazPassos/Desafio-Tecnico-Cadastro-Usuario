using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserRegistration.Domain.Entities;
using UserRegistration.DataAccess.Repositories.Base;
using UserRegistration.Domain.Repositories;
using UserRegistration.Domain.Dtos.User;
using UserRegistration.Domain.Enums.User;

namespace UserRegistration.DataAccess.Repositories
{
    public class UserRepository : Repository<UserEntity>, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) {}

        public Task<IEnumerable<UserEntity>> GetUsersAsync(UserFilterDto userfilter = null)
        {
            string queryFilter = BuildFilter(userfilter);

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
                              {queryFilter}
                            ";

            return ExecuteAsync(query);
        }

        private string BuildFilter(UserFilterDto userfilter)
        {
            if (userfilter == null || userfilter.Filters.Length == 0) return "";

            var filterList = new List<string>();

            Filter nameFilter = userfilter.Filters.FirstOrDefault(f => f.Field == FieldTypeEnum.Name.ToString());
            if (nameFilter != null && !String.IsNullOrWhiteSpace(nameFilter.Value))
            {
                filterList.Add($@"U.NAME LIKE '%{nameFilter.Value}%'");
            }

            Filter activeFilter = userfilter.Filters.FirstOrDefault(f => f.Field == FieldTypeEnum.Active.ToString());
            if (activeFilter != null)
            {
                filterList.Add($@"U.ACTIVE = {(activeFilter.Value == ActiveEnum.Ativo.ToString() ? "'TRUE'" : "'FALSE'")}");
            }       

            return filterList?.Count > 0 ? "Where " + filterList.Aggregate((a, b) => a + " AND " + b) : "";
        }
    }
}

