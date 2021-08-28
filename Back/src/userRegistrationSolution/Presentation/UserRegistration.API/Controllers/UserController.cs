using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using UserRegistration.API.Models;
using UserRegistration.API.DataContracts.Requests;
using UserRegistration.API.DataContracts.Responses;

namespace UserRegistration.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        public List<User> users = new List<User>()
        {
            new User(){
                Id = new Guid("09a51efa-0ca8-475f-9466-0d29f84f4d63"),
                Name = "Roberto",
                BirthDate = new DateTime(1996,8,5),
                Email = "test@gmail.com",
                Gender = GenderEnum.Masculino.ToString(),
                Active = true
            },
            new User(){
                Id = new Guid("e943c74b-23f1-444e-a76e-14710cb38ba7"),
                Name = "Maria",
                BirthDate = new DateTime(1992,8,5),
                Email = "test2@gmail.com",
                Gender = GenderEnum.Feminino.ToString(),
                Active = false
            }
        };

        public UserController()
        {
        }

        [HttpGet("get")]
        public IEnumerable<UserResponse> Get()
        {
            List<UserResponse> userResponse = new List<UserResponse>();

            foreach (User user in users) {
                userResponse.Add(new UserResponse() {
                    Active = user.Active,
                    Email = user.Email,
                    BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day),
                    Name = user.Name,
                    Gender = user.Gender,
                    Id = user.Id
                });
            }
            return userResponse;
        }

        [HttpPost("getusersbyfilter")]
        public IEnumerable<UserResponse> Getusersbyfilter(UsersFilterResponse filter)
        {
            List<UserResponse> userResponse = new List<UserResponse>();
            foreach (User user in users.Where(u => {
                if (!String.IsNullOrWhiteSpace(filter.Name)) {
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
            return userResponse;
        }

        [HttpPost("toggleactivation")]
        public bool ToggleActivation([FromBody] UserToggleactivationRequest userToggleactivationRequest)
        {
            User userToEdit = users.FirstOrDefault(u => u.Id == userToggleactivationRequest.Id);
            userToEdit.Active = !userToggleactivationRequest.Active;

            return true;
        }

        [HttpPost("add")]
        public UserResponse Add([FromBody] UserRequest user)
        {
            User newUser = new User()
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

            return userResponse;
        }

        [HttpPost("edit")]
        public UserResponse Edit([FromBody] UserRequest user)
        {
            User userToEdit = users.FirstOrDefault(u => u.Id == user.Id);

            userToEdit.Active = user.Active;
            userToEdit.Email = user.Email;
            userToEdit.Password = user.Password;
            userToEdit.BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day);
            userToEdit.Name = user.Name;
            userToEdit.Gender = user.Gender;

            UserResponse userResponse = new UserResponse() {
                Active = user.Active,
                Email = user.Email,
                BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day),
                Name = user.Name,
                Gender = user.Gender,
                Id = user.Id
            };

            return userResponse;
        }

        [HttpGet("delete")]
        public bool Delete([FromQuery] Guid id)
        {
            User userToRemove = users.FirstOrDefault(u => u.Id == id);
            users.Remove(userToRemove);

            return true;
        }
    }
}
