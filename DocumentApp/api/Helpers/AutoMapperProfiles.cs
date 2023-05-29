using System;
using AutoMapper;
using DocumentApp.DTOs;
using DocumentApp.Entities;

namespace DocumentApp.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DocDb, DocDto>().ReverseMap();

            CreateMap<DocNewDto, DocDb>()
                .ForMember(
                    dest => dest.Created,
                    opt => opt.MapFrom(src => DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)))
                .ForMember(
                    dest => dest.Edited,
                    opt => opt.MapFrom(src => DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc)));  

            CreateMap<DocUpdateDto, DocDb>()
                .ForMember(
                    dest => dest.Edited,
                    opt => opt.MapFrom(src => DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc))); 

            CreateMap<CategoryDb, CategoryDto>().ReverseMap();
        }
    }
}