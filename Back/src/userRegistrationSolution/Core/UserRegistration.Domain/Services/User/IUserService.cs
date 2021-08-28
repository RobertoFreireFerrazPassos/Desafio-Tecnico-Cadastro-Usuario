
using System.Collections.Generic;
using System.Threading.Tasks;
using UserRegistration.Domain.Dtos.user;

namespace UserRegistration.Domain.Services.User
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<IEnumerable<UserDto>> GetUsersByFilterAsync();
        Task<bool> ToggleActivationInUserAsync();
        Task<UserDto> AddUserAsync();
        Task<UserDto> EditUserAsync();
        Task<bool> DeleteUserAsync();
    }
}
