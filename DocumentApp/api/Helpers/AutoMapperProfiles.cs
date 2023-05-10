using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using AutoMapper;
using DocumentApp.Entities;

namespace api.Helpers
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