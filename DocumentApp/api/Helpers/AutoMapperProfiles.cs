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
                    opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(
                    dest => dest.Edited,
                    opt => opt.MapFrom(src => DateTime.Now));  

            CreateMap<DocUpdateDto, DocDb>()
                .ForMember(
                    dest => dest.Version,
                    opt => opt.MapFrom(src => src.Version + 1))
                .ForMember(
                    dest => dest.Edited,
                    opt => opt.MapFrom(src => DateTime.Now)); 

            CreateMap<CategoryDb, CategoryDto>().ReverseMap();
        }
    }
}