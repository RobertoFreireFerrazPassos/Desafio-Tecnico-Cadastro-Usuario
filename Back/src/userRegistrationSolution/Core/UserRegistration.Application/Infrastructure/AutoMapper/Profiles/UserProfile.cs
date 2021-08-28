using AutoMapper;
using UserRegistration.API.DataContracts.Responses;
using UserRegistration.API.Entities;

namespace UserRegistration.Application.Infrastructure.AutoMapper.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User,UserResponse>()
                .ReverseMap();
        }
    }
}
