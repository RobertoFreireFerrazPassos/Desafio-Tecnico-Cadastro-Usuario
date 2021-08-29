using AutoMapper;
using System;
using UserRegistration.Application.DataContracts.Responses;
using UserRegistration.Domain.Entities;
using UserRegistration.Domain.Dtos.User;
using UserRegistration.Application.DataContracts.Requests;

namespace UserRegistration.Application.Infrastructure.AutoMapper.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserEntity, UserDto>()
                .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(
                    src => new DateTime(src.BirthDate.Year, src.BirthDate.Month, src.BirthDate.Day)
                ));
            CreateMap<UserDto, UserResponse>();
            CreateMap<UsersFilterRequest, UserFilterDto>();
            CreateMap<UserRequest, UserDto>();
            CreateMap<UserToggleActivationRequest, UserToggleActivationDto>();
        }
    }
}
