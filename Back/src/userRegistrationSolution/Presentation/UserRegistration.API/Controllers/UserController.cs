using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using UserRegistration.API.DataContracts;
using UserRegistration.API.DataContracts.Requests;
using UserRegistration.API.DataContracts.Responses;

namespace UserRegistration.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        public IEnumerable<UserResponse> users = new List<UserResponse>()
        {
            new UserResponse(){
                Id = new Guid(),
                Name = "Roberto",
                BirthDate = new DateTime(1996,8,5),
                Email = "test@gmail.com",
                Gender = GenderEnum.Masculino.ToString(),
                Active = true
            },
            new UserResponse(){
                Id = new Guid(),
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
        public IEnumerable<UserResponse> get()
        {
            return users;
        }

        [HttpPost("add")]
        public UserResponse Add([FromBody] UserRequest user)
        {
            UserResponse userResponse = new UserResponse()
            {
                Active = user.Active,
                Email = user.Email,
                BirthDate = new DateTime(user.BirthDate.Year, user.BirthDate.Month, user.BirthDate.Day),
                Name = user.Name,
                Gender = user.Gender,
                Id = user.Id
            };


            return userResponse;
        }
    }
}
