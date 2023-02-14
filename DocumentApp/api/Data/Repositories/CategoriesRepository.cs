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
   public class CategoriesRepository : ICategoriesRepository
   {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CategoriesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
      public async Task<IEnumerable<CategoryDb>> GetCategoriesAsync()
      {
            return await _context.Categories
            .Include(d => d.Subcategories)
            .ToListAsync();
      }

      public async Task<CategoryDb> GetCategoryByNameAsync(string catName)
      {
            return await _context.Categories
            .SingleOrDefaultAsync(c => c.Name == catName);
      }
   }
}