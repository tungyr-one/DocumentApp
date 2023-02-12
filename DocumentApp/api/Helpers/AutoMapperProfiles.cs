using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DocDb, DocDto>().ReverseMap();
            CreateMap<DocUpdateDto, DocDb>();
            CreateMap<CategoryDb, CategoryDto>().ReverseMap();
            CreateMap<SubcategoryDb, SubcategoryDto>().ReverseMap();
        }
    }
}