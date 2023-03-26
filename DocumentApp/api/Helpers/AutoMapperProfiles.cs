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
            CreateMap<DocUpdateDto, DocDb>()
                .ForMember(
                    dest => dest.Version,
                    opt => opt.MapFrom(src => src.Version + 1));
            CreateMap<DocNewDto, DocDb>();
            CreateMap<CategoryDb, CategoryDto>().ReverseMap();
        }
    }
}