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
                    opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(
                    dest => dest.Edited,
                    opt => opt.MapFrom(src => DateTime.UtcNow));  

            CreateMap<DocUpdateDto, DocDb>()
                .ForMember(
                    dest => dest.Edited,
                    opt => opt.MapFrom(src => DateTime.UtcNow)); 

            CreateMap<CategoryDb, CategoryDto>().ReverseMap();
        }
    }
}