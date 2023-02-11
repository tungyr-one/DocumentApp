using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Data.Repositories
{
    public class SubcategoriesRepository:ISubcategoriesRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public SubcategoriesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
              public async Task<IEnumerable<SubcategoryDb>> GetSubcategoriesAsync()
        {
                return await _context.Subcategories
                .Include(d => d.Docs)
                .ToListAsync();
        }
   }
}