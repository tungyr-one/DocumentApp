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

      public async Task<CategoryDb> GetCategoryAsync(int id)
      {
            return await _context.Categories
            .Include(c=> c.Children)            
            .FirstOrDefaultAsync(c => c.Id == id);
      }

      public async Task<CategoryDb[]> GetCategoriesAsync()
      {
            return await _context.Categories.AsNoTracking()
            .Include(c=> c.Children)
            .ToArrayAsync();
      }

      public async Task<CategoryDb> GetCategoryByNameAsync(string categoryName)
      {
            return await _context.Categories
            .Where(c => c.Name == categoryName)
            .FirstOrDefaultAsync();
      }

      public void Create(CategoryDb newCategory)
      {
            _context.Categories
            .Add(newCategory).State = EntityState.Added;
      }

      public void Update(CategoryDb category)
      {            
            _context.Entry(category).State = EntityState.Modified;
      }

      public void Delete(CategoryDb category)
      {
            _context.Entry(category).State = EntityState.Deleted; 
      }   

      public async Task<bool> SaveAllAsync()
      {
            return await _context.SaveChangesAsync() > 0;
      }

      async Task<bool> ICategoriesRepository.CategoryExists(int categoryId)
      {
          return await _context.Categories.AnyAsync(c => c.Id == categoryId);
      }
   }
}