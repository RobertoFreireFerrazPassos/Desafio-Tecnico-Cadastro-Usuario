using System.Collections.Generic;
using System.Threading.Tasks;
using UserRegistration.Domain.Entities;

namespace UserRegistration.Domain.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<UserEntity>> GetAllAsync();
    }
}
