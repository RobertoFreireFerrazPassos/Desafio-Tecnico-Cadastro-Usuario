using System.Collections.Generic;
using System.Threading.Tasks;
using UserRegistration.Domain.Entities.Base;

namespace UserRegistration.Domain.Repositories.Base
{
    public interface IRepository<T> where T : Entity
    {
        Task<IEnumerable<T>> ExecuteAsync(string query, params (string, object)[] parameters);
    }
}

