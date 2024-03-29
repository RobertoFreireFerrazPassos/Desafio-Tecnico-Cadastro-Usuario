﻿
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserRegistration.Domain.Dtos.User;

namespace UserRegistration.Domain.Services.User
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<IEnumerable<UserDto>> GetUsersByFilterAsync(UserFilterDto filter);
        Task<int> ToggleActivationInUserAsync(UserToggleActivationDto userToggleActivationDto);
        Task<bool> AddUserAsync(UserDto user);
        Task<int> EditUserAsync(UserDto user);
        Task<bool> DeleteUserAsync(Guid id);
    }
}
