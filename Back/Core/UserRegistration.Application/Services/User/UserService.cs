using System.Collections.Generic;
using System.Threading.Tasks;
using UserRegistration.Domain.Services.User;
using UserRegistration.Domain.Dtos.user;
using UserRegistration.Domain.Repositories;
using UserRegistration.Domain.Entities;
using System;
using AutoMapper;

namespace UserRegistration.Application.Services.User
{
    public class UserService : IUserService
    {
        public IMapper Mapper { get; }
        public IUserRepository UserRepository { get; }

        public UserService(
            IMapper mapper,
            IUserRepository userRepository) 
        
        {
            Mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
            UserRepository = userRepository ??
              throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var result = await UserRepository.GetAllAsync();
            return Mapper.Map<IEnumerable<UserDto>>(result);
        }

        /*public Task<UserDto> EditUserAsync() {
            *//*User userToEdit = users.FirstOrDefault(u => u.Id == user.Id);

            userToEdit.Active = user.Active;
            userToEdit.Email = user.Email;
            userToEdit.Password = user.Password;
            userToEdit.BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day);
            userToEdit.Name = user.Name;
            userToEdit.Gender = user.Gender;

            UserResponse userResponse = new UserResponse()
            {
                Active = user.Active,
                Email = user.Email,
                BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day),
                Name = user.Name,
                Gender = user.Gender,
                Id = user.Id
            };

            return userResponse;*//*
        }

        public Task<UserDto> AddUserAsync()
        {
            *//*User newUser = new User()
            {
                Active = true,
                Email = user.Email,
                Password = user.Password,
                BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day),
                Name = user.Name,
                Gender = user.Gender,
                Id = Guid.NewGuid()
            };

            users.Add(newUser);

            UserResponse userResponse = new UserResponse()
            {
                Active = newUser.Active,
                Email = newUser.Email,
                BirthDate = new DateTime(newUser.BirthDate.Year, newUser.BirthDate.Month, newUser.BirthDate.Day),
                Name = newUser.Name,
                Gender = newUser.Gender,
                Id = newUser.Id
            };

            return userResponse;*//*
        }*/

        /*public Task<IEnumerable<UserDto>> GetUsersByFilterAsync()
        {
            *//*List<UserResponse> userResponse = new List<UserResponse>();
            foreach (User user in users.Where(u => {
                if (!String.IsNullOrWhiteSpace(filter.Name))
                {
                    return u.Active == filter.Active && u.Name.Contains(filter.Name, StringComparison.OrdinalIgnoreCase);
                }
                return u.Active == filter.Active;
            }))
            {
                userResponse.Add(new UserResponse()
                {
                    Active = user.Active,
                    Email = user.Email,
                    BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day),
                    Name = user.Name,
                    Gender = user.Gender,
                    Id = user.Id
                });
            }
            return userResponse;*//*
        }

        public Task<bool> ToggleActivationInUserAsync()
        {
            *//*User userToEdit = users.FirstOrDefault(u => u.Id == userToggleactivationRequest.Id);
            userToEdit.Active = !userToggleactivationRequest.Active;

            return true;*//*
        }

        public Task<bool> DeleteUserAsync()
        {
            *//*User userToRemove = users.FirstOrDefault(u => u.Id == id);
            users.Remove(userToRemove);

            return true;*//*
        }*/
    }
}
